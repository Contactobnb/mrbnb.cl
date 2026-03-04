import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#152a45] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c53030] rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto px-4 md:px-8 pt-20 md:pt-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">+60 propiedades operando en Santiago</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transformamos departamentos en{' '}
              <span className="text-[#e53e3e] italic">hoteles</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed max-w-xl">
              Administración profesional de propiedades en renta corta.
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-8">
              Más rentabilidad. <span className="text-[#e53e3e]">Cero</span> estrés. <span className="text-[#e53e3e]">Servicio Premium.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/evaluacion" variant="red" size="lg">
                Evalúa tu propiedad gratis
              </Button>
              <Button href={WHATSAPP_URL} variant="white" size="lg" external>
                Conversemos por WhatsApp
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">4.81</div>
                <div className="text-xs text-gray-400 mt-1">Rating Airbnb</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">8.9</div>
                <div className="text-xs text-gray-400 mt-1">Rating Booking</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#e53e3e]">+30%</div>
                <div className="text-xs text-gray-400 mt-1">vs arriendo tradicional</div>
              </div>
            </div>
          </div>

          {/* Right side - Feature cards */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-6">Tú inviertes. Nosotros operamos.</h3>
                <div className="space-y-4">
                  {[
                    { icon: '📊', text: 'Pricing basado en datos reales' },
                    { icon: '🏨', text: 'Estándar hotelero en operación' },
                    { icon: '🤖', text: 'Uso de tecnología e IA' },
                    { icon: '🎯', text: 'Diseño funcional orientado a conversión' },
                    { icon: '👥', text: 'Equipo interno de operación' },
                    { icon: '🤝', text: 'Transparencia y relación directa' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#c53030] text-white rounded-xl px-5 py-3 shadow-xl">
                <div className="text-sm font-bold">Superhost</div>
                <div className="text-xs opacity-80">Verificado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
