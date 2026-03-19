import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateCashFlow } from '@/lib/evaluacion'

// POST /api/leads/[id]/evaluacion
// Two modes:
// - Content-Type: multipart/form-data → parse PDF via Gemini Vision
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

    // Mode 1: Parse PDF via Gemini Vision (send PDF directly, no pdf-parse needed)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('pdf') as File | null

      if (!file) {
        return NextResponse.json({ error: 'No se recibió archivo PDF' }, { status: 400 })
      }

      const geminiKey = process.env.GEMINI_API_KEY
      if (!geminiKey) {
        return NextResponse.json({
          error: 'GEMINI_API_KEY no configurada. Ingresa los datos manualmente.',
          needsManualEntry: true,
        }, { status: 422 })
      }

      const arrayBuffer = await file.arrayBuffer()
      const pdfBase64 = Buffer.from(arrayBuffer).toString('base64')

      const extracted = await extractDataWithGemini(geminiKey, pdfBase64)

      if (!extracted) {
        return NextResponse.json({
          error: 'No se pudieron extraer los datos del PDF. Ingresa los datos manualmente.',
          needsManualEntry: true,
        }, { status: 422 })
      }

      return NextResponse.json(extracted)
    }

    // Mode 2: Save evaluation
    if (contentType.includes('application/json')) {
      const body = await request.json()

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

      await prisma.activity.create({
        data: {
          leadId: id,
          type: 'proposal',
          title: 'Evaluación de propiedad creada',
          body: `NOI anual: $${Math.round(result.totalNoi).toLocaleString('es-CL')} | ${result.pctSobreRenta > 0 ? '+' : ''}${result.pctSobreRenta.toFixed(1)}% vs renta clásica`,
        },
      })

      // Update lead with evaluation results
      await prisma.lead.update({
        where: { id },
        data: {
          estimatedRevenue: Math.round(result.totalNoi / 12),
          roiProjected: result.pctSobreRenta / 100,
          investmentRequired: result.totalGav > 0 ? result.totalGav : null,
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

// ── Gemini: extract all data directly from the PDF ──────────────────────────

async function extractDataWithGemini(
  apiKey: string,
  pdfBase64: string
): Promise<{ adr: number[]; occupancy: number[]; propertyName?: string; annualRevenue?: number } | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

  const prompt = `Analyze this PriceLabs Revenue Estimate PDF. Extract:

1. The property name (from "Revenue Estimate for:" on page 1)
2. The Estimated Annual Revenue number (from page 1)
3. From the "Average Daily Rate" chart on page 2: the 12 monthly ADR values (Jan-Dec)
4. From the "Adjusted Occupancy" chart on page 2: the 12 monthly occupancy values (Jan-Dec)

Return ONLY valid JSON (no markdown, no code blocks, no explanation):
{"propertyName":"...","annualRevenue":number,"adr":[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec],"occupancy":[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec]}

Rules:
- adr values in CLP as integers (e.g. 47200 for 47.2K on the chart label)
- occupancy values as integers (percentages, e.g. 62 for 62%)
- annualRevenue as integer in CLP (e.g. 8795100)
- Read each labeled data point carefully from the charts
- Exactly 12 values per array (January through December)`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: 'application/pdf', data: pdfBase64 } },
          ],
        }],
      }),
    })

    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.error('Gemini returned no text. Response:', JSON.stringify(data).substring(0, 500))
      return null
    }

    const cleaned = text.replace(/```json\s*\n?/g, '').replace(/```\s*$/g, '').trim()
    const parsed = JSON.parse(cleaned)

    if (
      Array.isArray(parsed.adr) && parsed.adr.length === 12 &&
      Array.isArray(parsed.occupancy) && parsed.occupancy.length === 12
    ) {
      return {
        adr: parsed.adr,
        occupancy: parsed.occupancy,
        propertyName: parsed.propertyName || undefined,
        annualRevenue: parsed.annualRevenue || undefined,
      }
    }

    return null
  } catch (err) {
    console.error('Gemini extraction failed:', err)
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
