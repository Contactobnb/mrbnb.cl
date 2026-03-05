'use client'

import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Lightbox from '@/components/ui/Lightbox'
import FadeIn from '@/components/ui/FadeIn'
import { useTranslations } from 'next-intl'

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

export default function PortfolioPage() {
  const t = useTranslations('PortfolioPage')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const successCases = [
    {
      name: t('case1Name'),
      comuna: 'Las Condes',
      type: t('case1Type'),
      rating: 4.91,
      reviews: 11,
      highlight: t('case1Highlight'),
      image: '/images/properties/las-condes-piscina.jpg',
      imageAlt: t('case1Alt'),
      lat: -33.4170,
      lng: -70.5980,
    },
    {
      name: t('case2Name'),
      comuna: 'Ñuñoa',
      type: t('case2Type'),
      rating: 4.89,
      reviews: 75,
      highlight: t('case2Highlight'),
      image: '/images/properties/nunoa-barrio-italia.jpg',
      imageAlt: t('case2Alt'),
      lat: -33.4510,
      lng: -70.6330,
    },
    {
      name: t('case3Name'),
      comuna: 'La Florida',
      type: t('case3Type'),
      rating: 4.94,
      reviews: 35,
      highlight: t('case3Highlight'),
      image: '/images/properties/la-florida-terraza.jpg',
      imageAlt: t('case3Alt'),
      lat: -33.5170,
      lng: -70.5980,
    },
    {
      name: t('case4Name'),
      comuna: 'Las Condes',
      type: t('case4Type'),
      rating: 4.81,
      reviews: 32,
      highlight: t('case4Highlight'),
      image: '/images/properties/las-condes-el-golf.jpg',
      imageAlt: t('case4Alt'),
      lat: -33.4120,
      lng: -70.6010,
    },
    {
      name: t('case5Name'),
      comuna: 'Santiago Centro',
      type: t('case5Type'),
      rating: 4.92,
      reviews: 25,
      highlight: t('case5Highlight'),
      image: '/images/properties/santiago-centro-terraza.jpg',
      imageAlt: t('case5Alt'),
      lat: -33.4380,
      lng: -70.6520,
    },
    {
      name: t('case6Name'),
      comuna: 'Santiago Centro',
      type: t('case6Type'),
      rating: 4.85,
      reviews: 27,
      highlight: t('case6Highlight'),
      image: '/images/properties/santiago-panoramica.jpg',
      imageAlt: t('case6Alt'),
      lat: -33.4420,
      lng: -70.6480,
    },
    {
      name: t('case7Name'),
      comuna: 'Las Condes',
      type: t('case7Type'),
      rating: 4.87,
      reviews: 15,
      highlight: t('case7Highlight'),
      image: '/images/properties/las-condes-lujo-terraza.jpg',
      imageAlt: t('case7Alt'),
      lat: -33.4200,
      lng: -70.5900,
    },
    {
      name: t('case8Name'),
      comuna: 'Ñuñoa',
      type: t('case8Type'),
      rating: 4.92,
      reviews: 13,
      highlight: t('case8Highlight'),
      image: '/images/properties/nunoa-elegante.jpg',
      imageAlt: t('case8Alt'),
      lat: -33.4560,
      lng: -70.6100,
    },
    {
      name: t('case9Name'),
      comuna: 'Santiago Centro',
      type: t('case9Type'),
      rating: 5.0,
      reviews: 3,
      highlight: t('case9Highlight'),
      image: '/images/properties/santiago-ejecutivo-piso31.jpg',
      imageAlt: t('case9Alt'),
      lat: -33.4400,
      lng: -70.6530,
    },
  ]

  const lightboxImages = successCases.map((p) => ({ src: p.image, alt: p.imageAlt }))

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {t('heroSubtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">60+</p>
              <p className="text-gray-400 text-sm">{t('statsProperties')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">4.81</p>
              <p className="text-gray-400 text-sm">{t('statsAirbnb')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-1">8.9</p>
              <p className="text-gray-400 text-sm">{t('statsBooking')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Arrendar CTA */}
      <FadeIn>
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1e3a5f]">
                {t('rentalCtaTitle')}
              </h2>
              <p className="text-gray-500 text-sm">
                {t('rentalCtaDesc')}
              </p>
            </div>
            <a
              href="https://mrbnb.hostify.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red inline-flex items-center gap-2 flex-shrink-0"
            >
              {t('rentalCtaButton')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Casos de éxito */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">{t('successTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('successSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successCases.map((property, idx) => (
              <Card key={idx} className="!p-0 overflow-hidden group">
                {/* Property Photo */}
                <div className="h-48 relative overflow-hidden cursor-pointer" onClick={() => setLightboxIndex(idx)}>
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
                      {property.reviews} {t('reviews')}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            {t('moreProperties')}
          </p>
        </div>
      </section>
      </FadeIn>

      {/* Mapa de Presencia en Santiago */}
      <FadeIn>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">{t('mapTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('mapSubtitle') }} />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <PropertyMapWrapper locations={propertyLocations} />
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA Arrendar */}
      <FadeIn>
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-4">{t('rentalCta2Title')}</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              {t('rentalCta2Desc')}
            </p>
            <a
              href="https://mrbnb.hostify.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red inline-flex items-center gap-2 text-lg"
            >
              {t('rentalCtaButton')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA Propietarios */}
      <FadeIn>
      <section className="section-padding bg-[#1e3a5f] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('ownerCtaTitle')}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('ownerCtaDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/evaluacion" variant="white" size="lg">
              {t('ownerCtaPrimary')}
            </Button>
            <Button href="/contacto" variant="secondary" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-[#1e3a5f]">
              {t('ownerCtaSecondary')}
            </Button>
          </div>
        </div>
      </section>
      </FadeIn>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
