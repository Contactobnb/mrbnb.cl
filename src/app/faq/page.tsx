import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description:
    'Resolvemos tus dudas sobre la administración de propiedades en renta corta con Mr.BnB. Comisiones, proceso, plazos, seguros y más.',
}

const faqs = [
  {
    category: 'Sobre el servicio',
    questions: [
      {
        q: '¿Qué hace exactamente Mr.BnB?',
        a: 'Nos encargamos de la gestión integral de tu propiedad en renta corta. Esto incluye publicación en plataformas (Airbnb, Booking.com), pricing dinámico, atención al huésped 24/7, coordinación de limpieza, mantenimiento preventivo, y reportes mensuales detallados. Tú solo recibes los ingresos.',
      },
      {
        q: '¿Cuánto cobra Mr.BnB por sus servicios?',
        a: 'Nuestro modelo es de comisión sobre ingresos generados: 17% + IVA. No hay costos fijos mensuales. Si tu propiedad no genera ingresos, no pagas nada. Esto alinea nuestros incentivos con los tuyos.',
      },
      {
        q: '¿En qué comunas operan?',
        a: 'Actualmente operamos en Providencia, Las Condes, Ñuñoa, Santiago Centro y Vitacura. Estamos en constante evaluación de nuevas zonas. Si tu propiedad está en otra comuna, contáctanos igualmente para evaluar.',
      },
      {
        q: '¿Puedo usar mi departamento algunos días del mes?',
        a: 'Sí. Puedes bloquear las fechas que quieras usar personalmente a través de nuestro sistema. Solo te pedimos avisarnos con anticipación razonable para no afectar reservas ya confirmadas.',
      },
    ],
  },
  {
    category: 'Proceso e implementación',
    questions: [
      {
        q: '¿Cuánto tiempo toma comenzar a recibir reservas?',
        a: 'Desde que firmas con nosotros, el proceso típico toma entre 7 y 15 días: evaluación de la propiedad, equipamiento si es necesario, fotografía profesional, publicación y primeras reservas. Hemos tenido casos de primera reserva en menos de 10 días.',
      },
      {
        q: '¿Necesito amueblar o equipar mi departamento?',
        a: 'Tu propiedad necesita estar equipada para recibir huéspedes (muebles, ropa blanca, menaje, amenities). Si no lo está, te ayudamos con el proceso de equipamiento y diseño interior, con proveedores de confianza y precios preferenciales.',
      },
      {
        q: '¿Quién se encarga de la limpieza?',
        a: 'Nosotros coordinamos equipos de limpieza profesional con estándar hotelero entre cada huésped. El costo de limpieza se cobra al huésped como parte de la tarifa, por lo que no es un gasto para ti.',
      },
      {
        q: '¿Cómo funciona el check-in de los huéspedes?',
        a: 'Utilizamos sistemas de check-in autónomo con cajas de seguridad o cerraduras electrónicas. El huésped recibe instrucciones detalladas automáticamente antes de su llegada. No necesitas estar presente.',
      },
    ],
  },
  {
    category: 'Ingresos y rentabilidad',
    questions: [
      {
        q: '¿Cuánto puedo ganar con renta corta vs arriendo tradicional?',
        a: 'En promedio, nuestros propietarios ganan un 30% más que con arriendo tradicional, y en temporada alta puede llegar a +55%. El resultado depende de la ubicación, tipo de propiedad y temporada. Usa nuestro simulador para obtener una estimación personalizada.',
      },
      {
        q: '¿Cuándo y cómo recibo mis ingresos?',
        a: 'Realizamos liquidaciones mensuales. Recibes un reporte detallado con todas las reservas, ingresos y deducciones, junto con la transferencia a tu cuenta bancaria dentro de los primeros 10 días del mes siguiente.',
      },
      {
        q: '¿Qué pasa en temporada baja?',
        a: 'Santiago tiene una estacionalidad moderada. En temporada baja (julio-agosto) ajustamos las tarifas y apuntamos a estadías más largas (corporativas, relocaciones, nómadas digitales) para mantener la ocupación sobre 65%.',
      },
    ],
  },
  {
    category: 'Seguridad y garantías',
    questions: [
      {
        q: '¿Qué pasa si un huésped daña mi propiedad?',
        a: 'Airbnb ofrece AirCover, que cubre hasta USD 3.000.000 en daños. Además, recomendamos contratar un seguro complementario. Nosotros documentamos el estado de la propiedad antes y después de cada estadía.',
      },
      {
        q: '¿Hay contrato? ¿Puedo cancelar?',
        a: 'Sí, firmamos un contrato de administración. Puedes cancelar el servicio con 30 días de anticipación, respetando las reservas ya confirmadas. No hay penalidades por término anticipado.',
      },
      {
        q: '¿Cómo manejan las quejas de vecinos?',
        a: 'Tenemos protocolos estrictos: reglas de casa claras, verificación de huéspedes, límite de personas, y prohibición de fiestas. Mantenemos comunicación proactiva con la administración del edificio.',
      },
      {
        q: '¿Necesito patente comercial o inicio de actividades?',
        a: 'Dependiendo de tu situación, puede ser necesario. Te orientamos sobre los requisitos tributarios y municipales. Revisa nuestro artículo sobre regulación en el blog para más detalles.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Todo lo que necesitas saber sobre nuestro servicio de administración de renta corta.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="heading-3 mb-6 pb-2 border-b border-gray-200">
                  {section.category}
                </h2>
                <div className="space-y-6">
                  {section.questions.map((faq) => (
                    <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="font-semibold text-[#1e3a5f] text-lg mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">
            ¿Tienes otra pregunta?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Nuestro equipo está disponible para resolver cualquier duda. Agenda una reunión sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contacto" variant="primary" size="lg">
              Contactar al equipo
            </Button>
            <Button href="/evaluacion" variant="secondary" size="lg">
              Evaluar mi propiedad gratis
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
