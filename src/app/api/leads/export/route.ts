import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { LeadStatus, Prisma } from '@prisma/client'

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Nuevo',
  EVALUATING: 'Evaluando',
  PROPOSAL_SENT: 'Propuesta Enviada',
  NEGOTIATING: 'Negociando',
  CLOSED_WON: 'Cerrado Ganado',
  CLOSED_LOST: 'Cerrado Perdido',
}

const PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
}

function escapeCSV(value: string | null | undefined): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function formatDate(date: Date | null): string {
  if (!date) return ''
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function formatCurrency(amount: number | null): string {
  if (amount == null) return ''
  return Math.round(amount).toString()
}

// GET /api/leads/export - Export leads as CSV
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const status = searchParams.get('status') as LeadStatus | null
    const search = searchParams.get('search')

    // Build where clause (same filters as leads list)
    const where: Prisma.LeadWhereInput = {}

    if (status && Object.values(LeadStatus).includes(status)) {
      where.status = status
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

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    // CSV headers
    const headers = [
      'Nombre',
      'Email',
      'Teléfono',
      'Comuna',
      'Dirección',
      'Tipo Propiedad',
      'Superficie m²',
      'Amoblado',
      'Estacionamiento',
      'Amenidades',
      'Ingreso Estimado',
      'Inversión Requerida',
      'ROI Proyectado',
      'Estado',
      'Prioridad',
      'Fuente',
      'Notas',
      'Próximo Seguimiento',
      'Asignado A',
      'Fecha Creación',
      'Última Actualización',
    ]

    // Build CSV rows
    const rows = leads.map(lead => [
      escapeCSV(lead.name),
      escapeCSV(lead.email),
      escapeCSV(lead.phone),
      escapeCSV(lead.comuna),
      escapeCSV(lead.address),
      escapeCSV(lead.propertyType),
      lead.surface != null ? String(lead.surface) : '',
      lead.furnished ? 'Sí' : 'No',
      lead.parking ? 'Sí' : 'No',
      escapeCSV(lead.amenities.join(', ')),
      formatCurrency(lead.estimatedRevenue),
      formatCurrency(lead.investmentRequired),
      lead.roiProjected != null ? `${lead.roiProjected.toFixed(1)}%` : '',
      STATUS_LABELS[lead.status] || lead.status,
      PRIORITY_LABELS[lead.priority] || lead.priority,
      escapeCSV(lead.source),
      escapeCSV(lead.notes),
      formatDate(lead.nextFollowUp),
      escapeCSV(lead.assignedTo),
      formatDate(lead.createdAt),
      formatDate(lead.updatedAt),
    ])

    // BOM for Excel UTF-8 compatibility
    const BOM = '\uFEFF'
    const csvContent = BOM + [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\r\n')

    const today = new Date().toISOString().split('T')[0]
    const filename = `leads-mrbnb-${today}.csv`

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting leads:', error)
    return NextResponse.json(
      { error: 'Error al exportar leads' },
      { status: 500 }
    )
  }
}
