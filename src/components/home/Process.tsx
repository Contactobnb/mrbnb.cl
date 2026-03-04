const steps = [
  {
    number: '1',
    title: 'Diagnóstico',
    description: 'Evaluamos tu propiedad, su potencial de mercado y definimos la estrategia óptima.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Implementación',
    description: 'Diseño, equipamiento y preparación de la propiedad con estándar hotelero boutique.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Publicación',
    description: 'Listado profesional en Airbnb, Booking y más plataformas con fotografía y copy optimizado.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Operación continua',
    description: 'Gestión diaria completa: huéspedes, limpieza, mantenimiento, pricing dinámico 24/7.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    number: '5',
    title: 'Reportes mensuales',
    description: 'Transparencia total con reportes detallados de ingresos, ocupación y rendimiento.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

export default function Process() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Cómo funciona</h2>
          <p className="text-gray-600 text-lg">
            Tu propiedad puede empezar a generar ingresos en menos de <strong>2 semanas</strong>.
          </p>
        </div>

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gray-200" />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1e3a5f] text-white mb-4 relative z-10">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 md:relative md:top-auto md:right-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#c53030] text-white text-xs font-bold md:hidden">
                  {step.number}
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">
                  <span className="hidden md:inline text-[#c53030] mr-1">{step.number}.</span>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
