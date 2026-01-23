import axios from 'axios'
import { useAuthStore} from "@/stores/auth.js";

const baseURL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

function normalizeError(error) {
  const status = error?.response?.status ?? 0
  const data = error?.response?.data
  const message =
    data?.message ||
    data?.error ||
    data?.message ||
    "Error de red o del servidor";

  return {
    status,
    message,
    data,
    isNetworkError: !error?.response,
  }
}


api.interceptors.request.use((config) => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
},
  (error) => Promise.reject(normalizeError(error))
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeError(error)

    if (normalized.status === 401) {
      const auth = useAuthStore()
      auth.logout()
    }
    return Promise.reject(normalized)
  }
)

export async function apiGet(url, config) {
  const res = await api.get(url, config)
  return res.data
}

export async function apiPost(url, body, config) {
  const res = await api.post(url, body, config)
  return res.data
}

export async function apiPut(url, body, config) {
  const res = await api.put(url, body, config)
  return res.data
}

export async function apiPatch(url, body, config) {
  const res = await api.patch(url, body, config)
  return res.data
}

export async function apiDelete(url, config) {
  const res = await api.delete(url, config)
  return res.data
}
