import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { authNavigationGuard } from '@/router'
import { useAuthStore } from '@/stores/auth'

function createStorageMock() {
  const values = new Map()

  return {
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

function routeWithMeta(meta = {}) {
  return { meta }
}

describe('auth navigation guard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createStorageMock(),
    })
  })

  it('redirects anonymous users away from protected routes', () => {
    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true }))).toEqual({ path: '/login' })
  })

  it('redirects authenticated users away from guest routes', () => {
    const auth = useAuthStore()
    const token = createToken({ sub: '1', role: 'alumno', exp: 2_000_000_000 })
    auth.loginWithToken(token)

    expect(authNavigationGuard(routeWithMeta({ guest: true }))).toEqual({ path: '/app' })
  })

  it('keeps non-admin users out of admin routes', () => {
    const auth = useAuthStore()
    const token = createToken({ sub: '1', role: 'alumno', exp: 2_000_000_000 })
    auth.loginWithToken(token)

    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true, requiresAdmin: true }))).toEqual({ path: '/app' })
  })

  it('allows admin users into admin routes', () => {
    const auth = useAuthStore()
    const token = createToken({ sub: '1', role: 'admin', exp: 2_000_000_000 })
    auth.loginWithToken(token)

    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true, requiresAdmin: true }))).toBe(true)
  })

  it('clears expired sessions before redirecting', () => {
    const auth = useAuthStore()
    auth.token = createToken({ sub: '1', role: 'admin', exp: 1 })

    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true }))).toEqual({ path: '/login' })
    expect(auth.token).toBeNull()
    expect(auth.user).toBeNull()
  })
})
