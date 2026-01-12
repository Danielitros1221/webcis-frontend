<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex items-center gap-3">
    <RouterLink to="/admin" class="text-white/90 hover:text-white transition">
      Panel
    </RouterLink>

    <button
      type="button"
      class="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 transition"
      @click="handleLogout"
    >
      Salir
    </button>

  </div>
</template>

