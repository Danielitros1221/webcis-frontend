<template>
  <section
    class="relative min-h-[600px] bg-cover bg-center flex items-center"
    :style="{
      backgroundImage: `url(${bgImage})`
    }"
  >
    <!-- Gradiente -->
    <div class="absolute inset-0 bg-linear-to-r from-black/85 to-transparent"></div>

    <!-- Contenido -->
    <div class="relative z-10 max-w-2xl px-28">
      <h1 class="ty-encabezado2 text-acento mb-6">
        WebCIS
      </h1>

      <p class="text-texto-secundario mb-8">
        Diseñado para mejorar las bases de programación de los alumnos a través de contenidos
        educativos proporcionando un espacio de acceso a materiales que sirvan como complemento
        al aprendizaje en el aula.
      </p>

      <button class="light text-white bg-primario text-2xl px-8 py-3 rounded-lg">
        ¡MÁS INFORMACIÓN!
      </button>
    </div>
  </section>
</template>

<script setup>
import bgImage from '@/assets/images/back_bienvenida.jpg'
</script>
