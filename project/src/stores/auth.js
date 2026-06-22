import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getCurrentUser,
  login as requestLogin,
  logout as requestLogout,
} from '@/services/auth.service'

function userFromResponse(response) {
  return response?.user ?? response?.data?.user ?? response?.data ?? response ?? null
}

export function normalizeServerUser(serverUser) {
  if (!serverUser || typeof serverUser !== 'object') return null

  const user = {
    id: serverUser.id ?? null,
    role: serverUser.role ?? serverUser.rol ?? null,
    name: serverUser.name ?? serverUser.nombre ?? null,
  }

  return user.id === null ? null : user
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => Boolean(user.value))
  const role = computed(() => user.value?.role ?? null)

  function clearSession() {
    user.value = null
  }

  function setUser(serverUser) {
    const normalizedUser = normalizeServerUser(serverUser)
    if (!normalizedUser) {
      clearSession()
      return false
    }

    user.value = normalizedUser
    return true
  }

  async function refreshSession() {
    try {
      const response = await getCurrentUser()
      return setUser(userFromResponse(response))
    } catch {
      clearSession()
      return false
    }
  }

  async function login(credentials) {
    const response = await requestLogin(credentials)
    const responseUser = userFromResponse(response)

    if (responseUser && setUser(responseUser)) return response

    if (!(await refreshSession())) {
      throw new Error('No se pudo obtener el usuario de la sesión.')
    }

    return response
  }

  async function logout() {
    try {
      await requestLogout()
      return true
    } catch {
      return false
    } finally {
      clearSession()
    }
  }

  return {
    user,
    isAuthenticated,
    role,
    clearSession,
    setUser,
    refreshSession,
    login,
    logout,
  }
})
