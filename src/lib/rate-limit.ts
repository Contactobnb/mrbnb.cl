interface RateLimitEntry {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitEntry>()

// Auto-cleanup expired entries every 60 seconds
let cleanupInterval: ReturnType<typeof setInterval> | null = null

function ensureCleanup() {
  if (cleanupInterval) return
  cleanupInterval = setInterval(() => {
    const now = Date.now()
    const keys = Array.from(store.keys())
    for (let i = 0; i < keys.length; i++) {
      const entry = store.get(keys[i])
      if (entry && now > entry.resetTime) {
        store.delete(keys[i])
      }
    }
  }, 60_000)
  // Don't block process exit
  if (cleanupInterval.unref) {
    cleanupInterval.unref()
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; resetIn: number } {
  ensureCleanup()

  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1, resetIn: windowMs }
  }

  entry.count++

  if (entry.count > limit) {
    const resetIn = entry.resetTime - now
    return { success: false, remaining: 0, resetIn }
  }

  return {
    success: true,
    remaining: limit - entry.count,
    resetIn: entry.resetTime - now,
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return '127.0.0.1'
}
