<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

defineProps({
  // null mientras no exista un endpoint que reporte el curso en progreso
  course: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="flex flex-col rounded-(--radius-card) bg-white p-7 shadow-(--shadow-card)">
    <p class="font-display text-xs font-bold uppercase tracking-wider text-cobre-digital">
      Continúa donde lo dejaste
    </p>

    <div v-if="course" class="mt-4 flex items-center gap-5">
      <img :src="course.thumb" alt="" class="size-24 flex-none rounded-2xl bg-gris-interfaz object-contain p-1.5" >
      <div class="min-w-0 flex-1">
        <p class="font-display text-2xl font-bold text-texto">{{ course.title }}</p>
        <p class="mt-0.5 font-display text-sm text-texto/60">{{ course.moduleLabel }}</p>
        <div class="mt-3.5">
          <ProgressBar :percent="course.percent" />
        </div>
        <p class="mt-1.5 font-body text-xs text-texto/50">{{ course.percent }}% completado</p>
      </div>
    </div>
    <p v-else class="mt-4 font-body text-sm text-texto/60">
      Aún no tienes un curso en progreso.
    </p>

    <div class="mt-5 flex justify-end">
      <RouterLink to="/app/explorer">
        <BaseButton variant="blue">{{ course ? 'Continuar curso' : 'Explorar cursos' }}</BaseButton>
      </RouterLink>
    </div>
  </div>
</template>
