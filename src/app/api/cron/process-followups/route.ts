import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendFollowUpEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const stats = { followUp1: 0, followUp2: 0, followUp3: 0, skipped: 0, errors: 0 }

  try {
    // Process each follow-up stage
    for (const stage of [1, 2, 3] as const) {
      const dateField = `followUp${stage}Date` as const
      const sentField = `followUp${stage}Sent` as const
      const sentAtField = `followUp${stage}SentAt` as const

      const pending = await prisma.proposalEmail.findMany({
        where: {
          [dateField]: { lte: now },
          [sentField]: false,
          lead: { status: { not: 'CLOSED_LOST' } },
        },
        include: {
          lead: { select: { name: true, email: true, address: true, status: true } },
          evaluation: { select: { propertyName: true } },
        },
      })

      for (const proposal of pending) {
        // Skip if lead became CLOSED_LOST (double check)
        if (proposal.lead.status === 'CLOSED_LOST') {
          stats.skipped++
          continue
        }

        const direccion = proposal.lead.address || proposal.evaluation.propertyName || 'Propiedad'

        try {
          await sendFollowUpEmail({
            to: proposal.sentTo,
            leadName: proposal.lead.name,
            direccion,
            followUpNumber: stage,
          })

          await prisma.proposalEmail.update({
            where: { id: proposal.id },
            data: {
              [sentField]: true,
              [sentAtField]: now,
            },
          })

          await prisma.activity.create({
            data: {
              leadId: proposal.leadId,
              type: 'email',
              title: `Follow-up #${stage} enviado`,
              body: `Email de seguimiento #${stage} enviado a ${proposal.sentTo}`,
            },
          })

          stats[`followUp${stage}`]++
        } catch (err) {
          stats.errors++
          console.error(`Error sending follow-up #${stage} for proposal ${proposal.id}:`, err)
          // Log error but continue with next email
          await prisma.activity.create({
            data: {
              leadId: proposal.leadId,
              type: 'email',
              title: `Error en follow-up #${stage}`,
              body: err instanceof Error ? err.message : 'Error desconocido',
            },
          }).catch(() => {})
        }
      }
    }

    return NextResponse.json({ success: true, ...stats })
  } catch (error) {
    console.error('Error processing follow-ups:', error)
    return NextResponse.json(
      { error: 'Error al procesar follow-ups' },
      { status: 500 }
    )
  }
}
