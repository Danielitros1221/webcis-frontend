<script setup>
import { ref, computed } from 'vue'

import { resetPassword } from '@/services/auth.service'

const props = defineProps({
  email: { type: String, required: true },
  token: { type: String, required: true },
})

const emit = defineEmits(['continue'])

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const hasMinLength = computed(() => password.value.length >= 8)
const hasUpperCase = computed(() => /[A-Z]/.test(password.value))
const hasNumberOrSymbol = computed(() => /[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/.test(password.value))

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return true
  return password.value === confirmPassword.value
})

const allValid = computed(() => {
  return hasMinLength.value &&
    hasUpperCase.value &&
    hasNumberOrSymbol.value &&
    password.value === confirmPassword.value &&
    password.value.length > 0 &&
    confirmPassword.value.length > 0
})

const strength = computed(() => {
  let score = 0
  if (hasMinLength.value) score++
  if (hasUpperCase.value) score++
  if (hasNumberOrSymbol.value) score++
  return score
})

const strengthColor = computed(() => {
  if (strength.value === 1) return 'bg-red-500'
  if (strength.value === 2) return 'bg-yellow-500'
  if (strength.value === 3) return 'bg-green-500'
  return 'bg-white/10'
})


const strengthWidth = computed(() => {
  if (strength.value === 0) return '0%'
  if (strength.value === 1) return '33%'
  if (strength.value === 2) return '66%'
  return '100%'
})

const strengthText = computed(() => {
  if (strength.value === 0) return ''
  if (strength.value === 1) return 'Débil'
  if (strength.value === 2) return 'Media'
  return 'Contraseña segura'
})

const strengthTextColor = computed(() => {
  if (strength.value === 1) return 'text-red-400'
  if (strength.value === 2) return 'text-yellow-400'
  if (strength.value === 3) return 'text-green-400'
  return 'text-white/70'
})

async function onSubmit() {
  errorMsg.value = ''

  if (!props.email || !props.token) {
    errorMsg.value = 'Faltan datos para restablecer la contraseña.'
    return
  }

  if (!allValid.value) {
    errorMsg.value = 'Completa todos los requisitos.'
    return
  }

  loading.value = true

  try {
    await resetPassword({
      email: props.email,
      password: password.value,
      token: props.token,
    })
    emit('continue')
  } catch (err) {
    // Mismo TokenValidationException que en /validate-reset-token, pero acá
    // el backend no lo atrapa: llega como 401 puro en vez de 403. Se muestra
    // un mensaje claro y en español en vez del crudo del backend.
    errorMsg.value =
      err?.status === 401
        ? 'El enlace de recuperación expiró o ya fue usado. Vuelve a solicitar un código nuevo desde el correo.'
        : err?.message || 'No se pudo actualizar la contraseña.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-8">

      <h1 class="text-3xl font-semibold text-white text-center">
        Contraseña
      </h1>

      <p class="mt-3 text-center text-sm text-white/70 leading-relaxed">
        Elija una contraseña que no haya usado antes
      </p>

      <form class="mt-6 space-y-5" @submit.prevent="onSubmit">
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :disabled="loading"
            placeholder="Nueva contraseña"
            autocomplete="new-password"
            class="w-full rounded-lg border border-white/20 bg-black/20 px-4 py-3 pr-12 text-white placeholder:text-white/60 placeholder:italic outline-none focus:border-white/70"
          />
          <button
            type="button"
            :disabled="loading"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
          >

            <svg v-if="showPassword" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>

            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
          </button>
        </div>

        <div class="relative">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            :disabled="loading"
            placeholder="Confirmar contraseña"
            autocomplete="new-password"
            class="w-full rounded-lg border px-4 py-3 pr-12 text-white placeholder:text-white/60 placeholder:italic outline-none focus:border-white/70"
            :class="!passwordsMatch ? 'border-red-500 bg-red-900/20' : 'border-white/20 bg-black/20'"
          />
          <button
            type="button"
            :disabled="loading"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
          >

            <svg v-if="showConfirmPassword" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>

            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
          </button>
        </div>

        <p v-if="confirmPassword && !passwordsMatch" class="text-sm text-red-300">
          Las contraseñas no coinciden
        </p>

        <div v-if="password" class="space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-white/70">Seguridad:</span>
            <span :class="strengthTextColor" class="font-semibold">{{ strengthText }}</span>
          </div>

          <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-300"
              :class="strengthColor"
              :style="{ width: strengthWidth }">
            </div>
          </div>
        </div>

        <div class="space-y-2 pt-2">
          <div class="flex items-center gap-2 text-sm">
            <svg v-if="hasMinLength" class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-else class="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span :class="hasMinLength ? 'text-white/80' : 'text-white/40'">Mínimo 8 caracteres</span>
          </div>

          <div class="flex items-center gap-2 text-sm">
            <svg v-if="hasUpperCase" class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-else class="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span :class="hasUpperCase ? 'text-white/80' : 'text-white/40'">Una mayúscula</span>
          </div>

          <div class="flex items-center gap-2 text-sm">
            <svg v-if="hasNumberOrSymbol" class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <svg v-else class="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span :class="hasNumberOrSymbol ? 'text-white/80' : 'text-white/40'">Un número o símbolo</span>
          </div>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-300 text-center">
          {{ errorMsg }}
        </p>

        <button
          type="submit"
          :disabled="loading || !allValid"
          class="w-full rounded-xl px-4 py-3 text-xl font-semibold text-white transition-colors"
          :class="allValid && !loading ? 'bg-primario hover:bg-[#12294A] cursor-pointer' : 'bg-gray-500 cursor-not-allowed opacity-50'"
        >
          {{ loading ? 'Actualizando...' : 'Actualizar contraseña' }}
        </button>

      </form>

      <div class="mt-6 text-center">
        <RouterLink to="/login" class="text-sm text-white/60 hover:text-white/90 hover:underline">
          Volver al inicio de sesión
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
