<script setup>
import HomeStudentCard from './HomeStudentCard.vue'

defineProps({
  students: { type: Array, required: true },
})
</script>

<template>
  <section
    class="mt-[92px] w-full border-y border-acento/35 bg-home-banda px-[clamp(16px,5vw,64px)] py-[clamp(48px,6vw,84px)]"
  >
    <div class="mx-auto max-w-[1460px]">
      <!-- Encabezado -->
      <div class="mx-auto max-w-[760px] text-center">
        <div class="mb-3.5 text-[13px] font-semibold uppercase tracking-[.18em] text-acento">
          Comunidad activa
        </div>
        <h2 class="m-0 text-[clamp(28px,4.4vw,46px)] font-extrabold leading-[1.12]">
          <span class="text-acento">Únete a WebCIS:</span>
          <span class="text-white"> Crea Cursos y Material Digital</span>
        </h2>
        <p class="mx-auto mt-4 text-[clamp(15px,1.7vw,19px)] leading-[1.6] text-white/[.85]">
          Conoce a algunos de los alumnos que comparten su conocimiento creando cursos y material
          para toda la comunidad. Tú también puedes ser parte.
        </p>
        <div class="mt-7">
          <RouterLink
            to="/register"
            class="inline-block rounded-[15px] bg-acento px-[30px] py-3.5 text-base font-bold text-[#3a2a08] no-underline shadow-[0_6px_18px_rgba(0,0,0,.3)] transition-[filter,transform] hover:brightness-[1.07] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          >
            Quiero crear contenido
          </RouterLink>
        </div>
      </div>

      <!-- Grid de estudiantes -->
      <div class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        <HomeStudentCard
          v-for="(student, i) in students"
          :key="i"
          :name="student.name"
          :role="student.role"
          :photo="student.photo ?? null"
          :linkedin="student.linkedin"
        />
      </div>
    </div>
  </section>
</template>
