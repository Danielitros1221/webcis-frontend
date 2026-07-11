<script setup>
import ContinueCourseCard from '@/components/app/dashboard/ContinueCourseCard.vue'
import EnrolledCoursesList from '@/components/app/dashboard/EnrolledCoursesList.vue'
import QuickAccessGrid from '@/components/app/dashboard/QuickAccessGrid.vue'
import StatCard from '@/components/app/dashboard/StatCard.vue'
import WelcomeHeader from '@/components/app/dashboard/WelcomeHeader.vue'

// Esta vista queda lista para conectar cursos inscritos y estadísticas reales
// cuando el backend defina el contrato (ver deuda técnica: no existe endpoint
// de progreso/inscripciones todavía).
</script>

<template>
  <section>
    <WelcomeHeader />

    <div class="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
      <ContinueCourseCard :course="null" />

      <div class="flex flex-col gap-4">
        <StatCard value="—" label="Cursos inscritos" />
        <StatCard value="—" label="Progreso promedio" />
        <StatCard value="—" label="Medallas obtenidas" />
      </div>
    </div>

    <div class="mt-9">
      <QuickAccessGrid />
    </div>

    <div class="mt-9">
      <EnrolledCoursesList :courses="[]" />
    </div>
  </section>
</template>
