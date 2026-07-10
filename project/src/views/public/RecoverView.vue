<script setup>
import { ref } from 'vue'
import RecoverInfo from '@/components/public/recover/RecoverInfo.vue'
import RecoverCode from '@/components/public/recover/RecoverCode.vue'
import RecoverReset from '@/components/public/recover/RecoverReset.vue'
import RecoverDone from '@/components/public/recover/RecoverDone.vue'
import bgRecover from '@/assets/images/itver.jpg'

const currentStep = ref(0)
const email = ref('')
const resetToken = ref('')

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function handleEmailSent(payload) {
  email.value = payload.email
  resetToken.value = ''
  nextStep()
}

function handleCodeValidated(payload) {
  resetToken.value = payload.token
  nextStep()
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

      <RecoverInfo v-if="currentStep === 0" @continue="handleEmailSent" />
      <RecoverCode v-if="currentStep === 1" :email="email" @continue="handleCodeValidated" />
      <RecoverReset v-if="currentStep === 2" :email="email" :token="resetToken" @continue="nextStep" />
      <RecoverDone v-if="currentStep === 3" />

    </div>
  </section>
</template>

<style scoped>
</style>
