'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const PropertyMapWrapper = dynamic(() => import('@/components/portfolio/PropertyMapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-2xl animate-pulse" />
  ),
})

// All property locations grouped by building (lat, lng, number of units)
const propertyLocations = [
  { lat: -33.4082, lng: -70.564, units: 1 },
  { lat: -33.4579014, lng: -70.6703093, units: 3 },
  { lat: -33.4170867, lng: -70.5895629, units: 1 },
  { lat: -33.45309, lng: -70.6062, units: 4 },
  { lat: -33.4425, lng: -70.6475, units: 1 },
  { lat: -33.44817, lng: -70.64242, units: 2 },
  { lat: -33.4241331, lng: -70.6109296, units: 1 },
  { lat: -33.41519, lng: -70.60175, units: 1 },
  { lat: -33.4115365, lng: -70.5880771, units: 1 },
  { lat: -33.4514, lng: -70.626, units: 1 },
  { lat: -33.4173431, lng: -70.6016604, units: 1 },
  { lat: -33.4168, lng: -70.6019, units: 1 },
  { lat: -33.416741, lng: -70.6030433, units: 1 },
  { lat: -33.4153509, lng: -70.5941317, units: 1 },
  { lat: -33.41495, lng: -70.603, units: 1 },
  { lat: -33.412, lng: -70.5736, units: 1 },
  { lat: -33.4106951, lng: -70.5717029, units: 1 },
  { lat: -33.4116, lng: -70.5732, units: 1 },
  { lat: -33.4108266, lng: -70.5768105, units: 1 },
  { lat: -33.3868, lng: -70.5385, units: 1 },
  { lat: -33.4461326, lng: -70.6401726, units: 1 },
  { lat: -33.417, lng: -70.6005, units: 1 },
  { lat: -33.44723, lng: -70.64089, units: 2 },
  { lat: -33.449, lng: -70.642, units: 1 },
  { lat: -33.443, lng: -70.6478, units: 1 },
  { lat: -33.42026, lng: -70.59764, units: 1 },
  { lat: -33.4369689, lng: -70.6407097, units: 1 },
  { lat: -33.4382, lng: -70.6535, units: 7 },
  { lat: -33.43557, lng: -70.65447, units: 1 },
  { lat: -33.43689, lng: -70.64438, units: 1 },
  { lat: -33.4214, lng: -70.6103, units: 1 },
  { lat: -33.4288, lng: -70.6185, units: 1 },
  { lat: -33.42179, lng: -70.60857, units: 1 },
  { lat: -33.4259, lng: -70.6159, units: 3 },
  { lat: -33.42582, lng: -70.61601, units: 1 },
  { lat: -33.4247143, lng: -70.611633, units: 1 },
  { lat: -33.4488897, lng: -70.6692655, units: 1 },
  { lat: -33.3832, lng: -70.5332, units: 1 },
  { lat: -33.424, lng: -70.6105, units: 1 },
  { lat: -33.4347, lng: -70.6275, units: 2 },
  { lat: -33.4347933, lng: -70.6276529, units: 2 },
  { lat: -33.4251167, lng: -70.6088405, units: 1 },
  { lat: -33.434367, lng: -70.6590292, units: 1 },
  { lat: -33.4151, lng: -70.6003, units: 1 },
  { lat: -33.4143, lng: -70.599, units: 1 },
  { lat: -33.421113, lng: -70.609612, units: 1 },
  { lat: -33.4235, lng: -70.6085, units: 1 },
  { lat: -33.4512889, lng: -70.626442, units: 1 },
  { lat: -33.4542775, lng: -70.6614314, units: 1 },
  { lat: -33.5205724, lng: -70.60223, units: 1 },
  { lat: -33.4122122, lng: -70.6034847, units: 1 },
]

