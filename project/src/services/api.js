import axios from 'axios'

import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function normalizeApiError(error) {
  const status = error?.response?.status ?? 0
  const data = error?.response?.data

  return {
    status,
    message: data?.message || data?.error || error?.message || 'Error de red o del servidor',
    data,
    isNetworkError: !error?.response,
  }
}

api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()

    if (auth.token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
  },
  (error) => Promise.reject(normalizeApiError(error)),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const normalized = normalizeApiError(error)

    if (normalized.status === 401) {
      const auth = useAuthStore()
      auth.logout()

      if (router.currentRoute.value.meta.requiresAuth) {
        await router.replace({ path: '/login' })
      }
    }

    return Promise.reject(normalized)
  },
)

export async function apiGet(url, config) {
  const response = await api.get(url, config)
  return response.data
}

export async function apiPost(url, body, config) {
  const response = await api.post(url, body, config)
  return response.data
}

export async function apiPut(url, body, config) {
  const response = await api.put(url, body, config)
  return response.data
}

export async function apiPatch(url, body, config) {
  const response = await api.patch(url, body, config)
  return response.data
}

export async function apiDelete(url, config) {
  const response = await api.delete(url, config)
  return response.data
}
