'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#1e3a5f' }}
          >
            Mr.BnB
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Panel de Administración
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h2
            className="text-xl font-semibold mb-6 text-center"
            style={{ color: '#1e3a5f' }}
          >
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                required
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                style={{
                  // Focus ring color matches brand navy
                  // Using CSS variable approach for focus state
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 95, 0.2)'
                  e.target.style.borderColor = '#1e3a5f'
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = ''
                  e.target.style.borderColor = '#d1d5db'
                }}
              />
            </div>

            {error && (
              <div
                className="text-sm px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: '#fef2f2',
                  color: '#c53030',
                  border: '1px solid #fecaca',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 px-4 text-white font-medium rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#c53030',
              }}
              onMouseEnter={(e) => {
                if (!loading && password) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#9b2c2c'
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#c53030'
              }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Acceso restringido solo para administradores
        </p>
      </div>
    </div>
  )
}
