<script setup>
import bgImage from '@/assets/images/back_bienvenida.jpg'
</script>

<template>
  <section class="relative flex min-h-[500px] items-center overflow-hidden">
    <img
      :src="bgImage"
      alt="Instalaciones del Instituto Tecnológico de Veracruz"
      width="2048"
      height="1152"
      fetchpriority="high"
      class="absolute inset-0 size-full object-cover object-center"
    >
    <div class="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25"></div>

    <div class="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div class="max-w-2xl">
        <h1 class="mb-5 text-4xl font-bold text-acento sm:text-5xl lg:text-6xl">
          WebCIS
        </h1>

        <p class="max-w-xl text-base leading-7 text-white/85 sm:text-lg">
          Diseñado para mejorar las bases de programación de los alumnos mediante contenidos
          educativos y materiales que complementan el aprendizaje en el aula.
        </p>

        <a
          href="#recursos-webcis"
          class="mt-8 inline-flex min-h-11 items-center rounded-md bg-primario px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#12294A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Más información
        </a>
      </div>
    </div>
  </section>
</template>
