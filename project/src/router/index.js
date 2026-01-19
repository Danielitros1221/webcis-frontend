import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [
        { path: '', component: () => import('@/views/public/HomeView.vue') },
        { path: 'login', component: () => import('@/views/public/LoginView.vue'), meta: { guest: true } },
        { path: 'register', component: () => import('@/views/public/RegisterView.vue'), meta: { guest: true } },
        { path: 'register/verify', component: () => import('@/views/public/RegisterView.vue'), meta: { guest: true } },
        { path: 'recover', component: () => import('@/views/public/RecoverView.vue'), meta: { guest: true } },
      ]
    },
    {
      path: '/app',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', component: () => import('@/views/app/MyCoursesView.vue') },
        //{ path: 'explorer', component: () => import('@/views/ExplorarView.vue') },
        //{ path: 'repository', component: () => import('@/views/RepositorioView.vue') },
      ]
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: '', component: () => import('@/views/admin/AdminDashboard.vue') },
        // otras rutas /admin/...
      ]
    }
  ]
})

//Comentario de Luis Daniel, revisar cuando el Back confirme cómo y qué elementos van a enviar en el token
// de momento solo se trabaja suponiendo que:
// {
// Regla 1: El usuario no puede entrar a rutas privadas sin token
// Regla 2: Un usuario autenticado no vuelve a login/registro
// Regla 3: Un usuario no-admin no entra al panel admin
// }

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (!auth.user && auth.token) auth.initFromStorage()

  const isGuestRoute = !!to.meta.guest
  const isPublicRoute = !!to.meta.public
  const needsAuth = !!to.meta.requiresAuth
  const needsAdmin = !!to.meta.requiresAdmin

  //Verifica validez del token siempre antes de navegar.
  if (auth.token && !auth.ensureValidSession()) {
    return {path: '/login'}
  }

  //Reglas de Navegación
  if (needsAuth && !auth.isAuthenticated) return { path: '/login' }
  if (isGuestRoute && auth.isAuthenticated) return { path: '/app' }
  if (needsAdmin && auth.role !== 'admin') return { path: '/app' }
  if (isPublicRoute && auth.isAuthenticated) return { path: '/app' }

  next()
})

export default router
