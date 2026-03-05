import { getTranslations } from 'next-intl/server'

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

export default async function Testimonials() {
  const t = await getTranslations('Testimonials')

  const testimonials = [
    {
      quote: t('quote1'),
      name: t('name1'),
      location: t('location1'),
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      quote: t('quote2'),
      name: t('name2'),
      location: t('location2'),
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      quote: t('quote3'),
      name: t('name3'),
      location: t('location3'),
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ]

  return (
    <section className="section-padding bg-[#faf8f5]">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
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
              <blockquote className="mt-4 mb-6 text-gray-600 leading-relaxed flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="border-t border-gray-100 pt-4 flex items-center gap-3 mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#1e3a5f]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
