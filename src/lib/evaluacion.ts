// ── Cash Flow Calculation Logic ──────────────────────────────────────────────
// Replicates the "Flujo de caja" spreadsheet from "Propuesta tipo.xlsx"

export interface EvaluacionInputs {
  adr: number[]          // 12 values (Jan-Dec), in CLP
  occupancy: number[]    // 12 values (Jan-Dec), as percentages (0-100)
  rentaClasica: number   // Monthly long-term rent (CLP)
  ggcc: number           // Gastos comunes (CLP)
  internet: number
  luz: number
  agua: number
  gas: number
  // Inversion inicial (optional, for month 0 GAV)
  muebles?: number
  decoracion?: number
  arreglos?: number
  arriendo?: number
  garantia?: number
}

export interface MonthResult {
  month: number          // 1-12
  monthLabel: string
  daysInMonth: number
  adr: number
  occupancy: number      // 0-100
  nightsOccupied: number
  ingresosBrutos: number
  comisionAirbnb: number
  ingresosNetos: number
  ggcc: number
  ssbb: number           // internet + luz + agua + gas
  comisionOperador: number
  mantenimiento: number
  gastosOperacionales: number
  noi: number
  gav: number
  resultado: number
  acumulado: number
}

export interface EvaluacionResult {
  months: MonthResult[]
  // Annual totals
  totalIngresosBrutos: number
  totalComisionAirbnb: number
  totalIngresosNetos: number
  totalGastosOperacionales: number
  totalNoi: number
  totalGav: number
  totalResultado: number
  // Renta clasica comparison
  rentaClasicaMensual: number
  comisionAdminRentaClasica: number  // 7%
  ingresosNetosRentaClasica: number
  pctSobreRenta: number              // % advantage of STR over long-term
  avgOccupancy: number
  avgAdr: number
}

// Constants from the template
const COMISION_AIRBNB = 0.15
const COMISION_OPERADOR = 0.2023
const MANTENIMIENTO_PCT = 0.10
const COMISION_ADMIN_RENTA_CLASICA = 0.07

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export function calculateCashFlow(inputs: EvaluacionInputs): EvaluacionResult {
  const ssbbMensual = inputs.internet + inputs.luz + inputs.agua + inputs.gas
  const mantenimiento = (inputs.ggcc + ssbbMensual) * MANTENIMIENTO_PCT

  // Calculate GAV (one-time investment, month 0)
  const totalGav = (inputs.muebles || 0) + (inputs.decoracion || 0) +
    (inputs.arreglos || 0) + (inputs.arriendo || 0) + (inputs.garantia || 0)

  let acumulado = -totalGav // Start with negative investment
  const months: MonthResult[] = []

  for (let i = 0; i < 12; i++) {
    const daysInMonth = DAYS_IN_MONTH[i]
    const adr = inputs.adr[i]
    const occupancy = inputs.occupancy[i]
    const nightsOccupied = Math.round(daysInMonth * (occupancy / 100))

    const ingresosBrutos = adr * nightsOccupied
    const comisionAirbnb = Math.round(ingresosBrutos * COMISION_AIRBNB)
    const ingresosNetos = ingresosBrutos - comisionAirbnb

    const comisionOperador = Math.round(ingresosNetos * COMISION_OPERADOR)
    const gastosOperacionales = inputs.ggcc + ssbbMensual + comisionOperador + mantenimiento
    const noi = ingresosNetos - gastosOperacionales

    // GAV only applies to month 1 (first month)
    const gav = i === 0 ? totalGav : 0
    const resultado = noi - gav
    acumulado += noi - (i === 0 ? totalGav : 0)

    months.push({
      month: i + 1,
      monthLabel: MONTH_LABELS[i],
      daysInMonth,
      adr,
      occupancy,
      nightsOccupied,
      ingresosBrutos,
      comisionAirbnb,
      ingresosNetos,
      ggcc: inputs.ggcc,
      ssbb: ssbbMensual,
      comisionOperador,
      mantenimiento,
      gastosOperacionales,
      noi,
      gav,
      resultado,
      acumulado,
    })
  }

  const totalIngresosBrutos = months.reduce((s, m) => s + m.ingresosBrutos, 0)
  const totalComisionAirbnb = months.reduce((s, m) => s + m.comisionAirbnb, 0)
  const totalIngresosNetos = months.reduce((s, m) => s + m.ingresosNetos, 0)
  const totalGastosOp = months.reduce((s, m) => s + m.gastosOperacionales, 0)
  const totalNoi = months.reduce((s, m) => s + m.noi, 0)
  const totalResultado = months.reduce((s, m) => s + m.resultado, 0)

  const ingresosNetosRentaClasica = inputs.rentaClasica * (1 - COMISION_ADMIN_RENTA_CLASICA)
  const noiAnualRentaClasica = ingresosNetosRentaClasica * 12
  const pctSobreRenta = noiAnualRentaClasica > 0
    ? ((totalNoi - noiAnualRentaClasica) / noiAnualRentaClasica) * 100
    : 0

  const avgOccupancy = inputs.occupancy.reduce((s, v) => s + v, 0) / 12
  const avgAdr = inputs.adr.reduce((s, v) => s + v, 0) / 12

  return {
    months,
    totalIngresosBrutos,
    totalComisionAirbnb,
    totalIngresosNetos,
    totalGastosOperacionales: totalGastosOp,
    totalNoi,
    totalGav,
    totalResultado,
    rentaClasicaMensual: inputs.rentaClasica,
    comisionAdminRentaClasica: COMISION_ADMIN_RENTA_CLASICA,
    ingresosNetosRentaClasica,
    pctSobreRenta,
    avgOccupancy,
    avgAdr,
  }
}

