import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 1. Leads por mes (últimos 12 meses)
    const now = new Date()
    const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1)

    const allLeads = await prisma.lead.findMany({
      where: { createdAt: { gte: twelveMonthsAgo } },
      select: {
        createdAt: true,
        status: true,
        source: true,
        comuna: true,
        estimatedRevenue: true,
      },
    })

    // Group by month
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const leadsByMonth: Record<string, { month: string; total: number; won: number; lost: number }> = {}

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      leadsByMonth[key] = {
        month: `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`,
        total: 0,
        won: 0,
        lost: 0,
      }
    }

    for (const lead of allLeads) {
      const d = lead.createdAt
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (leadsByMonth[key]) {
        leadsByMonth[key].total++
        if (lead.status === 'CLOSED_WON') leadsByMonth[key].won++
        if (lead.status === 'CLOSED_LOST') leadsByMonth[key].lost++
      }
    }

    const leadsPerMonth = Object.values(leadsByMonth)

    // 2. Conversión acumulada por mes
    let cumulativeTotal = 0
    let cumulativeWon = 0
    const conversionByMonth = leadsPerMonth.map(m => {
      cumulativeTotal += m.total
      cumulativeWon += m.won
      return {
        month: m.month,
        rate: cumulativeTotal > 0 ? Math.round((cumulativeWon / cumulativeTotal) * 1000) / 10 : 0,
      }
    })

    // 3. Leads por fuente
    const sourceMap: Record<string, number> = {}
    for (const lead of allLeads) {
      const source = lead.source || 'web'
      sourceMap[source] = (sourceMap[source] || 0) + 1
    }
    const sourceLabels: Record<string, string> = {
      evaluacion: 'Evaluación',
      contacto: 'Contacto',
      blog: 'Blog',
      web: 'Web',
      simulador: 'Simulador',
    }
    const leadsBySource = Object.entries(sourceMap)
      .map(([source, count]) => ({
        name: sourceLabels[source] || source,
        value: count,
      }))
      .sort((a, b) => b.value - a.value)

    // 4. Leads por comuna (top 10)
    const comunaMap: Record<string, number> = {}
    for (const lead of allLeads) {
      if (lead.comuna) {
        comunaMap[lead.comuna] = (comunaMap[lead.comuna] || 0) + 1
      }
    }
    const leadsByComuna = Object.entries(comunaMap)
      .map(([comuna, count]) => ({ comuna, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // 5. Pipeline por estado
    const allLeadsForPipeline = await prisma.lead.findMany({
      select: { status: true, estimatedRevenue: true },
    })

    const statusLabels: Record<string, string> = {
      NEW: 'Nuevo',
      EVALUATING: 'Evaluando',
      PROPOSAL_SENT: 'Propuesta',
      NEGOTIATING: 'Negociando',
      CLOSED_WON: 'Cerrado',
      CLOSED_LOST: 'Perdido',
    }

    const pipelineMap: Record<string, { count: number; value: number }> = {}
    for (const lead of allLeadsForPipeline) {
      if (!pipelineMap[lead.status]) {
        pipelineMap[lead.status] = { count: 0, value: 0 }
      }
      pipelineMap[lead.status].count++
      pipelineMap[lead.status].value += lead.estimatedRevenue || 0
    }

    const statusOrder = ['NEW', 'EVALUATING', 'PROPOSAL_SENT', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST']
    const pipeline = statusOrder.map(status => ({
      status: statusLabels[status] || status,
      count: pipelineMap[status]?.count || 0,
      value: Math.round(pipelineMap[status]?.value || 0),
    }))

    // 6. Summary stats
    const totalLeads = await prisma.lead.count()
    const totalWon = await prisma.lead.count({ where: { status: 'CLOSED_WON' } })
    const activeLeads = await prisma.lead.count({
      where: { status: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
    })
    const pipelineValue = allLeadsForPipeline
      .filter(l => l.status !== 'CLOSED_LOST')
      .reduce((sum, l) => sum + (l.estimatedRevenue || 0), 0)

    return NextResponse.json({
      leadsPerMonth,
      conversionByMonth,
      leadsBySource,
      leadsByComuna,
      pipeline,
      summary: {
        totalLeads,
        totalWon,
        activeLeads,
        conversionRate: totalLeads > 0 ? Math.round((totalWon / totalLeads) * 1000) / 10 : 0,
        pipelineValue: Math.round(pipelineValue),
      },
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { error: 'Error al obtener métricas' },
      { status: 500 }
    )
  }
}
