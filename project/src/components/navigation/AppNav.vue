<script setup>
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
  await auth.logout()
  await router.push('/')
}
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
    <RouterLink
      to="/app"
      class="rounded-md px-3 py-2 text-center text-sm font-medium text-white/90 transition hover:bg-white/10"
    >
      Mis cursos
    </RouterLink>
    <RouterLink
      to="/app/explorer"
      class="rounded-md px-3 py-2 text-center text-sm font-medium text-white/90 transition hover:bg-white/10"
    >
      Explorar cursos
    </RouterLink>
    <RouterLink
      to="/app/repository"
      class="rounded-md px-3 py-2 text-center text-sm font-medium text-white/90 transition hover:bg-white/10"
    >
      Repositorio digital
    </RouterLink>

    <button
      type="button"
      class="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
      @click="handleLogout"
    >
      Cerrar sesión
    </button>
  </div>
</template>
