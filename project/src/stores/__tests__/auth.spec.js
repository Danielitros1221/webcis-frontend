import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { decodeJwt, normalizeJwtUser, useAuthStore } from '@/stores/auth'

function createStorageMock() {
  const values = new Map()

  return {
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  }
}

function createToken(payload) {
  const encode = (value) => btoa(JSON.stringify(value))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode(payload)}.signature`
}

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createStorageMock(),
    })
    window.localStorage.clear()
  })

  it('decodes a JWT payload', () => {
    const token = createToken({ sub: '42', role: 'admin', exp: 2_000_000_000 })

    expect(decodeJwt(token)).toMatchObject({ sub: '42', role: 'admin' })
  })

  it('normalizes current and legacy JWT claim names', () => {
    expect(normalizeJwtUser({ sub: '42', role: 'admin', name: 'Daniel', exp: 123 })).toEqual({
      id: '42',
      role: 'admin',
      name: 'Daniel',
      exp: 123,
    })

    expect(normalizeJwtUser({ id: 7, rol: 'alumno', nombre: 'Ana', exp: 456 })).toEqual({
      id: 7,
      role: 'alumno',
      name: 'Ana',
      exp: 456,
    })
  })

  it('persists and restores a valid session', () => {
    const token = createToken({ sub: '42', role: 'admin', name: 'Daniel', exp: 2_000_000_000 })
    const auth = useAuthStore()

    expect(auth.loginWithToken(token)).toBe(true)
    expect(window.localStorage.getItem('token')).toBe(token)
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.role).toBe('admin')

    const restoredAuth = useAuthStore(createPinia())
    expect(restoredAuth.initFromStorage()).toBe(true)
    expect(restoredAuth.user).toMatchObject({ id: '42', role: 'admin' })
  })

  it('rejects expired or malformed tokens and clears storage', () => {
    const auth = useAuthStore()
    const expiredToken = createToken({ sub: '42', role: 'admin', exp: 1 })

    expect(auth.loginWithToken(expiredToken)).toBe(false)
    expect(auth.isAuthenticated).toBe(false)
    expect(window.localStorage.getItem('token')).toBeNull()

    window.localStorage.setItem('token', 'invalid-token')
    expect(auth.initFromStorage()).toBe(false)
    expect(window.localStorage.getItem('token')).toBeNull()
  })

  it('does not keep an in-memory session when persistence fails', () => {
    const auth = useAuthStore()
    const token = createToken({ sub: '42', role: 'admin', exp: 2_000_000_000 })

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => {
          throw new Error('Storage unavailable')
        },
      },
    })

    expect(auth.loginWithToken(token)).toBe(false)
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.token).toBeNull()
  })
})
