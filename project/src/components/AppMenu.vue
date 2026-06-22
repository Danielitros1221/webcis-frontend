<script setup>
import { ref } from 'vue'

import AdminNav from '@/components/navigation/AdminNav.vue'
import AppNav from '@/components/navigation/AppNav.vue'
import PublicNav from '@/components/navigation/PublicNav.vue'

defineProps({
  variant: {
    type: String,
    default: 'public',
    validator: (value) => ['public', 'app', 'admin'].includes(value),
  },
})

const mobileOpen = ref(false)
</script>

<template>
  <nav class="relative z-30 w-full bg-[#193A68] shadow-lg" aria-label="Navegación principal">
    <div class="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="shrink-0 py-2" aria-label="Ir al inicio de WebCIS">
        <img
          src="@/assets/images/Logo.png"
          alt="WebCIS"
          width="1077"
          height="719"
          class="h-14 w-auto"
        >
      </RouterLink>

      <button
        type="button"
        class="flex size-11 items-center justify-center rounded-md border border-white/30 text-3xl leading-none text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
        :aria-expanded="mobileOpen"
        aria-controls="primary-navigation"
        :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        :title="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="mobileOpen = !mobileOpen"
      >
        <span aria-hidden="true">{{ mobileOpen ? '×' : '☰' }}</span>
      </button>

      <div
        id="primary-navigation"
        data-test="primary-navigation"
        class="absolute left-0 right-0 top-full border-t border-white/15 bg-[#193A68] px-4 py-3 shadow-lg md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        :class="mobileOpen ? 'block' : 'hidden'"
        @click="mobileOpen = false"
      >
        <PublicNav v-if="variant === 'public'" />
        <AppNav v-else-if="variant === 'app'" />
        <AdminNav v-else-if="variant === 'admin'" />
        <PublicNav v-else />
      </div>
    </div>
  </nav>
</template>
