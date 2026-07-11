<script setup>
const items = [
  { label: 'Explorar cursos', to: '/app/explorer' },
  { label: 'Repositorio digital', to: '/app/repository' },
  { label: 'Mis tareas', to: null },
  { label: 'Mi perfil', to: null },
]
</script>

<template>
  <div>
    <h2 class="mb-4 font-display text-xl font-bold text-acento">Accesos rápidos</h2>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <component
        :is="item.to ? 'RouterLink' : 'span'"
        v-for="item in items"
        :key="item.label"
        :to="item.to ?? undefined"
        class="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-(--shadow-card)"
        :class="item.to ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'"
        :title="item.to ? undefined : 'Próximamente'"
      >
        <span class="font-display text-base font-semibold text-texto">{{ item.label }}</span>
      </component>
    </div>
  </div>
</template>
