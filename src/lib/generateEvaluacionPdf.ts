import type { EvaluacionResult } from './evaluacion'

export interface PdfParams {
  result: EvaluacionResult
  propertyName: string
  comuna?: string | null
  propertyType?: string | null
  surface?: number | null
  rentaClasica: number
  ggcc: number
  internet: number
  luz: number
  agua: number
  gas: number
  muebles: number
  decoracion: number
  arreglos: number
  arriendo: number
  garantia: number
}

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const SM = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const NAVY: [number, number, number] = [30, 58, 95]

function fmt(n: number): string {
  if (n === 0) return '$ -'
  const s = n < 0 ? '-$ ' : '$ '
  return s + Math.abs(Math.round(n)).toLocaleString('es-CL')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = any

async function loadLogoBase64(): Promise<string | null> {
  try {
    const res = await fetch('/images/Logo_MB.png')
    if (!res.ok) return null
    const blob = await res.blob()
    return await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export async function generateEvaluacionPdf(p: PdfParams): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc: Doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const W = 297, H = 210
  const r = p.result, ms = r.months
  const ssbb = p.internet + p.luz + p.agua + p.gas
  const netoRC = p.rentaClasica * 0.93
  const avgNights = Math.round(ms.reduce((s, v) => s + v.nightsOccupied, 0) / 12)
  const avgComAb = Math.round(ms.reduce((s, v) => s + v.comisionAirbnb, 0) / 12)
  const avgNeto = Math.round(r.totalIngresosNetos / 12)
  const avgBruto = Math.round(r.totalIngresosBrutos / 12)

  // Load logo
  const logoData = await loadLogoBase64()

  // ══════════════════════════════════════════════════════════════════════════
  // HEADER
  // ══════════════════════════════════════════════════════════════════════════
  doc.setFillColor(...NAVY)
  doc.rect(0, 0, W, 20, 'F')

  if (logoData) {
    doc.addImage(logoData, 'PNG', 3, 1.5, 17, 17)
  }

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('Simulación de flujos anuales en renta corta', 23, 12.5)

  // ══════════════════════════════════════════════════════════════════════════
  // LEFT PANEL
  // ══════════════════════════════════════════════════════════════════════════
  const LX = 5, LW = 78
  let ly = 24
  const LRH = 3.2 // left row height

  const secHead = (t: string) => {
    doc.setFillColor(...NAVY)
    doc.rect(LX, ly, LW, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(5.5)
    doc.setFont('helvetica', 'bold')
    doc.text(t, LX + 1.5, ly + 2.9)
    ly += 4
  }

  const lRow = (label: string, value: string, bold = false) => {
    doc.setDrawColor(200, 200, 200)
    doc.rect(LX, ly, LW, LRH)
    doc.setTextColor(50, 50, 50)
    doc.setFontSize(4.8)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.text(label, LX + 1.5, ly + 2.3)
    doc.text(value, LX + LW - 1.5, ly + 2.3, { align: 'right' })
    ly += LRH
  }

  secHead('Input Ingresos (CLP)')
  lRow('Renta Clásica', fmt(p.rentaClasica), true)
  lRow('Comisión administrador', '7%')
  lRow('Ingreso neto renta clásica', fmt(netoRC), true)
  ly += 1

  secHead('Promedio Airbnb')
  lRow('% ocupación', r.avgOccupancy.toFixed(1) + '%')
  lRow('Noches', String(avgNights))
  lRow('Precio promedio / noche', fmt(Math.round(r.avgAdr)))
  lRow('Comisión Airbnb', fmt(avgComAb))
  lRow('Valor después de comisión', fmt(avgNeto))
  lRow('Ingreso promedio', fmt(avgBruto), true)
  ly += 1

  secHead('Costos')
  lRow('GGCC', fmt(p.ggcc))
  lRow('SSBB', fmt(ssbb))
  lRow('Internet', fmt(p.internet))
  lRow('Luz', fmt(p.luz))
  lRow('Agua', fmt(p.agua))
  lRow('Gas', fmt(p.gas))
  lRow('Comisión operador', '20%')
  lRow('Comisión Airbnb', '15%')
  lRow('Mantenimiento (% ggcc + ssbb)', '10%')
  ly += 1

  secHead('Datos Dpto')
  lRow('Tipología', p.propertyType || '-')
  lRow('m2', p.surface ? String(p.surface) : '-')
  lRow('Otros', '-')

  const leftPanelEndY = ly

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN CASH FLOW TABLE
  // ══════════════════════════════════════════════════════════════════════════
  const TX = LX + LW + 2
  const TW = W - TX - 3
  const LBL = 25
  const NCOLS = 14
  const CW = (TW - LBL) / NCOLS
  const TY = 24
  const RH = 3.2
  const TFS = 3.6

  // Header row (two-line: MES X + month name)
  doc.setFillColor(...NAVY)
  doc.rect(TX, TY, TW, 6.5, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(3.8)
  doc.setFont('helvetica', 'bold')

  // MES 0
  const colX = (i: number) => TX + LBL + CW * i + CW / 2
  doc.text('MES 0', colX(0), TY + 3.8, { align: 'center' })

  for (let i = 0; i < 12; i++) {
    doc.text(`MES ${i + 1}`, colX(i + 1), TY + 2.5, { align: 'center' })
    doc.setFontSize(3.2)
    doc.text(MESES[i], colX(i + 1), TY + 5.2, { align: 'center' })
    doc.setFontSize(3.8)
  }
  doc.text('Promedio', colX(13), TY + 3.8, { align: 'center' })

  let ty = TY + 6.5
  type RS = 'n' | 'h' | 's' // normal, highlight, sub

  const tRow = (label: string, m0: string, vals: string[], avg: string, st: RS = 'n') => {
    if (st === 'h') {
      doc.setFillColor(220, 230, 245)
      doc.rect(TX, ty, TW, RH, 'F')
    }
    doc.setDrawColor(210, 210, 210)
    doc.setLineWidth(0.08)
    doc.line(TX, ty + RH, TX + TW, ty + RH)
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(TFS)
    doc.setFont('helvetica', st === 'h' ? 'bold' : 'normal')
    doc.text(label, TX + 1, ty + 2.3)
    doc.setFontSize(TFS - 0.2)
    doc.setFont('helvetica', 'normal')
    doc.text(m0, colX(0), ty + 2.3, { align: 'center' })
    for (let i = 0; i < 12; i++) doc.text(vals[i], colX(i + 1), ty + 2.3, { align: 'center' })
    doc.setFont('helvetica', st === 'h' ? 'bold' : 'normal')
    doc.text(avg, colX(13), ty + 2.3, { align: 'center' })
    ty += RH
  }

  const d = '$ -'
  const mv = (fn: (m: typeof ms[0]) => string) => ms.map(fn)

  tRow('% ocupación', '-', mv(v => v.occupancy + '%'), r.avgOccupancy.toFixed(1) + '%')
  tRow('precio/noche', '-', mv(v => fmt(v.adr)), fmt(Math.round(r.avgAdr)))
  tRow('Noches', '-', mv(v => String(v.nightsOccupied)), String(avgNights))
  tRow('Renta mensual', d, mv(v => fmt(v.ingresosBrutos)), fmt(Math.round(r.totalIngresosBrutos / 12)))
  tRow('Comisión Airbnb', d, mv(v => fmt(-v.comisionAirbnb)), fmt(-avgComAb))
  tRow('Ingresos', d, mv(v => fmt(v.ingresosNetos)), fmt(avgNeto), 'h')
  tRow('Gastos Operacionales', d, mv(v => fmt(-v.gastosOperacionales)), fmt(-Math.round(r.totalGastosOperacionales / 12)), 'h')
  tRow('GGCC', d, mv(v => fmt(-v.ggcc)), fmt(-p.ggcc), 's')
  tRow('SSBB', d, mv(v => fmt(-v.ssbb)), fmt(-ssbb), 's')
  tRow('Comisión operador', d, mv(v => fmt(-v.comisionOperador)), fmt(-Math.round(ms.reduce((s, v) => s + v.comisionOperador, 0) / 12)), 's')
  tRow('Mantenimiento', d, mv(v => fmt(-v.mantenimiento)), fmt(-Math.round(ms.reduce((s, v) => s + v.mantenimiento, 0) / 12)), 's')
  tRow('NOI', d, mv(v => fmt(v.noi)), fmt(Math.round(r.totalNoi / 12)), 'h')

  // GAV section
  const gavT = r.totalGav
  tRow('GAV', gavT > 0 ? fmt(-gavT) : d, mv(() => d), d, 'h')
  tRow('  Muebles', p.muebles ? fmt(-p.muebles) : d, mv(() => d), d, 's')
  tRow('  Decoración/Equipamiento', p.decoracion ? fmt(-p.decoracion) : d, mv(() => d), d, 's')
  tRow('  Arreglos', p.arreglos ? fmt(-p.arreglos) : d, mv(() => d), d, 's')
  tRow('  Arriendo', p.arriendo ? fmt(-p.arriendo) : d, mv(() => d), d, 's')
  tRow('  Garantía', p.garantia ? fmt(-p.garantia) : d, mv(() => d), d, 's')

  tRow('Resultado', fmt(-gavT), mv(v => fmt(v.noi)), fmt(Math.round(r.totalNoi / 12)), 'h')
  tRow('Acumulado', fmt(-gavT), mv(v => fmt(v.acumulado)), '', 'h')

  // ══════════════════════════════════════════════════════════════════════════
  // SUMMARY TABLE (below main table, right side)
  // ══════════════════════════════════════════════════════════════════════════
  ty += 2
  const sumLbl = 32
  const sumCW = (TW - sumLbl) / 12
  const sumRH = 3

  doc.setFillColor(...NAVY)
  doc.rect(TX, ty, TW, 4, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(3.5)
  doc.setFont('helvetica', 'bold')
  for (let i = 0; i < 12; i++) {
    doc.text(MESES[i], TX + sumLbl + sumCW * i + sumCW / 2, ty + 2.8, { align: 'center' })
  }
  ty += 4

  const sRow = (label: string, vals: string[], bold = false) => {
    if (bold) { doc.setFillColor(240, 240, 250); doc.rect(TX, ty, TW, sumRH, 'F') }
    doc.setDrawColor(200, 200, 200)
    doc.line(TX, ty + sumRH, TX + TW, ty + sumRH)
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(3.5)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.text(label, TX + 1, ty + 2.2)
    for (let i = 0; i < 12; i++) {
      doc.text(vals[i], TX + sumLbl + sumCW * i + sumCW / 2, ty + 2.2, { align: 'center' })
    }
    ty += sumRH
  }

  sRow('ADR', ms.map(v => fmt(v.adr)))
  sRow('Tasa de ocupación', ms.map(v => v.occupancy + '%'))
  sRow('NOI', ms.map(v => fmt(v.noi)), true)
  sRow('Ingreso renta clásica', ms.map(() => fmt(netoRC)))
  sRow('% sobre renta clásica', ms.map(v => {
    const pct = netoRC > 0 ? ((v.noi - netoRC) / netoRC * 100) : 0
    return pct.toFixed(1) + '%'
  }), true)

  // ── % sobre renta clásica highlight box (below summary, right-aligned) ──
  const bxW = 42, bxH = 13
  const bxX = W - bxW - 5, bxY = ty + 1
  doc.setFillColor(...NAVY)
  doc.roundedRect(bxX, bxY, bxW, bxH, 2, 2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(5)
  doc.setFont('helvetica', 'normal')
  doc.text('% sobre renta clásica', bxX + bxW / 2, bxY + 4, { align: 'center' })
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(r.pctSobreRenta.toFixed(1) + '%', bxX + bxW / 2, bxY + 10.5, { align: 'center' })

  // ══════════════════════════════════════════════════════════════════════════
  // CHARTS
  // ══════════════════════════════════════════════════════════════════════════
  const chartStartY = Math.max(ty + bxH + 3, leftPanelEndY + 3)
  const chartH = 32
  const fullChartW = (W - 14) / 2 - 4

  // ── Left chart: Ingresos y tasa de ocupación ──
  {
    const cx = 5, cy = chartStartY, cw = fullChartW, ch = chartH
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(5)
    doc.setFont('helvetica', 'bold')
    doc.text('Ingresos y tasa de ocupación promedio', cx + cw / 2, cy, { align: 'center' })

    const ax = cx + 10, ay = cy + 4, aw = cw - 16, ah = ch - 10
    const maxAdr = Math.max(...ms.map(v => v.adr)) * 1.15
    const gap = aw / 12, bw = gap * 0.55

    // Y axis ticks
    doc.setFontSize(3)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    for (let i = 0; i <= 4; i++) {
      const val = Math.round(maxAdr * i / 4)
      const yy = ay + ah - (ah * i / 4)
      doc.text(Math.round(val / 1000) + 'K', ax - 1, yy + 0.8, { align: 'right' })
      doc.setDrawColor(230, 230, 230)
      doc.setLineWidth(0.08)
      doc.line(ax, yy, ax + aw, yy)
    }
    // Right Y axis (occupancy)
    for (let i = 0; i <= 4; i++) {
      const yy = ay + ah - (ah * i / 4)
      doc.text((i * 25) + '%', ax + aw + 1, yy + 0.8)
    }

    // Bars
    for (let i = 0; i < 12; i++) {
      const barH = (ms[i].adr / maxAdr) * ah
      const bx = ax + i * gap + (gap - bw) / 2
      doc.setFillColor(70, 130, 180)
      doc.rect(bx, ay + ah - barH, bw, barH, 'F')
    }

    // Occupancy line
    doc.setDrawColor(200, 60, 40)
    doc.setLineWidth(0.4)
    for (let i = 0; i < 11; i++) {
      const x1 = ax + i * gap + gap / 2, x2 = ax + (i + 1) * gap + gap / 2
      const y1 = ay + ah - (ms[i].occupancy / 100) * ah
      const y2 = ay + ah - (ms[i + 1].occupancy / 100) * ah
      doc.line(x1, y1, x2, y2)
    }

    // X labels
    doc.setFontSize(2.8)
    doc.setTextColor(100, 100, 100)
    for (let i = 0; i < 12; i++) doc.text(SM[i], ax + i * gap + gap / 2, ay + ah + 3, { align: 'center' })

    // Legend
    const lgY = cy + ch - 2
    doc.setFillColor(70, 130, 180)
    doc.rect(cx + 15, lgY, 3, 1.5, 'F')
    doc.setFontSize(3)
    doc.setTextColor(50, 50, 50)
    doc.text('ADR', cx + 19.5, lgY + 1.2)
    doc.setDrawColor(200, 60, 40)
    doc.setLineWidth(0.4)
    doc.line(cx + 28, lgY + 0.7, cx + 31, lgY + 0.7)
    doc.text('Tasa de ocupación', cx + 32.5, lgY + 1.2)
  }

  // ── Right chart: Rentabilidad renta corta vs renta larga ──
  {
    const cx = W / 2 + 2, cy = chartStartY, cw = fullChartW, ch = chartH
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(5)
    doc.setFont('helvetica', 'bold')
    doc.text('Rentabilidad renta corta versus renta larga', cx + cw / 2, cy, { align: 'center' })

    const ax = cx + 12, ay = cy + 4, aw = cw - 18, ah = ch - 10
    const allV = [...ms.map(v => v.noi), netoRC]
    const maxV = Math.max(...allV) * 1.15
    const minV = Math.min(...allV, 0)
    const range = maxV - minV || 1
    const gap = aw / 12, bw = gap * 0.55
    const valY = (v: number) => ay + ah - ((v - minV) / range) * ah
    const zeroY = valY(0)

    // Y axis ticks
    doc.setFontSize(3)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    for (let i = 0; i <= 4; i++) {
      const val = minV + (range * i / 4)
      const yy = ay + ah - (ah * i / 4)
      doc.text('$' + Math.round(val / 1000) + 'K', ax - 1, yy + 0.8, { align: 'right' })
      doc.setDrawColor(230, 230, 230)
      doc.setLineWidth(0.08)
      doc.line(ax, yy, ax + aw, yy)
    }

    // NOI bars
    for (let i = 0; i < 12; i++) {
      const topY = valY(ms[i].noi)
      const bx = ax + i * gap + (gap - bw) / 2
      const barTop = Math.min(topY, zeroY)
      const barH = Math.abs(topY - zeroY)
      doc.setFillColor(70, 130, 180)
      doc.rect(bx, barTop, bw, barH, 'F')
    }

    // Renta clásica line
    doc.setDrawColor(200, 60, 40)
    doc.setLineWidth(0.4)
    const rcY = valY(netoRC)
    doc.line(ax, rcY, ax + aw, rcY)

    // X labels
    doc.setFontSize(2.8)
    doc.setTextColor(100, 100, 100)
    for (let i = 0; i < 12; i++) doc.text(SM[i], ax + i * gap + gap / 2, ay + ah + 3, { align: 'center' })

    // Legend
    const lgY = cy + ch - 2
    doc.setFillColor(70, 130, 180)
    doc.rect(cx + 15, lgY, 3, 1.5, 'F')
    doc.setFontSize(3)
    doc.setTextColor(50, 50, 50)
    doc.text('NOI', cx + 19.5, lgY + 1.2)
    doc.setDrawColor(200, 60, 40)
    doc.setLineWidth(0.4)
    doc.line(cx + 26, lgY + 0.7, cx + 29, lgY + 0.7)
    doc.text('Ingreso renta clásica', cx + 30.5, lgY + 1.2)
  }

  // ══════════════════════════════════════════════════════════════════════════
  // DISCLAIMERS
  // ══════════════════════════════════════════════════════════════════════════
  const dStartY = chartStartY + chartH + 4

  doc.setFillColor(...NAVY)
  doc.rect(5, dStartY, W - 10, 4.5, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(5.5)
  doc.setFont('helvetica', 'bold')
  doc.text('Disclaimers de Simulación Financiera', W / 2, dStartY + 3.2, { align: 'center' })

  const disc = [
    ['1. Metodología de Estimación de Ingresos',
      'La proyección de ingresos se basa en un análisis de mercado dinámico realizado con la herramienta Pricelabs, ocupando datos reales de propiedades con tipología (m2/Dt), metraje y ubicación similares en la zona. Los valores presentados de tarifa diaria (ADR) y ocupación mensual reflejan el promedio de mercado actual, ajustado a la estacionalidad histórica del sector.'],
    ['2. Período de Maduración del Activo (Ramping up)',
      'Este modelo de negocio presenta un rendimiento creciente. Se estima un período de aproximadamente 3 meses para que la unidad entre en "régimen" operativo. El algoritmo de las plataformas (Airbnb/Booking) posiciona la propiedad mientras se validan las primeras reseñas. Si la operación inicia en meses de baja demanda, se debe aplicar un castigo preventivo a las proyecciones iniciales. A mayor historial positivo y volumen de reseñas, el activo tiende a superar los promedios de mercado aquí mostrados.'],
    ['3. Naturaleza de la Inversión y Riesgos',
      'Los números presentados en esta simulación son estimaciones basadas en condiciones de mercado vigentes; por lo tanto, rendimientos pasados no garantizan resultados futuros. El resultado final puede variar según la gestión operativa, cambios en la demanda turística local o fluctuaciones macroeconómicas. Esta simulación no contempla reparaciones mayores por daños extraordinarios o desgaste estructural a largo plazo. Se recomienda considerar este flujo como una guía de rendimiento esperado y no como una garantía de renta fija.'],
  ]

  let dy = dStartY + 5.5
  for (const [title, text] of disc) {
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(4)
    doc.setFont('helvetica', 'bold')
    doc.text(title, 7, dy + 2)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(3.3)
    const lines = doc.splitTextToSize(text, W - 60)
    doc.text(lines, 50, dy + 2)
    dy += Math.max(lines.length * 1.8 + 1, 5)
  }

  // Footer
  doc.setTextColor(150, 150, 150)
  doc.setFontSize(4)
  doc.text('mrbnb.cl', W - 5, H - 3, { align: 'right' })

  // ══════════════════════════════════════════════════════════════════════════
  // SAVE
  // ══════════════════════════════════════════════════════════════════════════
  const fileName = `Evaluacion_${p.propertyName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
