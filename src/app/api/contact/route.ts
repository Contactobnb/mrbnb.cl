import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactNotification, sendNewLeadAdminAlert } from '@/lib/email'

// POST /api/contact - Receive contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot check: if filled, return fake success without processing
    if (body.website) {
      return NextResponse.json({
        success: true,
        message: 'Formulario recibido. Nos pondremos en contacto pronto.',
      })
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
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

    // Determine contact type
    const type = body.type || 'general'

    // Create ContactSubmission record
    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message,
        type,
      },
    })

    // Send email notification (non-blocking)
    try {
      await sendContactNotification({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message,
        type,
      })
    } catch (emailError) {
      console.error('Error sending contact notification email:', emailError)
    }

    // If type is 'evaluacion', also create a Lead
    if (type === 'evaluacion') {
      const lead = await prisma.lead.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          comuna: body.comuna || null,
          propertyType: body.propertyType || null,
          source: 'contacto',
          status: 'NEW',
          priority: 'HIGH',
          notes: `Mensaje de contacto: ${body.message}`,
        },
      })

      // Create initial activity for the lead
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          type: 'note',
          title: 'Contacto recibido (evaluación)',
          body: `Formulario de contacto tipo evaluación.\nMensaje: ${body.message}`,
        },
      })

      // Send CRM admin alert (non-blocking)
      try {
        await sendNewLeadAdminAlert({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          comuna: body.comuna || null,
          source: 'contacto',
          status: 'NEW',
        })
      } catch (alertError) {
        console.error('Error sending new lead admin alert:', alertError)
      }

      return NextResponse.json({
        success: true,
        submissionId: submission.id,
        leadId: lead.id,
        message: 'Formulario recibido. Nos pondremos en contacto pronto.',
      })
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: 'Formulario recibido. Nos pondremos en contacto pronto.',
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Error al procesar el formulario de contacto' },
      { status: 500 }
    )
  }
}
