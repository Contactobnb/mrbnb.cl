import type { Metadata } from 'next'
import { blogPosts } from '@/data/blog-posts'
import Button from '@/components/ui/Button'
import BlogGrid from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog - Guías de Renta Corta en Santiago',
  description:
    'Artículos, análisis y guías sobre inversión inmobiliaria, renta corta, Airbnb y gestión de propiedades en Santiago de Chile.',
}

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Datos, análisis y guías prácticas sobre inversión inmobiliaria y
              renta corta en Santiago. Basados en nuestra experiencia operando +60 propiedades.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid with Tag Filtering */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <BlogGrid posts={blogPosts} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">¿Quieres saber cuánto puede rentar tu propiedad?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Usa nuestro simulador gratuito y obtén una estimación basada en datos reales de nuestro portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/evaluacion" variant="primary" size="lg">
              Evaluar mi propiedad gratis
            </Button>
            <Button href="/contacto" variant="secondary" size="lg">
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
