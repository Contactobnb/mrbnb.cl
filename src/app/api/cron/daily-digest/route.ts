import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendDailyDigest } from '@/lib/email'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Get pending follow-ups (today or overdue)
    const pendingFollowUps = await prisma.lead.findMany({
      where: {
        nextFollowUp: { lte: now },
        status: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] },
      },
      select: {
        name: true,
        email: true,
        nextFollowUp: true,
      },
      orderBy: { nextFollowUp: 'asc' },
      take: 20,
    })

    // New leads today
    const newLeadsToday = await prisma.lead.count({
      where: { createdAt: { gte: todayStart } },
    })

    // Total active leads
    const totalActive = await prisma.lead.count({
      where: { status: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
    })

    await sendDailyDigest({
      pendingFollowUps: pendingFollowUps.map(f => ({
        name: f.name,
        email: f.email,
        nextFollowUp: f.nextFollowUp!.toISOString(),
      })),
      newLeadsToday,
      totalActive,
    })

    return NextResponse.json({
      success: true,
      pendingFollowUps: pendingFollowUps.length,
      newLeadsToday,
      totalActive,
    })
  } catch (error) {
    console.error('Error sending daily digest:', error)
    return NextResponse.json(
      { error: 'Error al enviar digest diario' },
      { status: 500 }
    )
  }
}
