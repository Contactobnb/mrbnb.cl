async function sendMailgun(to: string, from: string, subject: string, html: string) {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN || 'mrbnb.cl'
  if (!apiKey) throw new Error('MAILGUN_API_KEY is not configured')

  const form = new URLSearchParams()
  form.append('from', from)
  form.append('to', to)
  form.append('subject', subject)
  form.append('html', html)

  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    },
    body: form,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Mailgun error ${res.status}: ${text}`)
  }
}

const NOTIFICATION_EMAIL = 'clientes@mrbnb.cl'
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

  await sendMailgun(NOTIFICATION_EMAIL, FROM_EMAIL, `[Mr.BnB] Nuevo contacto: ${data.name}`, html)
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

  await sendMailgun(NOTIFICATION_EMAIL, FROM_EMAIL, `[Mr.BnB] Nueva evaluación: ${data.name} - ${data.comuna}${coberturaSubject}`, html)
}

// ── CRM Admin Alerts ────────────────────────────────────────────────────────────

interface NewLeadAlertData {
  name: string
  email: string
  phone?: string | null
  comuna?: string | null
  source: string
  status: string
}

export async function sendNewLeadAdminAlert(data: NewLeadAlertData): Promise<void> {
  const sourceLabels: Record<string, string> = {
    contacto: 'Formulario de Contacto',
    evaluacion: 'Evaluación de Propiedad',
    blog: 'Blog',
    web: 'Web',
    simulador: 'Simulador ROI',
  }

  const body = `
    <p style="margin:0 0 16px; font-size:15px; color:#333333;">
      Se ha creado un nuevo lead en el CRM.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
      <tr style="background-color:#f9f9f9;">
        <td colspan="2" style="padding:10px 12px; font-size:13px; color:#1e3a5f; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">
          Nuevo Lead
        </td>
      </tr>
      ${fieldRow('Nombre', data.name)}
      ${fieldRow('Email', data.email)}
      ${fieldRow('Teléfono', data.phone)}
      ${fieldRow('Comuna', data.comuna)}
      ${fieldRow('Fuente', sourceLabels[data.source] || data.source)}
    </table>
    <div style="margin-top:20px; text-align:center;">
      <a href="https://mrbnb.cl/admin" style="display:inline-block; background-color:#1e3a5f; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:14px; font-weight:600;">
        Ver en el CRM
      </a>
    </div>`

  const html = emailWrapper('Nuevo lead en el CRM', body)

  await sendMailgun(NOTIFICATION_EMAIL, FROM_EMAIL, `[CRM] Nuevo lead: ${data.name} (${sourceLabels[data.source] || data.source})`, html)
}

interface DailyDigestData {
  pendingFollowUps: Array<{ name: string; email: string; nextFollowUp: string }>
  newLeadsToday: number
  totalActive: number
}

export async function sendDailyDigest(data: DailyDigestData): Promise<void> {
  const followUpRows = data.pendingFollowUps.length > 0
    ? data.pendingFollowUps.map(f => `
        <tr>
          <td style="padding:8px 12px; font-size:14px; color:#333333; font-weight:600;">${f.name}</td>
          <td style="padding:8px 12px; font-size:14px; color:#666666;">${f.email}</td>
          <td style="padding:8px 12px; font-size:14px; color:#c53030;">${new Date(f.nextFollowUp).toLocaleDateString('es-CL')}</td>
        </tr>`).join('')
    : '<tr><td colspan="3" style="padding:12px; font-size:14px; color:#888888; text-align:center;">Sin seguimientos pendientes</td></tr>'

  const body = `
    <p style="margin:0 0 16px; font-size:15px; color:#333333;">
      Resumen diario del CRM Mr.BnB
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
      <tr>
        <td style="padding:12px; background-color:#e8f4fd; border-radius:6px; text-align:center; width:50%;">
          <p style="margin:0; font-size:24px; font-weight:bold; color:#1e3a5f;">${data.newLeadsToday}</p>
          <p style="margin:4px 0 0; font-size:12px; color:#666666;">Leads nuevos hoy</p>
        </td>
        <td style="width:12px;"></td>
        <td style="padding:12px; background-color:#e8f4fd; border-radius:6px; text-align:center; width:50%;">
          <p style="margin:0; font-size:24px; font-weight:bold; color:#1e3a5f;">${data.totalActive}</p>
          <p style="margin:4px 0 0; font-size:12px; color:#666666;">Leads activos</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
      <tr style="background-color:#f9f9f9;">
        <td colspan="3" style="padding:10px 12px; font-size:13px; color:#1e3a5f; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">
          Seguimientos pendientes (${data.pendingFollowUps.length})
        </td>
      </tr>
      <tr style="background-color:#f0f0f0;">
        <td style="padding:6px 12px; font-size:12px; color:#666666; font-weight:600;">Nombre</td>
        <td style="padding:6px 12px; font-size:12px; color:#666666; font-weight:600;">Email</td>
        <td style="padding:6px 12px; font-size:12px; color:#666666; font-weight:600;">Fecha</td>
      </tr>
      ${followUpRows}
    </table>
    <div style="margin-top:20px; text-align:center;">
      <a href="https://mrbnb.cl/admin" style="display:inline-block; background-color:#1e3a5f; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:14px; font-weight:600;">
        Abrir CRM
      </a>
    </div>`

  const html = emailWrapper('Digest diario del CRM', body)

  await sendMailgun(NOTIFICATION_EMAIL, FROM_EMAIL, `[CRM] Digest diario - ${data.pendingFollowUps.length} seguimientos pendientes`, html)
}

interface WeeklySummaryData {
  newLeads: number
  closedWon: number
  closedLost: number
  conversionRate: number
  pipelineValue: number
  topComunas: Array<{ comuna: string; count: number }>
  bySource: Array<{ source: string; count: number }>
}

export async function sendWeeklySummary(data: WeeklySummaryData): Promise<void> {
  const comunaRows = data.topComunas.length > 0
    ? data.topComunas.map(c => `
        <tr>
          <td style="padding:6px 12px; font-size:14px; color:#333333;">${c.comuna}</td>
          <td style="padding:6px 12px; font-size:14px; color:#666666; text-align:right;">${c.count}</td>
        </tr>`).join('')
    : '<tr><td colspan="2" style="padding:8px 12px; font-size:14px; color:#888888; text-align:center;">Sin datos</td></tr>'

  const sourceRows = data.bySource.length > 0
    ? data.bySource.map(s => `
        <tr>
          <td style="padding:6px 12px; font-size:14px; color:#333333; text-transform:capitalize;">${s.source}</td>
          <td style="padding:6px 12px; font-size:14px; color:#666666; text-align:right;">${s.count}</td>
        </tr>`).join('')
    : '<tr><td colspan="2" style="padding:8px 12px; font-size:14px; color:#888888; text-align:center;">Sin datos</td></tr>'

  const pipelineFormatted = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(data.pipelineValue)

  const body = `
    <p style="margin:0 0 16px; font-size:15px; color:#333333;">
      Resumen semanal del CRM Mr.BnB
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
      <tr>
        <td style="padding:12px; background-color:#e8f4fd; border-radius:6px; text-align:center; width:25%;">
          <p style="margin:0; font-size:24px; font-weight:bold; color:#1e3a5f;">${data.newLeads}</p>
          <p style="margin:4px 0 0; font-size:11px; color:#666666;">Nuevos</p>
        </td>
        <td style="width:8px;"></td>
        <td style="padding:12px; background-color:#e8fde8; border-radius:6px; text-align:center; width:25%;">
          <p style="margin:0; font-size:24px; font-weight:bold; color:#16a34a;">${data.closedWon}</p>
          <p style="margin:4px 0 0; font-size:11px; color:#666666;">Ganados</p>
        </td>
        <td style="width:8px;"></td>
        <td style="padding:12px; background-color:#fde8e8; border-radius:6px; text-align:center; width:25%;">
          <p style="margin:0; font-size:24px; font-weight:bold; color:#c53030;">${data.closedLost}</p>
          <p style="margin:4px 0 0; font-size:11px; color:#666666;">Perdidos</p>
        </td>
        <td style="width:8px;"></td>
        <td style="padding:12px; background-color:#f3e8fd; border-radius:6px; text-align:center; width:25%;">
          <p style="margin:0; font-size:24px; font-weight:bold; color:#7c3aed;">${data.conversionRate.toFixed(1)}%</p>
          <p style="margin:4px 0 0; font-size:11px; color:#666666;">Conversión</p>
        </td>
      </tr>
    </table>

    <div style="padding:16px; background-color:#fffbeb; border:1px solid #fbbf24; border-radius:6px; text-align:center; margin-bottom:16px;">
      <p style="margin:0; font-size:12px; color:#92400e; font-weight:600; text-transform:uppercase;">Pipeline total</p>
      <p style="margin:4px 0 0; font-size:22px; font-weight:bold; color:#92400e;">${pipelineFormatted}</p>
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="width:48%; vertical-align:top;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
            <tr style="background-color:#f9f9f9;">
              <td colspan="2" style="padding:8px 12px; font-size:12px; color:#1e3a5f; font-weight:700; text-transform:uppercase;">Top Comunas</td>
            </tr>
            ${comunaRows}
          </table>
        </td>
        <td style="width:4%;"></td>
        <td style="width:48%; vertical-align:top;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e5e5; border-radius:6px; overflow:hidden;">
            <tr style="background-color:#f9f9f9;">
              <td colspan="2" style="padding:8px 12px; font-size:12px; color:#1e3a5f; font-weight:700; text-transform:uppercase;">Por Fuente</td>
            </tr>
            ${sourceRows}
          </table>
        </td>
      </tr>
    </table>

    <div style="margin-top:20px; text-align:center;">
      <a href="https://mrbnb.cl/admin/metricas" style="display:inline-block; background-color:#1e3a5f; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:14px; font-weight:600;">
        Ver Métricas Completas
      </a>
    </div>`

  const html = emailWrapper('Resumen semanal del CRM', body)

  await sendMailgun(NOTIFICATION_EMAIL, FROM_EMAIL, `[CRM] Resumen semanal - ${data.newLeads} nuevos leads, ${data.closedWon} cerrados`, html)
}
