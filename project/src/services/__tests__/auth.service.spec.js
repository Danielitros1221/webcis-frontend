import { beforeEach, describe, expect, it, vi } from 'vitest'

import { apiGet, apiPost, backendBaseURL } from '@/services/api.js'
import { getCurrentUser, login, logout } from '@/services/auth.service.js'

vi.mock('@/services/api.js', () => ({
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  backendBaseURL: 'http://localhost:8000',
}))

describe('auth service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('gets the CSRF cookie before posting the login', async () => {
    vi.mocked(apiGet).mockResolvedValue(undefined)
    vi.mocked(apiPost).mockResolvedValue({ user: { id: 1 } })

    await login({ email: 'ana@example.com', pass: 'secret', role: 'alumno' })

    expect(apiGet).toHaveBeenCalledWith('/sanctum/csrf-cookie', {
      baseURL: backendBaseURL,
    })
    expect(apiPost).toHaveBeenCalledWith('/auth/login', {
      identifier: 'ana@example.com',
      pass: 'secret',
      role: 'alumno',
    })
    expect(apiGet.mock.invocationCallOrder[0]).toBeLessThan(apiPost.mock.invocationCallOrder[0])
  })

  it('uses the protected user and logout endpoints', async () => {
    await getCurrentUser()
    await logout()

    expect(apiGet).toHaveBeenCalledWith('/user')
    expect(apiPost).toHaveBeenCalledWith('/auth/logout')
  })
})
