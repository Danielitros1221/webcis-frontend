import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { getCurrentUser, login, logout } from '@/services/auth.service'
import { normalizeServerUser, useAuthStore } from '@/stores/auth'

vi.mock('@/services/auth.service', () => ({
  getCurrentUser: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
}))

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('normalizes the user fields returned by the server', () => {
    expect(normalizeServerUser({ id: 42, role: 'admin', name: 'Daniel' })).toEqual({
      id: 42,
      role: 'admin',
      name: 'Daniel',
    })

    expect(normalizeServerUser({ id: 7, rol: 'alumno', nombre: 'Ana' })).toEqual({
      id: 7,
      role: 'alumno',
      name: 'Ana',
    })
  })

  it('restores a cookie session using the protected user endpoint', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 42, role: 'admin', name: 'Daniel' })
    const auth = useAuthStore()

    await expect(auth.refreshSession()).resolves.toBe(true)
    expect(auth.user).toEqual({ id: 42, role: 'admin', name: 'Daniel' })
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.role).toBe('admin')
  })

  it('keeps the user anonymous when session verification returns 401', async () => {
    vi.mocked(getCurrentUser).mockRejectedValue({ status: 401 })
    const auth = useAuthStore()
    auth.setUser({ id: 42, role: 'admin', name: 'Daniel' })

    await expect(auth.refreshSession()).resolves.toBe(false)
    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
  })

  it('logs in with the server user and never writes an auth token', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    vi.mocked(login).mockResolvedValue({
      user: { id: 7, rol: 'alumno', nombre: 'Ana' },
    })
    const auth = useAuthStore()

    await auth.login({ email: 'ana@example.com', pass: 'secret', role: 'alumno' })

    expect(auth.user).toEqual({ id: 7, role: 'alumno', name: 'Ana' })
    expect(setItem).not.toHaveBeenCalled()
  })

  it('fetches the user when the login response does not include it', async () => {
    vi.mocked(login).mockResolvedValue({ message: 'Authenticated' })
    vi.mocked(getCurrentUser).mockResolvedValue({ data: { id: 8, role: 'profesor', name: 'Luis' } })
    const auth = useAuthStore()

    await auth.login({ username: 'luis', pass: 'secret', role: 'profesor' })

    expect(getCurrentUser).toHaveBeenCalledOnce()
    expect(auth.user).toEqual({ id: 8, role: 'profesor', name: 'Luis' })
  })

  it('calls the backend logout and always clears local state', async () => {
    vi.mocked(logout).mockRejectedValue({ status: 500 })
    const auth = useAuthStore()
    auth.setUser({ id: 42, role: 'admin', name: 'Daniel' })

    await expect(auth.logout()).resolves.toBe(false)
    expect(logout).toHaveBeenCalledOnce()
    expect(auth.user).toBeNull()
  })
})
