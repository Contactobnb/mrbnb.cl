export interface Property {
  id: number
  name: string
  comuna: string
  type: string
  lat: number
  lng: number
  adr: number // Average Daily Rate CLP
  occupancy: number
  rating: number
  image?: string
}

// 64 properties across Santiago based on MR BnB real portfolio
export const properties: Property[] = [
  // Providencia (15 props)
  { id: 1, name: 'Studio Providencia Centro', comuna: 'Providencia', type: '1BR', lat: -33.4260, lng: -70.6120, adr: 52000, occupancy: 85, rating: 4.9 },
  { id: 2, name: 'Depto 2BR Manuel Montt', comuna: 'Providencia', type: '2BR', lat: -33.4280, lng: -70.6150, adr: 78000, occupancy: 82, rating: 4.8 },
  { id: 3, name: 'Suite Premium Pedro de Valdivia', comuna: 'Providencia', type: '1BR', lat: -33.4240, lng: -70.6100, adr: 58000, occupancy: 88, rating: 4.9 },
  { id: 4, name: 'Family Apt Los Leones', comuna: 'Providencia', type: '3BR', lat: -33.4250, lng: -70.6200, adr: 105000, occupancy: 78, rating: 4.7 },
  { id: 5, name: 'Loft Tobalaba', comuna: 'Providencia', type: '1BR', lat: -33.4230, lng: -70.6050, adr: 48000, occupancy: 90, rating: 4.8 },
  { id: 6, name: 'Penthouse Providencia', comuna: 'Providencia', type: '2BR', lat: -33.4270, lng: -70.6180, adr: 95000, occupancy: 75, rating: 4.9 },
  { id: 7, name: 'Studio Bellavista', comuna: 'Providencia', type: '1BR', lat: -33.4320, lng: -70.6320, adr: 45000, occupancy: 87, rating: 4.7 },
  { id: 8, name: 'Depto Av Italia', comuna: 'Providencia', type: '2BR', lat: -33.4350, lng: -70.6250, adr: 72000, occupancy: 83, rating: 4.8 },
  { id: 9, name: 'Suite Ejecutiva Costanera', comuna: 'Providencia', type: '1BR', lat: -33.4180, lng: -70.6070, adr: 62000, occupancy: 84, rating: 4.9 },
  { id: 10, name: 'Apt Familiar Salvador', comuna: 'Providencia', type: '2BR', lat: -33.4290, lng: -70.6220, adr: 80000, occupancy: 81, rating: 4.8 },
  { id: 11, name: 'Studio Inés de Suárez', comuna: 'Providencia', type: '1BR', lat: -33.4310, lng: -70.6170, adr: 50000, occupancy: 86, rating: 4.7 },
  { id: 12, name: 'Depto Lyon', comuna: 'Providencia', type: '2BR', lat: -33.4265, lng: -70.6135, adr: 76000, occupancy: 80, rating: 4.8 },
  { id: 13, name: 'Loft Barrio Italia', comuna: 'Providencia', type: '1BR', lat: -33.4380, lng: -70.6260, adr: 55000, occupancy: 89, rating: 4.9 },
  { id: 14, name: 'Suite Parque Bustamante', comuna: 'Providencia', type: '1BR', lat: -33.4340, lng: -70.6280, adr: 53000, occupancy: 87, rating: 4.8 },
  { id: 15, name: 'Depto 3BR Providencia Premium', comuna: 'Providencia', type: '3BR', lat: -33.4225, lng: -70.6090, adr: 115000, occupancy: 76, rating: 4.9 },

  // Las Condes (12 props)
  { id: 16, name: 'Luxury Studio El Golf', comuna: 'Las Condes', type: '1BR', lat: -33.4100, lng: -70.5950, adr: 65000, occupancy: 82, rating: 4.9 },
  { id: 17, name: 'Executive 2BR Isidora Goyenechea', comuna: 'Las Condes', type: '2BR', lat: -33.4120, lng: -70.5980, adr: 92000, occupancy: 79, rating: 4.8 },
  { id: 18, name: 'Penthouse Apoquindo', comuna: 'Las Condes', type: '3BR', lat: -33.4080, lng: -70.5900, adr: 130000, occupancy: 73, rating: 4.9 },
  { id: 19, name: 'Studio Escuela Militar', comuna: 'Las Condes', type: '1BR', lat: -33.4130, lng: -70.5920, adr: 58000, occupancy: 85, rating: 4.7 },
  { id: 20, name: 'Depto Tobalaba Las Condes', comuna: 'Las Condes', type: '2BR', lat: -33.4150, lng: -70.5960, adr: 85000, occupancy: 80, rating: 4.8 },
  { id: 21, name: 'Suite Rosario Norte', comuna: 'Las Condes', type: '1BR', lat: -33.4110, lng: -70.5940, adr: 62000, occupancy: 83, rating: 4.8 },
  { id: 22, name: 'Family Apt Manquehue', comuna: 'Las Condes', type: '3BR', lat: -33.4060, lng: -70.5870, adr: 120000, occupancy: 75, rating: 4.7 },
  { id: 23, name: 'Studio Kennedy', comuna: 'Las Condes', type: '1BR', lat: -33.3980, lng: -70.5800, adr: 55000, occupancy: 84, rating: 4.8 },
  { id: 24, name: 'Depto 2BR Los Militares', comuna: 'Las Condes', type: '2BR', lat: -33.4095, lng: -70.5935, adr: 88000, occupancy: 81, rating: 4.9 },
  { id: 25, name: 'Loft Alonso de Córdova', comuna: 'Las Condes', type: '1BR', lat: -33.4140, lng: -70.5890, adr: 68000, occupancy: 82, rating: 4.9 },
  { id: 26, name: 'Depto Ejecutivo El Bosque', comuna: 'Las Condes', type: '2BR', lat: -33.4105, lng: -70.5955, adr: 90000, occupancy: 78, rating: 4.8 },
  { id: 27, name: 'Studio Premium Cantagallo', comuna: 'Las Condes', type: '1BR', lat: -33.4070, lng: -70.5840, adr: 60000, occupancy: 86, rating: 4.7 },

  // Santiago Centro (10 props)
  { id: 28, name: 'Studio Lastarria', comuna: 'Santiago Centro', type: '1BR', lat: -33.4400, lng: -70.6400, adr: 42000, occupancy: 88, rating: 4.8 },
  { id: 29, name: 'Depto Bellas Artes', comuna: 'Santiago Centro', type: '2BR', lat: -33.4380, lng: -70.6430, adr: 65000, occupancy: 84, rating: 4.7 },
  { id: 30, name: 'Loft Centro Histórico', comuna: 'Santiago Centro', type: '1BR', lat: -33.4420, lng: -70.6500, adr: 38000, occupancy: 90, rating: 4.6 },
  { id: 31, name: 'Apt Parque Forestal', comuna: 'Santiago Centro', type: '2BR', lat: -33.4370, lng: -70.6380, adr: 68000, occupancy: 82, rating: 4.8 },
  { id: 32, name: 'Studio Santa Lucía', comuna: 'Santiago Centro', type: '1BR', lat: -33.4410, lng: -70.6450, adr: 40000, occupancy: 89, rating: 4.7 },
  { id: 33, name: 'Depto 3BR Monjitas', comuna: 'Santiago Centro', type: '3BR', lat: -33.4390, lng: -70.6420, adr: 85000, occupancy: 77, rating: 4.6 },
  { id: 34, name: 'Suite Universidad de Chile', comuna: 'Santiago Centro', type: '1BR', lat: -33.4430, lng: -70.6480, adr: 43000, occupancy: 86, rating: 4.7 },
  { id: 35, name: 'Loft Barrio República', comuna: 'Santiago Centro', type: '1BR', lat: -33.4500, lng: -70.6550, adr: 36000, occupancy: 91, rating: 4.5 },
  { id: 36, name: 'Depto GAM', comuna: 'Santiago Centro', type: '2BR', lat: -33.4395, lng: -70.6410, adr: 62000, occupancy: 83, rating: 4.8 },
  { id: 37, name: 'Studio Mercado Central', comuna: 'Santiago Centro', type: '1BR', lat: -33.4350, lng: -70.6520, adr: 39000, occupancy: 87, rating: 4.6 },

  // Ñuñoa (8 props)
  { id: 38, name: 'Depto Plaza Ñuñoa', comuna: 'Ñuñoa', type: '2BR', lat: -33.4520, lng: -70.5980, adr: 65000, occupancy: 82, rating: 4.8 },
  { id: 39, name: 'Studio Irarrázaval', comuna: 'Ñuñoa', type: '1BR', lat: -33.4540, lng: -70.6020, adr: 44000, occupancy: 87, rating: 4.7 },
  { id: 40, name: 'Family Apt Ñuñoa', comuna: 'Ñuñoa', type: '3BR', lat: -33.4560, lng: -70.5960, adr: 88000, occupancy: 78, rating: 4.8 },
  { id: 41, name: 'Loft Chile-España', comuna: 'Ñuñoa', type: '1BR', lat: -33.4500, lng: -70.6000, adr: 46000, occupancy: 85, rating: 4.7 },
  { id: 42, name: 'Depto Parque Juan XXIII', comuna: 'Ñuñoa', type: '2BR', lat: -33.4580, lng: -70.5940, adr: 62000, occupancy: 80, rating: 4.6 },
  { id: 43, name: 'Studio Estadio Nacional', comuna: 'Ñuñoa', type: '1BR', lat: -33.4600, lng: -70.6100, adr: 42000, occupancy: 86, rating: 4.7 },
  { id: 44, name: 'Depto 2BR Los Orientales', comuna: 'Ñuñoa', type: '2BR', lat: -33.4550, lng: -70.6050, adr: 60000, occupancy: 81, rating: 4.8 },
  { id: 45, name: 'Suite Ñuñoa Premium', comuna: 'Ñuñoa', type: '1BR', lat: -33.4515, lng: -70.5990, adr: 48000, occupancy: 84, rating: 4.8 },

  // Vitacura (5 props)
  { id: 46, name: 'Luxury Apt Vitacura', comuna: 'Vitacura', type: '2BR', lat: -33.3950, lng: -70.5750, adr: 110000, occupancy: 75, rating: 4.9 },
  { id: 47, name: 'Penthouse Bicentenario', comuna: 'Vitacura', type: '3BR', lat: -33.3930, lng: -70.5720, adr: 145000, occupancy: 70, rating: 4.9 },
  { id: 48, name: 'Studio Alonso de Córdova', comuna: 'Vitacura', type: '1BR', lat: -33.3970, lng: -70.5780, adr: 72000, occupancy: 80, rating: 4.8 },
  { id: 49, name: 'Executive Suite Vitacura', comuna: 'Vitacura', type: '2BR', lat: -33.3940, lng: -70.5740, adr: 105000, occupancy: 76, rating: 4.9 },
  { id: 50, name: 'Casa Vitacura Premium', comuna: 'Vitacura', type: 'Casa', lat: -33.3910, lng: -70.5700, adr: 180000, occupancy: 68, rating: 5.0 },

  // La Reina (4 props)
  { id: 51, name: 'Depto Parque La Reina', comuna: 'La Reina', type: '2BR', lat: -33.4450, lng: -70.5500, adr: 68000, occupancy: 79, rating: 4.7 },
  { id: 52, name: 'Casa Familiar La Reina', comuna: 'La Reina', type: 'Casa', lat: -33.4420, lng: -70.5480, adr: 120000, occupancy: 72, rating: 4.8 },
  { id: 53, name: 'Studio La Reina', comuna: 'La Reina', type: '1BR', lat: -33.4470, lng: -70.5520, adr: 48000, occupancy: 83, rating: 4.6 },
  { id: 54, name: 'Apt 3BR La Reina', comuna: 'La Reina', type: '3BR', lat: -33.4440, lng: -70.5490, adr: 95000, occupancy: 76, rating: 4.7 },

  // San Miguel (4 props)
  { id: 55, name: 'Studio San Miguel Centro', comuna: 'San Miguel', type: '1BR', lat: -33.4900, lng: -70.6530, adr: 36000, occupancy: 88, rating: 4.6 },
  { id: 56, name: 'Depto 2BR Gran Avenida', comuna: 'San Miguel', type: '2BR', lat: -33.4920, lng: -70.6550, adr: 55000, occupancy: 84, rating: 4.7 },
  { id: 57, name: 'Loft San Miguel', comuna: 'San Miguel', type: '1BR', lat: -33.4880, lng: -70.6510, adr: 38000, occupancy: 87, rating: 4.5 },
  { id: 58, name: 'Apt Familiar San Miguel', comuna: 'San Miguel', type: '3BR', lat: -33.4940, lng: -70.6570, adr: 72000, occupancy: 79, rating: 4.6 },

  // Estación Central (3 props)
  { id: 59, name: 'Studio Estación Central', comuna: 'Estación Central', type: '1BR', lat: -33.4520, lng: -70.6800, adr: 34000, occupancy: 90, rating: 4.5 },
  { id: 60, name: 'Depto Alameda Poniente', comuna: 'Estación Central', type: '2BR', lat: -33.4540, lng: -70.6830, adr: 52000, occupancy: 85, rating: 4.6 },
  { id: 61, name: 'Loft USACH', comuna: 'Estación Central', type: '1BR', lat: -33.4500, lng: -70.6780, adr: 35000, occupancy: 89, rating: 4.5 },

  // Independencia (3 props)
  { id: 62, name: 'Studio Independencia', comuna: 'Independencia', type: '1BR', lat: -33.4200, lng: -70.6600, adr: 34000, occupancy: 88, rating: 4.5 },
  { id: 63, name: 'Depto Vivaceta', comuna: 'Independencia', type: '2BR', lat: -33.4180, lng: -70.6620, adr: 52000, occupancy: 83, rating: 4.6 },
  { id: 64, name: 'Suite Hipódromo Chile', comuna: 'Independencia', type: '1BR', lat: -33.4220, lng: -70.6640, adr: 36000, occupancy: 87, rating: 4.6 },
]

export const COMUNA_COLORS: Record<string, string> = {
  'Providencia': '#1e3a5f',
  'Las Condes': '#2d5a8e',
  'Santiago Centro': '#c53030',
  'Ñuñoa': '#38a169',
  'Vitacura': '#805ad5',
  'La Reina': '#dd6b20',
  'San Miguel': '#3182ce',
  'Estación Central': '#718096',
  'Independencia': '#d69e2e',
}
