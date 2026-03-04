import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWeeklySummary } from '@/lib/email'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // New leads this week
    const newLeads = await prisma.lead.count({
      where: { createdAt: { gte: oneWeekAgo } },
    })

    // Closed won this week
    const closedWon = await prisma.lead.count({
      where: {
        status: 'CLOSED_WON',
        updatedAt: { gte: oneWeekAgo },
      },
    })

    // Closed lost this week
    const closedLost = await prisma.lead.count({
      where: {
        status: 'CLOSED_LOST',
        updatedAt: { gte: oneWeekAgo },
      },
    })

    // Overall conversion rate
    const totalLeads = await prisma.lead.count()
    const totalWon = await prisma.lead.count({ where: { status: 'CLOSED_WON' } })
    const conversionRate = totalLeads > 0 ? (totalWon / totalLeads) * 100 : 0

    // Pipeline value (active leads)
    const activeLeads = await prisma.lead.findMany({
      where: { status: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
      select: { estimatedRevenue: true },
    })
    const pipelineValue = activeLeads.reduce((sum, l) => sum + (l.estimatedRevenue || 0), 0)

    // Top comunas
    const comunaGroups = await prisma.lead.groupBy({
      by: ['comuna'],
      _count: { id: true },
      where: { comuna: { not: null } },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    })
    const topComunas = comunaGroups.map(g => ({
      comuna: g.comuna || 'Sin comuna',
      count: g._count.id,
    }))

    // By source
    const sourceGroups = await prisma.lead.groupBy({
      by: ['source'],
      _count: { id: true },
      where: { createdAt: { gte: oneWeekAgo } },
      orderBy: { _count: { id: 'desc' } },
    })
    const bySource = sourceGroups.map(g => ({
      source: g.source,
      count: g._count.id,
    }))

    await sendWeeklySummary({
      newLeads,
      closedWon,
      closedLost,
      conversionRate,
      pipelineValue,
      topComunas,
      bySource,
    })

    return NextResponse.json({
      success: true,
      newLeads,
      closedWon,
      closedLost,
      conversionRate,
    })
  } catch (error) {
    console.error('Error sending weekly summary:', error)
    return NextResponse.json(
      { error: 'Error al enviar resumen semanal' },
      { status: 500 }
    )
  }
}
