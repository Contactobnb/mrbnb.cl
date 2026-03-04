import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { LeadStatus, LeadPriority } from '@prisma/client'

// GET /api/leads/[id] - Get single lead with activities
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { error: 'Error al obtener el lead' },
      { status: 500 }
    )
  }
}

// PATCH /api/leads/[id] - Update lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Check lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      )
    }

    // Validate status if provided
    if (body.status && !Object.values(LeadStatus).includes(body.status)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      )
    }

    // Validate priority if provided
    if (body.priority && !Object.values(LeadPriority).includes(body.priority)) {
      return NextResponse.json(
        { error: 'Prioridad inválida' },
        { status: 400 }
      )
    }

    // Build update data, only include fields that are present
    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'comuna', 'propertyType',
      'surface', 'furnished', 'parking', 'amenities',
      'estimatedRevenue', 'investmentRequired', 'roiProjected',
      'status', 'priority', 'source', 'notes', 'assignedTo',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // Handle nextFollowUp date conversion
    if (body.nextFollowUp !== undefined) {
      updateData.nextFollowUp = body.nextFollowUp ? new Date(body.nextFollowUp) : null
    }

    // Handle surface as integer
    if (updateData.surface !== undefined && updateData.surface !== null) {
      updateData.surface = parseInt(String(updateData.surface))
    }

    await prisma.lead.update({
      where: { id },
      data: updateData,
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    // If status changed, auto-create activity
    if (body.status && body.status !== existingLead.status) {
      const statusLabels: Record<string, string> = {
        NEW: 'Nuevo',
        EVALUATING: 'En evaluación',
        PROPOSAL_SENT: 'Propuesta enviada',
        NEGOTIATING: 'Negociando',
        CLOSED_WON: 'Cerrado (ganado)',
        CLOSED_LOST: 'Cerrado (perdido)',
      }

      await prisma.activity.create({
        data: {
          leadId: id,
          type: 'status_change',
          title: `Estado cambiado a ${statusLabels[body.status] || body.status}`,
          body: `De "${statusLabels[existingLead.status] || existingLead.status}" a "${statusLabels[body.status] || body.status}"`,
        },
      })
    }

    // If a note was added via body.newNote, create activity
    if (body.newNote) {
      await prisma.activity.create({
        data: {
          leadId: id,
          type: 'note',
          title: 'Nota agregada',
          body: body.newNote,
        },
      })
    }

    // Re-fetch to include the new activities
    const finalLead = await prisma.lead.findUnique({
      where: { id },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return NextResponse.json(finalLead)
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el lead' },
      { status: 500 }
    )
  }
}

// DELETE /api/leads/[id] - Delete lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingLead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      )
    }

    await prisma.lead.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Lead eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el lead' },
      { status: 500 }
    )
  }
}
