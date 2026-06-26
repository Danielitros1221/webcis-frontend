<script setup>
import logoGobierno from '@/assets/images/logo-gobierno.png'
import logoITVER from '@/assets/images/logo-ITVER.png'
import logoSEP from '@/assets/images/logo-SEP.png'
import logoTECNM from '@/assets/images/logo-TECNM.png'
</script>

<template>
  <header class="w-full bg-white">
    <div class="bg-superior">
      <div class="mx-auto flex h-11 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <img
          :src="logoGobierno"
          alt="Gobierno de México"
          width="536"
          height="236"
          class="h-11 w-auto"
        >
      </div>
    </div>

    <div class="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:gap-x-10 lg:px-8">
      <img
        :src="logoSEP"
        alt="Secretaría de Educación Pública"
        width="1199"
        height="249"
        class="h-auto w-36 sm:w-44"
      >
      <img
        :src="logoTECNM"
        alt="Tecnológico Nacional de México"
        width="1200"
        height="513"
        class="h-auto w-28 sm:w-36"
      >
      <img
        :src="logoITVER"
        alt="Instituto Tecnológico de Veracruz"
        width="2439"
        height="1856"
        class="h-12 w-auto sm:h-14"
      >
    </div>
  </header>
</template>
