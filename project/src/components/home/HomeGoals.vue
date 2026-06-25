<script setup>
const metas = [
  'Aumentar el índice de aprobación en las asignaturas con mayor dificultad del programa educativo.',
  'Respaldar el funcionamiento del PARSIS mediante recursos digitales complementarios.',
  'Servir como refuerzo al trabajo desarrollado en las clases presenciales.',
  'Fomentar una cultura de colaboración y apoyo mutuo entre los estudiantes.',
]
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
          <path d="M5 21V5a2 2 0 0 1 2-2h7l-2 4 2 4H7"></path>
          <path d="M5 21h6"></path>
        </svg>
      </div>
      <h2 class="m-0 text-[clamp(26px,3.4vw,38px)] font-bold text-acento">Metas</h2>
    </div>

    <!-- Lista de metas -->
    <ul class="m-0 flex list-none flex-col gap-3.5 p-0">
      <li v-for="(meta, i) in metas" :key="i" class="flex items-start gap-3">
        <span
          class="mt-[3px] flex size-[22px] shrink-0 items-center justify-center rounded-full bg-acento/20"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CFA34E"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
        <span class="text-[clamp(15px,1.6vw,18px)] leading-normal text-white/90">
          {{ meta }}
        </span>
      </li>
    </ul>
  </div>
</template>
