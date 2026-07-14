import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { getDashboard, login, logout } from '@/services/auth.service'
import { normalizeServerUser, useAuthStore } from '@/stores/auth'

vi.mock('@/services/auth.service', () => ({
  getDashboard: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
}))

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('normalizes the user fields returned by /dashboard, accepting user_role as int or string', () => {
    expect(normalizeServerUser({ username: 'dmorales', user_role: 3 })).toEqual({
      id: null,
      username: 'dmorales',
      role: 'admin',
      name: 'dmorales',
    })

    expect(normalizeServerUser({ username: 'ana', user_role: 'Student' })).toEqual({
      id: null,
      username: 'ana',
      role: 'student',
      name: 'ana',
    })
  })

  it('falls back to a null role when user_role is missing or unrecognized', () => {
    expect(normalizeServerUser({ username: 'ana' }).role).toBeNull()
    expect(normalizeServerUser({ username: 'ana', user_role: 99 }).role).toBeNull()
  })

  it('requires a username to consider the payload a valid user', () => {
    expect(normalizeServerUser({ user_role: 0 })).toBeNull()
  })

  it('restores a cookie session using the protected dashboard endpoint', async () => {
    vi.mocked(getDashboard).mockResolvedValue({ username: 'dmorales', user_role: 3 })
    const auth = useAuthStore()

    await expect(auth.refreshSession()).resolves.toBe(true)
    expect(auth.user).toEqual({ id: null, username: 'dmorales', role: 'admin', name: 'dmorales' })
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.role).toBe('admin')
    expect(auth.sessionChecked).toBe(true)
  })

  it('keeps the user anonymous when session verification returns 401', async () => {
    vi.mocked(getDashboard).mockRejectedValue({ status: 401 })
    const auth = useAuthStore()
    auth.setUser({ username: 'dmorales', user_role: 3 })

    await expect(auth.refreshSession()).resolves.toBe(false)
    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.sessionChecked).toBe(true)
  })

  it('logs in with the server user and never writes an auth token', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    vi.mocked(login).mockResolvedValue({
      user: { username: 'ana', user_role: 0 },
    })
    const auth = useAuthStore()

    await auth.login({ email: 'ana@example.com', pass: 'secret', role: 'alumno' })

    expect(auth.user).toEqual({ id: null, username: 'ana', role: 'student', name: 'ana' })
    expect(setItem).not.toHaveBeenCalled()
  })

  it('fetches the dashboard profile when the login response does not include it', async () => {
    vi.mocked(login).mockResolvedValue({ message: 'Authenticated' })
    vi.mocked(getDashboard).mockResolvedValue({ data: { username: 'luis', user_role: 1 } })
    const auth = useAuthStore()

    await auth.login({ username: 'luis', pass: 'secret', role: 'profesor' })

    expect(getDashboard).toHaveBeenCalledOnce()
    expect(auth.user).toEqual({ id: null, username: 'luis', role: 'professor', name: 'luis' })
  })

  it('confirms the session without a profile when /dashboard is not reachable yet (404)', async () => {
    vi.mocked(login).mockResolvedValue({ message: 'Successful login' })
    vi.mocked(getDashboard).mockRejectedValue({ status: 404 })
    const auth = useAuthStore()

    await auth.login({ email: 'ana@example.com', pass: 'secret', role: 'alumno' })

    expect(auth.user).toBeNull()
    expect(auth.role).toBeNull()
    expect(auth.isAuthenticated).toBe(true)
  })

  it('calls the backend logout and always clears local state', async () => {
    vi.mocked(logout).mockRejectedValue({ status: 500 })
    const auth = useAuthStore()
    auth.setUser({ username: 'dmorales', user_role: 3 })

    await expect(auth.logout()).resolves.toBe(false)
    expect(logout).toHaveBeenCalledOnce()
    expect(auth.user).toBeNull()
  })
})
