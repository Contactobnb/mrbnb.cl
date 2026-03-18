'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { COMUNAS, PROPERTY_TYPES, AMENITIES, AMENITY_LABELS } from '@/lib/pricing'
import type { LeadStatus, LeadPriority } from '@/types/lead'

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

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  '1BR': '1 Dormitorio',
  '2BR': '2 Dormitorios',
  '3BR': '3 Dormitorios',
  'Casa': 'Casa',
}

export default function NuevoLeadPage() {
  const router = useRouter()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Contact
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Property
  const [address, setAddress] = useState('')
  const [comuna, setComuna] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [surface, setSurface] = useState('')
  const [furnished, setFurnished] = useState(false)
  const [parking, setParking] = useState(false)
  const [amenities, setAmenities] = useState<string[]>([])

  // CRM
  const [status, setStatus] = useState<LeadStatus>('NEW')
  const [priority, setPriority] = useState<LeadPriority>('MEDIUM')
  const [source, setSource] = useState('manual')
  const [notes, setNotes] = useState('')
  const [nextFollowUp, setNextFollowUp] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setError('Nombre y email son obligatorios')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const body: Record<string, unknown> = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        address: address.trim() || null,
        comuna: comuna || null,
        propertyType: propertyType || null,
        surface: surface ? parseInt(surface) : null,
        furnished,
        parking,
        amenities,
        status,
        priority,
        source: source.trim() || 'manual',
        notes: notes.trim() || null,
        nextFollowUp: nextFollowUp || null,
        assignedTo: assignedTo.trim() || null,
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al crear el lead')
        return
      }

      const lead = await res.json()
      router.push(`/admin/leads/${lead.id}`)
    } catch {
      setError('Error de conexion')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-2 inline-block"
        >
          &larr; Volver al dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Lead</h1>
        <p className="text-gray-500 text-sm mt-1">Crear un lead manualmente</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacion de contacto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputClass}
                placeholder="Nombre completo"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputClass}
                placeholder="email@ejemplo.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Telefono
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={inputClass}
                placeholder="+56912345678"
              />
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacion de propiedad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Direccion
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className={inputClass}
                placeholder="Calle, numero, depto"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Comuna
              </label>
              <select
                value={comuna}
                onChange={e => setComuna(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="">Seleccionar comuna</option>
                {COMUNAS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Tipo de propiedad
              </label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                <option value="">Seleccionar tipo</option>
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>{PROPERTY_TYPE_LABELS[t] || t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Superficie (m2)
              </label>
              <input
                type="number"
                value={surface}
                onChange={e => setSurface(e.target.value)}
                className={inputClass}
                placeholder="ej: 45"
              />
            </div>
            <div className="flex items-end gap-6 pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={furnished}
                  onChange={e => setFurnished(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Amoblado</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={parking}
                  onChange={e => setParking(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Estacionamiento</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Amenidades
              </label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      amenities.includes(amenity)
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {AMENITY_LABELS[amenity] || amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CRM Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado y seguimiento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Estado
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as LeadStatus)}
                className={`${inputClass} bg-white`}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Prioridad
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as LeadPriority)}
                className={`${inputClass} bg-white`}
              >
                {PRIORITY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Fuente
              </label>
              <input
                type="text"
                value={source}
                onChange={e => setSource(e.target.value)}
                className={inputClass}
                placeholder="manual, referido, etc."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Asignado a
              </label>
              <input
                type="text"
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
                className={inputClass}
                placeholder="Nombre del agente"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Proximo seguimiento
              </label>
              <input
                type="date"
                value={nextFollowUp}
                onChange={e => setNextFollowUp(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Notas
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Notas sobre el lead..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#c53030' }}
          >
            {saving ? 'Creando...' : 'Crear Lead'}
          </button>
        </div>
      </form>
    </div>
  )
}
