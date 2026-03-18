'use client'

import { useState, useRef, useCallback } from 'react'
import { calculateCashFlow, formatCLP, formatPct } from '@/lib/evaluacion'
import type { EvaluacionInputs, EvaluacionResult } from '@/lib/evaluacion'

interface Props {
  leadId: string
  leadName: string
  leadAddress?: string | null
  leadComuna?: string | null
  leadPropertyType?: string | null
  leadSurface?: number | null
  onClose: () => void
  onSaved: () => void
}

type Step = 'upload' | 'form' | 'preview'

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

export default function EvaluacionModal({ leadId, leadName, leadAddress, leadComuna, leadPropertyType, leadSurface, onClose, onSaved }: Props) {
  const [step, setStep] = useState<Step>('upload')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // PDF extracted data
  const [adr, setAdr] = useState([] as number[])
  const [occupancy, setOccupancy] = useState([] as number[])
  const [propertyName, setPropertyName] = useState<string>('')

  // Manual inputs
  const [rentaClasica, setRentaClasica] = useState('')
  const [ggcc, setGgcc] = useState('')
  const [internet, setInternet] = useState('')
  const [luz, setLuz] = useState('')
  const [agua, setAgua] = useState('')
  const [gas, setGas] = useState('')

  // Investment (collapsible)
  const [showInversion, setShowInversion] = useState(false)
  const [muebles, setMuebles] = useState('')
  const [decoracion, setDecoracion] = useState('')
  const [arreglos, setArreglos] = useState('')
  const [arriendo, setArriendo] = useState('')
  const [garantia, setGarantia] = useState('')

  // Result
  const [result, setResult] = useState<EvaluacionResult | null>(null)

  // ── Step 1: Upload PDF ──────────────────────────────────────────────────

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('El archivo debe ser un PDF')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('pdf', file)

      const res = await fetch(`/api/leads/${leadId}/evaluacion`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        // If Gemini failed but PDF was read, allow manual entry
        if (data.needsManualEntry) {
          if (data.metadata?.propertyName) setPropertyName(data.metadata.propertyName)
          setAdr(new Array<number>(12).fill(0))
          setOccupancy(new Array<number>(12).fill(0))
          setError(data.error || 'Ingresa los datos manualmente')
          setStep('form')
          return
        }
        setError(data.error || 'Error al procesar el PDF')
        return
      }

      setAdr(data.adr)
      setOccupancy(data.occupancy)
      if (data.propertyName) setPropertyName(data.propertyName)
      setStep('form')
    } catch {
      setError('Error de conexión al subir el PDF')
    } finally {
      setLoading(false)
    }
  }, [leadId])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }, [handleFileUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(file)
  }, [handleFileUpload])

  // ── Step 2: Calculate ───────────────────────────────────────────────────

  const handleCalculate = useCallback(() => {
    if (!rentaClasica || !ggcc) {
      setError('Renta clásica y gastos comunes son obligatorios')
      return
    }

    setError(null)

    const inputs: EvaluacionInputs = {
      adr,
      occupancy,
      rentaClasica: parseFloat(rentaClasica),
      ggcc: parseFloat(ggcc),
      internet: parseFloat(internet) || 0,
      luz: parseFloat(luz) || 0,
      agua: parseFloat(agua) || 0,
      gas: parseFloat(gas) || 0,
      muebles: parseFloat(muebles) || 0,
      decoracion: parseFloat(decoracion) || 0,
      arreglos: parseFloat(arreglos) || 0,
      arriendo: parseFloat(arriendo) || 0,
      garantia: parseFloat(garantia) || 0,
    }

    const cashFlow = calculateCashFlow(inputs)
    setResult(cashFlow)
    setStep('preview')
  }, [adr, occupancy, rentaClasica, ggcc, internet, luz, agua, gas, muebles, decoracion, arreglos, arriendo, garantia])

  // ── Step 3: Save + Generate PDF ─────────────────────────────────────────

  const handleSave = useCallback(async () => {
    if (!result) return
    setLoading(true)
    setError(null)

    try {
      const body = {
        adr,
        occupancy,
        rentaClasica: parseFloat(rentaClasica),
        ggcc: parseFloat(ggcc),
        internet: parseFloat(internet) || 0,
        luz: parseFloat(luz) || 0,
        agua: parseFloat(agua) || 0,
        gas: parseFloat(gas) || 0,
        muebles: parseFloat(muebles) || 0,
        decoracion: parseFloat(decoracion) || 0,
        arreglos: parseFloat(arreglos) || 0,
        arriendo: parseFloat(arriendo) || 0,
        garantia: parseFloat(garantia) || 0,
        propertyName: propertyName || leadName,
      }

      const res = await fetch(`/api/leads/${leadId}/evaluacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al guardar')
        return
      }

      onSaved()
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }, [result, adr, occupancy, rentaClasica, ggcc, internet, luz, agua, gas, muebles, decoracion, arreglos, arriendo, garantia, propertyName, leadName, leadId, onSaved])

  const handleGeneratePdf = useCallback(async () => {
    if (!result) return

    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const margin = 8
    const propLabel = propertyName || leadName
    const dateStr = new Date().toLocaleDateString('es-CL')

    // ── Header ──────────────────────────────────────────────────────────
    doc.setFillColor(30, 58, 95) // navy #1e3a5f
    doc.rect(0, 0, pageW, 18, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('MR.BNB — Evaluación de Propiedad', margin, 8)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`${propLabel}${leadComuna ? ` | ${leadComuna}` : ''}${leadPropertyType ? ` | ${leadPropertyType}` : ''}${leadSurface ? ` | ${leadSurface}m²` : ''}`, margin, 14)
    doc.text(dateStr, pageW - margin, 8, { align: 'right' })

    // ── Summary boxes ───────────────────────────────────────────────────
    const boxY = 22
    const boxH = 14
    const boxW = (pageW - margin * 2 - 12) / 4

    const summaryBoxes = [
      { label: 'NOI Anual', value: formatCLP(result.totalNoi), color: [34, 139, 34] },
      { label: 'Resultado Anual', value: formatCLP(result.totalResultado), color: [0, 102, 204] },
      { label: 'vs Renta Clásica', value: `${result.pctSobreRenta > 0 ? '+' : ''}${result.pctSobreRenta.toFixed(1)}%`, color: [153, 51, 153] },
      { label: 'Ocupación Prom.', value: formatPct(result.avgOccupancy, 0), color: [204, 102, 0] },
    ]

    summaryBoxes.forEach((box, i) => {
      const x = margin + i * (boxW + 4)
      doc.setFillColor(box.color[0], box.color[1], box.color[2])
      doc.roundedRect(x, boxY, boxW, boxH, 2, 2, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.text(box.label, x + 3, boxY + 4.5)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(box.value, x + 3, boxY + 11)
    })

    // ── Cash Flow Table ─────────────────────────────────────────────────
    const tableY = 40
    const colW = (pageW - margin * 2 - 50) / 13 // 12 months + total
    const labelW = 50
    const rowH = 6.2
    const fontSize = 5.8

    const rows = [
      { label: 'ADR', values: result.months.map(r => formatCLP(r.adr)), total: formatCLP(result.avgAdr), isBold: false, bg: null },
      { label: 'Ocupación (%)', values: result.months.map(r => formatPct(r.occupancy, 0)), total: formatPct(result.avgOccupancy, 0), isBold: false, bg: null },
      { label: 'Noches ocupadas', values: result.months.map(r => String(r.nightsOccupied)), total: String(result.months.reduce((s, r) => s + r.nightsOccupied, 0)), isBold: false, bg: null },
      { label: 'Ingresos brutos', values: result.months.map(r => formatCLP(r.ingresosBrutos)), total: formatCLP(result.totalIngresosBrutos), isBold: true, bg: [232, 245, 233] as [number, number, number] },
      { label: 'Comisión Airbnb (15%)', values: result.months.map(r => formatCLP(-r.comisionAirbnb)), total: formatCLP(-result.totalComisionAirbnb), isBold: false, bg: null },
      { label: 'Ingresos netos', values: result.months.map(r => formatCLP(r.ingresosNetos)), total: formatCLP(result.totalIngresosNetos), isBold: true, bg: [232, 245, 233] as [number, number, number] },
      { label: 'GGCC', values: result.months.map(r => formatCLP(-r.ggcc)), total: formatCLP(-result.months.reduce((s, r) => s + r.ggcc, 0)), isBold: false, bg: null },
      { label: 'SSBB', values: result.months.map(r => formatCLP(-r.ssbb)), total: formatCLP(-result.months.reduce((s, r) => s + r.ssbb, 0)), isBold: false, bg: null },
      { label: 'Comisión operador (20.23%)', values: result.months.map(r => formatCLP(-r.comisionOperador)), total: formatCLP(-result.months.reduce((s, r) => s + r.comisionOperador, 0)), isBold: false, bg: null },
      { label: 'Mantenimiento (10%)', values: result.months.map(r => formatCLP(-r.mantenimiento)), total: formatCLP(-result.months.reduce((s, r) => s + r.mantenimiento, 0)), isBold: false, bg: null },
      { label: 'Gastos operacionales', values: result.months.map(r => formatCLP(-r.gastosOperacionales)), total: formatCLP(-result.totalGastosOperacionales), isBold: true, bg: [255, 235, 235] as [number, number, number] },
      { label: 'NOI', values: result.months.map(r => formatCLP(r.noi)), total: formatCLP(result.totalNoi), isBold: true, bg: [232, 245, 233] as [number, number, number] },
      { label: 'GAV (inversión)', values: result.months.map(r => r.gav > 0 ? formatCLP(-r.gav) : '-'), total: formatCLP(-result.totalGav), isBold: false, bg: null },
      { label: 'Resultado', values: result.months.map(r => formatCLP(r.resultado)), total: formatCLP(result.totalResultado), isBold: true, bg: [219, 234, 254] as [number, number, number] },
      { label: 'Acumulado', values: result.months.map(r => formatCLP(r.acumulado)), total: '', isBold: true, bg: [219, 234, 254] as [number, number, number] },
    ]

    // Table header
    doc.setFillColor(30, 58, 95)
    doc.rect(margin, tableY, pageW - margin * 2, rowH, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', 'bold')
    doc.text('Concepto', margin + 2, tableY + 4.2)
    MONTH_LABELS.forEach((label, i) => {
      doc.text(label, margin + labelW + i * colW + colW / 2, tableY + 4.2, { align: 'center' })
    })
    doc.text('Total/Prom', margin + labelW + 12 * colW + colW / 2, tableY + 4.2, { align: 'center' })

    // Table rows
    rows.forEach((row, rowIdx) => {
      const y = tableY + rowH + rowIdx * rowH

      // Background
      if (row.bg) {
        doc.setFillColor(row.bg[0], row.bg[1], row.bg[2])
        doc.rect(margin, y, pageW - margin * 2, rowH, 'F')
      } else if (rowIdx % 2 === 0) {
        doc.setFillColor(248, 249, 250)
        doc.rect(margin, y, pageW - margin * 2, rowH, 'F')
      }

      // Row border
      doc.setDrawColor(220, 220, 220)
      doc.line(margin, y + rowH, pageW - margin, y + rowH)

      // Label
      doc.setTextColor(50, 50, 50)
      doc.setFont('helvetica', row.isBold ? 'bold' : 'normal')
      doc.setFontSize(fontSize)
      doc.text(row.label, margin + 2, y + 4.2)

      // Monthly values
      row.values.forEach((val, i) => {
        doc.setFont('helvetica', row.isBold ? 'bold' : 'normal')
        doc.text(val, margin + labelW + i * colW + colW / 2, y + 4.2, { align: 'center' })
      })

      // Total
      if (row.total) {
        doc.setFont('helvetica', 'bold')
        doc.text(row.total, margin + labelW + 12 * colW + colW / 2, y + 4.2, { align: 'center' })
      }
    })

    // ── Renta clásica comparison row ────────────────────────────────────
    const compY = tableY + rowH + rows.length * rowH + 4
    doc.setFillColor(245, 240, 255)
    doc.roundedRect(margin, compY, pageW - margin * 2, 10, 1, 1, 'F')
    doc.setTextColor(80, 40, 120)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text(`Renta clásica mensual: ${formatCLP(result.rentaClasicaMensual)}`, margin + 4, compY + 4)
    doc.text(`Neto (- ${(result.comisionAdminRentaClasica * 100).toFixed(0)}% admin): ${formatCLP(result.ingresosNetosRentaClasica)}/mes`, margin + 80, compY + 4)
    doc.text(`Neto anual: ${formatCLP(result.ingresosNetosRentaClasica * 12)}`, margin + 160, compY + 4)
    doc.text(`Diferencia STR vs Renta: ${result.pctSobreRenta > 0 ? '+' : ''}${result.pctSobreRenta.toFixed(1)}%`, margin + 220, compY + 4)

    // ── Disclaimer ──────────────────────────────────────────────────────
    doc.setTextColor(150, 150, 150)
    doc.setFontSize(5)
    doc.setFont('helvetica', 'italic')
    const disclaimer = 'Proyección basada en datos de PriceLabs. Los resultados reales pueden variar según condiciones de mercado, estacionalidad y gestión operativa. Este documento es solo referencial y no constituye una garantía de ingresos.'
    doc.text(disclaimer, margin, pageH - 5, { maxWidth: pageW - margin * 2 })
    doc.text('mrbnb.cl', pageW - margin, pageH - 5, { align: 'right' })

    // Save
    const fileName = `Evaluacion_${(propLabel).replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }, [result, propertyName, leadName, leadComuna, leadPropertyType, leadSurface])

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#1e3a5f' }}>
          <div>
            <h2 className="text-lg font-bold text-white">Evaluación de Propiedad</h2>
            <p className="text-sm text-blue-200">{leadName}{leadAddress ? ` — ${leadAddress}` : ''}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-b border-gray-200">
          {(['upload', 'form', 'preview'] as Step[]).map((s, i) => {
            const labels = ['1. Subir PDF', '2. Datos adicionales', '3. Resultado']
            const isActive = s === step
            const isDone = (['upload', 'form', 'preview'] as Step[]).indexOf(step) > i
            return (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && <div className="w-8 h-px bg-gray-300" />}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-blue-100 text-blue-800' : isDone ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  {isDone ? '✓' : ''} {labels[i]}
                </div>
              </div>
            )
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="p-6">
          {/* ── Step 1: Upload PDF ──────────────────────────────────────── */}
          {step === 'upload' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Sube el PDF de <strong>PriceLabs Revenue Estimate</strong> para extraer automáticamente los datos de ADR y ocupación mensual.
              </p>
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                {loading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-600">Procesando PDF...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl mb-3">📄</div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Arrastra el PDF aquí o haz click para seleccionar
                    </p>
                    <p className="text-xs text-gray-500">PDF de PriceLabs Revenue Estimate</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>

              {/* Manual entry fallback */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setAdr(new Array<number>(12).fill(0))
                    setOccupancy(new Array<number>(12).fill(0))
                    setStep('form')
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  O ingresar datos manualmente →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Form ───────────────────────────────────────────── */}
          {step === 'form' && (
            <div>
              {/* Extracted data preview */}
              {adr.some(v => v > 0) && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-green-800 mb-2">Datos extraídos del PDF</h3>
                  <div className="grid grid-cols-12 gap-1 text-xs mb-2">
                    {MONTH_LABELS.map((label, i) => (
                      <div key={label} className="text-center">
                        <div className="font-medium text-gray-600">{label}</div>
                        <div className="text-green-700">${Math.round(adr[i] / 1000)}K</div>
                        <div className="text-blue-700">{occupancy[i]}%</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-green-600">ADR (verde) | Ocupación (azul)</p>
                </div>
              )}

              {/* Manual ADR/Occupancy inputs (if entered manually) */}
              {adr.every(v => v === 0) && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Datos mensuales (ADR y Ocupación)</h3>
                  <div className="grid grid-cols-12 gap-1">
                    {MONTH_LABELS.map((label, i) => (
                      <div key={label} className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
                        <input
                          type="number"
                          placeholder="ADR"
                          value={adr[i] || ''}
                          onChange={e => {
                            const newAdr: number[] = [...adr]
                            newAdr[i] = parseInt(e.target.value) || 0
                            setAdr(newAdr)
                          }}
                          className="w-full px-1 py-1 text-xs border border-gray-300 rounded text-center"
                        />
                        <input
                          type="number"
                          placeholder="Ocu%"
                          value={occupancy[i] || ''}
                          onChange={e => {
                            const newOcc: number[] = [...occupancy]
                            newOcc[i] = parseInt(e.target.value) || 0
                            setOccupancy(newOcc)
                          }}
                          className="w-full px-1 py-1 text-xs border border-gray-300 rounded text-center mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required fields */}
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Datos del departamento</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Renta clásica mensual (CLP) *</label>
                  <input type="number" value={rentaClasica} onChange={e => setRentaClasica(e.target.value)} className={inputClass} placeholder="ej: 450000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Gastos comunes (CLP) *</label>
                  <input type="number" value={ggcc} onChange={e => setGgcc(e.target.value)} className={inputClass} placeholder="ej: 80000" />
                </div>
              </div>

              <h3 className="text-sm font-semibold text-gray-800 mb-3">Servicios básicos (CLP mensual)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Internet</label>
                  <input type="number" value={internet} onChange={e => setInternet(e.target.value)} className={inputClass} placeholder="15000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Luz</label>
                  <input type="number" value={luz} onChange={e => setLuz(e.target.value)} className={inputClass} placeholder="25000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Agua</label>
                  <input type="number" value={agua} onChange={e => setAgua(e.target.value)} className={inputClass} placeholder="15000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Gas</label>
                  <input type="number" value={gas} onChange={e => setGas(e.target.value)} className={inputClass} placeholder="10000" />
                </div>
              </div>

              {/* Collapsible investment section */}
              <div className="mb-6">
                <button
                  onClick={() => setShowInversion(!showInversion)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  <span className={`transform transition-transform ${showInversion ? 'rotate-90' : ''}`}>▶</span>
                  Inversión inicial (opcional)
                </button>
                {showInversion && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3 pl-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Muebles</label>
                      <input type="number" value={muebles} onChange={e => setMuebles(e.target.value)} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Decoración</label>
                      <input type="number" value={decoracion} onChange={e => setDecoracion(e.target.value)} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Arreglos</label>
                      <input type="number" value={arreglos} onChange={e => setArreglos(e.target.value)} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Arriendo (mes 0)</label>
                      <input type="number" value={arriendo} onChange={e => setArriendo(e.target.value)} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Garantía</label>
                      <input type="number" value={garantia} onChange={e => setGarantia(e.target.value)} className={inputClass} placeholder="0" />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setStep('upload')}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleCalculate}
                  className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                  style={{ backgroundColor: '#c53030' }}
                >
                  Calcular flujo de caja →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Preview ────────────────────────────────────────── */}
          {step === 'preview' && result && (
            <div>
              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-green-600 font-medium">NOI Anual</p>
                  <p className="text-lg font-bold text-green-800">{formatCLP(result.totalNoi)}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium">Resultado Anual</p>
                  <p className="text-lg font-bold text-blue-800">{formatCLP(result.totalResultado)}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs text-purple-600 font-medium">vs Renta Clásica</p>
                  <p className="text-lg font-bold text-purple-800">
                    {result.pctSobreRenta > 0 ? '+' : ''}{result.pctSobreRenta.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs text-orange-600 font-medium">Ocupación Prom.</p>
                  <p className="text-lg font-bold text-orange-800">{formatPct(result.avgOccupancy, 0)}</p>
                </div>
              </div>

              {/* Cash flow table */}
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-xs border-collapse min-w-[800px]">
                  <thead>
                    <tr className="text-white" style={{ backgroundColor: '#1e3a5f' }}>
                      <th className="text-left py-2 px-2 font-medium">Concepto</th>
                      {MONTH_LABELS.map(l => (
                        <th key={l} className="text-right py-2 px-1 font-medium">{l}</th>
                      ))}
                      <th className="text-right py-2 px-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow label="ADR" values={result.months.map(m => formatCLP(m.adr))} total={formatCLP(result.avgAdr)} />
                    <TableRow label="Ocupación" values={result.months.map(m => `${m.occupancy}%`)} total={formatPct(result.avgOccupancy, 0)} />
                    <TableRow label="Noches" values={result.months.map(m => String(m.nightsOccupied))} total={String(result.months.reduce((s, m) => s + m.nightsOccupied, 0))} />
                    <TableRow label="Ingresos brutos" values={result.months.map(m => formatCLP(m.ingresosBrutos))} total={formatCLP(result.totalIngresosBrutos)} bold bg="bg-green-50" />
                    <TableRow label="Com. Airbnb (15%)" values={result.months.map(m => formatCLP(-m.comisionAirbnb))} total={formatCLP(-result.totalComisionAirbnb)} />
                    <TableRow label="Ingresos netos" values={result.months.map(m => formatCLP(m.ingresosNetos))} total={formatCLP(result.totalIngresosNetos)} bold bg="bg-green-50" />
                    <TableRow label="GGCC" values={result.months.map(m => formatCLP(-m.ggcc))} total={formatCLP(-result.months.reduce((s, m) => s + m.ggcc, 0))} />
                    <TableRow label="SSBB" values={result.months.map(m => formatCLP(-m.ssbb))} total={formatCLP(-result.months.reduce((s, m) => s + m.ssbb, 0))} />
                    <TableRow label="Com. operador" values={result.months.map(m => formatCLP(-m.comisionOperador))} total={formatCLP(-result.months.reduce((s, m) => s + m.comisionOperador, 0))} />
                    <TableRow label="Mantenimiento" values={result.months.map(m => formatCLP(-m.mantenimiento))} total={formatCLP(-result.months.reduce((s, m) => s + m.mantenimiento, 0))} />
                    <TableRow label="Gastos op." values={result.months.map(m => formatCLP(-m.gastosOperacionales))} total={formatCLP(-result.totalGastosOperacionales)} bold bg="bg-red-50" />
                    <TableRow label="NOI" values={result.months.map(m => formatCLP(m.noi))} total={formatCLP(result.totalNoi)} bold bg="bg-green-50" />
                    <TableRow label="GAV" values={result.months.map(m => m.gav > 0 ? formatCLP(-m.gav) : '-')} total={formatCLP(-result.totalGav)} />
                    <TableRow label="Resultado" values={result.months.map(m => formatCLP(m.resultado))} total={formatCLP(result.totalResultado)} bold bg="bg-blue-50" />
                    <TableRow label="Acumulado" values={result.months.map(m => formatCLP(m.acumulado))} total="" bold bg="bg-blue-50" />
                  </tbody>
                </table>
              </div>

              {/* Renta clásica comparison */}
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
                <span className="font-medium text-purple-800">Renta clásica:</span>{' '}
                <span className="text-purple-700">
                  {formatCLP(result.rentaClasicaMensual)}/mes neto → {formatCLP(result.ingresosNetosRentaClasica)}/mes (- 7% admin) → {formatCLP(result.ingresosNetosRentaClasica * 12)}/año
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => setStep('form')}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  ← Editar datos
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleGeneratePdf}
                    className="px-5 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={async () => {
                      await handleSave()
                      handleGeneratePdf()
                    }}
                    disabled={loading}
                    className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50"
                    style={{ backgroundColor: '#c53030' }}
                  >
                    {loading ? 'Guardando...' : 'Guardar y descargar PDF'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Table Row Helper ──────────────────────────────────────────────────────────

function TableRow({ label, values, total, bold, bg }: {
  label: string
  values: string[]
  total: string
  bold?: boolean
  bg?: string
}) {
  return (
    <tr className={`${bg || ''} ${bold ? 'font-semibold' : ''} border-b border-gray-100`}>
      <td className="py-1.5 px-2 text-gray-700">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="py-1.5 px-1 text-right text-gray-600 whitespace-nowrap">{v}</td>
      ))}
      <td className="py-1.5 px-2 text-right text-gray-800 font-semibold whitespace-nowrap">{total}</td>
    </tr>
  )
}
