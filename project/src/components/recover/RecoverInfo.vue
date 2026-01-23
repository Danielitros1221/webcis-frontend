<script setup>
const emit = defineEmits(['continue'])

function onContinue() {
  emit('continue')
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-8">

      <h1 class="text-3xl font-semibold text-white text-center mb-8">
        Recuperar contraseña
      </h1>

      <p class="text-center text-base text-white/80 leading-relaxed px-4 mb-8">
        Se enviará un código de 8 dígitos a su correo electrónico para restablecer su contraseña.
        <br><br>
        Si está de acuerdo, haga clic en <span class="font-semibold text-white">"Continuar"</span>.
      </p>

      <button
        type="button"
        @click="onContinue"
        class="w-full rounded-xl bg-primario px-4 py-3 text-xl font-semibold text-white hover:bg-[#12294A] transition-colors"
      >
        Continuar
      </button>

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
