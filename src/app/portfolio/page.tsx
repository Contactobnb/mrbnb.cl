'use client'

import { useState, useMemo } from 'react'
import { properties } from '@/data/properties'
import { formatCLP } from '@/lib/utils'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const comunas = ['Todas', ...Array.from(new Set(properties.map((p) => p.comuna))).sort()]
const types = ['Todos', ...Array.from(new Set(properties.map((p) => p.type))).sort()]

export default function PortfolioPage() {
  const [selectedComuna, setSelectedComuna] = useState('Todas')
  const [selectedType, setSelectedType] = useState('Todos')

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchComuna = selectedComuna === 'Todas' || p.comuna === selectedComuna
      const matchType = selectedType === 'Todos' || p.type === selectedType
      return matchComuna && matchType
    })
  }, [selectedComuna, selectedType])

  const stats = useMemo(() => {
    const totalProperties = properties.length
    const avgRating = (properties.reduce((sum, p) => sum + p.rating, 0) / totalProperties).toFixed(2)
    const avgOccupancy = Math.round(properties.reduce((sum, p) => sum + p.occupancy, 0) / totalProperties)
    return { totalProperties, avgRating, avgOccupancy }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Nuestro Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Más de 60 propiedades en las mejores ubicaciones de Santiago,
              operadas con estándar hotelero.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">{stats.totalProperties}</p>
              <p className="text-gray-400 text-sm">Propiedades</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">{stats.avgRating}</p>
              <p className="text-gray-400 text-sm">Rating promedio</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">{stats.avgOccupancy}%</p>
              <p className="text-gray-400 text-sm">Ocupación promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="comuna-filter" className="text-sm font-medium text-gray-600">
                Comuna:
              </label>
              <select
                id="comuna-filter"
                value={selectedComuna}
                onChange={(e) => setSelectedComuna(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none bg-white"
              >
                {comunas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="type-filter" className="text-sm font-medium text-gray-600">
                Tipo:
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 outline-none bg-white"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-auto text-sm text-gray-500">
              {filtered.length} {filtered.length === 1 ? 'propiedad' : 'propiedades'}
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron propiedades con los filtros seleccionados.</p>
              <button
                onClick={() => {
                  setSelectedComuna('Todas')
                  setSelectedType('Todos')
                }}
                className="text-[#1e3a5f] font-semibold mt-2 hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((property) => (
                <Card key={property.id} className="!p-0 overflow-hidden">
                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-8 h-8 mx-auto mb-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-xs opacity-50">{property.type}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-[#1e3a5f] text-sm leading-tight">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">{property.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] px-2 py-0.5 rounded-full font-medium">
                        {property.comuna}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                        {property.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">ADR</p>
                        <p className="font-semibold text-[#1e3a5f]">{formatCLP(property.adr)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">Ocupación</p>
                        <p className="font-semibold text-[#1e3a5f]">{property.occupancy}%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-4">Ubicación de Propiedades</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Nuestras propiedades están ubicadas en las comunas con mayor demanda
            turística y corporativa de Santiago.
          </p>
          <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-500 font-medium">Mapa interactivo</p>
              <p className="text-gray-400 text-sm">Integración con Google Maps próximamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu propiedad puede ser la siguiente
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestro portfolio y comienza a generar ingresos con gestión profesional
            y estándar hotelero.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/evaluacion" variant="white" size="lg">
              Evaluar mi propiedad
            </Button>
            <Button href="/contacto" variant="secondary" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
              Contactar
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
