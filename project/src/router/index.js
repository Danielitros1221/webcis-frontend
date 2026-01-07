import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bienvenida',
      component: () => import('@/views/BienvenidaView.vue'),
      meta: { public: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/app',
      //component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          //component: () => import('@/views/DashboardView.vue')
        }
      ]
    },
    {
      path: '/admin',
      //component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          //component: () => import('@/views/admin/AdminDashboardView.vue')
        }
      ]
    }
  ]
})

//Comentario de Luis Daniel, revisar cuando el Back confirme cómo y qué elementos van a enviar en el token
// de momento solo se trabaja suponiendo que:
// {
//  id:1
//  rol: admin
// }

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  let userRole = null;
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    userRole = payload.role;
  }

  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  if (to.meta.guest && token) {
    return next('/app');
  }

  if (to.meta.requiresAdmin && userRole !== 'admin') {
    return next('/app');
  }

  next()
})

export default router
