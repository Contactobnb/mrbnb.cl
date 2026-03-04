import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const services = [
  {
    icon: (
      <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Administramos',
    description: 'Administración profesional de propiedades en renta corta. Publicación, pricing, atención 24/7, limpieza, mantenimiento, verificación y reportes.',
    plan: 'Plan Variable — 17% + IVA',
    href: '/servicios',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Desarrollo a medida',
    description: 'Compra, rediseño y operación de propiedades con alto potencial. Buscamos, negociamos, remodelamos e integramos tu propiedad para renta corta con estándar hotelero.',
    plan: 'Presupuesto caso a caso',
    href: '/servicios#inversion',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Corretaje con visión de renta corta',
    description: 'Te ayudamos a comprar o vender mejor, con evaluación real de rentabilidad. Selección de propiedades con potencial y apoyo en compra o venta.',
    plan: 'Comisión 2% + IVA — incluye 6 meses de administración gratis',
    href: '/servicios#corretaje',
  },
]

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Nuestro modelo de negocios</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Inversión + Diseño + Operación + Comercialización. Todo bajo una misma marca.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Card key={i} className="flex flex-col">
              <div className="mb-4">{service.icon}</div>
              <h3 className="heading-3 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
              <div className="bg-[#faf8f5] rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold text-[#1e3a5f]">{service.plan}</p>
              </div>
              <Button href={service.href} variant="secondary" size="sm">
                Más información
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-xl font-semibold text-[#1e3a5f]">
            Somos tu socio de largo plazo en renta corta — desde la compra hasta la operación.
          </p>
        </div>
      </div>
    </section>
  )
}
