<script setup>
import { ref, watch } from 'vue'

import { BANNER_OPTIONS } from './banner-options'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  currentSrc: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['close', 'save'])

const selectedSrc = ref(null)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) selectedSrc.value = props.currentSrc
  },
)

function confirm() {
  emit('save', selectedSrc.value)
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-280 flex items-center justify-center bg-[rgba(8,12,20,.62)] p-6" @click="$emit('close')">
    <div class="w-160 max-w-full rounded-(--radius-card) bg-white p-8 shadow-(--shadow-pop)" @click.stop>
      <p class="font-display text-xl font-bold text-negro-sintaxis">Elegir foto de banner</p>
      <p class="mt-1.5 mb-4.5 font-display text-sm text-[#666]">Seleccioná una de las imágenes disponibles de WebCIS.</p>

      <div class="grid grid-cols-3 gap-3.5">
        <button
          v-for="banner in BANNER_OPTIONS"
          :key="banner.src"
          type="button"
          class="overflow-hidden rounded-2xl border-[2.5px] bg-white text-left"
          :class="selectedSrc === banner.src ? 'border-azul-paquete' : 'border-[#eef0f3]'"
          @click="selectedSrc = banner.src"
        >
          <img :src="banner.src" :alt="banner.label" class="h-22.5 w-full object-cover">
          <span class="flex items-center gap-1.5 px-2.5 py-2 font-display text-[12.5px] font-semibold text-negro-sintaxis">
            {{ banner.label }}
            <svg
              v-if="selectedSrc === banner.src"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-azul-paquete)"
              stroke-width="3"
              class="ml-auto"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </span>
        </button>
      </div>

      <div class="mt-5.5 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-[14px] border-[1.5px] border-[#e2e4e8] px-5.5 py-2.5 font-display text-[15px] font-semibold text-[#555]"
          @click="$emit('close')"
        >
          Cancelar
        </button>
        <BaseButton variant="gold" @click="confirm">Aplicar banner</BaseButton>
      </div>
    </div>
  </div>
</template>
