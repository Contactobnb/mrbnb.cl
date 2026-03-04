// Pricing algorithm based on real Mr.BnB data for Santiago, Chile
// All values in CLP (Chilean Pesos)

export interface PropertyData {
  comuna: string
  propertyType: string // '1BR' | '2BR' | '3BR' | 'Casa'
  surface?: number
  furnished: boolean
  parking: boolean
  amenities: string[]
}

export interface ROIResult {
  dailyRate: number
  monthlyRevenue: number
  annualRevenue: number
  traditionalRent: number
  uplift: number
  commission: number
  netOwnerMonthly: number
  netOwnerAnnual: number
  occupancyRate: number
}

// Base daily rates by comuna (CLP)
const BASE_RATES: Record<string, number> = {
  'Providencia': 55000,
  'Las Condes': 60000,
  'Ñuñoa': 45000,
  'Santiago Centro': 40000,
  'Vitacura': 70000,
  'Lo Barnechea': 65000,
  'La Reina': 50000,
  'Macul': 38000,
  'San Miguel': 38000,
  'Estación Central': 35000,
  'Independencia': 35000,
  'Recoleta': 36000,
}

// Type multipliers
const TYPE_MULTIPLIERS: Record<string, number> = {
  '1BR': 1.0,
  '2BR': 1.45,
  '3BR': 1.85,
  'Casa': 2.2,
}

// Amenity bonuses (CLP per night)
const AMENITY_BONUSES: Record<string, number> = {
  'piscina': 8000,
  'jacuzzi': 6000,
  'gimnasio': 3000,
  'terraza': 4000,
  'vista': 5000,
  'lavaseca': 2000,
  'aire_acondicionado': 3000,
  'cocina_equipada': 2000,
  'wifi_rapido': 1000,
  'smart_tv': 1000,
}

// Traditional rent estimates by comuna (CLP/month)
const TRADITIONAL_RENT: Record<string, Record<string, number>> = {
  'Providencia': { '1BR': 450000, '2BR': 650000, '3BR': 900000, 'Casa': 1200000 },
  'Las Condes': { '1BR': 500000, '2BR': 750000, '3BR': 1050000, 'Casa': 1500000 },
  'Ñuñoa': { '1BR': 380000, '2BR': 520000, '3BR': 720000, 'Casa': 950000 },
  'Santiago Centro': { '1BR': 320000, '2BR': 450000, '3BR': 600000, 'Casa': 800000 },
  'Vitacura': { '1BR': 550000, '2BR': 850000, '3BR': 1200000, 'Casa': 1800000 },
  'Lo Barnechea': { '1BR': 500000, '2BR': 800000, '3BR': 1100000, 'Casa': 1600000 },
  'La Reina': { '1BR': 400000, '2BR': 580000, '3BR': 800000, 'Casa': 1100000 },
  'Macul': { '1BR': 300000, '2BR': 420000, '3BR': 580000, 'Casa': 750000 },
  'San Miguel': { '1BR': 300000, '2BR': 420000, '3BR': 580000, 'Casa': 750000 },
  'Estación Central': { '1BR': 280000, '2BR': 380000, '3BR': 520000, 'Casa': 680000 },
  'Independencia': { '1BR': 280000, '2BR': 380000, '3BR': 520000, 'Casa': 680000 },
  'Recoleta': { '1BR': 290000, '2BR': 400000, '3BR': 540000, 'Casa': 700000 },
}

export function getBaseRateByComuna(comuna: string): number {
  return BASE_RATES[comuna] || 42000
}

export function getTypeMultiplier(propertyType: string): number {
  return TYPE_MULTIPLIERS[propertyType] || 1.0
}

export function calculateAmenities(amenities: string[]): number {
  return amenities.reduce((total, amenity) => {
    return total + (AMENITY_BONUSES[amenity] || 0)
  }, 0)
}

export function calculateROI(data: PropertyData): ROIResult {
  const baseRate = getBaseRateByComuna(data.comuna)
  const typeMultiplier = getTypeMultiplier(data.propertyType)
  const amenitiesBonus = calculateAmenities(data.amenities)
  const parkingBonus = data.parking ? 5000 : 0
  const furnishedBonus = data.furnished ? 3000 : 0

  const dailyRate = Math.round(baseRate * typeMultiplier + amenitiesBonus + parkingBonus + furnishedBonus)
  const occupancyRate = 0.80 // 80% average occupancy
  const avgNightsPerMonth = 25
  const monthlyRevenue = Math.round(dailyRate * avgNightsPerMonth * occupancyRate)
  const annualRevenue = monthlyRevenue * 12
  const commission = Math.round(monthlyRevenue * 0.17) // 17% + IVA
  const netOwnerMonthly = monthlyRevenue - commission
  const netOwnerAnnual = netOwnerMonthly * 12

  const traditionalRent = TRADITIONAL_RENT[data.comuna]?.[data.propertyType] || 400000
  const uplift = ((netOwnerMonthly - traditionalRent) / traditionalRent)

  return {
    dailyRate,
    monthlyRevenue,
    annualRevenue,
    traditionalRent,
    uplift,
    commission,
    netOwnerMonthly,
    netOwnerAnnual,
    occupancyRate,
  }
}

export const COMUNAS = Object.keys(BASE_RATES)
export const PROPERTY_TYPES = Object.keys(TYPE_MULTIPLIERS)
export const AMENITIES = Object.keys(AMENITY_BONUSES)

export const AMENITY_LABELS: Record<string, string> = {
  'piscina': 'Piscina',
  'jacuzzi': 'Jacuzzi',
  'gimnasio': 'Gimnasio',
  'terraza': 'Terraza',
  'vista': 'Vista panorámica',
  'lavaseca': 'Lava-seca',
  'aire_acondicionado': 'Aire acondicionado',
  'cocina_equipada': 'Cocina equipada',
  'wifi_rapido': 'WiFi rápido',
  'smart_tv': 'Smart TV',
}
