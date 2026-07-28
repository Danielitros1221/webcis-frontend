import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getDashboard,
  login as requestLogin,
  logout as requestLogout,
} from '@/services/auth.service'
import { useDashboardStore } from '@/stores/dashboard'

// GET /dashboard devuelve { user: {...}, medals, progress, recent_courses }
// (confirmado en el backend, rama dev: DashboardController::index()). El
// objeto `user` viene de UserResource.
function userFromResponse(response) {
  return response?.user ?? response?.data?.user ?? response?.data ?? response ?? null
}

// UserType (backend): Student=0, Professor=1, Extern=2, Admin=3. UserResource
// serializa el rol como `type` con el nombre del case ("Student", ...). Se
// conservan `user_role`/`role`/`rol` como fallback tolerante por si el shape
// vuelve a cambiar, y el int crudo por si algún endpoint futuro lo manda así.
const USER_ROLES_BY_TYPE = ['student', 'professor', 'extern', 'admin']

function normalizeUserRole(value) {
  if (typeof value === 'number') return USER_ROLES_BY_TYPE[value] ?? null

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    return USER_ROLES_BY_TYPE.includes(normalized) ? normalized : null
  }

  return null
}

export function normalizeServerUser(serverUser) {
  if (!serverUser || typeof serverUser !== 'object') return null

  const username = serverUser.username ?? null
  if (!username) return null

  return {
    // /dashboard no expone id todavía; se conserva por si lo agregan.
    id: serverUser.id ?? null,
    username,
    role: normalizeUserRole(
      serverUser.type ?? serverUser.user_role ?? serverUser.role ?? serverUser.rol,
    ),
    name: serverUser.name ?? serverUser.nombre ?? username,
    email: serverUser.email ?? null,
    surname: serverUser.surname ?? null,
    secondSurname: serverUser.second_surname ?? null,
    profile: serverUser.profile ?? null,
    createdAt: serverUser.created_at ?? null,
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  // Bandera temporal: si /dashboard no responde (rama de backend todavía sin
  // desplegar, o falla por otra razón) tras un login exitoso, esta bandera
  // permite que isAuthenticated sea true igual, sin `user` poblado.
  const sessionConfirmed = ref(false)
  // Marca si ya se intentó verificar la sesión contra /dashboard en esta
  // carga de la app (éxito o fallo). El guard del router la usa para no
  // repetir la llamada al backend en cada navegación entre rutas protegidas.
  const sessionChecked = ref(false)

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
      const response = await getDashboard()
      // Misma respuesta trae medals/progress/recent_courses; se reparte al
      // store de dashboard aquí para no duplicar la llamada a GET /dashboard.
      useDashboardStore().setDashboardData(response)
      return setUser(userFromResponse(response))
    } catch {
      clearSession()
      useDashboardStore().clear()
      return false
    } finally {
      sessionChecked.value = true
    }
  }

  async function login(credentials) {
    const response = await requestLogin(credentials)
    const responseUser = userFromResponse(response)

    if (responseUser && setUser(responseUser)) return response

    if (await refreshSession()) return response

    // /dashboard no confirmó un usuario (todavía sin desplegar, o sin los
    // campos esperados), pero el login en sí fue exitoso (POST /auth/login
    // respondió 200). No bloqueamos al usuario: marcamos la sesión como
    // confirmada para que los guards de requiresAuth dejen pasar. `role`
    // quedará null hasta que /dashboard responda con datos reales.
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
      useDashboardStore().clear()
    }
  }

  return {
    user,
    isAuthenticated,
    role,
    sessionChecked,
    clearSession,
    setUser,
    refreshSession,
    login,
    logout,
  }
})
