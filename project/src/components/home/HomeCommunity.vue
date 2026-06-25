<script setup>
import HomeStudentCard from './HomeStudentCard.vue'

defineProps({
  students: { type: Array, required: true },
})
</script>

<template>
  <section
    class="w-full border-y"
    style="
      background: #101d33;
      border-color: rgba(207,163,78,.35);
      padding: clamp(48px,6vw,84px) clamp(16px,5vw,64px);
      margin-top: 92px;
    "
  >
    <div class="max-w-[1460px] mx-auto">
      <!-- Encabezado -->
      <div class="text-center max-w-[760px] mx-auto">
        <div
          class="font-semibold tracking-[.18em] uppercase text-acento mb-3.5"
          style="font-size: 13px"
        >
          Comunidad activa
        </div>
        <h2
          class="font-extrabold m-0 leading-[1.12]"
          style="font-size: clamp(28px, 4.4vw, 46px)"
        >
          <span class="text-acento">Únete a WebCIS:</span>
          <span class="text-white"> Crea Cursos y Material Digital</span>
        </h2>
        <p
          class="text-white/85 leading-[1.6] mx-auto mt-4"
          style="font-size: clamp(15px, 1.7vw, 19px)"
        >
          Conoce a algunos de los alumnos que comparten su conocimiento creando cursos y material
          para toda la comunidad. Tú también puedes ser parte.
        </p>
        <div class="mt-7">
          <RouterLink
            to="/register"
            class="inline-block font-bold rounded-[15px] no-underline transition-[filter] hover:brightness-[1.07] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
            style="font-size: 16px; color: #3a2a08; background: var(--color-acento); padding: 14px 30px; box-shadow: 0 6px 18px rgba(0,0,0,.3)"
          >
            Quiero crear contenido
          </RouterLink>
        </div>
      </div>

      <!-- Grid de estudiantes -->
      <div
        class="grid mt-12"
        style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px"
      >
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
