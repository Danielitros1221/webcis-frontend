<script setup>
import { ref, watch } from 'vue'

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

const previewSrc = ref(null)
const fileInput = ref(null)

// No hay endpoint de subida de avatar en el backend: el archivo elegido se
// lee con FileReader y se muestra como data URL, sin enviarse a ningún
// lado. "Guardar foto" solo aplica ese preview al estado de la sesión
// (ver ProfileView.vue) — se pierde al recargar.
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) previewSrc.value = props.currentSrc
  },
)

function pickFile() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    previewSrc.value = reader.result
  }
  reader.readAsDataURL(file)
}

function confirm() {
  emit('save', previewSrc.value)
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-280 flex items-center justify-center bg-[rgba(8,12,20,.62)] p-6" @click="$emit('close')">
    <div class="w-105 max-w-full rounded-(--radius-card) bg-white p-8 shadow-(--shadow-pop)" @click.stop>
      <p class="font-display text-xl font-bold text-negro-sintaxis">Actualizar foto de perfil</p>
      <p class="mt-1.5 mb-4.5 font-display text-sm text-[#666]">Elegí una imagen desde tu equipo.</p>

      <button
        type="button"
        class="mx-auto flex size-55 items-center justify-center overflow-hidden rounded-full border-[3px] border-dashed border-gris-interfaz"
        @click="pickFile"
      >
        <img v-if="previewSrc" :src="previewSrc" alt="" class="size-full object-cover">
        <span v-else class="px-6 text-center font-display text-sm text-[#999]">Hacé click para elegir tu foto</span>
      </button>
      <input ref="fileInput" type="file" accept="image/png,image/jpeg" class="hidden" @change="onFileChange">

      <p class="mt-3.5 text-center font-display text-xs text-[#999]">Formatos JPG o PNG · recomendado 400×400px.</p>

      <div class="mt-5.5 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-[14px] border-[1.5px] border-[#e2e4e8] px-5.5 py-2.5 font-display text-[15px] font-semibold text-[#555]"
          @click="$emit('close')"
        >
          Cancelar
        </button>
        <BaseButton variant="gold" @click="confirm">Guardar foto</BaseButton>
      </div>
    </div>
  </div>
</template>
