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

const LOGO_URL = 'https://mrbnb.cl/images/Logo_MB.png'

function emailWrapper(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#faf8f5; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#faf8f5;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; max-width:600px; width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#1e3a5f; padding:20px 32px; text-align:center;">
              <img src="${LOGO_URL}" alt="Mr.BnB" width="60" height="60" style="display:block; margin:0 auto; border-radius:8px;">
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
            <td style="background-color:#152a45; padding:16px 32px; text-align:center;">
              <p style="margin:0; color:#a0aec0; font-size:12px;">
                Este es un mensaje autom&aacute;tico del sitio web mrbnb.cl
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

// ── Mailgun with attachment ─────────────────────────────────────────────────

async function sendMailgunWithAttachment(
  to: string,
  from: string,
  subject: string,
  html: string,
  attachment: { buffer: Buffer; filename: string }
) {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN || 'mrbnb.cl'
  if (!apiKey) throw new Error('MAILGUN_API_KEY is not configured')

  const formData = new FormData()
  formData.append('from', from)
  formData.append('to', to)
  formData.append('subject', subject)
  formData.append('html', html)
  formData.append(
    'attachment',
    new Blob([new Uint8Array(attachment.buffer)], { type: 'application/pdf' }),
    attachment.filename
  )

  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Mailgun error ${res.status}: ${text}`)
  }
}

// ── Proposal Email (sent to lead with PDF attachment) ───────────────────────

const PROPOSAL_FROM = 'Felipe - Mr.BnB <felipe@mrbnb.cl>'

interface ProposalEmailData {
  to: string
  leadName: string
  direccion: string
  pctSobreRenta: number
  pdfBuffer: Buffer
  pdfFilename: string
}

function proposalEmailWrapper(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#faf8f5; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#faf8f5;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; max-width:600px; width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#1e3a5f; padding:20px 32px; text-align:center;">
              <img src="${LOGO_URL}" alt="Mr.BnB" width="60" height="60" style="display:block; margin:0 auto; border-radius:8px;">
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
            <td style="background-color:#152a45; padding:16px 32px; text-align:center;">
              <img src="${LOGO_URL}" alt="Mr.BnB" width="40" height="40" style="display:block; margin:0 auto; border-radius:6px;">
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendProposalEmail(data: ProposalEmailData): Promise<void> {
  const escenarioA = data.pctSobreRenta > 20
  const pctDisplay = data.pctSobreRenta.toFixed(1)

  const escenarioHtml = escenarioA
    ? `<div style="background-color:#e8fde8; border-left:4px solid #16a34a; padding:16px 20px; border-radius:4px; margin:20px 0;">
        <p style="margin:0 0 8px; font-size:14px; font-weight:700; color:#16a34a;">Recomendado</p>
        <p style="margin:0; font-size:14px; color:#333333;">
          Tras analizar los datos, <strong>recomendamos implementar el modelo de renta corta</strong>.
          La proyecci&oacute;n muestra una rentabilidad superior al <strong>${pctDisplay}%</strong> en comparaci&oacute;n con el arriendo tradicional.
          Los n&uacute;meros indican que la ubicaci&oacute;n y tipolog&iacute;a tienen una alta demanda, lo que nos permitir&aacute; maximizar tu ingreso operativo neto de forma consistente.
        </p>
      </div>`
    : `<div style="background-color:#fde8e8; border-left:4px solid #c53030; padding:16px 20px; border-radius:4px; margin:20px 0;">
        <p style="margin:0 0 8px; font-size:14px; font-weight:700; color:#c53030;">No recomendado</p>
        <p style="margin:0; font-size:14px; color:#333333;">
          Tras revisar la simulaci&oacute;n, <strong>en este momento no recomendamos la transici&oacute;n a renta corta</strong>.
          El diferencial de ganancia frente a un arriendo tradicional no alcanza nuestro margen m&iacute;nimo de seguridad del 30% necesario para compensar la variabilidad del modelo.
          En este caso espec&iacute;fico, la estabilidad de una renta cl&aacute;sica es la opci&oacute;n m&aacute;s eficiente por ahora.
        </p>
      </div>`

  const body = `
    <p style="margin:0 0 16px; font-size:15px; color:#333333;">
      Hola, <strong>${data.leadName}</strong>:
    </p>
    <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
      Es un gusto saludarte. Hemos finalizado el an&aacute;lisis t&eacute;cnico y comercial de tu departamento para evaluar su potencial bajo nuestro modelo de gesti&oacute;n. Nuestro objetivo es que tomes una decisi&oacute;n basada en datos reales de mercado, buscando siempre la m&aacute;xima protecci&oacute;n de tu activo y la mayor rentabilidad operativa.
    </p>
    <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
      Para este an&aacute;lisis, se realiz&oacute; un estudio de mercado con la plataforma <strong>PriceLabs</strong> que define la tarifa diaria promedio (ADR) y los niveles de ocupaci&oacute;n esperados seg&uacute;n el comportamiento de propiedades similares en tu zona.
    </p>
    <div style="background-color:#e8f4fd; padding:16px 20px; border-radius:6px; margin:20px 0;">
      <p style="margin:0; font-size:14px; color:#1e3a5f; font-weight:600;">
        📎 Adjunto simulaci&oacute;n de Flujos Mr.BnB
      </p>
      <p style="margin:8px 0 0; font-size:13px; color:#333333;">
        Un desglose detallado mes a mes donde comparamos los ingresos proyectados (NOI) frente a una renta tradicional, descontando todos los gastos operacionales como contribuciones, servicios y comisiones.
      </p>
    </div>

    <hr style="border:none; border-top:1px solid #e5e5e5; margin:24px 0;">

    <h2 style="margin:0 0 16px; font-size:18px; color:#1e3a5f;">¿Qui&eacute;nes somos y qu&eacute; hacemos?</h2>
    <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
      En <strong>Mr. BnB</strong> transformamos departamentos en hoteles boutique en Santiago, encargandonos de absolutamente todo para que t&uacute; no tengas estr&eacute;s operativo.
    </p>

    <p style="margin:0 0 8px; font-size:14px; color:#1e3a5f; font-weight:600;">Nuestra Experiencia:</p>
    <ul style="margin:0 0 16px; padding-left:20px; font-size:14px; color:#333333; line-height:1.8;">
      <li><strong>+64 propiedades</strong> bajo administraci&oacute;n activa.</li>
      <li>Calificaciones de excelencia: <strong>4.81★ en Airbnb</strong> y <strong>8.9 en Booking</strong> (Estatus Superhost).</li>
      <li>Logramos, en promedio, un <strong>+30% de rentabilidad</strong> sobre el arriendo tradicional.</li>
    </ul>

    <p style="margin:0 0 8px; font-size:14px; color:#1e3a5f; font-weight:600;">¿Qu&eacute; incluye nuestro servicio?</p>
    <ul style="margin:0 0 16px; padding-left:20px; font-size:14px; color:#333333; line-height:1.8;">
      <li><strong>Gesti&oacute;n Completa:</strong> Nos ocupamos de las reservas, check-in/out, limpieza profesional y mantenimiento constante.</li>
      <li><strong>Customer Service 24/7:</strong> Atenci&oacute;n inmediata para los hu&eacute;spedes durante toda su estad&iacute;a.</li>
      <li><strong>Tecnolog&iacute;a de Punta:</strong> Optimizaci&oacute;n din&aacute;mica de precios diaria para capturar la m&aacute;xima demanda.</li>
      <li><strong>Transparencia Total:</strong> Reportes mensuales detallados de ingresos y gastos.</li>
      <li><strong>Puesta en Marcha:</strong> Tu departamento queda operativo en menos de <strong>2 semanas</strong>.</li>
    </ul>

    <div style="background-color:#fffbeb; border:1px solid #fbbf24; padding:16px 20px; border-radius:6px; margin:20px 0;">
      <p style="margin:0; font-size:14px; color:#92400e;">
        <strong>Inversi&oacute;n:</strong> Nuestra comisi&oacute;n es de un <strong>17% + IVA sobre los ingresos generados</strong>. Es un modelo de &eacute;xito compartido: <strong>solo cobramos cuando t&uacute; ganas</strong>.
      </p>
    </div>

    <hr style="border:none; border-top:1px solid #e5e5e5; margin:24px 0;">

    <h2 style="margin:0 0 16px; font-size:18px; color:#1e3a5f;">Conclusi&oacute;n del An&aacute;lisis</h2>

    ${escenarioHtml}

    <hr style="border:none; border-top:1px solid #e5e5e5; margin:24px 0;">

    <h3 style="margin:0 0 12px; font-size:16px; color:#1e3a5f;">Consideraciones Finales</h3>
    <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
      Es importante notar que este es un negocio de rendimiento creciente. Estimamos un per&iacute;odo de <strong>3 meses para que el departamento entre en "r&eacute;gimen"</strong>. Durante este tiempo, el algoritmo de las plataformas posiciona la propiedad mientras generamos las primeras rese&ntilde;as, permitiendo que el rendimiento crezca mes a mes.
    </p>
    <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
      Quedo a tu entera disposici&oacute;n para agendar una breve llamada y revisar estos n&uacute;meros en detalle.
    </p>
    <p style="margin:0; font-size:14px; color:#333333;">
      Saludos,<br><br>
      <strong>Felipe Ruiz</strong><br>
      <span style="color:#666666;">CoFundador y CEO &middot; MrBnb</span><br>
      <span style="color:#666666;">&#128222; +56 9 4 223 7814</span><br>
      <span style="color:#666666;">Mariano Sanchez Fontecilla 358, Las Condes</span>
    </p>`

  const html = proposalEmailWrapper(body)
  const subject = `Propuesta de Gestión y Evaluación de Rentabilidad - ${data.direccion}`

  await sendMailgunWithAttachment(data.to, PROPOSAL_FROM, subject, html, {
    buffer: data.pdfBuffer,
    filename: data.pdfFilename,
  })
}

// ── Follow-up Emails ────────────────────────────────────────────────────────

interface FollowUpEmailData {
  to: string
  leadName: string
  direccion: string
  followUpNumber: 1 | 2 | 3
}

export async function sendFollowUpEmail(data: FollowUpEmailData): Promise<void> {
  const { to, leadName, direccion, followUpNumber } = data
  const replySubject = encodeURIComponent(`Re: Propuesta de Gestión - ${direccion}`)

  const ctaButton = `
    <div style="margin-top:24px; text-align:center;">
      <a href="mailto:felipe@mrbnb.cl?subject=${replySubject}" style="display:inline-block; background-color:#1e3a5f; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:14px; font-weight:600;">
        Responder
      </a>
    </div>`

  const firma = `
    <p style="margin:24px 0 0; font-size:14px; color:#333333;">
      Saludos cordiales,<br><br>
      <strong>Felipe Ruiz</strong><br>
      <span style="color:#666666;">CoFundador y CEO &middot; MrBnb</span><br>
      <span style="color:#666666;">&#128222; +56 9 4 223 7814</span><br>
      <span style="color:#666666;">Mariano Sanchez Fontecilla 358, Las Condes</span>
    </p>`

  let subject: string
  let bodyContent: string

  switch (followUpNumber) {
    case 1:
      subject = `Seguimiento - Propuesta ${direccion}`
      bodyContent = `
        <p style="margin:0 0 16px; font-size:15px; color:#333333;">
          Hola, <strong>${leadName}</strong>:
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Hace unos d&iacute;as te enviamos el an&aacute;lisis de rentabilidad para tu propiedad en <strong>${direccion}</strong>.
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Quer&iacute;amos saber si tuviste oportunidad de revisar la simulaci&oacute;n y si tienes alguna pregunta sobre los resultados.
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Estaremos encantados de agendar una reuni&oacute;n para revisar el an&aacute;lisis en detalle y resolver cualquier duda que puedas tener.
        </p>
        ${ctaButton}
        ${firma}`
      break

    case 2:
      subject = `Recordatorio - Propuesta ${direccion}`
      bodyContent = `
        <p style="margin:0 0 16px; font-size:15px; color:#333333;">
          Hola, <strong>${leadName}</strong>:
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Esperamos que hayas podido revisar el an&aacute;lisis que te enviamos para tu propiedad en <strong>${direccion}</strong>.
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Los n&uacute;meros respaldan la oportunidad: nuestro modelo ha demostrado consistentemente generar retornos superiores al arriendo tradicional, con la tranquilidad de una gesti&oacute;n integral y profesional.
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Si est&aacute;s interesado en avanzar o tienes preguntas sobre el servicio, no dudes en contactarnos. Estamos aqu&iacute; para ayudarte a tomar la mejor decisi&oacute;n para tu inversi&oacute;n.
        </p>
        ${ctaButton}
        ${firma}`
      break

    case 3:
      subject = `Último seguimiento - Propuesta ${direccion}`
      bodyContent = `
        <p style="margin:0 0 16px; font-size:15px; color:#333333;">
          Hola, <strong>${leadName}</strong>:
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Este es nuestro &uacute;ltimo seguimiento respecto al an&aacute;lisis de rentabilidad que preparamos para tu propiedad en <strong>${direccion}</strong>.
        </p>
        <p style="margin:0 0 16px; font-size:14px; color:#333333; line-height:1.6;">
          Si est&aacute;s interesado en conocer m&aacute;s sobre nuestros servicios o si tus planes han cambiado y deseas explorar esta oportunidad en el futuro, siempre puedes contactarnos. Estaremos encantados de atenderte.
        </p>
        <p style="margin:0 0 16px; font-size:13px; color:#888888; line-height:1.6;">
          Si prefieres no recibir m&aacute;s seguimientos, simplemente ignora este mensaje.
        </p>
        ${ctaButton}
        ${firma}`
      break
  }

  const html = proposalEmailWrapper(bodyContent)
  await sendMailgun(to, PROPOSAL_FROM, subject, html)
}
