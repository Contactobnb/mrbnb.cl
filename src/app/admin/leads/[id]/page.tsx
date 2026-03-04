'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Activity {
  id: string
  leadId: string
  type: string
  title: string
  body: string | null
  createdAt: string
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  comuna: string | null
  propertyType: string | null
  surface: number | null
  furnished: boolean
  parking: boolean
  amenities: string[]
  estimatedRevenue: number | null
  investmentRequired: number | null
  roiProjected: number | null
  status: LeadStatus
  priority: LeadPriority
  source: string
  notes: string | null
  nextFollowUp: string | null
  assignedTo: string | null
  activities: Activity[]
  createdAt: string
  updatedAt: string
}

type LeadStatus = 'NEW' | 'EVALUATING' | 'PROPOSAL_SENT' | 'NEGOTIATING' | 'CLOSED_WON' | 'CLOSED_LOST'
type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// ── Constants ──────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'NEW', label: 'Nuevo' },
  { value: 'EVALUATING', label: 'Evaluando' },
  { value: 'PROPOSAL_SENT', label: 'Propuesta enviada' },
  { value: 'NEGOTIATING', label: 'Negociando' },
  { value: 'CLOSED_WON', label: 'Cerrado (ganado)' },
  { value: 'CLOSED_LOST', label: 'Cerrado (perdido)' },
]

const PRIORITY_OPTIONS: { value: LeadPriority; label: string }[] = [
  { value: 'LOW', label: 'Baja' },
  { value: 'MEDIUM', label: 'Media' },
  { value: 'HIGH', label: 'Alta' },
  { value: 'URGENT', label: 'Urgente' },
]

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  EVALUATING: 'bg-yellow-100 text-yellow-800',
  PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
  NEGOTIATING: 'bg-orange-100 text-orange-800',
  CLOSED_WON: 'bg-green-100 text-green-800',
  CLOSED_LOST: 'bg-red-100 text-red-800',
}

const PRIORITY_COLORS: Record<LeadPriority, string> = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
}

const ACTIVITY_ICONS: Record<string, string> = {
  note: '📝',
  email: '✉️',
  call: '📞',
  status_change: '🔄',
  proposal: '📄',
}