// ── PDF Text Parsing ────────────────────────────────────────────────────────
// Parses text extracted from PriceLabs Revenue Estimate PDFs

export function parsePriceLabsPdfText(text: string): {
  adr: number[]
  occupancy: number[]
  propertyName?: string
  annualRevenue?: number
} | null {
  // Extract property name from "Revenue Estimate for:" section
  const nameMatch = text.match(/Revenue Estimate for:\s*\n?\s*(.+?)(?:\n|$)/)
  const propertyName = nameMatch?.[1]?.trim()

  // Extract annual revenue
  const revenueMatch = text.match(/Estimated Annual Revenue\s*\n?\s*\$?([\d,]+)/)
  const annualRevenue = revenueMatch ? parseInt(revenueMatch[1].replace(/,/g, '')) : undefined

  // Strategy: Extract ADR values from the chart data points
  // PriceLabs PDFs show values like "47.2K", "43.0K" near chart data points
  // These appear in order Jan-Dec in the ADR section

  // Find the ADR section - between "Average Daily Rate" and "Adjusted Occupancy"
  const adrSection = text.match(/Average Daily Rate[\s\S]*?(?=Adjusted Occupancy)/i)
  const occSection = text.match(/Adjusted Occupancy[\s\S]*/i)

  if (!adrSection || !occSection) return null

  // Parse ADR values like "47.2K", "43.0K", etc.
  const adrMatches = adrSection[0].match(/(\d+\.?\d*)K/g)
  if (!adrMatches || adrMatches.length < 12) return null

  // Take the first 12 values that appear in sequence (chart data points)
  // Skip axis labels (like "60k", "40k", "20k") - they have lowercase 'k'
  // The actual data points use uppercase 'K' like "47.2K"
  const adr = adrMatches.slice(0, 12).map(v => {
    const num = parseFloat(v.replace('K', ''))
    return Math.round(num * 1000)
  })

  // Parse occupancy values - just integers near chart points
  // Filter out axis values (100, 75, 50, 25, 0)
  const occText = occSection[0]
  const occMatches = occText.match(/(?<!\d)\d{1,2}(?!\d*[Kk%.])/g)

  if (!occMatches) return null

  // Filter out common axis values and page numbers
  const axisValues = new Set([0, 25, 50, 75, 100])
  const occupancy = occMatches
    .map(v => parseInt(v))
    .filter(v => v > 0 && v <= 100 && !axisValues.has(v))
    .slice(0, 12)

  if (adr.length !== 12 || occupancy.length !== 12) return null

  return { adr, occupancy, propertyName, annualRevenue }
}

// ── Format Helpers ──────────────────────────────────────────────────────────

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPct(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}
