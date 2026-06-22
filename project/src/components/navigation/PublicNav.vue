<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
    <RouterLink
      to="/login"
      class="rounded-md px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10"
    >
      Iniciar sesión
    </RouterLink>
    <RouterLink
      to="/register"
      class="rounded-md bg-acento px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-yellow-500"
    >
      Registrarse
    </RouterLink>
  </div>
</template>
