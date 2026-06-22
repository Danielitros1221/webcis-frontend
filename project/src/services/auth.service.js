import { apiGet, apiPost, backendBaseURL } from './api.js'

const AUTH_BASE = '/auth'

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

  await apiGet('/sanctum/csrf-cookie', { baseURL: backendBaseURL })
  return apiPost(`${AUTH_BASE}/login`, payload)
}

export async function getCurrentUser() {
  return apiGet('/user')
}

export async function logout() {
  return apiPost(`${AUTH_BASE}/logout`)
}
