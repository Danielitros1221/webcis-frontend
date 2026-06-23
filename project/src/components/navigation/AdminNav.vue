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
  <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
    <RouterLink
      to="/admin"
      class="rounded-md px-4 py-2 text-center text-sm font-medium text-white/90 transition hover:bg-white/10"
    >
      Panel
    </RouterLink>

    <button
      type="button"
      class="rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
      @click="handleLogout"
    >
      Salir
    </button>
  </div>
</template>
