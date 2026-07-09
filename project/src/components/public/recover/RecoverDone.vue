<script setup>
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-8">

      <h1 class="text-3xl font-semibold text-white text-center">
        ¡Contraseña actualizada!
      </h1>

      <p class="mt-4 text-center text-sm text-white/70 leading-relaxed px-2">
        Tu nueva clave ha sido guardada correctamente.<br>
        Ahora puedes ingresar a tu portal institucional<br>
        con normalidad.
      </p>

      <div class="flex justify-center my-8">
        <div class="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center">
          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      <RouterLink
        to="/login"
        class="block w-full rounded-xl bg-primario px-4 py-3 text-xl font-semibold text-white text-center hover:bg-[#12294A] transition-colors"
      >
        Volver al inicio de sesión
      </RouterLink>

    </div>
  </div>
</template>

<style scoped>
</style>
