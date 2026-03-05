'use client'

export default function GlobalError({ reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#faf8f5' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
            <p style={{ fontSize: '5rem', fontWeight: 'bold', color: '#1e3a5f', opacity: 0.1, marginBottom: '1rem' }}>
              Error
            </p>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>
              Algo salió mal
            </h1>
            <p style={{ color: '#4b5563', fontSize: '1.125rem', marginBottom: '2rem' }}>
              Ocurrió un error inesperado. Intenta recargar la página.
            </p>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#c53030',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Recargar página
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
