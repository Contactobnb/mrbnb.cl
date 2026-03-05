// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest'
import { createToken, verifyToken } from '@/lib/auth'

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-key-for-testing-only-32chars!'
})

describe('createToken', () => {
  it('creates a valid JWT token', async () => {
    const token = await createToken({ user: 'admin' })
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(3) // JWT has 3 parts
  })
})

describe('verifyToken', () => {
  it('verifies a valid token', async () => {
    const token = await createToken({ user: 'admin' })
    const payload = await verifyToken(token)
    expect(payload).not.toBeNull()
    expect(payload?.role).toBe('admin')
    expect(payload?.user).toBe('admin')
  })

  it('returns null for invalid token', async () => {
    const payload = await verifyToken('invalid.token.here')
    expect(payload).toBeNull()
  })

  it('returns null for tampered token', async () => {
    const token = await createToken()
    const tampered = token.slice(0, -5) + 'XXXXX'
    const payload = await verifyToken(tampered)
    expect(payload).toBeNull()
  })
})
