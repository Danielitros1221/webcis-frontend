<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  // [] mientras no exista un endpoint que reporte los cursos inscritos del usuario
  courses: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div>
    <h2 class="mb-4 font-display text-xl font-bold text-acento">Mis Cursos</h2>

    <div v-if="courses.length" class="flex flex-col gap-4">
      <div
        v-for="course in courses"
        :key="course.code"
        class="grid grid-cols-[160px_1fr] gap-6 rounded-(--radius-card) bg-white p-6 shadow-(--shadow-card)"
      >
        <img :src="course.thumb" alt="" class="aspect-square rounded-2xl bg-gris-interfaz object-contain p-2" >
        <div class="flex flex-col">
          <p class="font-display text-xl font-bold text-texto">{{ course.code }}</p>
          <p class="mt-1 font-display text-base font-semibold text-texto">{{ course.subtitle }}</p>
          <p class="mt-2 font-body text-sm text-texto/70">{{ course.desc }}</p>
          <div class="mt-auto flex justify-end gap-3 pt-4">
            <RouterLink :to="`/app/repository`">
              <BaseButton variant="gold">Contenido</BaseButton>
            </RouterLink>
            <RouterLink :to="`/app/explorer`">
              <BaseButton variant="blue">Continuar</BaseButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex flex-col items-center gap-2 rounded-(--radius-card) border border-dashed border-white/20 bg-white/4 px-6 py-12 text-center"
    >
      <p class="mt-2 font-display text-xl font-bold text-white">
        Aún no te has inscrito a ningún curso
      </p>
      <p class="max-w-md font-body text-sm text-white/60">
        Explora el catálogo y encuentra cursos de la comunidad de Ingeniería en Sistemas para empezar a aprender.
      </p>
      <RouterLink to="/app/explorer" class="mt-3">
        <BaseButton variant="gold">Explorar Cursos</BaseButton>
      </RouterLink>
    </div>
  </div>
</template>