function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form state
  const [editStatus, setEditStatus] = useState<LeadStatus>('NEW')
  const [editPriority, setEditPriority] = useState<LeadPriority>('MEDIUM')
  const [editNotes, setEditNotes] = useState('')
  const [editNextFollowUp, setEditNextFollowUp] = useState('')
  const [newNote, setNewNote] = useState('')

  const fetchLead = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/leads/${id}`)
      if (!res.ok) {
        if (res.status === 404) {
          setError('Lead no encontrado')
        } else {
          setError('Error al cargar el lead')
        }
        return
      }
      const data = await res.json()
      setLead(data)
      setEditStatus(data.status)
      setEditPriority(data.priority)
      setEditNotes(data.notes || '')
      setEditNextFollowUp(
        data.nextFollowUp ? new Date(data.nextFollowUp).toISOString().split('T')[0] : ''
      )
    } catch {
      setError('Error de conexion')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) fetchLead()
  }, [id, fetchLead])

  // Clear success message after a timeout
  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(null), 3000)
      return () => clearTimeout(timeout)
    }
  }, [successMessage])

  const handleSave = async () => {
    if (!lead) return
    setSaving(true)
    setError(null)

    try {
      const body: Record<string, unknown> = {
        status: editStatus,
        priority: editPriority,
        notes: editNotes || null,
        nextFollowUp: editNextFollowUp || null,
      }

      if (newNote.trim()) {
        body.newNote = newNote.trim()
      }

      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al guardar')
        return
      }

      const updatedLead = await res.json()
      setLead(updatedLead)
      setNewNote('')
      setSuccessMessage('Lead actualizado correctamente')
    } catch {
      setError('Error de conexion')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estas seguro de eliminar este lead? Esta accion no se puede deshacer.')) {
      return
    }

    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/admin')
      } else {
        const data = await res.json()
        setError(data.error || 'Error al eliminar')
      }
    } catch {
      setError('Error de conexion')
    }
  }

  // ── Loading / Error states ────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Cargando lead...</p>
      </div>
    )
  }

  if (error && !lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-600">{error}</p>
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          &larr; Volver al dashboard
        </Link>
      </div>
    )
  }

  if (!lead) return null

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/admin"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-2 inline-block"
          >
            &larr; Volver al dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Lead creado el {formatDate(lead.createdAt)} &middot; Fuente: {lead.source}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${STATUS_COLORS[lead.status]}`}>
            {STATUS_OPTIONS.find(s => s.value === lead.status)?.label}
          </span>
          <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${PRIORITY_COLORS[lead.priority]}`}>
            {PRIORITY_OPTIONS.find(p => p.value === lead.priority)?.label}
          </span>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Lead info + Edit form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacion de contacto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoField label="Nombre" value={lead.name} />
              <InfoField label="Email" value={lead.email} />
              <InfoField label="Telefono" value={lead.phone} />
              <InfoField label="Direccion" value={lead.address} />
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacion de propiedad</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoField label="Comuna" value={lead.comuna} />
              <InfoField label="Tipo" value={lead.propertyType} />
              <InfoField label="Superficie" value={lead.surface ? `${lead.surface} m2` : null} />
              <InfoField label="Amoblado" value={lead.furnished ? 'Si' : 'No'} />
              <InfoField label="Estacionamiento" value={lead.parking ? 'Si' : 'No'} />
              <InfoField
                label="Amenities"
                value={lead.amenities.length > 0 ? lead.amenities.join(', ') : null}
              />
            </div>
          </div>

          {/* ROI Data */}
          {(lead.estimatedRevenue || lead.roiProjected !== null) && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Proyeccion de ingresos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {lead.estimatedRevenue && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-green-600 font-medium">Ingreso neto mensual</p>
                    <p className="text-xl font-bold text-green-800 mt-1">
                      {formatCLP(lead.estimatedRevenue)}
                    </p>
                  </div>
                )}
                {lead.estimatedRevenue && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">Ingreso neto anual</p>
                    <p className="text-xl font-bold text-blue-800 mt-1">
                      {formatCLP(lead.estimatedRevenue * 12)}
                    </p>
                  </div>
                )}
                {lead.roiProjected !== null && lead.roiProjected !== undefined && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-600 font-medium">Uplift vs arriendo</p>
                    <p className="text-xl font-bold text-purple-800 mt-1">
                      +{Math.round(lead.roiProjected * 100)}%
                    </p>
                  </div>
                )}
              </div>
              {lead.investmentRequired && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Inversion requerida:</span>{' '}
                    {formatCLP(lead.investmentRequired)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Edit Form */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actualizar lead</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as LeadPriority)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proximo seguimiento
                </label>
                <input
                  type="date"
                  value={editNextFollowUp}
                  onChange={(e) => setEditNextFollowUp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Notas generales del lead..."
                />
              </div>
            </div>

            {/* Add Note */}
            <div className="mb-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agregar nota de actividad
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Escribir una nota sobre una llamada, reunion, etc..."
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                Eliminar lead
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#c53030' }}
              >
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Activity Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Actividad
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({lead.activities.length})
              </span>
            </h2>

            {lead.activities.length === 0 ? (
              <p className="text-sm text-gray-500">Sin actividad registrada.</p>
            ) : (
              <div className="space-y-0">
                {lead.activities.map((activity, idx) => (
                  <div key={activity.id} className="relative pl-6 pb-6">
                    {/* Timeline line */}
                    {idx < lead.activities.length - 1 && (
                      <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gray-200" />
                    )}
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-[9px]">
                        {ACTIVITY_ICONS[activity.type] || ''}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.body && (
                        <p className="text-sm text-gray-600 mt-0.5 whitespace-pre-wrap">
                          {activity.body}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDateTime(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick info */}
            {lead.nextFollowUp && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Proximo seguimiento:</span>{' '}
                  <span className="text-blue-700 font-medium">
                    {formatDate(lead.nextFollowUp)}
                  </span>
                </p>
              </div>
            )}

            {lead.assignedTo && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Asignado a:</span> {lead.assignedTo}
                </p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400 space-y-1">
              <p>ID: {lead.id}</p>
              <p>Actualizado: {formatDateTime(lead.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Info Field Component ────────────────────────────────────────────────────────

function InfoField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-900 mt-0.5">{value || '-'}</p>
    </div>
  )
}
