import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEvaluacionNotification } from '@/lib/email'

// POST /api/evaluacion - Receive evaluation form data, create lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    if (!body.comuna || !body.propertyType || !body.tipologia) {
      return NextResponse.json(
        { error: 'Comuna, tipo de propiedad y tipología son requeridos' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Determine coverage status
    const hasCobertura = body.cobertura !== false

    // Build notes
    const noteParts: string[] = []
    if (body.tipologia) noteParts.push(`Tipología: ${body.tipologia}`)
    if (body.direccion) noteParts.push(`Dirección: ${body.direccion}`)
    if (body.amenidades?.length > 0) noteParts.push(`Amenidades: ${body.amenidades.join(', ')}`)
    if (body.otraInfo) noteParts.push(`Info adicional: ${body.otraInfo}`)
    if (!hasCobertura && body.notas) noteParts.push(body.notas)

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        address: body.direccion || null,
        comuna: body.comuna,
        propertyType: `${body.propertyType} - ${body.tipologia}`,
        amenities: body.amenidades || [],
        status: hasCobertura ? 'EVALUATING' : 'NEW',
        priority: hasCobertura ? 'HIGH' : 'LOW',
        source: 'evaluacion',
        notes: noteParts.join(' | '),
      },
    })

    // Create initial activity
    const activityTitle = hasCobertura
      ? 'Evaluación solicitada'
      : 'Evaluación solicitada (fuera de cobertura)'

    const amenidadesText = body.amenidades?.length > 0 ? ` Amenidades: ${body.amenidades.join(', ')}.` : ''
    const otraInfoText = body.otraInfo ? ` Info: ${body.otraInfo}.` : ''

    const activityBody = hasCobertura
      ? `Evaluación de ${body.propertyType} (${body.tipologia}) en ${body.comuna}. Dirección: ${body.direccion || 'No indicada'}.${amenidadesText}${otraInfoText}`
      : `${body.notas || 'Sin cobertura'}. ${body.propertyType} (${body.tipologia}) en ${body.comuna}. Dirección: ${body.direccion || 'No indicada'}.${amenidadesText}${otraInfoText}`

    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: 'note',
        title: activityTitle,
        body: activityBody,
      },
    })

    // Send email notification (non-blocking)
    try {
      await sendEvaluacionNotification({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        comuna: body.comuna,
        propertyType: body.propertyType,
        tipologia: body.tipologia,
        direccion: body.direccion || null,
        amenidades: body.amenidades || [],
        cobertura: hasCobertura,
      })
    } catch (emailError) {
      console.error('Error sending evaluacion notification email:', emailError)
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      cobertura: hasCobertura,
    })
  } catch (error) {
    console.error('Error processing evaluation:', error)
    return NextResponse.json(
      { error: 'Error al procesar la evaluación' },
      { status: 500 }
    )
  }
}
