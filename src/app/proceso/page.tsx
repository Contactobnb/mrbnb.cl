import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Cómo Funciona - Proceso Paso a Paso',
  description:
    'Conoce el proceso paso a paso para convertir tu propiedad en un activo de renta corta rentable. En menos de 2 semanas tu propiedad puede empezar a generar ingresos.',
}

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    subtitle: 'Evaluamos tu propiedad',
    description:
      'Analizamos en detalle tu propiedad, su ubicación, la competencia directa y el potencial real de ingresos en renta corta. Usamos datos de nuestro portfolio de +60 propiedades para darte una proyección precisa.',
    details: [
      'Evaluación presencial de la propiedad',
      'Análisis de ubicación y conectividad',
      'Estudio de competencia directa en la zona',
      'Proyección de ingresos basada en datos reales',
      'Recomendaciones de mejoras (si aplica)',
      'Propuesta de servicio personalizada',
    ],
    duration: '1-2 días',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    number: '02',
    title: 'Implementación',
    subtitle: 'Preparamos tu propiedad',
    description:
      'Transformamos tu propiedad para que cumpla con los estándares hoteleros que garantizan la mejor experiencia para los huéspedes y las mejores reviews para ti.',
    details: [
      'Diseño interior orientado a renta corta',
      'Equipamiento completo (ropa blanca, menaje, amenities)',
      'Fotografía profesional y staging',
      'Instalación de Smart Lock (acceso autónomo)',
      'Manual del huésped y guía local',
      'Revisión final de calidad',
    ],
    duration: '5-10 días',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    number: '03',
    title: 'Publicación',
    subtitle: 'Listados optimizados',
    description:
      'Creamos listados profesionales en las principales plataformas de reserva, optimizados para máxima visibilidad y conversión.',
    details: [
      'Publicación en Airbnb gestionada por nuestro equipo Superhost',
      'Publicación en Booking.com',
      'Sincronización de calendarios entre plataformas',
      'Títulos y descripciones optimizados (SEO)',
      'Fotografías profesionales editadas',
      'Configuración de pricing dinámico inicial',
    ],
    duration: '1-2 días',
    color: 'bg-green-50 text-green-700 border-green-200',
    iconColor: 'bg-green-100 text-green-600',
  },
  {
    number: '04',
    title: 'Operación Continua',
    subtitle: 'Gestión 24/7',
    description:
      'Una vez publicada, nos encargamos de absolutamente todo. Tú solo recibes los ingresos mensuales mientras nosotros operamos con estándar hotelero.',
    details: [
      'Gestión de reservas y consultas 24/7',
      'Pricing dinámico ajustado en tiempo real',
      'Coordinación de limpieza hotelera entre cada reserva',
      'Mantenimiento preventivo y correctivo',
      'Check-in y check-out coordinado',
      'Gestión de reviews y reputación online',
    ],
    duration: 'Permanente',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    iconColor: 'bg-amber-100 text-amber-600',
  },
  {
    number: '05',
    title: 'Reportes Mensuales',
    subtitle: 'Transparencia total',
    description:
      'Cada mes recibes un informe detallado con los resultados de tu propiedad. Transparencia total con datos claros y comparables.',
    details: [
      'Ingresos brutos y netos del período',
      'Ocupación vs proyección',
      'Comparativa con mercado y competencia',
      'Detalle de cada reserva (plataforma, fechas, monto)',
      'Gastos operativos desglosados',
      'Proyección para el próximo mes',
    ],
    duration: 'Mensual',
    color: 'bg-red-50 text-red-700 border-red-200',
    iconColor: 'bg-red-100 text-red-600',
  },
]

