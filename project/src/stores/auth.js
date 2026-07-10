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
  // Bandera temporal: el backend confirma el login (200 + mensaje) pero no
  // expone todavía un endpoint de perfil (ver comentario en getCurrentUser,
  // en auth.service.js). Mientras no exista, esta bandera permite que
  // isAuthenticated sea true tras un login válido aunque no tengamos `user`.
  // Quitar cuando el backend agregue GET /user o /me y refreshSession()
  // pueda poblar `user` de verdad.
  const sessionConfirmed = ref(false)

  const isAuthenticated = computed(() => Boolean(user.value) || sessionConfirmed.value)
  const role = computed(() => user.value?.role ?? null)

  function clearSession() {
    user.value = null
    sessionConfirmed.value = false
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

    // refreshSession() intenta GET /user para traer el perfil real. Se deja
    // intacta (no se borra) para cuando el backend agregue ese endpoint;
    // hoy siempre devuelve false porque la ruta no existe (404).
    if (await refreshSession()) return response

    // Sin endpoint de perfil no sabemos rol/nombre todavía, pero el login
    // en sí fue exitoso (POST /auth/login respondió 200). No bloqueamos al
    // usuario: marcamos la sesión como confirmada para que los guards de
    // requiresAuth dejen pasar. `role` seguirá siendo null hasta que exista
    // un endpoint real de perfil.
    sessionConfirmed.value = true
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
