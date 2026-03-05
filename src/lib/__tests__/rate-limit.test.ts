import { describe, it, expect, beforeEach } from 'vitest'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

describe('rateLimit', () => {
  beforeEach(() => {
    // Use unique keys per test to avoid state leakage
  })

  it('allows requests within the limit', () => {
    const key = `test-allow-${Date.now()}`
    const result = rateLimit(key, 5, 60_000)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(4)
  })

  it('tracks remaining count correctly', () => {
    const key = `test-remaining-${Date.now()}`
    rateLimit(key, 3, 60_000)
    const result2 = rateLimit(key, 3, 60_000)
    expect(result2.success).toBe(true)
    expect(result2.remaining).toBe(1)

    const result3 = rateLimit(key, 3, 60_000)
    expect(result3.success).toBe(true)
    expect(result3.remaining).toBe(0)
  })

  it('blocks requests exceeding the limit', () => {
    const key = `test-block-${Date.now()}`
    // Exhaust the limit
    for (let i = 0; i < 3; i++) {
      rateLimit(key, 3, 60_000)
    }
    // This should be blocked
    const result = rateLimit(key, 3, 60_000)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('resets after the window expires', () => {
    const key = `test-reset-${Date.now()}`
    // Use a very short window
    rateLimit(key, 1, 1) // 1ms window

    // Wait for it to expire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const result = rateLimit(key, 1, 1)
        expect(result.success).toBe(true)
        resolve()
      }, 10)
    })
  })
})

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for header', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '192.168.1.1, 10.0.0.1' },
    })
    expect(getClientIp(request)).toBe('192.168.1.1')
  })

  it('returns 127.0.0.1 when no forwarded header', () => {
    const request = new Request('http://localhost')
    expect(getClientIp(request)).toBe('127.0.0.1')
  })
})
