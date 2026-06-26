<script setup>
const mision =
  'La misión del proyecto es fortalecer el aprendizaje de los estudiantes de ISC del ITVer, mediante una plataforma digital complementaria que apoye a las clases regulares, fomentando la aplicación del conocimiento, la colaboración entre alumnos y el desarrollo de competencias para la capacitación de tecnologías actuales.'
</script>

<template>
  <div
    class="grow shrink basis-[420px] rounded-[28px] border border-acento/30 bg-[linear-gradient(160deg,#28384e,#161e29)] p-[clamp(28px,3.5vw,44px)]"
  >
    <!-- Ícono + título -->
    <div class="mb-[18px] flex items-center gap-3.5">
      <div class="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-acento/15">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CFA34E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="9"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="12" cy="12" r="1" fill="#CFA34E"></circle>
        </svg>
      </div>
      <h2 class="m-0 text-[clamp(26px,3.4vw,38px)] font-bold text-acento">Misión</h2>
    </div>

    <p class="m-0 text-[clamp(15px,1.7vw,19px)] leading-[1.65] text-white/90">
      {{ mision }}
    </p>
  </div>
</template>
