import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PDFParse } from 'pdf-parse'
import { parsePdfMetadata, calculateCashFlow } from '@/lib/evaluacion'

// POST /api/leads/[id]/evaluacion
// Two modes:
// - Content-Type: multipart/form-data → parse PDF (extract charts with Gemini Vision)
// - Content-Type: application/json → save evaluation with all data
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Verify lead exists
    const lead = await prisma.lead.findUnique({ where: { id } })
    if (!lead) {
      return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })
    }

    const contentType = request.headers.get('content-type') || ''

    // Mode 1: Parse PDF
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('pdf') as File | null

      if (!file) {
        return NextResponse.json({ error: 'No se recibió archivo PDF' }, { status: 400 })
      }

      const arrayBuffer = await file.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)
      const parser = new PDFParse({ data })

      // 1. Extract text metadata (property name, annual revenue, etc.)
      const textResult = await parser.getText()
      const metadata = parsePdfMetadata(textResult.text)

      // 2. Screenshot page 2 (the charts page) for Gemini Vision
      const screenshotResult = await parser.getScreenshot({
        partial: [2],
        scale: 2,
        imageBuffer: true,
      })
      await parser.destroy()

      const page2 = screenshotResult.pages[0]
      if (!page2?.data) {
        return NextResponse.json({
          error: 'No se pudo renderizar la página de gráficos del PDF.',
          metadata,
        }, { status: 422 })
      }

      // 3. Send screenshot to Gemini Vision to extract chart values
      const geminiKey = process.env.GEMINI_API_KEY
      if (!geminiKey) {
        return NextResponse.json({
          error: 'GEMINI_API_KEY no configurada. Ingresa los datos manualmente.',
          metadata,
          needsManualEntry: true,
        }, { status: 422 })
      }

      const imageBase64 = Buffer.from(page2.data).toString('base64')
      const chartData = await extractChartDataWithGemini(geminiKey, imageBase64)

      if (!chartData) {
        return NextResponse.json({
          error: 'No se pudieron extraer los datos de los gráficos. Ingresa los datos manualmente.',
          metadata,
          needsManualEntry: true,
        }, { status: 422 })
      }

      return NextResponse.json({
        adr: chartData.adr,
        occupancy: chartData.occupancy,
        propertyName: metadata.propertyName,
        annualRevenue: metadata.annualRevenue,
      })
    }

    // Mode 2: Save evaluation
    if (contentType.includes('application/json')) {
      const body = await request.json()

      // Validate required fields
      const { adr, occupancy, rentaClasica, ggcc } = body
      if (!adr || !occupancy || !Array.isArray(adr) || !Array.isArray(occupancy)) {
        return NextResponse.json({ error: 'Faltan datos de ADR y/u ocupación' }, { status: 400 })
      }
      if (adr.length !== 12 || occupancy.length !== 12) {
        return NextResponse.json({ error: 'Se requieren 12 valores mensuales de ADR y ocupación' }, { status: 400 })
      }
      if (rentaClasica === undefined || ggcc === undefined) {
        return NextResponse.json({ error: 'Faltan renta clásica y/o gastos comunes' }, { status: 400 })
      }

      // Calculate results
      const result = calculateCashFlow({
        adr,
        occupancy,
        rentaClasica,
        ggcc,
        internet: body.internet || 0,
        luz: body.luz || 0,
        agua: body.agua || 0,
        gas: body.gas || 0,
        muebles: body.muebles || 0,
        decoracion: body.decoracion || 0,
        arreglos: body.arreglos || 0,
        arriendo: body.arriendo || 0,
        garantia: body.garantia || 0,
      })

      // Save to DB
      const evaluation = await prisma.evaluation.create({
        data: {
          leadId: id,
          adr,
          occupancy,
          rentaClasica,
          ggcc,
          internet: body.internet || 0,
          luz: body.luz || 0,
          agua: body.agua || 0,
          gas: body.gas || 0,
          muebles: body.muebles || 0,
          decoracion: body.decoracion || 0,
          arreglos: body.arreglos || 0,
          arriendo: body.arriendo || 0,
          garantia: body.garantia || 0,
          noiAnual: result.totalNoi,
          resultadoAnual: result.totalResultado,
          pctSobreRenta: result.pctSobreRenta,
          propertyName: body.propertyName || null,
        },
      })

      // Create activity for the lead
      await prisma.activity.create({
        data: {
          leadId: id,
          type: 'proposal',
          title: 'Evaluación de propiedad creada',
          body: `NOI anual: $${Math.round(result.totalNoi).toLocaleString('es-CL')} | ${result.pctSobreRenta > 0 ? '+' : ''}${result.pctSobreRenta.toFixed(1)}% vs renta clásica`,
        },
      })

      return NextResponse.json({ evaluation, result }, { status: 201 })
    }

    return NextResponse.json({ error: 'Content-Type no soportado' }, { status: 400 })
  } catch (error) {
    console.error('Error in evaluacion POST:', error)
    return NextResponse.json(
      { error: 'Error al procesar la evaluación' },
      { status: 500 }
    )
  }
}

// ── Gemini Vision chart extraction ──────────────────────────────────────────

async function extractChartDataWithGemini(
  apiKey: string,
  imageBase64: string
): Promise<{ adr: number[]; occupancy: number[] } | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

  const prompt = `Extract the monthly data from the 3 charts in this PriceLabs Revenue Estimate page.

Return ONLY valid JSON (no markdown, no code blocks, no explanation):
{"adr":[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec],"occupancy":[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec]}

Rules:
- adr values are in CLP (e.g. 47200 for 47.2K on the chart)
- occupancy values are integers (percentages, e.g. 62 for 62%)
- Read each labeled data point from the "Average Daily Rate" and "Adjusted Occupancy" charts
- There must be exactly 12 values per array (January through December)`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: 'image/png', data: imageBase64 } },
          ],
        }],
      }),
    })

    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) return null

    // Clean potential markdown code block wrapping
    const cleaned = text.replace(/```json\s*\n?/g, '').replace(/```\s*$/g, '').trim()
    const parsed = JSON.parse(cleaned)

    if (
      Array.isArray(parsed.adr) && parsed.adr.length === 12 &&
      Array.isArray(parsed.occupancy) && parsed.occupancy.length === 12
    ) {
      return { adr: parsed.adr, occupancy: parsed.occupancy }
    }

    return null
  } catch (err) {
    console.error('Gemini Vision extraction failed:', err)
    return null
  }
}

// GET /api/leads/[id]/evaluacion - List evaluations for a lead
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const evaluations = await prisma.evaluation.findMany({
      where: { leadId: id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(evaluations)
  } catch (error) {
    console.error('Error fetching evaluations:', error)
    return NextResponse.json(
      { error: 'Error al obtener evaluaciones' },
      { status: 500 }
    )
  }
}
