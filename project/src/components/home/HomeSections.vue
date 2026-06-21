<script setup>
import codeImage from '@/assets/images/home/code.jpg'
import resourcesImage from '@/assets/images/home/coding-stock-image.jpg'
import webcisLogo from '@/assets/images/Logo.png'
</script>

<template>
  <div>
    <div class="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
      <p class="text-sm font-semibold uppercase text-acento">
        Aprende a tu ritmo
      </p>
      <h2 class="mt-2 text-3xl font-bold text-white sm:text-4xl">
        Explora WebCIS
      </h2>
      <p class="mt-4 text-base leading-7 text-white/70">
        Encuentra cursos y recursos para reforzar tus fundamentos de programación.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <RouterLink
        to="/app/explorer"
        class="group relative flex min-h-72 overflow-hidden rounded-lg border border-white/15 bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acento"
      >
        <img
          :src="codeImage"
          alt="Código fuente en una pantalla"
          width="6000"
          height="4000"
          loading="lazy"
          class="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-105"
        >
        <div class="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-black/10"></div>
        <div class="relative mt-auto p-6">
          <h3 class="text-2xl font-semibold text-white">
            Categorías
          </h3>
          <p class="mt-2 text-sm leading-6 text-white/75">
            Recorre el catálogo y encuentra el siguiente tema que quieres dominar.
          </p>
        </div>
      </RouterLink>

      <RouterLink
        to="/register"
        class="group flex min-h-72 flex-col items-center justify-center rounded-lg border border-acento/30 bg-primario/95 p-7 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acento"
      >
        <img
          :src="webcisLogo"
          alt="WebCIS"
          width="1077"
          height="719"
          loading="lazy"
          class="h-auto w-48 max-w-full transition duration-300 group-hover:scale-105"
        >
        <h3 class="mt-5 text-2xl font-semibold text-white">
          Comienza en WebCIS
        </h3>
        <p class="mt-2 text-sm leading-6 text-white/75">
          Crea tu cuenta y construye una ruta de aprendizaje a tu medida.
        </p>
      </RouterLink>

      <RouterLink
        to="/app/repository"
        class="group relative flex min-h-72 overflow-hidden rounded-lg border border-white/15 bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acento"
      >
        <img
          :src="resourcesImage"
          alt="Estacion de trabajo con herramientas digitales"
          width="6000"
          height="4000"
          loading="lazy"
          class="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-105"
        >
        <div class="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-black/10"></div>
        <div class="relative mt-auto p-6">
          <h3 class="text-2xl font-semibold text-white">
            Recursos
          </h3>
          <p class="mt-2 text-sm leading-6 text-white/75">
            Consulta materiales digitales que complementan tus cursos.
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
