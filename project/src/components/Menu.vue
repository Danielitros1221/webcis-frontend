<script setup>
import PublicNav from "@/components/navigation/PublicNav.vue";
import AppNav from "@/components/navigation/AppNav.vue";
import AdminNav from "@/components/navigation/AdminNav.vue";
import {useAuthStore} from "@/stores/auth.js";
import {computed} from "vue";

const props = defineProps({
  variant: {
    type: String, // aquí entran las 3 opciones public, app y admin
    default: 'public',
  }
})

const auth = useAuthStore()
const isAdmin = computed(() => auth.rol === 'admin')

</script>
<template>
  <nav class=" font-poppins flex items-center justify-between h-16 w-screen bg-[#193A68] shadow-lg px-5">
    <RouterLink to="/">
      <img src="@/assets/images/Logo.png" alt="WebCISLogo" class="h-22 w-auto">
    </RouterLink>
    <div class="flex space-x-4">

      <PublicNav v-if="variant === 'public'" />
      <!-- :is-admin="isAdmin" añade esto a la etiqueta AppNav cuando un admin pueda entrar a App -->
      <AppNav v-else-if="variant === 'app'" />
      <AdminNav v-else-if="variant === 'admin'" />
      <PublicNav v-else />

    </div>
  </nav>
</template>

<style scoped>
</style>
