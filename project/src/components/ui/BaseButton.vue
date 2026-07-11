<script setup>
defineProps({
  variant: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'gold', 'ghost'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="`btn-webcis-${variant}`"
  >
    <slot />
  </button>
</template>
