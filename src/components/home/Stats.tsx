const stats = [
  { value: '+60', label: 'Propiedades en Santiago', suffix: '' },
  { value: '4.81', label: 'Rating en Airbnb', suffix: '★' },
  { value: '8.9', label: 'Rating en Booking', suffix: '' },
  { value: '+30%', label: 'Ingresos vs arriendo tradicional', suffix: '' },
  { value: '+55%', label: 'En temporada alta', suffix: '' },
  { value: '2x', label: 'Duplicamos ingresos en algunos casos', suffix: '' },
]

export default function Stats() {
  return (
    <section className="bg-[#faf8f5] section-padding">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Resultados reales</h2>
          <p className="text-gray-600 text-lg">Números que hablan por nosotros. Somos <strong>Superhost</strong> en Airbnb.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c53030]">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 mt-2 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
