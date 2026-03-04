'use client'

import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const successCases = [
  {
    name: 'Suite Premium Pedro de Valdivia',
    comuna: 'Providencia',
    type: '1 Dormitorio',
    rating: 4.9,
    reviews: 127,
    highlight: 'Superhost desde 2022',
  },
  {
    name: 'Penthouse Providencia',
    comuna: 'Providencia',
    type: '2 Dormitorios',
    rating: 4.9,
    reviews: 98,
    highlight: 'Top 10% de propiedades en Santiago',
  },
  {
    name: 'Loft Barrio Italia',
    comuna: 'Providencia',
    type: '1 Dormitorio',
    rating: 4.9,
    reviews: 156,
    highlight: 'Guest Favorite Airbnb',
  },
  {
    name: 'Suite Ejecutiva El Golf',
    comuna: 'Las Condes',
    type: '1 Dormitorio',
    rating: 4.9,
    reviews: 89,
    highlight: '+40% vs arriendo tradicional',
  },
  {
    name: 'Depto Premium Isidora',
    comuna: 'Las Condes',
    type: '2 Dormitorios',
    rating: 4.8,
    reviews: 112,
    highlight: 'Favorito huéspedes corporativos',
  },
  {
    name: 'Suite Ejecutiva Costanera',
    comuna: 'Providencia',
    type: '1 Dormitorio',
    rating: 4.9,
    reviews: 143,
    highlight: '90% ocupación promedio',
  },
  {
    name: 'Penthouse Kennedy',
    comuna: 'Vitacura',
    type: '3 Dormitorios',
    rating: 4.9,
    reviews: 67,
    highlight: 'Propiedad premium exclusiva',
  },
  {
    name: 'Apt Familiar Salvador',
    comuna: 'Providencia',
    type: '2 Dormitorios',
    rating: 4.8,
    reviews: 201,
    highlight: 'Más de 200 reseñas positivas',
  },
  {
    name: 'Depto Vista Parque Bicentenario',
    comuna: 'Vitacura',
    type: '2 Dormitorios',
    rating: 4.9,
    reviews: 74,
    highlight: 'Vista panorámica destacada',
  },
]

const comunasPresencia = [
  { nombre: 'Providencia', cantidad: '15+' },
  { nombre: 'Las Condes', cantidad: '12+' },
  { nombre: 'Santiago Centro', cantidad: '10+' },
  { nombre: 'Ñuñoa', cantidad: '8+' },
  { nombre: 'Vitacura', cantidad: '5+' },
  { nombre: 'La Reina', cantidad: '4+' },
  { nombre: 'San Miguel', cantidad: '4+' },
  { nombre: 'Estación Central', cantidad: '3+' },
]

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Nuestro portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Administramos más de 60 propiedades en las mejores ubicaciones de Santiago,
              con estándar hotelero y resultados comprobados.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">60+</p>
              <p className="text-gray-400 text-sm">Propiedades</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">4.81</p>
              <p className="text-gray-400 text-sm">Rating Airbnb</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">8.9</p>
              <p className="text-gray-400 text-sm">Rating Booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Arrendar CTA */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f]">
                ¿Buscas arrendar un departamento?
              </h2>
              <p className="text-gray-500 text-sm">
                Revisa la disponibilidad y reserva directamente en nuestro sitio de arriendos.
              </p>
            </div>
            <a
              href="https://mrbnb.hostify.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red inline-flex items-center gap-2 flex-shrink-0"
            >
              Arrendar departamento
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Casos de éxito</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Algunas de las propiedades que administramos con los mejores resultados
              en plataformas como Airbnb y Booking.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successCases.map((property, idx) => (
              <Card key={idx} className="!p-0 overflow-hidden">
                {/* Image placeholder */}
                <div className="h-44 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <svg className="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs opacity-40">{property.type}</span>
                  </div>
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#c53030] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {property.highlight}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-[#1e3a5f] mb-2">
                    {property.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-[#1e3a5f]/10 text-[#1e3a5f] px-2 py-0.5 rounded-full font-medium">
                      {property.comuna}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {property.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800">{property.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {property.reviews} reseñas
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            Y muchas más propiedades en nuestro portfolio de 60+ unidades en Santiago.
          </p>
        </div>
      </section>

      {/* Presencia por Comuna */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Presencia en Santiago</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Operamos en las comunas con mayor demanda turística y corporativa,
              donde la renta corta genera los mejores resultados.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {comunasPresencia.map((comuna) => (
              <div
                key={comuna.nombre}
                className="bg-[#faf8f5] rounded-xl p-5 text-center border border-gray-100 hover:border-[#1e3a5f]/20 transition-colors"
              >
                <p className="text-2xl font-bold text-[#1e3a5f] mb-1">{comuna.cantidad}</p>
                <p className="text-sm text-gray-600">{comuna.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Arrendar */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-4">¿Quieres arrendar un departamento?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Visita nuestro sitio de reservas para ver disponibilidad, fotos,
              precios y reservar directamente.
            </p>
            <a
              href="https://mrbnb.hostify.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red inline-flex items-center gap-2 text-lg"
            >
              Arrendar departamento
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Propietarios */}
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu propiedad puede ser el próximo caso de éxito
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestro portfolio de 60+ propiedades y comienza a generar ingresos
            con gestión profesional y estándar hotelero.
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
