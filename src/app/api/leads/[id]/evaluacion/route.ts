import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PDFParse } from 'pdf-parse'
import { parsePriceLabsPdfText, calculateCashFlow } from '@/lib/evaluacion'

// POST /api/leads/[id]/evaluacion
// Two modes:
// - Content-Type: multipart/form-data → parse PDF only (returns extracted data)
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
      const textResult = await parser.getText()
      await parser.destroy()

      const fullText = textResult.text
      const parsed = parsePriceLabsPdfText(fullText)

      if (!parsed) {
        return NextResponse.json({
          error: 'No se pudieron extraer los datos del PDF. Verifica que sea un PDF de PriceLabs Revenue Estimate.',
          rawText: fullText.substring(0, 2000),
        }, { status: 422 })
      }

      return NextResponse.json({
        adr: parsed.adr,
        occupancy: parsed.occupancy,
        propertyName: parsed.propertyName,
        annualRevenue: parsed.annualRevenue,
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
