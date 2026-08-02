<script setup>
import { MEDAL_CATEGORY_CLASSES } from './profile.mock'

defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
  featuredMedals: {
    type: Array,
    required: true,
  },
})

defineEmits(['open-all'])

function categoryClasses(category) {
  return MEDAL_CATEGORY_CLASSES[category] ?? MEDAL_CATEGORY_CLASSES.poo
}
</script>

<template>
  <div class="rounded-(--radius-card) bg-white p-[18px] shadow-(--shadow-card) sm:p-6">
    <p class="font-display text-[17px] font-bold text-negro-sintaxis">Medallas obtenidas</p>
    <p class="mt-0.5 font-display text-[13px] text-[#999]">{{ totalCount }} medallas por cursos completados</p>

    <div class="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
      <div v-for="medal in featuredMedals" :key="medal.id" class="flex flex-col items-center gap-1.5 text-center">
        <span
          class="flex size-10.5 items-center justify-center rounded-full shadow-[0_3px_8px_rgba(0,0,0,.12)] sm:size-12"
          :class="[categoryClasses(medal.category).bg, categoryClasses(medal.category).fg]"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="14" r="6.5" />
            <path d="m9 12.3 2 2 4-4" />
            <path d="M8.5 3.5 6 8m9-4.5L17.5 8" />
          </svg>
        </span>
        <span class="font-display text-[10px] font-semibold leading-tight text-negro-sintaxis">{{ medal.label }}</span>
      </div>
    </div>

    <button
      type="button"
      class="mt-4.5 w-full rounded-[14px] border-[1.5px] border-gris-interfaz py-2.5 font-display text-sm font-semibold text-cobre-digital"
      @click="$emit('open-all')"
    >
      Ver todas las medallas
    </button>
  </div>
</template>
