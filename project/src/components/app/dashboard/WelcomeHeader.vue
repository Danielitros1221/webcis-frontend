<script setup>
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const firstName = computed(() => auth.user?.name?.split(' ')[0] ?? 'usuario')
</script>

<template>
  <div>
    <p class="font-display text-lg font-semibold text-white/60">
      Hola, {{ firstName }} 👋
    </p>
    <h1 class="mt-1 font-display text-4xl font-bold text-white">
      Tu panel de estudio
    </h1>
  </div>
</template>
