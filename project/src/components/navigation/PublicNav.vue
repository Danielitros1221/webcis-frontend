<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
    <RouterLink
      to="/login"
      class="rounded-xl border border-acento px-5 py-2.5 text-center text-sm font-semibold text-acento transition hover:bg-acento/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
    >
      Iniciar Sesión
    </RouterLink>
    <RouterLink
      to="/register"
      class="rounded-xl bg-acento px-5 py-2.5 text-center text-sm font-bold text-[#2a1a00] transition hover:brightness-105 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
    >
      Registrarse
    </RouterLink>
  </div>
</template>
