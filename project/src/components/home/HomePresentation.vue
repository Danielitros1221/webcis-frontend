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
    <div class="absolute inset-0 bg-linear-to-r from-black/75 via-black/30 to-transparent"></div>

    <div class="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div class="max-w-2xl">
        <h1 class="mb-5 text-4xl font-bold text-acento sm:text-5xl lg:text-6xl">
          WebCIS
        </h1>

        <p class="max-w-lg text-base leading-7 text-white/70 sm:text-lg">
          Diseñado para mejorar las bases de programación de los alumnos a través de contenidos
          educativos proporcionando un espacio de acceso a materiales que sirvan como complemento
          al aprendizaje en el aula.
        </p>

        <a
          href="#recursos-webcis"
          class="mt-8 inline-flex min-h-11 items-center rounded-md bg-primario px-7 py-3 text-lg font-medium text-white transition hover:bg-[#12294A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xl"
        >
          ¡MÁS INFORMACIÓN!
        </a>
      </div>
    </div>
  </section>
</template>
