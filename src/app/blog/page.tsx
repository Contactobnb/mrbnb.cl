import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Blog',
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

      {/* Blog Grid */}
      <section className="section-padding bg-[#faf8f5]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="!p-0 overflow-hidden h-full flex flex-col">
                  {/* Cover Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] flex items-center justify-center relative overflow-hidden">
                    <div className="text-white text-center px-6">
                      <svg className="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{post.readTime} min lectura</span>
                    </div>

                    <h2 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#c53030] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold">
                          {post.author
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <span className="text-[#c53030] text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Leer
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">Quieres saber cuánto puede rentar tu propiedad?</h2>
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
