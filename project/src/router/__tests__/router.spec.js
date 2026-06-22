import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { authNavigationGuard } from '@/router'
import { useAuthStore } from '@/stores/auth'

function routeWithMeta(meta = {}) {
  return { meta }
}

describe('auth navigation guard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('redirects anonymous users away from protected routes', () => {
    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true }))).toEqual({ path: '/login' })
  })

  it('redirects authenticated users away from guest routes', () => {
    const auth = useAuthStore()
    auth.setUser({ id: 1, role: 'alumno', name: 'Ana' })

    expect(authNavigationGuard(routeWithMeta({ guest: true }))).toEqual({ path: '/app' })
  })

  it('keeps non-admin users out of admin routes', () => {
    const auth = useAuthStore()
    auth.setUser({ id: 1, role: 'alumno', name: 'Ana' })

    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true, requiresAdmin: true }))).toEqual({ path: '/app' })
  })

  it('allows admin users into admin routes', () => {
    const auth = useAuthStore()
    auth.setUser({ id: 1, role: 'admin', name: 'Daniel' })

    expect(authNavigationGuard(routeWithMeta({ requiresAuth: true, requiresAdmin: true }))).toBe(true)
  })
})
