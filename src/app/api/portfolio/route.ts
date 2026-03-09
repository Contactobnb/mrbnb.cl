import { NextResponse } from 'next/server'
import { getDepartments, getAvailability, getPortfolioStats } from '@/lib/mrbnb-api'
import { properties as fallbackProperties, COMUNA_COLORS } from '@/data/properties'

// Map tipologia codes to property types
function mapTipologia(tipologia: string): string {
  if (!tipologia) return '1BR'
  const t = tipologia.toLowerCase()
  if (t.includes('3d') || t.includes('3 d')) return '3BR'
  if (t.includes('2d') || t.includes('2 d')) return '2BR'
  if (t.includes('casa')) return 'Casa'
  return '1BR' // Studio, 1D, etc.
}

export async function GET() {
  try {
    // Try to fetch from mrbnb-ops API
    const [departments, availability, stats] = await Promise.all([
      getDepartments(),
      getAvailability(3),
      getPortfolioStats(),
    ])

    // Build occupancy lookup
    const occupancyMap = new Map(
      availability.departments.map(d => [d.department_id, d])
    )

    // Transform to Property format
    const properties = departments.map(dept => {
      const occ = occupancyMap.get(dept.id)
      return {
        id: dept.id,
        name: dept.nombre || dept.codigo,
        comuna: dept.comuna || 'Santiago',
        type: mapTipologia(dept.tipologia),
        lat: dept.latitud || 0,
        lng: dept.longitud || 0,
        adr: occ?.avg_nightly_rate || 0,
        occupancy: occ ? Math.round(occ.occupancy_rate * 100) : 0,
        rating: 4.8, // Default rating (not tracked in mrbnb-ops)
      }
    })

    return NextResponse.json({
      properties,
      stats: {
        total: stats.total_departments,
        active: stats.active_departments,
        comunas: stats.comunas,
        avgOccupancy: stats.avg_occupancy,
        avgAdr: stats.avg_nightly_rate,
        byComuna: stats.departments_by_comuna,
        byType: stats.departments_by_type,
      },
      comunaColors: COMUNA_COLORS,
      source: 'api', // Indicates data came from live API
    })
  } catch (error) {
    console.warn('Failed to fetch from mrbnb-ops API, using fallback data:', error)

    // Fallback to static data
    return NextResponse.json({
      properties: fallbackProperties,
      stats: {
        total: fallbackProperties.length,
        active: fallbackProperties.length,
        comunas: [...new Set(fallbackProperties.map(p => p.comuna))],
        avgOccupancy: 0.82,
        avgAdr: 58000,
        byComuna: fallbackProperties.reduce((acc, p) => {
          acc[p.comuna] = (acc[p.comuna] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        byType: fallbackProperties.reduce((acc, p) => {
          acc[p.type] = (acc[p.type] || 0) + 1
          return acc
        }, {} as Record<string, number>),
      },
      comunaColors: COMUNA_COLORS,
      source: 'fallback', // Indicates using static fallback data
    })
  }
}
