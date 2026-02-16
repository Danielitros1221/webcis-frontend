<script setup>
/*
  const props = defineProps({
  email: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})

 */

const emit = defineEmits(['resend', 'back'])

function onResend() {
  emit('resend')
}
function onBack() {
  emit('back')
}

</script>

<template>
  <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-8 max-w-md">
    <h1 class="text-center text-2xl md:text-3xl font-semibold text-acento">
      Se ha enviado un código
      <br />
      de verificación
      <br />
      a tu correo electrónico
    </h1>

    <p class="mt-4 text-center text-white/65 text-sm md:text-base leading-relaxed">
      Para completar tu registro, necesitamos verificar que tu correo sea real.
      Entra a tu correo a continuación y te enviaremos un enlace de verificación.
      <br>
      <span v-if="email" class="text-white/80 font-semibold">
        ({{ email }})
      </span>
    </p>

    <p class="mt-5 text-center text-white/70 text-sm font-semibold">
      ¿Aún no te ha llegado el correo?
      <button
        type="button"
        class="ml-1 text-orange-400 hover:underline disabled:opacity-60"
        :disabled="loading"
        @click="onResend"
      >
        Reenviar Código
      </button>
    </p>

    <div class="mt-6 flex justify-center">
      <button
        type="button"
        class="rounded-xl border border-white/20 bg-black/20 px-6 py-2 text-white/80 hover:bg-white/10 disabled:opacity-60"
        :disabled="loading"
        @click="onBack"
      >
        Regresar
      </button>
    </div>
  </div>
</template>
