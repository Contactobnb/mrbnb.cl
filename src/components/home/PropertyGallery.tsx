'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/ui/Lightbox'
import { useTranslations } from 'next-intl'

export default function PropertyGallery() {
  const t = useTranslations('PropertyGallery')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const galleryPhotos = [
    {
      src: '/images/properties/las-condes-balcon-andes.jpg',
      alt: t('photo1Alt'),
      label: 'Las Condes',
    },
    {
      src: '/images/properties/providencia-helvecia-living.jpg',
      alt: t('photo2Alt'),
      label: 'Providencia',
    },
    {
      src: '/images/properties/nunoa-ebro-living.jpg',
      alt: t('photo3Alt'),
      label: 'Ñuñoa',
    },
    {
      src: '/images/properties/santiago-carmen-vista.jpg',
      alt: t('photo4Alt'),
      label: 'Santiago Centro',
    },
    {
      src: '/images/properties/vitacura-living.jpg',
      alt: t('photo5Alt'),
      label: 'Vitacura',
    },
    {
      src: '/images/properties/las-condes-capitania.jpg',
      alt: t('photo6Alt'),
      label: 'Las Condes',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-semibold">
                  {photo.label}
                </span>
              </div>
              {/* Subtle permanent gradient at bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryPhotos.map((p) => ({ src: p.src, alt: p.alt }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
