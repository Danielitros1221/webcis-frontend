import { apiGet, apiPost, backendBaseURL } from './api.js'

const AUTH_BASE = '/auth'
const CSRF_COOKIE_ENDPOINT = '/sanctum/csrf-cookie'

async function ensureCsrfCookie() {
  await apiGet(CSRF_COOKIE_ENDPOINT, { baseURL: backendBaseURL })
}

async function authPost(endpoint, payload) {
  await ensureCsrfCookie()
  const url = `${AUTH_BASE}${endpoint}`
  if (payload === undefined) return apiPost(url)
  return apiPost(url, payload)
}

function toPayload(value, key) {
  if (value && typeof value === 'object') return value
  return { [key]: value }
}

export async function login({ email, username, pass, role }) {
  if (!pass) {
    throw {
      status: 0,
      message: "Falta el campo Contraseña.",
      data: null,
      isNetworkError: false,
    }
  }
  if (!role) {
    throw {
      status: 0,
      message: 'Falta el campo "rol".',
      data: null,
      isNetworkError: false,
    }
  }

  const identifier = email ?? username
  if (!identifier) {
    throw {
      status: 0,
      message: "Debes ingresar Correo o Nombre de Usuario",
      data: null,
      isNetworkError: false,
    }
  }

  const payload = {
    identifier,
    pass,
    role,
  }

  return authPost('/login', payload)
}

export async function getCurrentUser() {
  return apiGet('/user')
}

export async function logout() {
  return authPost('/logout')
}

export async function sendVerificationEmail(payload) {
  return authPost('/send-verification-email', toPayload(payload, 'email'))
}

export async function confirmVerificationEmail(payload) {
  return authPost('/confirm-verification-email', toPayload(payload, 'token'))
}

export async function register(payload) {
  return authPost('/register', payload)
}

export async function forgotPassword(payload) {
  return authPost('/forgot-password', toPayload(payload, 'email'))
}

export async function validateResetToken(payload) {
  return authPost('/validate-reset-token', toPayload(payload, 'token'))
}

export async function resetPassword(payload) {
  return authPost('/reset-password', payload)
}
