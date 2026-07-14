import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { authNavigationGuard } from '@/router'
import { getDashboard } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth'

vi.mock('@/services/auth.service', () => ({
  getDashboard: vi.fn(),
}))

function routeWithMeta(meta = {}) {
  return { meta }
}

describe('auth navigation guard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('redirects anonymous users away from protected routes', async () => {
    vi.mocked(getDashboard).mockRejectedValue({ status: 401 })

    await expect(authNavigationGuard(routeWithMeta({ requiresAuth: true }))).resolves.toEqual({
      path: '/login',
    })
  })

  it('verifies the session against the backend on first entry to a protected route', async () => {
    vi.mocked(getDashboard).mockResolvedValue({ username: 'ana', user_role: 0 })
    const auth = useAuthStore()

    await expect(authNavigationGuard(routeWithMeta({ requiresAuth: true }))).resolves.toBe(true)
    expect(getDashboard).toHaveBeenCalledOnce()
    expect(auth.isAuthenticated).toBe(true)
  })

  it('does not re-check the backend on later navigations once the session was verified', async () => {
    vi.mocked(getDashboard).mockResolvedValue({ username: 'ana', user_role: 0 })

    await authNavigationGuard(routeWithMeta({ requiresAuth: true }))
    await authNavigationGuard(routeWithMeta({ requiresAuth: true }))

    expect(getDashboard).toHaveBeenCalledOnce()
  })

  it('redirects authenticated users away from guest routes', async () => {
    const auth = useAuthStore()
    auth.setUser({ username: 'ana', user_role: 0 })

    await expect(authNavigationGuard(routeWithMeta({ guest: true }))).resolves.toEqual({
      path: '/app',
    })
  })

  it('keeps non-admin users out of admin routes', async () => {
    vi.mocked(getDashboard).mockResolvedValue({ username: 'ana', user_role: 0 })

    await expect(
      authNavigationGuard(routeWithMeta({ requiresAuth: true, requiresAdmin: true })),
    ).resolves.toEqual({ path: '/app' })
  })

  it('allows admin users into admin routes', async () => {
    vi.mocked(getDashboard).mockResolvedValue({ username: 'daniel', user_role: 3 })

    await expect(
      authNavigationGuard(routeWithMeta({ requiresAuth: true, requiresAdmin: true })),
    ).resolves.toBe(true)
  })
})
