import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const AUTH_COOKIE_NAME = 'mrbnb_admin_token'
const AUTH_TOKEN_VALUE = 'mrbnb_authenticated'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Se requiere una contraseña' },
        { status: 400 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set')
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    // Create a simple token by hashing the password with a timestamp
    // This is a simple approach - for production, use proper JWT tokens
    const token = Buffer.from(`${AUTH_TOKEN_VALUE}:${Date.now()}`).toString('base64')

    const response = NextResponse.json({ success: true })

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })

  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // Expire immediately
  })

  return response
}

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)

  if (!token?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const decoded = Buffer.from(token.value, 'base64').toString('utf-8')
    const isValid = decoded.startsWith(AUTH_TOKEN_VALUE)

    if (!isValid) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
