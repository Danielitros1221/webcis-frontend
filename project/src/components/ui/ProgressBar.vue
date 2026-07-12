<script setup>
import { computed } from 'vue'

const props = defineProps({
  percent: {
    type: Number,
    required: true,
  },
  trackClass: {
    type: String,
    default: 'bg-gris-interfaz',
  },
  fillClass: {
    type: String,
    default: 'bg-primario',
  },
})

const clampedPercent = computed(() => Math.min(100, Math.max(0, props.percent)))
</script>

<template>
  <div :class="['h-2.5 overflow-hidden rounded-full', trackClass]">
    <div
      class="h-full rounded-full transition-[width]"
      :class="fillClass"
      :style="{ width: `${clampedPercent}%` }"
    />
  </div>
</template>
