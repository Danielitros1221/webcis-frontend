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
          <path d="M5 21V5a2 2 0 0 1 2-2h7l-2 4 2 4H7"></path>
          <path d="M5 21h6"></path>
        </svg>
      </div>
      <h2
        class="font-bold text-acento m-0"
        style="font-size: clamp(26px, 3.4vw, 38px)"
      >
        Metas
      </h2>
    </div>

    <!-- Lista de metas -->
    <ul class="list-none m-0 p-0 flex flex-col gap-3.5">
      <li
        v-for="(meta, i) in metas"
        :key="i"
        class="flex items-start gap-3"
      >
        <span
          class="flex shrink-0 items-center justify-center size-[22px] rounded-full mt-[3px]"
          style="background: rgba(207,163,78,.18)"
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
        <span
          class="text-white/90 leading-[1.5]"
          style="font-size: clamp(15px, 1.6vw, 18px)"
        >
          {{ meta }}
        </span>
      </li>
    </ul>
  </div>
</template>
