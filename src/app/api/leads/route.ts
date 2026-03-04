import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateROI, type PropertyData } from '@/lib/pricing'
import { LeadStatus, LeadPriority, Prisma } from '@prisma/client'

// GET /api/leads - List all leads with filters, search, sort, pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const status = searchParams.get('status') as LeadStatus | null
    const comuna = searchParams.get('comuna')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'createdAt'
    const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))

    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.LeadWhereInput = {}

    if (status && Object.values(LeadStatus).includes(status)) {
      where.status = status
    }

    if (comuna) {
      where.comuna = comuna
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { comuna: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Validate sort field
    const allowedSortFields = [
      'createdAt', 'updatedAt', 'name', 'email', 'comuna',
      'status', 'priority', 'estimatedRevenue', 'source',
    ]
    const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt'

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { [sortField]: order },
        skip,
        take: limit,
        include: {
          activities: {
            orderBy: { createdAt: 'desc' },
            take: 3,
          },
        },
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Error al obtener los leads' },
      { status: 500 }
    )
  }
}

// POST /api/leads - Create a new lead
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Auto-calculate ROI if property data is provided
    let estimatedRevenue: number | undefined
    let roiProjected: number | undefined

    if (body.comuna && body.propertyType) {
      const propertyData: PropertyData = {
        comuna: body.comuna,
        propertyType: body.propertyType,
        surface: body.surface,
        furnished: body.furnished || false,
        parking: body.parking || false,
        amenities: body.amenities || [],
      }

      const roi = calculateROI(propertyData)
      estimatedRevenue = roi.netOwnerMonthly
      roiProjected = roi.uplift
    }

    // Validate status and priority if provided
    if (body.status && !Object.values(LeadStatus).includes(body.status)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      )
    }

    if (body.priority && !Object.values(LeadPriority).includes(body.priority)) {
      return NextResponse.json(
        { error: 'Prioridad inválida' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        address: body.address || null,
        comuna: body.comuna || null,
        propertyType: body.propertyType || null,
        surface: body.surface ? parseInt(body.surface) : null,
        furnished: body.furnished || false,
        parking: body.parking || false,
        amenities: body.amenities || [],
        estimatedRevenue: estimatedRevenue ?? body.estimatedRevenue ?? null,
        investmentRequired: body.investmentRequired ?? null,
        roiProjected: roiProjected ?? body.roiProjected ?? null,
        status: body.status || 'NEW',
        priority: body.priority || 'MEDIUM',
        source: body.source || 'web',
        notes: body.notes || null,
        nextFollowUp: body.nextFollowUp ? new Date(body.nextFollowUp) : null,
        assignedTo: body.assignedTo || null,
      },
      include: {
        activities: true,
      },
    })

    // Create initial activity
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: 'note',
        title: 'Lead creado',
        body: `Nuevo lead desde ${body.source || 'web'}: ${body.name} (${body.email})`,
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Error al crear el lead' },
      { status: 500 }
    )
  }
}
