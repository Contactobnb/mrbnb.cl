'use client'

import { useState, useEffect, useCallback } from 'react'
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

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATUS_ORDER: LeadStatus[] = [
  'NEW', 'EVALUATING', 'PROPOSAL_SENT', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST',
]

const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'Nuevo',
  EVALUATING: 'Evaluando',
  PROPOSAL_SENT: 'Propuesta',
  NEGOTIATING: 'Negociando',
  CLOSED_WON: 'Cerrado',
  CLOSED_LOST: 'Perdido',
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  EVALUATING: 'bg-yellow-100 text-yellow-800',
  PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
  NEGOTIATING: 'bg-orange-100 text-orange-800',
  CLOSED_WON: 'bg-green-100 text-green-800',
  CLOSED_LOST: 'bg-red-100 text-red-800',
}

const STATUS_COLUMN_COLORS: Record<LeadStatus, string> = {
  NEW: 'border-blue-400',
  EVALUATING: 'border-yellow-400',
  PROPOSAL_SENT: 'border-purple-400',
  NEGOTIATING: 'border-orange-400',
  CLOSED_WON: 'border-green-400',
  CLOSED_LOST: 'border-red-400',
}

const PRIORITY_COLORS: Record<LeadPriority, string> = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
}

const PRIORITY_LABELS: Record<LeadPriority, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
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

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} dias`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  return `Hace ${Math.floor(diffDays / 30)} meses`
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)
      params.set('sort', sortField)
      params.set('order', sortOrder)
      params.set('page', page.toString())
      params.set('limit', '100')

      const res = await fetch(`/api/leads?${params.toString()}`)
      const data = await res.json()

      if (res.ok) {
        setLeads(data.leads)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter, sortField, sortOrder, page])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Debounce search
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchInput])

  // ── Stats calculations ───────────────────────────────────────────────────────
  const totalLeads = pagination?.total || leads.length
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const newThisWeek = leads.filter(l => new Date(l.createdAt) >= oneWeekAgo).length
  const closedWon = leads.filter(l => l.status === 'CLOSED_WON').length
  const totalExcludingLost = leads.filter(l => l.status !== 'CLOSED_LOST').length
  const conversionRate = totalLeads > 0 ? (closedWon / totalLeads) * 100 : 0
  const pipelineValue = leads
    .filter(l => l.status !== 'CLOSED_LOST')
    .reduce((sum, l) => sum + (l.estimatedRevenue || 0), 0)

  // ── Leads grouped by status for Kanban ────────────────────────────────────────
  const leadsByStatus = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = leads.filter(l => l.status === status)
    return acc
  }, {} as Record<LeadStatus, Lead[]>)

  // ── Sort handler ──────────────────────────────────────────────────────────────
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
    setPage(1)
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <span className="text-gray-300 ml-1">&#8597;</span>
    return <span className="ml-1">{sortOrder === 'asc' ? '&#8593;' : '&#8595;'}</span>
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Leads" value={totalLeads.toString()} color="blue" />
        <StatCard
          title="Nuevos esta semana"
          value={newThisWeek.toString()}
          color="green"
        />
        <StatCard
          title="Tasa de conversion"
          value={`${conversionRate.toFixed(1)}%`}
          subtitle={`${closedWon} de ${totalLeads}`}
          color="purple"
        />
        <StatCard
          title="Pipeline total"
          value={formatCLP(pipelineValue)}
          subtitle={`${totalExcludingLost} leads activos`}
          color="amber"
        />
      </div>

      {/* Pipeline Board (Kanban) */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline</h2>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STATUS_ORDER.map((status) => (
            <div
              key={status}
              className={`flex-shrink-0 w-64 bg-white rounded-lg border-t-4 ${STATUS_COLUMN_COLORS[status]} shadow-sm`}
            >
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {STATUS_LABELS[status]}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {leadsByStatus[status].length}
                  </span>
                </div>
              </div>
              <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
                {leadsByStatus[status].length === 0 && (
                  <p className="text-xs text-gray-400 p-2 text-center">Sin leads</p>
                )}
                {leadsByStatus[status].map((lead) => (
                  <div key={lead.id}>
                    <button
                      onClick={() =>
                        setExpandedCard(expandedCard === lead.id ? null : lead.id)
                      }
                      className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors cursor-pointer"
                    >
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {lead.name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        {lead.comuna && (
                          <span className="text-xs text-gray-500">{lead.comuna}</span>
                        )}
                        {lead.propertyType && (
                          <span className="text-xs text-gray-400">
                            {lead.propertyType}
                          </span>
                        )}
                      </div>
                      {lead.estimatedRevenue && (
                        <p className="mt-1 text-xs font-semibold text-green-700">
                          {formatCLP(lead.estimatedRevenue)}/mes
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[lead.priority]}`}
                        >
                          {PRIORITY_LABELS[lead.priority]}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {timeAgo(lead.createdAt)}
                        </span>
                      </div>
                    </button>

                    {/* Expanded card details */}
                    {expandedCard === lead.id && (
                      <div className="bg-white border border-gray-200 rounded-md p-3 mt-1 text-xs space-y-2">
                        <p>
                          <span className="font-medium text-gray-600">Email:</span>{' '}
                          {lead.email}
                        </p>
                        {lead.phone && (
                          <p>
                            <span className="font-medium text-gray-600">Tel:</span>{' '}
                            {lead.phone}
                          </p>
                        )}
                        {lead.notes && (
                          <p>
                            <span className="font-medium text-gray-600">Notas:</span>{' '}
                            {lead.notes}
                          </p>
                        )}
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Ver detalle &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Todos los Leads</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar leads..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setPage(1)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Todos los estados</option>
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">Cargando leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {search || statusFilter
              ? 'No se encontraron leads con los filtros aplicados.'
              : 'No hay leads registrados aun.'}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('name')}
                    >
                      Nombre <SortIcon field="name" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('email')}
                    >
                      Email <SortIcon field="email" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('comuna')}
                    >
                      Comuna <SortIcon field="comuna" />
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Tipo
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('status')}
                    >
                      Estado <SortIcon field="status" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('priority')}
                    >
                      Prioridad <SortIcon field="priority" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('estimatedRevenue')}
                    >
                      Ingreso Est. <SortIcon field="estimatedRevenue" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('source')}
                    >
                      Fuente <SortIcon field="source" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer hover:text-gray-900"
                      onClick={() => handleSort('createdAt')}
                    >
                      Creado <SortIcon field="createdAt" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                        >
                          {lead.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lead.comuna || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lead.propertyType || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[lead.status]}`}
                        >
                          {STATUS_LABELS[lead.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${PRIORITY_COLORS[lead.priority]}`}
                        >
                          {PRIORITY_LABELS[lead.priority]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lead.estimatedRevenue
                          ? formatCLP(lead.estimatedRevenue)
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 capitalize">
                        {lead.source}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[lead.status]}`}
                    >
                      {STATUS_LABELS[lead.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {lead.comuna && <span>{lead.comuna}</span>}
                    {lead.propertyType && <span>{lead.propertyType}</span>}
                    {lead.estimatedRevenue && (
                      <span className="font-semibold text-green-700">
                        {formatCLP(lead.estimatedRevenue)}
                      </span>
                    )}
                    <span className="ml-auto">{timeAgo(lead.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Mostrando {(page - 1) * (pagination.limit) + 1} a{' '}
                  {Math.min(page * pagination.limit, pagination.total)} de{' '}
                  {pagination.total} leads
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.hasPrev}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!pagination.hasNext}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Stat Card Component ─────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string
  value: string
  subtitle?: string
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const bgColors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    amber: 'bg-amber-50 border-amber-200',
  }

  const textColors = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    purple: 'text-purple-700',
    amber: 'text-amber-700',
  }

  return (
    <div className={`rounded-lg border p-4 ${bgColors[color]}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${textColors[color]}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}
