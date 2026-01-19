<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import checkIcon from '@/assets/icons/checkIcon.png'
import wrongIcon from '@/assets/icons/wrongIcon.png'

const emit = defineEmits(['continue'])

const route = useRoute()
const router = useRouter()

const token = computed(() => String(route.query.token ?? '').trim())
const hasToken = computed(() => token.value.length > 0)
//const hasToken = true
const isChecking = ref(false)

function goHome() {
  router.push('/')
}

function goLogin() {
  router.push('/login')
}


async function onContinue() {
  if (!hasToken.value) return

  isChecking.value = true
  try {
    await new Promise((r) => setTimeout(r, 450))
    emit('continue', { token: token.value })
  } finally {
    isChecking.value = false
  }
}
</script>


<template>
  <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-10">
    <h1 v-if="hasToken" class="text-center text-2xl md:text-3xl font-semibold text-acento">
      Correo Confirmado
    </h1>

    <div v-if="hasToken" class="flex items-center justify-center mt-4">
      <div class="mt-4 mx-auto w-32 h-32 bg-[#23C523]"
        :style="{
          WebkitMask: `url(${checkIcon}) no-repeat center / contain`,
          mask: `url(${checkIcon}) no-repeat center / contain`
        }"
      />
    </div>

    <p v-if="hasToken" class="mt-6 text-center text-white/70 text-sm md:text-base">
      Tu correo ha sido verificado correctamente. Ya puedes continuar con tu registro.
    </p>

    <div v-if="hasToken" class="mt-6 flex justify-center">
      <button
        type="button"
        class="rounded-xl border border-white/20 bg-black/20 px-6 py-2 text-white/80 hover:bg-white/10 disabled:opacity-60"
        :disabled="isChecking"
        @click="onContinue"
      >
        {{ isChecking ? 'Verificando...' : 'Continuar' }}
      </button>
    </div>

    <div v-else class="mt-6">
      <h1 class="text-center text-2xl md:text-3xl font-semibold text-acento">
        Correo NO Confirmado
      </h1>

      <div class="flex items-center justify-center mt-4">
        <div class="mt-4 mx-auto w-32 h-32 bg-[#EB0000]"
             :style="{
          WebkitMask: `url(${wrongIcon}) no-repeat center / contain`,
          mask: `url(${wrongIcon}) no-repeat center / contain`
        }"
        />
      </div>

      <p class="mt-6 text-center text-red-300 text-sm md:text-base">
        No se encontró el token de verificación en el enlace.
      </p>

      <div class="mt-6 flex justify-center gap-3">
        <button
          type="button"
          class="rounded-xl border border-white/20 bg-black/20 px-6 py-2 text-white/80 hover:bg-white/10"
          @click="goHome"
        >
          Volver a Inicio
        </button>

        <button
          type="button"
          class="rounded-xl border border-white/20 bg-black/20 px-6 py-2 text-white/80 hover:bg-white/10"
          @click="goLogin"
        >
          Ir a Login
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
