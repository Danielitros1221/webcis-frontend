<script setup>
import PublicNav from "@/components/navigation/PublicNav.vue";
import AppNav from "@/components/navigation/AppNav.vue";
import AdminNav from "@/components/navigation/AdminNav.vue";

defineProps({
  variant: {
    type: String,
    default: 'public',
    validator: (value) => ['public', 'app', 'admin'].includes(value),
  },
})
</script>
<template>
  <nav class=" font-poppins flex items-center justify-between h-16 w-screen bg-[#193A68] shadow-lg px-5">
    <RouterLink to="/">
      <img src="@/assets/images/Logo.png" alt="WebCISLogo" class="h-22 w-auto">
    </RouterLink>
    <div class="flex space-x-4">

      <PublicNav v-if="variant === 'public'" />
      <AppNav v-else-if="variant === 'app'" />
      <AdminNav v-else-if="variant === 'admin'" />
      <PublicNav v-else />

    </div>
  </nav>
</template>

<style scoped>
</style>
