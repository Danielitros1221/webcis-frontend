<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  isAdmin: { type: Boolean, default: false },
})

const router = useRouter()
const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  router.push('/') // como definiste: vuelve a la bienvenida al salir
}

</script>

<template>
  <div class="flex items-center gap-3">
    <RouterLink to="/app" class="text-white bg-acento px-5 py-1 rounded-lg hover:bg-yellow-500 transition">
      Mis Cursos
    </RouterLink>
    <RouterLink to="/app/explorer" class="text-white bg-acento px-5 py-1 rounded-lg hover:bg-yellow-500 transition">
      Explorar Cursos
    </RouterLink>
    <RouterLink to="/app/repository" class="text-white bg-acento px-5 py-1 rounded-lg hover:bg-yellow-500 transition">
      Repositorio Digital
    </RouterLink>

    <button
      type="button"
      class="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 transition"
      @click="handleLogout"
    >
      Cerrar Sesión
    </button>

  </div>
</template>

<style scoped>

</style>
