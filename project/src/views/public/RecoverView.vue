<script setup>
import { ref } from 'vue'
import RecoverInfo from '@/components/recover/RecoverInfo.vue'
import RecoverCode from '@/components/recover/RecoverCode.vue'
import RecoverReset from '@/components/recover/RecoverReset.vue'
import RecoverDone from '@/components/recover/RecoverDone.vue'
import bgRecover from '@/assets/images/itver.jpg'

const currentStep = ref(0)

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}
</script>

<template>
  <section class="min-h-screen relative overflow-hidden">
    <img
      alt="Fondo de recuperar contraseña"
      :src="bgRecover"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="relative min-h-screen flex items-center justify-center px-6">

      <RecoverInfo v-if="currentStep === 0" @continue="nextStep" />
      <RecoverCode v-if="currentStep === 1" @continue="nextStep" />
      <RecoverReset v-if="currentStep === 2" @continue="nextStep" />
      <RecoverDone v-if="currentStep === 3" />

    </div>
  </section>
</template>

<style scoped>
</style>
