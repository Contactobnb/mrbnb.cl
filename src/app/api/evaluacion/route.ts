import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateROI, type PropertyData } from '@/lib/pricing'

// POST /api/evaluacion - Receive evaluation form data, create lead, return ROI
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

    if (!body.comuna || !body.propertyType) {
      return NextResponse.json(
        { error: 'Comuna y tipo de propiedad son requeridos para la evaluación' },
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

    // Calculate ROI
    const propertyData: PropertyData = {
      comuna: body.comuna,
      propertyType: body.propertyType,
      surface: body.surface ? parseInt(body.surface) : undefined,
      furnished: body.furnished || false,
      parking: body.parking || false,
      amenities: body.amenities || [],
    }

    const roi = calculateROI(propertyData)

    // Create lead with source='evaluacion' and calculated ROI data
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        address: body.address || null,
        comuna: body.comuna,
        propertyType: body.propertyType,
        surface: body.surface ? parseInt(body.surface) : null,
        furnished: body.furnished || false,
        parking: body.parking || false,
        amenities: body.amenities || [],
        estimatedRevenue: roi.netOwnerMonthly,
        roiProjected: roi.uplift,
        status: 'EVALUATING',
        priority: 'HIGH',
        source: 'evaluacion',
        notes: body.notes || null,
      },
    })

    // Create initial activity
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: 'note',
        title: 'Evaluación solicitada',
        body: `Evaluación de propiedad en ${body.comuna} (${body.propertyType}). Ingreso estimado: $${roi.netOwnerMonthly.toLocaleString('es-CL')}/mes.`,
      },
    })

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      roi: {
        dailyRate: roi.dailyRate,
        monthlyRevenue: roi.monthlyRevenue,
        annualRevenue: roi.annualRevenue,
        traditionalRent: roi.traditionalRent,
        uplift: roi.uplift,
        commission: roi.commission,
        netOwnerMonthly: roi.netOwnerMonthly,
        netOwnerAnnual: roi.netOwnerAnnual,
        occupancyRate: roi.occupancyRate,
      },
    })
  } catch (error) {
    console.error('Error processing evaluation:', error)
    return NextResponse.json(
      { error: 'Error al procesar la evaluación' },
      { status: 500 }
    )
  }
}
