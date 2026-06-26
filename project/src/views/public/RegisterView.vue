<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import bgRegister from '@/assets/images/itver.jpg'
import RegisterEmail from '@/components/register/RegisterEmail.vue'
import RegisterInfo from '@/components/register/RegisterInfo.vue'
import RegisterConfirmed from '@/components/register/RegisterConfirmed.vue'
import RegisterForm from '@/components/register/RegisterForm.vue'
import RegisterSuccess from '@/components/register/RegisterSuccess.vue'

const route = useRoute()

const step = ref(1)
const email = ref('')
const verifyToken = ref('')

const isVerifyRoute = computed(() => route.path.includes('/register/verify'))

watchEffect(() => {
  if (isVerifyRoute.value) {
    step.value = 3
    return
  }

  step.value = 1
})

function handleEmailNext(payload) {
  email.value = payload.email
  step.value = 2
}

function handleConfirmedContinue({ token, email: confirmedEmail }) {
  verifyToken.value = token
  email.value = confirmedEmail || email.value
  step.value = 4
}

function handleRegistered() {
  step.value = 5
}

</script>

<template>
  <section class="relative min-h-screen overflow-hidden">
    <img :src="bgRegister" alt="bgImg" class="absolute inset-0 w-full h-full object-cover" />

    <div class=" w-full max-w-auto relative min-h-screen flex items-center justify-center px-13 lg:px-16 py-10">
      <RegisterEmail v-if="step === 1 && !isVerifyRoute" @next="handleEmailNext" />
      <RegisterInfo v-else-if="step === 2 && !isVerifyRoute" :email="email" @back="step = 1" />
      <RegisterConfirmed v-else-if="step === 3 && isVerifyRoute" @continue="handleConfirmedContinue"/>
      <RegisterForm v-else-if="step === 4" :email="email" :token="verifyToken" @registered="handleRegistered" />
      <RegisterSuccess v-else-if="step === 5" />

    </div>
  </section>
</template>
