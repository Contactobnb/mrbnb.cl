const testimonials = [
  {
    quote:
      'Llevamos 8 meses con Mr.BnB y los ingresos superaron todas nuestras expectativas. Pasamos de tener el departamento vacío a una ocupación del 82%. Lo mejor es que no tengo que preocuparme de nada.',
    name: 'María Fernanda L.',
    location: 'Providencia',
    rating: 5,
  },
  {
    quote:
      'Al principio tenía dudas sobre la renta corta, pero el equipo de Mr.BnB me dio la confianza. Los reportes mensuales son súper detallados y siempre están disponibles cuando los necesito.',
    name: 'Carlos R.',
    location: 'Las Condes',
    rating: 5,
  },
  {
    quote:
      'Tenía mi depto en arriendo tradicional y decidí probar con Mr.BnB. En el primer trimestre ya estaba ganando un 40% más. El proceso fue rapidísimo, en 10 días ya tenía mi primera reserva.',
    name: 'Javiera M.',
    location: 'Ñuñoa',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#faf8f5]">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Lo que dicen nuestros propietarios</h2>
          <p className="text-gray-600 text-lg">
            Resultados reales de propietarios que confían en Mr.BnB para gestionar sus propiedades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <svg
                  className="w-10 h-10 text-[#1e3a5f]/15"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>
              </div>

              {/* Star rating */}
              <StarRating count={testimonial.rating} />

              {/* Quote text */}
              <blockquote className="mt-4 mb-6 text-gray-600 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-[#1e3a5f]">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
