'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="section-padding bg-[#faf8f5] min-h-[70vh] flex items-center">
      <div className="container-custom mx-auto text-center">
        <p className="text-8xl font-bold text-[#1e3a5f]/10 mb-4">Error</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
          Algo salió mal
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Ocurrió un error inesperado. Puedes intentar nuevamente o volver al inicio.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            Intentar de nuevo
          </button>
          <Link href="/" className="btn-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
