<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import bgRegister from '@/assets/images/register.png'
import RegisterEmail from '@/components/register/RegisterEmail.vue'
import RegisterInfo from '@/components/register/RegisterInfo.vue'
import RegisterConfirmed from '@/components/register/RegisterConfirmed.vue'
import RegisterForm from '@/components/register/RegisterForm.vue'

const route = useRoute()

const step = ref(1)
const email = ref('')
const verifyToken = ref('')

const isVerifyRoute = computed(() => route.path.includes('/register/verify'))

watchEffect(() => {
  if (isVerifyRoute.value) {
    step.value = 3
    // token.value = route.query.token ?? ''
  }
})

function handleEmailNext(payload) {
  email.value = payload.email
  step.value = 2
}

function handleConfirmedContinue({ token }) {
  verifyToken.value = token
  step.value = 4
}

</script>

<template>
  <section class="relative min-h-screen overflow-hidden">
    <img :src="bgRegister" alt="bgImg" class="absolute inset-0 w-full h-full object-cover" />

    <div class="relative min-h-screen flex items-center justify-center px-6 lg:px-16 py-10">
      <div class="w-full max-w-md">
        <RegisterEmail v-if="step === 1 && !isVerifyRoute" @next="handleEmailNext" />
        <RegisterInfo v-else-if="step === 2 && !isVerifyRoute" :email="email" @back="step = 1" />
        <RegisterConfirmed v-else-if="step === 3 && isVerifyRoute" @continue="handleConfirmedContinue"/>
        <RegisterForm v-else-if="step === 4" :email="email" :token="verifyToken" />
      </div>
    </div>
  </section>
</template>
