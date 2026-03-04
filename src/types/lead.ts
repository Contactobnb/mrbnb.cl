export interface Activity {
  id: string
  leadId: string
  type: string
  title: string
  body: string | null
  createdAt: string
}

export interface Lead {
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

export type LeadStatus = 'NEW' | 'EVALUATING' | 'PROPOSAL_SENT' | 'NEGOTIATING' | 'CLOSED_WON' | 'CLOSED_LOST'
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export const STATUS_ORDER: LeadStatus[] = [
  'NEW', 'EVALUATING', 'PROPOSAL_SENT', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST',
]

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'Nuevo',
  EVALUATING: 'Evaluando',
  PROPOSAL_SENT: 'Propuesta',
  NEGOTIATING: 'Negociando',
  CLOSED_WON: 'Cerrado',
  CLOSED_LOST: 'Perdido',
}

export const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  EVALUATING: 'bg-yellow-100 text-yellow-800',
  PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
  NEGOTIATING: 'bg-orange-100 text-orange-800',
  CLOSED_WON: 'bg-green-100 text-green-800',
  CLOSED_LOST: 'bg-red-100 text-red-800',
}

export const STATUS_COLUMN_COLORS: Record<LeadStatus, string> = {
  NEW: 'border-blue-400',
  EVALUATING: 'border-yellow-400',
  PROPOSAL_SENT: 'border-purple-400',
  NEGOTIATING: 'border-orange-400',
  CLOSED_WON: 'border-green-400',
  CLOSED_LOST: 'border-red-400',
}

export const PRIORITY_COLORS: Record<LeadPriority, string> = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-blue-100 text-blue-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
}

export const PRIORITY_LABELS: Record<LeadPriority, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
}
