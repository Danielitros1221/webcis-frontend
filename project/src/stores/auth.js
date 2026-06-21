import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const TOKEN_STORAGE_KEY = 'token'

function getBrowserStorage() {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function readStoredToken() {
  try {
    return getBrowserStorage()?.getItem(TOKEN_STORAGE_KEY) || null
  } catch {
    return null
  }
}

function persistToken(token) {
  try {
    const storage = getBrowserStorage()
    if (!storage) return false

    storage.setItem(TOKEN_STORAGE_KEY, token)
    return true
  } catch {
    return false
  }
}

function removeStoredToken() {
  try {
    getBrowserStorage()?.removeItem(TOKEN_STORAGE_KEY)
  } catch {
    // La sesion en memoria se limpia aunque el storage no este disponible.
  }
}

export function decodeJwt(token) {
  if (typeof token !== 'string') throw new TypeError('El token debe ser una cadena.')

  const parts = token.split('.')
  if (parts.length !== 3 || !parts[1]) throw new Error('El token JWT no tiene un formato valido.')

  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))

  return JSON.parse(new TextDecoder().decode(bytes))
}

export function isTokenExpired(payload) {
  if (!Number.isFinite(payload?.exp)) return true

  return payload.exp <= Math.floor(Date.now() / 1000)
}

export function normalizeJwtUser(payload) {
  return {
    id: payload.sub ?? payload.id ?? null,
    role: payload.role ?? payload.rol ?? null,
    name: payload.name ?? payload.nombre ?? null,
    exp: payload.exp,
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref(null)

  const isAuthenticated = computed(() => Boolean(token.value && user.value))
  const role = computed(() => user.value?.role ?? null)

  function clearSession() {
    token.value = null
    user.value = null
  }

  function setSession(candidateToken, { persist = false } = {}) {
    const payload = decodeJwt(candidateToken)
    if (isTokenExpired(payload)) throw new Error('El token JWT ha expirado.')

    token.value = candidateToken
    user.value = normalizeJwtUser(payload)

    if (persist && !persistToken(candidateToken)) {
      clearSession()
      throw new Error('No se pudo guardar la sesion en el navegador.')
    }
  }

  function initFromStorage() {
    const storedToken = readStoredToken()
    if (!storedToken) {
      clearSession()
      return false
    }

    try {
      setSession(storedToken)
      return true
    } catch {
      logout()
      return false
    }
  }

  function loginWithToken(newToken) {
    try {
      setSession(newToken, { persist: true })
      return true
    } catch {
      logout()
      return false
    }
  }

  function logout() {
    removeStoredToken()
    clearSession()
  }

  function ensureValidSession() {
    if (!token.value) return false

    try {
      setSession(token.value)
      return true
    } catch {
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
