'use client'

import Link from 'next/link'

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6 max-w-7xl mx-auto min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-7xl font-bold text-[#1e3a5f]/10 mb-4">Error</p>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
          Error en el panel de administración
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Ocurrió un error cargando esta sección. Puedes intentar nuevamente o volver al dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            Intentar de nuevo
          </button>
          <Link href="/admin" className="btn-secondary">
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