const faqItems = [
  {
    q: '¿Cuánto tiempo toma el proceso completo?',
    a: 'Desde el diagnóstico inicial hasta la primera reserva, el proceso toma entre 10 y 14 días hábiles. Si la propiedad ya está amoblada y equipada, puede ser incluso más rápido.',
  },
  {
    q: '¿Necesito invertir en remodelar mi propiedad?',
    a: 'No necesariamente. Evaluamos la propiedad y, si está en buenas condiciones, puede requerir solo equipamiento básico (ropa blanca, amenities). Si recomendamos mejoras, siempre con un análisis de ROI claro.',
  },
  {
    q: '¿Quién se encarga de la limpieza entre huéspedes?',
    a: 'Nosotros. Contamos con equipo de limpieza propio, capacitado con protocolos hoteleros. El fee de limpieza se cobra directamente al huésped.',
  },
  {
    q: '¿Cómo recibo mis ingresos?',
    a: 'Cada mes recibes una transferencia con los ingresos netos de tu propiedad, junto con un reporte detallado de todas las reservas y gastos.',
  },
  {
    q: '¿Puedo ver cómo va mi propiedad en tiempo real?',
    a: 'Sí. Además del reporte mensual, puedes consultarnos en cualquier momento sobre el estado de ocupación, reservas próximas y proyecciones.',
  },
  {
    q: '¿Qué pasa si un huésped daña mi propiedad?',
    a: 'Todas las reservas cuentan con el seguro de la plataforma (AirCover en Airbnb, por ejemplo). Además, realizamos un inventario fotográfico antes y después de cada estadía para documentar cualquier incidencia.',
  },
  {
    q: '¿Puedo usar mi propiedad algunos días del año?',
    a: 'Por supuesto. Puedes bloquear las fechas que necesites directamente con nosotros. Solo te pedimos avisar con la mayor anticipación posible para optimizar el calendario de reservas.',
  },
  {
    q: '¿Cuál es la duración mínima del contrato?',
    a: 'Nuestros contratos tienen una duración mínima de 12 meses, con renovación automática. Puedes cancelar con 60 días de aviso previo.',
  },
  {
    q: '¿Cómo se manejan los temas tributarios (SII)?',
    a: 'Te entregamos toda la documentación necesaria para tu declaración de impuestos. Los ingresos por renta corta se declaran como renta de bienes raíces. Recomendamos asesorarte con tu contador para optimizar tu situación tributaria.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function ProcesoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Cómo funciona
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Un proceso claro y probado en +60 propiedades para transformar
              tu departamento en un activo de renta corta rentable.
            </p>

            {/* Timeline highlight */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-semibold">
                Tu propiedad puede empezar a generar ingresos en menos de 2 semanas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 md:gap-0 md:flex-nowrap items-center mb-16">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <p className="text-xs font-semibold text-[#1e3a5f] mt-2 text-center whitespace-nowrap">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400">{step.duration}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#1e3a5f]/20 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  idx % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-xl">
                      {step.number}
                    </div>
                    <div>
                      <h2 className="heading-2 !text-2xl md:!text-3xl">{step.title}</h2>
                      <p className="text-gray-500">{step.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${step.color}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duración: {step.duration}
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <Card hover={false} className="!p-0 overflow-hidden">
                    <div className={`px-6 py-4 ${step.iconColor} bg-opacity-50`}>
                      <h3 className="font-semibold text-[#1e3a5f]">Qué incluye este paso</h3>
                    </div>
                    <div className="p-6 space-y-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline CTA */}
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Proceso probado en +60 propiedades
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              En menos de 2 semanas, tu propiedad puede estar generando ingresos
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              No necesitas experiencia previa. Nosotros nos encargamos de todo,
              desde el diagnóstico inicial hasta la operación continua.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/evaluacion" variant="white" size="lg">
                Comenzar diagnóstico gratuito
              </Button>
              <Button href="/contacto" variant="secondary" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
                Hablar con un asesor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">Preguntas frecuentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, idx) => (
              <Card key={idx} hover={false}>
                <h3 className="font-semibold text-[#1e3a5f] text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