const successCases = [
  {
    name: 'Depto 2D en Las Condes con piscina',
    comuna: 'Las Condes',
    type: '2 Dormitorios',
    rating: 4.91,
    reviews: 11,
    highlight: 'Piscina en el edificio',
    image: '/images/properties/las-condes-piscina.jpg',
    imageAlt: 'Departamento moderno de 2 dormitorios con piscina en Las Condes',
    lat: -33.4170,
    lng: -70.5980,
  },
  {
    name: 'Depto 2D en Barrio Italia con vista panorámica',
    comuna: 'Ñuñoa',
    type: '2 Dormitorios',
    rating: 4.89,
    reviews: 75,
    highlight: '75+ reseñas positivas',
    image: '/images/properties/nunoa-barrio-italia.jpg',
    imageAlt: 'Living con vista panorámica de Santiago y la cordillera en Barrio Italia',
    lat: -33.4510,
    lng: -70.6330,
  },
  {
    name: 'Acogedor y moderno depto con terraza en La Florida',
    comuna: 'La Florida',
    type: '1 Dormitorio',
    rating: 4.94,
    reviews: 35,
    highlight: '4.94 en Airbnb',
    image: '/images/properties/la-florida-terraza.jpg',
    imageAlt: 'Departamento moderno con terraza en La Florida',
    lat: -33.5170,
    lng: -70.5980,
  },
  {
    name: 'Duplex 2D en El Golf',
    comuna: 'Las Condes',
    type: '2 Dormitorios',
    rating: 4.81,
    reviews: 32,
    highlight: 'Duplex en barrio El Golf',
    image: '/images/properties/las-condes-el-golf.jpg',
    imageAlt: 'Duplex moderno de 2 dormitorios en El Golf, Las Condes',
    lat: -33.4120,
    lng: -70.6010,
  },
  {
    name: 'Céntrico y amplio 3D con terraza',
    comuna: 'Santiago Centro',
    type: '3 Dormitorios',
    rating: 4.92,
    reviews: 25,
    highlight: 'Centro histórico con terraza',
    image: '/images/properties/santiago-centro-terraza.jpg',
    imageAlt: 'Amplio departamento de 3 dormitorios con terraza en centro histórico de Santiago',
    lat: -33.4380,
    lng: -70.6520,
  },
  {
    name: 'Depto acogedor con vista panorámica',
    comuna: 'Santiago Centro',
    type: '1 Dormitorio',
    rating: 4.85,
    reviews: 27,
    highlight: 'Vista panorámica piso 21',
    image: '/images/properties/santiago-panoramica.jpg',
    imageAlt: 'Departamento piso 21 con vista panorámica de Santiago y los Andes',
    lat: -33.4420,
    lng: -70.6480,
  },
  {
    name: 'Apartamento de lujo con terraza en Las Condes',
    comuna: 'Las Condes',
    type: '2 Dormitorios',
    rating: 4.87,
    reviews: 15,
    highlight: 'Lujo con terraza',
    image: '/images/properties/las-condes-lujo-terraza.jpg',
    imageAlt: 'Apartamento de lujo con terraza y vista en Las Condes',
    lat: -33.4200,
    lng: -70.5900,
  },
  {
    name: 'Departamento elegante y tranquilo en Ñuñoa',
    comuna: 'Ñuñoa',
    type: '1 Dormitorio',
    rating: 4.92,
    reviews: 13,
    highlight: '4.92 en Airbnb',
    image: '/images/properties/nunoa-elegante.jpg',
    imageAlt: 'Departamento elegante con dormitorio minimalista en Ñuñoa',
    lat: -33.4560,
    lng: -70.6100,
  },
  {
    name: 'Depto Ejecutivo Deluxe con Terraza Piso 31',
    comuna: 'Santiago Centro',
    type: '1 Dormitorio',
    rating: 5.0,
    reviews: 3,
    highlight: '5.0 rating perfecto',
    image: '/images/properties/santiago-ejecutivo-piso31.jpg',
    imageAlt: 'Departamento ejecutivo deluxe con terraza y vista panorámica desde piso 31',
    lat: -33.4400,
    lng: -70.6530,
  },
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
              <Card key={idx} className="!p-0 overflow-hidden group">
                {/* Property Photo */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#c53030] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md z-10">
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

      {/* Mapa de Presencia en Santiago */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Presencia en Santiago</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Operamos en las comunas con mayor demanda turística y corporativa,
              con <span className="font-semibold text-[#1e3a5f]">68 departamentos</span> en{' '}
              <span className="font-semibold text-[#1e3a5f]">51 ubicaciones</span> a lo largo de Santiago.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <PropertyMapWrapper locations={propertyLocations} />
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
