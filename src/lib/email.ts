import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

const NOTIFICATION_EMAIL = 'felipe@mrbnb.cl'
const FROM_EMAIL = 'Mr.BnB <notificaciones@mrbnb.cl>'

function emailWrapper(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; max-width:600px; width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#1e3a5f; padding:24px 32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:bold;">Mr.BnB</h1>
            </td>
          </tr>
          <!-- Title bar -->
          <tr>
            <td style="background-color:#c53030; padding:12px 32px; text-align:center;">
              <p style="margin:0; color:#ffffff; font-size:16px; font-weight:600;">${title}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f9f9; padding:16px 32px; text-align:center; border-top:1px solid #e5e5e5;">
              <p style="margin:0; color:#888888; font-size:12px;">
                Este es un mensaje automático del sitio web mrbnb.cl
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function fieldRow(label: string, value: string | null | undefined): string {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:8px 12px; font-size:14px; color:#666666; font-weight:600; white-space:nowrap; vertical-align:top;">${label}</td>
      <td style="padding:8px 12px; font-size:14px; color:#333333;">${value}</td>
    </tr>`
}

interface ContactFormData {
  name: string
  email: string
  phone?: string | null
  message: string
  type?: string
}

interface EvaluacionFormData {
  name: string
  email: string
  phone?: string | null
  comuna: string
  propertyType: string
  tipologia: string
  direccion?: string | null
  amenidades?: string[]
  cobertura: boolean
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const typeLabels: Record<string, string> = {
    general: 'Consulta general',
    evaluacion: 'Evaluación de propiedad',
    arrendatario: 'Arrendatario',
  }

  const body = `
    <p style="margin:0 0 16px; font-size:15px; color:#333333;">
      Se ha recibido un nuevo mensaje desde el formulario de contacto.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
      <tr style="background-color:#f9f9f9;">
        <td colspan="2" style="padding:10px 12px; font-size:13px; color:#1e3a5f; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">
          Datos del contacto
        </td>
      </tr>
      ${fieldRow('Nombre', data.name)}
      ${fieldRow('Email', data.email)}
      ${fieldRow('Teléfono', data.phone)}
      ${fieldRow('Tipo', typeLabels[data.type || 'general'] || data.type)}
      ${fieldRow('Mensaje', data.message)}
    </table>`

  const html = emailWrapper('Nuevo contacto recibido', body)

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject: `[Mr.BnB] Nuevo contacto: ${data.name}`,
    html,
  })
}

export async function sendEvaluacionNotification(data: EvaluacionFormData): Promise<void> {
  const coberturaText = data.cobertura
    ? '<span style="color:#16a34a; font-weight:600;">Dentro de cobertura</span>'
    : '<span style="color:#c53030; font-weight:600;">Fuera de cobertura</span>'

  const amenidadesText = data.amenidades && data.amenidades.length > 0
    ? data.amenidades.join(', ')
    : null

  const body = `
    <p style="margin:0 0 16px; font-size:15px; color:#333333;">
      Se ha recibido una nueva solicitud de evaluación de propiedad.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
      <tr style="background-color:#f9f9f9;">
        <td colspan="2" style="padding:10px 12px; font-size:13px; color:#1e3a5f; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">
          Datos del propietario
        </td>
      </tr>
      ${fieldRow('Nombre', data.name)}
      ${fieldRow('Email', data.email)}
      ${fieldRow('Teléfono', data.phone)}
    </table>

    <div style="height:16px;"></div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
      <tr style="background-color:#f9f9f9;">
        <td colspan="2" style="padding:10px 12px; font-size:13px; color:#1e3a5f; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">
          Datos de la propiedad
        </td>
      </tr>
      ${fieldRow('Comuna', data.comuna)}
      ${fieldRow('Tipo de propiedad', data.propertyType)}
      ${fieldRow('Tipología', data.tipologia)}
      ${fieldRow('Dirección', data.direccion)}
      ${fieldRow('Amenidades', amenidadesText)}
      <tr>
        <td style="padding:8px 12px; font-size:14px; color:#666666; font-weight:600; white-space:nowrap; vertical-align:top;">Cobertura</td>
        <td style="padding:8px 12px; font-size:14px;">${coberturaText}</td>
      </tr>
    </table>`

  const html = emailWrapper('Nueva evaluación de propiedad', body)

  const coberturaSubject = data.cobertura ? '' : ' [FUERA DE COBERTURA]'

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject: `[Mr.BnB] Nueva evaluación: ${data.name} - ${data.comuna}${coberturaSubject}`,
    html,
  })
}
