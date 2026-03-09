// mrbnb-ops API client for cross-service communication

const API_URL = process.env.MRBNB_OPS_API_URL || ''
const API_KEY = process.env.MRBNB_OPS_API_KEY || ''

interface MrBnBDepartment {
  id: number
  codigo: string
  nombre: string
  direccion: string
  comuna: string
  tipologia: string
  capacidad_maxima: number
  latitud: number
  longitud: number
  amenities: Record<string, string>
  hostify_property_id: string
}

interface OccupancyData {
  department_id: number
  hostify_property_id: string
  total_nights_booked: number
  total_days_in_period: number
  occupancy_rate: number
  avg_nightly_rate: number
  total_revenue: number
  reservations_count: number
}

interface AvailabilityResponse {
  period: { start: string; end: string }
  departments: OccupancyData[]
}

interface PortfolioStats {
  total_departments: number
  active_departments: number
  comunas: string[]
  avg_occupancy: number
  avg_nightly_rate: number
  departments_by_comuna: Record<string, number>
  departments_by_type: Record<string, number>
}

async function apiFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  if (!API_URL || !API_KEY) {
    throw new Error('MRBNB_OPS_API_URL and MRBNB_OPS_API_KEY must be configured')
  }

  const url = new URL(endpoint, API_URL)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }

  const res = await fetch(url.toString(), {
    headers: { 'X-API-Key': API_KEY },
    next: { revalidate: 300 }, // Cache for 5 minutes (ISR)
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getDepartments(comuna?: string): Promise<MrBnBDepartment[]> {
  const params: Record<string, string> = {}
  if (comuna) params.comuna = comuna
  return apiFetch<MrBnBDepartment[]>('/api/v1/departments', params)
}

export async function getDepartment(id: number): Promise<MrBnBDepartment> {
  return apiFetch<MrBnBDepartment>(`/api/v1/departments/${id}`)
}

export async function getAvailability(months?: number): Promise<AvailabilityResponse> {
  const params: Record<string, string> = {}
  if (months) params.months = months.toString()
  return apiFetch<AvailabilityResponse>('/api/v1/availability', params)
}

export async function getPortfolioStats(): Promise<PortfolioStats> {
  return apiFetch<PortfolioStats>('/api/v1/stats')
}

export type { MrBnBDepartment, OccupancyData, AvailabilityResponse, PortfolioStats }
