<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import checkIcon from '@/assets/icons/checkIcon.png'

const REDIRECT_DELAY_MS = 2500

const router = useRouter()
let redirectTimer = null

function goLogin() {
  router.push('/login')
}

onMounted(() => {
  redirectTimer = window.setTimeout(goLogin, REDIRECT_DELAY_MS)
})

onBeforeUnmount(() => {
  window.clearTimeout(redirectTimer)
})
</script>

<template>
  <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-10 max-w-md">
    <h1 class="text-center text-2xl md:text-3xl font-semibold text-acento">
      Cuenta creada exitosamente
    </h1>

    <div class="flex items-center justify-center mt-4">
      <div
        class="mt-4 mx-auto w-32 h-32 bg-[#23C523]"
        :style="{
          WebkitMask: `url(${checkIcon}) no-repeat center / contain`,
          mask: `url(${checkIcon}) no-repeat center / contain`,
        }"
      />
    </div>

    <p class="mt-6 text-center text-white/70 text-sm md:text-base">
      Tu registro fue completado. En unos segundos te llevaremos al inicio de sesión.
    </p>

    <div class="mt-6 flex justify-center">
      <button
        type="button"
        class="rounded-xl border border-white/20 bg-black/20 px-6 py-2 text-white/80 hover:bg-white/10"
        @click="goLogin"
      >
        Ir a Login
      </button>
    </div>
  </div>
</template>
