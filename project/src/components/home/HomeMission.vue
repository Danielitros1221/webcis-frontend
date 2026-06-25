<script setup>
const mision =
  'La misión del proyecto es fortalecer el aprendizaje de los estudiantes de ISC del ITVer, mediante una plataforma digital complementaria que apoye a las clases regulares, fomentando la aplicación del conocimiento, la colaboración entre alumnos y el desarrollo de competencias para la capacitación de tecnologías actuales.'
</script>

<template>
  <div
    class="grow shrink basis-[420px] rounded-[28px] border"
    style="
      background: linear-gradient(160deg, #28384e, #161e29);
      border-color: rgba(207,163,78,.32);
      padding: clamp(28px, 3.5vw, 44px);
    "
  >
    <!-- Ícono + título -->
    <div class="flex items-center gap-3.5 mb-[18px]">
      <div
        class="flex size-[52px] shrink-0 items-center justify-center rounded-2xl"
        style="background: rgba(207,163,78,.16)"
      >
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
      <h2
        class="font-bold text-acento m-0"
        style="font-size: clamp(26px, 3.4vw, 38px)"
      >
        Misión
      </h2>
    </div>

    <p
      class="text-white/90 leading-[1.65] m-0"
      style="font-size: clamp(15px, 1.7vw, 19px)"
    >
      {{ mision }}
    </p>
  </div>
</template>
