import Image from 'next/image'

const galleryPhotos = [
  {
    src: '/images/properties/las-condes-balcon-andes.jpg',
    alt: 'Balcón con vista panorámica a la Cordillera de los Andes, Las Condes',
    label: 'Las Condes',
  },
  {
    src: '/images/properties/providencia-helvecia-living.jpg',
    alt: 'Living con arte y diseño en departamento en Providencia',
    label: 'Providencia',
  },
  {
    src: '/images/properties/nunoa-ebro-living.jpg',
    alt: 'Living de diseño con arte en departamento en Ñuñoa',
    label: 'Ñuñoa',
  },
  {
    src: '/images/properties/santiago-carmen-vista.jpg',
    alt: 'Living con vista panorámica de la ciudad, Santiago Centro',
    label: 'Santiago Centro',
  },
  {
    src: '/images/properties/vitacura-living.jpg',
    alt: 'Living y cocina abierta en departamento en Vitacura',
    label: 'Vitacura',
  },
  {
    src: '/images/properties/las-condes-capitania.jpg',
    alt: 'Living con vistas panorámicas en Las Condes',
    label: 'Las Condes',
  },
]

export default function PropertyGallery() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Propiedades que administramos</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Departamentos premium en las mejores ubicaciones de Santiago, con diseño
            y estándar hotelero.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPhotos.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
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
    </section>
  )
}
