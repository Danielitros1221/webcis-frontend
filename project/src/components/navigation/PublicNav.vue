<script setup>
import { RouterLink} from "vue-router";
</script>

<template>
  <div class="flex items-center gap-3">
    <RouterLink to="/login" class="text-white bg-acento px-5 py-1 rounded-lg hover:bg-yellow-500 transition">
      Iniciar Sesión
    </RouterLink>
    <RouterLink to="/register" class="text-white bg-acento px-5 py-1 rounded-lg hover:bg-yellow-500 transition">
      Registrarse
    </RouterLink>
  </div>
</template>

<style scoped>

</style>
