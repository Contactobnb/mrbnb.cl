import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// next-intl middleware for locale routing
const intlMiddleware = createMiddleware(routing)

// Routes that require JWT authentication
const PROTECTED_API_PATTERNS = [
  /^\/api\/leads(\/|$)/,
  /^\/api\/metricas(\/|$)/,
]

const PROTECTED_PAGE_PATTERNS = [
  /^\/admin(?!\/login)/,
]

// Rate limit configs: [route prefix, method, limit, windowMs]
const RATE_LIMIT_RULES: Array<{
  path: string
  method: string
  limit: number
  windowMs: number
}> = [
  { path: '/api/auth', method: 'POST', limit: 5, windowMs: 15 * 60 * 1000 },
  { path: '/api/contact', method: 'POST', limit: 5, windowMs: 5 * 60 * 1000 },
  { path: '/api/evaluacion', method: 'POST', limit: 5, windowMs: 5 * 60 * 1000 },
]

function isProtectedApi(pathname: string): boolean {
  return PROTECTED_API_PATTERNS.some((p) => p.test(pathname))
}

function isProtectedPage(pathname: string): boolean {
  return PROTECTED_PAGE_PATTERNS.some((p) => p.test(pathname))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip i18n for API routes, admin routes, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    // --- Rate Limiting (applied before auth) ---
    for (const rule of RATE_LIMIT_RULES) {
      if (pathname.startsWith(rule.path) && request.method === rule.method) {
        const ip = getClientIp(request)
        const key = `${rule.path}:${ip}`
        const result = rateLimit(key, rule.limit, rule.windowMs)

        if (!result.success) {
          const minutes = Math.ceil(result.resetIn / 60_000)
          return NextResponse.json(
            { error: `Demasiados intentos. Intenta en ${minutes} minuto${minutes !== 1 ? 's' : ''}.` },
            {
              status: 429,
              headers: {
                'Retry-After': String(Math.ceil(result.resetIn / 1000)),
              },
            }
          )
        }
      }
    }

    // --- Authentication ---

    // Protected API routes → 401 JSON
    if (isProtectedApi(pathname)) {
      const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
      if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }

      const payload = await verifyToken(token)
      if (!payload) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }
    }

    // Protected admin pages → redirect to login
    if (isProtectedPage(pathname)) {
      const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      const payload = await verifyToken(token)
      if (!payload) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }

    return NextResponse.next()
  }

  // For public pages, apply i18n middleware (locale detection/routing)
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Match all pathnames except those starting with specific prefixes
    '/((?!_next|.*\\..*).*)',
  ],
}
