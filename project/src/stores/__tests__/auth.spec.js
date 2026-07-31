import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { getDashboard, login, logout } from '@/services/auth.service'
import { normalizeServerUser, useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'

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

  it('normalizes the full user profile returned by /dashboard (user.type as the role source)', () => {
    expect(
      normalizeServerUser({
        username: 'dmorales',
        type: 'Admin',
        email: 'dmorales@webcis.test',
        surname: 'Morales',
        second_surname: 'Lopez',
        profile: null,
        created_at: '2026-07-28T01:52:09+00:00',
      }),
    ).toEqual({
      id: null,
      username: 'dmorales',
      role: 'admin',
      name: 'dmorales',
      email: 'dmorales@webcis.test',
      surname: 'Morales',
      secondSurname: 'Lopez',
      profile: null,
      createdAt: '2026-07-28T01:52:09+00:00',
    })
  })

  it('falls back to user_role/role/rol when type is absent (old-shape tolerance)', () => {
    expect(normalizeServerUser({ username: 'dmorales', user_role: 3 })).toEqual({
      id: null,
      username: 'dmorales',
      role: 'admin',
      name: 'dmorales',
      email: null,
      surname: null,
      secondSurname: null,
      profile: null,
      createdAt: null,
    })

    expect(normalizeServerUser({ username: 'ana', user_role: 'Student' })).toEqual({
      id: null,
      username: 'ana',
      role: 'student',
      name: 'ana',
      email: null,
      surname: null,
      secondSurname: null,
      profile: null,
      createdAt: null,
    })
  })

  it('falls back to a null role when type/user_role is missing or unrecognized', () => {
    expect(normalizeServerUser({ username: 'ana' }).role).toBeNull()
    expect(normalizeServerUser({ username: 'ana', type: 'Unknown' }).role).toBeNull()
    expect(normalizeServerUser({ username: 'ana', user_role: 99 }).role).toBeNull()
  })

  it('requires a username to consider the payload a valid user', () => {
    expect(normalizeServerUser({ type: 'Student' })).toBeNull()
  })

  it('restores a cookie session using the protected dashboard endpoint and populates the dashboard store', async () => {
    vi.mocked(getDashboard).mockResolvedValue({
      user: { username: 'dmorales', type: 'Admin' },
      medals: 3,
      progress: 42.5,
      recent_courses: [
        {
          token: '000000000001',
          title: 'Laravel desde Cero: El framework moderno de PHP',
          short_title: 'Laravel desde cero',
          icon: null,
          last_accessed_at: '2026-07-27 23:52:09',
        },
      ],
    })
    const auth = useAuthStore()
    const dashboard = useDashboardStore()

    await expect(auth.refreshSession()).resolves.toBe(true)
    expect(auth.user).toMatchObject({ username: 'dmorales', role: 'admin' })
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.role).toBe('admin')
    expect(auth.sessionChecked).toBe(true)

    expect(dashboard.medals).toBe(3)
    expect(dashboard.progress).toBe(42.5)
    expect(dashboard.recentCourses).toEqual([
      {
        token: '000000000001',
        title: 'Laravel desde Cero: El framework moderno de PHP',
        shortTitle: 'Laravel desde cero',
        icon: null,
        lastAccessedAt: '2026-07-27 23:52:09',
      },
    ])
    expect(dashboard.loaded).toBe(true)
  })

  it('keeps the user anonymous and clears the dashboard store when session verification returns 401', async () => {
    vi.mocked(getDashboard).mockRejectedValue({ status: 401 })
    const auth = useAuthStore()
    const dashboard = useDashboardStore()
    auth.setUser({ username: 'dmorales', type: 'Admin' })
    dashboard.setDashboardData({ medals: 1, progress: 10, recent_courses: [] })

    await expect(auth.refreshSession()).resolves.toBe(false)
    expect(auth.user).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.sessionChecked).toBe(true)
    expect(dashboard.loaded).toBe(false)
    expect(dashboard.medals).toBeNull()
  })

  it('logs in with the server user and never writes an auth token', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    vi.mocked(login).mockResolvedValue({
      user: { username: 'ana', type: 'Student' },
    })
    const auth = useAuthStore()

    await auth.login({ email: 'ana@example.com', pass: 'secret', role: 'alumno' })

    expect(auth.user).toMatchObject({ username: 'ana', role: 'student' })
    expect(setItem).not.toHaveBeenCalled()
  })

  it('fetches the dashboard profile when the login response does not include it', async () => {
    vi.mocked(login).mockResolvedValue({ message: 'Authenticated' })
    vi.mocked(getDashboard).mockResolvedValue({
      user: { username: 'luis', type: 'Professor' },
      medals: 0,
      progress: 0,
      recent_courses: [],
    })
    const auth = useAuthStore()

    await auth.login({ username: 'luis', pass: 'secret', role: 'profesor' })

    expect(getDashboard).toHaveBeenCalledOnce()
    expect(auth.user).toMatchObject({ username: 'luis', role: 'professor' })
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

  it('calls the backend logout and always clears local state, including the dashboard store', async () => {
    vi.mocked(logout).mockRejectedValue({ status: 500 })
    const auth = useAuthStore()
    const dashboard = useDashboardStore()
    auth.setUser({ username: 'dmorales', type: 'Admin' })
    dashboard.setDashboardData({ medals: 2, progress: 20, recent_courses: [] })

    await expect(auth.logout()).resolves.toBe(false)
    expect(logout).toHaveBeenCalledOnce()
    expect(auth.user).toBeNull()
    expect(dashboard.loaded).toBe(false)
  })
})
