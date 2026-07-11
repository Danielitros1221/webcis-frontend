<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ProgressBar from '@/components/ui/ProgressBar.vue'
import { useAuthStore } from '@/stores/auth'

// `collapsed` deja el layout listo para un futuro modo "rail compacto";
// hoy no se renderiza ningún control para activarlo (sidebar fija únicamente).
defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const auth = useAuthStore()

const canAdmin = computed(() => auth.role === 'admin')

const navItems = computed(() => [
  { label: 'Inicio', to: '/app' },
  { label: 'Cursos', to: '/app/explorer' },
  { label: 'Repositorio', to: '/app/repository' },
  ...(canAdmin.value ? [{ label: 'Administración', to: '/admin' }] : []),
])

function isActive(path) {
  return route.path === path
}
</script>

<template>
  <aside
    class="flex shrink-0 flex-col bg-[#08101e]/90 py-4"
    :class="collapsed ? 'w-[76px]' : 'w-[248px]'"
  >
    <p class="px-4 pb-2 font-body text-[11px] font-semibold uppercase tracking-wider text-white/40">
      Plataforma
    </p>

    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="relative flex items-center gap-3 px-4 py-3 font-display text-sm font-medium text-white/80 hover:bg-white/5"
      :class="{ 'bg-white/10 text-white': isActive(item.to) }"
    >
      <span
        class="absolute inset-y-2 left-0 w-1 rounded-r-full bg-acento"
        :class="isActive(item.to) ? 'opacity-100' : 'opacity-0'"
      />
      <span v-if="!collapsed">{{ item.label }}</span>
    </RouterLink>

    <div class="mt-auto px-4">
      <!-- Mi perfil: pendiente de ruta/vista propia -->
      <span
        class="flex cursor-not-allowed items-center gap-3 py-3 font-display text-sm font-medium text-white/30"
        title="Próximamente"
      >
        <span v-if="!collapsed">Mi perfil</span>
      </span>

      <div v-if="!collapsed" class="mt-3 rounded-2xl border border-acento/25 bg-acento/10 p-4">
        <p class="mb-2 font-display text-xs font-semibold text-white">Progreso del cuatrimestre</p>
        <ProgressBar :percent="0" track-class="bg-white/10" fill-class="bg-acento" />
        <p class="mt-2 font-body text-[11px] text-white/60">Sin datos aún</p>
      </div>
    </div>
  </aside>
</template>
