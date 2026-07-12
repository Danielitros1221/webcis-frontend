<script setup>
defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  iconBgClass: {
    type: String,
    default: 'bg-acento/15',
  },
})
</script>

<template>
  <div class="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-(--shadow-card)">
    <span class="flex size-13 flex-none items-center justify-center rounded-2xl" :class="iconBgClass">
      <slot name="icon" />
    </span>
    <div>
      <p class="font-display text-3xl font-extrabold leading-none text-texto">{{ value }}</p>
      <p class="mt-1 font-body text-sm text-texto/60">{{ label }}</p>
    </div>
  </div>
</template>
