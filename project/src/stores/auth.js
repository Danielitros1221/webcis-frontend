import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function decodeJwt (token) {
  const payload = token.split('.')[1]
  const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(decoded)
}

function isTokenExpired (payload) {
  if (!payload?.expires) return true
  const now = Math.floor(Date.now() / 1000)
  return payload.expires <= now
}

export const useAuthStore = defineStore('auth',() => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const role = computed(() => user.value?.rol ?? null)

  function initFromStorage() {
    const stored = localStorage.getItem('token')
    if (!stored) {
      token.value = null
      user.value = null
      return
    }

    try {
      const payload = decodeJwt(stored)

      if (isTokenExpired(payload)) {
        logout()
        return
      }

      token.value = stored
      user.value = { //Verificar, pues aquí estamos aterrizando los valores del payload
        id: payload.id,
        rol: payload.rol,
        nombre: payload.nombre,
        exp: payload.exp,
      }
    } catch (e) {
      logout()
    }
  }
  function loginWithToken(newToken){
    localStorage.setItem('token', newToken)
    token.value = newToken
    initFromStorage()
  }

  function logout() {
    localStorage.removeItem('token')
    token.value = null
    user.value = null
  }

  function ensureValidSession() {
    if (!token.value) return false
    try {
      const payload = decodeJwt(token.value)
      if (isTokenExpired(payload)) {
        logout()
        return false
      }
      return true
    } catch (e) {
      logout()
      return false
    }
  }

  return {
    token,
    user,

    isAuthenticated,
    role,

    initFromStorage,
    logout,
    loginWithToken,
    ensureValidSession,
  }
})
