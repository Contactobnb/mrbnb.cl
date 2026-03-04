import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Servicios de administración profesional de propiedades en renta corta, corretaje inmobiliario y desarrollo a medida. Gestión integral con estándar hotelero en Santiago.',
}

const backOfficeItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Servicio al cliente 24/7',
    description: 'Atención permanente a huéspedes en español e inglés, los 365 días del año.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Equipo de limpieza propio',
    description: 'Personal capacitado con protocolos hoteleros de limpieza y desinfección.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Equipo interno de mantenimiento',
    description: 'Técnicos propios para reparaciones rápidas y mantenimiento preventivo.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'Coordinación operativa centralizada',
    description: 'Gestión centralizada de check-ins, check-outs, limpieza y mantenimiento.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Uso de tecnología e IA',
    description: 'Pricing dinámico, automatización de comunicaciones y análisis de datos en tiempo real.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Estándar hotelero en cada propiedad',
    description: 'Cada detalle cuidado: amenities, ropa blanca premium, presentación impecable.',
  },
]

export default function ServiciosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Tres líneas de servicio diseñadas para maximizar el valor de tu propiedad.
              Desde la operación diaria hasta la inversión estratégica.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#administracion" variant="white">
                Administración
              </Button>
              <Button href="#corretaje" variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
                Corretaje
              </Button>
              <Button href="#inversion" variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
                Desarrollo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan 1: Administración */}
      <section id="administracion" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-[#1e3a5f]/10 text-[#1e3a5f] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Plan 1
              </div>
              <h2 className="heading-2 mb-4">Administración de Renta Corta</h2>
              <p className="text-gray-600 text-lg mb-6">
                Nos encargamos de todo. Tú recibes los ingresos, nosotros operamos tu propiedad
                con estándar hotelero, 24/7, los 365 días del año.
              </p>

              <div className="bg-[#faf8f5] rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-[#1e3a5f]">17%</span>
                  <span className="text-lg text-gray-600">+ IVA variable</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Sobre los ingresos generados. Solo ganamos cuando tú ganas.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Fee de limpieza:</strong> Fuera de la comisión (se cobra directamente al huésped).
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Gastos operativos:</strong> Gastos comunes, servicios básicos y mantenimiento correctivo mayor a cargo del propietario.
                </p>
              </div>

              <Button href="/evaluacion" variant="primary" size="lg">
                Evaluar mi propiedad
              </Button>
            </div>

            <div>
              <h3 className="heading-3 mb-6">Incluye:</h3>
              <div className="grid gap-4">
                {[
                  { title: 'Publicación optimizada', desc: 'Listados profesionales en Airbnb, Booking y VRBO con fotografía y textos optimizados.' },
                  { title: 'Pricing dinámico', desc: 'Algoritmos de pricing que ajustan tarifas en tiempo real según demanda, competencia y temporada.' },
                  { title: 'Atención al cliente 24/7', desc: 'Soporte permanente a huéspedes en español e inglés, los 365 días del año.' },
                  { title: 'Limpieza hotelera', desc: 'Equipo propio de limpieza con protocolos de hotel. Desinfección, amenities y presentación impecable.' },
                  { title: 'Mantenimiento preventivo', desc: 'Equipo interno de mantenimiento para mantener tu propiedad en óptimas condiciones.' },
                  { title: 'Reportes mensuales', desc: 'Informes detallados con ingresos, ocupación, performance vs mercado y proyecciones.' },
                  { title: 'Operación completa', desc: 'Check-in/out, coordinación de llaves, gestión de incidencias y seguimiento de reviews.' },
                  { title: 'Ropa blanca incluida', desc: 'Sábanas, toallas y amenities de calidad hotelera incluidos en el servicio.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan 2: Corretaje */}
      <section id="corretaje" className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <h3 className="heading-3 mb-6">Incluye:</h3>
              <div className="grid gap-4">
                {[
                  { title: 'Asesoría en inversión', desc: 'Te ayudamos a identificar las mejores oportunidades de inversión según tu perfil y presupuesto.' },
                  { title: 'Evaluación de rentabilidad', desc: 'Análisis detallado del potencial de cada propiedad con datos reales de nuestro portfolio.' },
                  { title: 'Selección de propiedades con potencial', desc: 'Filtramos el mercado para encontrar propiedades con mayor potencial de renta corta.' },
                  { title: 'Apoyo en compra/venta', desc: 'Acompañamiento profesional en todo el proceso de compra o venta de la propiedad.' },
                  { title: '6 meses de administración gratis', desc: 'Al cerrar una operación con nosotros, administramos tu propiedad gratis por 6 meses.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#1e3a5f]/10 text-[#1e3a5f] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Plan 2
              </div>
              <h2 className="heading-2 mb-4">Corretaje de Propiedades</h2>
              <p className="text-gray-600 text-lg mb-6">
                Compramos y vendemos propiedades con visión de renta corta.
                Cada operación viene con el respaldo de nuestra experiencia operando +60 propiedades.
              </p>

              <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-[#1e3a5f]">2%</span>
                  <span className="text-lg text-gray-600">+ IVA de comisión</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Sobre el valor de la transacción.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <p className="text-green-800 font-semibold text-sm">
                    Incluye 6 meses de administración gratis
                  </p>
                </div>
              </div>

              <Button href="/contacto" variant="primary" size="lg">
                Consultar por corretaje
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan 3: Desarrollo a Medida */}
      <section id="inversion" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-[#c53030]/10 text-[#c53030] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Plan 3
              </div>
              <h2 className="heading-2 mb-4">Desarrollo a Medida</h2>
              <p className="text-gray-600 text-lg mb-6">
                Buscamos, negociamos, compramos, remodelamos e integramos propiedades para renta corta
                con estándar hotelero. Un servicio integral de principio a fin.
              </p>

              <div className="bg-[#faf8f5] rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#1e3a5f]">Presupuesto caso a caso</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Cada proyecto es único. Evaluamos la oportunidad y presentamos un presupuesto
                  detallado con proyección de retorno.
                </p>
              </div>

              <Button href="/contacto" variant="red" size="lg">
                Conversemos tu proyecto
              </Button>
            </div>

            <div>
              <h3 className="heading-3 mb-6">El proceso completo:</h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Búsqueda', desc: 'Identificamos propiedades con potencial de renta corta según tus objetivos de inversión.' },
                  { step: '02', title: 'Negociación', desc: 'Negociamos las mejores condiciones de compra respaldados por datos del mercado.' },
                  { step: '03', title: 'Compra', desc: 'Gestionamos todo el proceso de adquisición de la propiedad.' },
                  { step: '04', title: 'Remodelación', desc: 'Diseñamos y remodelamos la propiedad con estándar hotelero orientado a conversión.' },
                  { step: '05', title: 'Integración', desc: 'Incorporamos la propiedad a nuestro portfolio y comenzamos a operar.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c53030]/10 text-[#c53030] flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Office Operativo */}
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Back Office Operativo
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Detrás de cada propiedad hay un equipo completo trabajando para que
              la experiencia de tus huéspedes sea impecable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backOfficeItems.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">Compara Nuestros Planes</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-[#1e3a5f] text-white">
                  <th className="p-4 text-left font-semibold">Característica</th>
                  <th className="p-4 text-center font-semibold">Administración</th>
                  <th className="p-4 text-center font-semibold">Corretaje</th>
                  <th className="p-4 text-center font-semibold">Desarrollo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { feature: 'Comisión', p1: '17% + IVA', p2: '2% + IVA', p3: 'Caso a caso' },
                  { feature: 'Gestión operativa completa', p1: true, p2: false, p3: true },
                  { feature: 'Pricing dinámico', p1: true, p2: false, p3: true },
                  { feature: 'Atención 24/7', p1: true, p2: false, p3: true },
                  { feature: 'Limpieza hotelera', p1: true, p2: false, p3: true },
                  { feature: 'Reportes mensuales', p1: true, p2: false, p3: true },
                  { feature: 'Asesoría inversión', p1: false, p2: true, p3: true },
                  { feature: 'Búsqueda de propiedades', p1: false, p2: true, p3: true },
                  { feature: 'Remodelación', p1: false, p2: false, p3: true },
                  { feature: '6 meses admin gratis', p1: false, p2: true, p3: false },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 text-sm font-medium text-gray-700">{row.feature}</td>
                    {[row.p1, row.p2, row.p3].map((val, i) => (
                      <td key={i} className="p-4 text-center">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-[#1e3a5f]">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">No sabes cuál plan necesitas?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Conversemos. Evaluamos tu situación sin costo y te recomendamos la mejor alternativa
            para maximizar el retorno de tu propiedad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/evaluacion" variant="primary" size="lg">
              Evaluar mi propiedad gratis
            </Button>
            <Button href="/contacto" variant="secondary" size="lg">
              Agendar reunión
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
