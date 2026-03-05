import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <section className="section-padding bg-[#faf8f5] min-h-[70vh] flex items-center">
      <div className="container-custom mx-auto text-center">
        <p className="text-8xl font-bold text-[#1e3a5f]/10 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          La página que buscas no existe o fue movida. Te sugerimos volver al inicio o explorar nuestras secciones.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/evaluacion" className="btn-secondary">
            Evalúa tu propiedad
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/servicios" className="text-[#1e3a5f] hover:text-[#c53030] transition-colors">Servicios</Link>
          <Link href="/blog" className="text-[#1e3a5f] hover:text-[#c53030] transition-colors">Blog</Link>
          <Link href="/portfolio" className="text-[#1e3a5f] hover:text-[#c53030] transition-colors">Portfolio</Link>
          <Link href="/contacto" className="text-[#1e3a5f] hover:text-[#c53030] transition-colors">Contacto</Link>
        </div>
      </div>
    </section>
  )
}
