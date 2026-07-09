<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import webcisLogo from '@/assets/images/Logo.png'

const props = defineProps({
  type: { type: String, default: null },
})

const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

watch(
  () => props.type,
  (v) => {
    document.body.style.overflow = v ? 'hidden' : ''
  },
)

const categories = [
  {
    tag: 'POO',
    name: 'Programación Orientada a Objetos',
    desc: 'Clases, herencia, polimorfismo y encapsulamiento aplicados a tus proyectos.',
    pillClass: 'bg-[#BBD9F7] text-[#0B2545]',
  },
  {
    tag: 'Algoritmo',
    name: 'Algoritmos y Estructuras de Datos',
    desc: 'Lógica, estructuras y resolución de problemas paso a paso.',
    pillClass: 'bg-[#F7A8C4] text-[#6E1233]',
  },
  {
    tag: 'Web',
    name: 'Desarrollo Web',
    desc: 'HTML, CSS, JavaScript y frameworks para construir aplicaciones modernas.',
    pillClass: 'bg-[#C9E8D0] text-[#1E5631]',
  },
  {
    tag: 'Datos',
    name: 'Bases de Datos',
    desc: 'Modelado, SQL y administración de bases de datos relacionales.',
    pillClass: 'bg-[#F4D9A0] text-[#7A4E12]',
  },
]

const recursos = [
  {
    title: 'Libros',
    desc: 'Bibliografía base y material de consulta por asignatura.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
             <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
           </svg>`,
  },
  {
    title: 'Videoconferencias',
    desc: 'Sesiones grabadas con profesores y egresados.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <rect x="2" y="5" width="20" height="14" rx="3"></rect>
             <path d="m10 9 5 3-5 3z"></path>
           </svg>`,
  },
  {
    title: 'Proyectos',
    desc: 'Repositorios y proyectos reales de la comunidad WebCIS.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
             <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
           </svg>`,
  },
  {
    title: 'Tutoriales',
    desc: 'Guías prácticas paso a paso creadas por la comunidad.',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
             <path d="M14 2v6h6M9 13h6M9 17h6"></path>
           </svg>`,
  },
]

const aboutParas = [
  'WebCIS (Web · Comunidad de Ingeniería en Sistemas) es una Plataforma Educativa Digital que complementa las clases del plan educativo de Ingeniería en Sistemas Computacionales del ITVer.',
  'No reemplaza la enseñanza en aula: la fortalece con un espacio digital para acceder a recursos, estudiar de forma autónoma y prepararte antes, durante y después de cada curso. Estudiantes, profesores y egresados construyen la comunidad juntos.',
]

const modalTitles = {
  categorias: 'Categorías',
  webcis: 'Sobre WebCIS',
  recursos: 'Recursos',
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="type"
        @click="emit('close')"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-[#050810]/70 p-[clamp(16px,4vw,40px)] backdrop-blur-md"
        role="dialog"
        :aria-label="modalTitles[type]"
        aria-modal="true"
      >
        <div
          @click.stop
          class="max-h-[86vh] w-full max-w-[720px] overflow-y-auto rounded-[28px] border border-acento/35 bg-[linear-gradient(180deg,#15294a,#0e1b32)] shadow-[0_30px_70px_rgba(0,0,0,.6)] animate-[modalReveal_.28s_cubic-bezier(.2,.8,.2,1)]"
        >
          <!-- Cabecera fija -->
          <div
            class="sticky top-0 flex items-center justify-between gap-4 border-b border-white/10 bg-[linear-gradient(180deg,#15294a,rgba(21,41,74,.9))] px-[clamp(22px,4vw,36px)] py-6"
          >
            <h2 class="m-0 text-[clamp(22px,3vw,30px)] font-bold text-acento">
              {{ modalTitles[type] }}
            </h2>
            <button
              @click="emit('close')"
              aria-label="Cerrar"
              class="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-[background] hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-acento/55"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Cuerpo -->
          <div class="p-[clamp(22px,4vw,36px)]">
            <!-- Contenido: Categorías -->
            <template v-if="type === 'categorias'">
              <p class="m-0 mb-6 text-base leading-[1.6] text-white/[.82]">
                Los contenidos de WebCIS se organizan en cuatro pilares de aprendizaje de la carrera
                de ISC:
              </p>
              <div class="flex flex-col gap-4">
                <div
                  v-for="cat in categories"
                  :key="cat.tag"
                  class="flex items-start gap-4 rounded-[18px] border border-white/10 bg-white/[.05] px-5 py-[18px]"
                >
                  <span
                    class="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold"
                    :class="cat.pillClass"
                  >
                    {{ cat.tag }}
                  </span>
                  <div>
                    <div class="text-[17px] font-semibold text-white">
                      {{ cat.name }}
                    </div>
                    <p class="m-0 mt-1 text-sm leading-[1.5] text-white/[.72]">
                      {{ cat.desc }}
                    </p>
                  </div>
                </div>
              </div>
            </template>

            <!-- Contenido: Sobre WebCIS -->
            <template v-if="type === 'webcis'">
              <div class="flex justify-center mb-5">
                <img
                  :src="webcisLogo"
                  alt="WebCIS"
                  class="h-[120px] drop-shadow-[0_6px_18px_rgba(207,163,78,.3)]"
                />
              </div>
              <p
                v-for="(para, i) in aboutParas"
                :key="i"
                class="mb-4 text-base leading-[1.65] text-white/[.86]"
              >
                {{ para }}
              </p>
              <div class="mt-2 text-center text-xl font-bold text-acento">
                Piensa, aprende, desarrolla y crea.
              </div>
            </template>

            <!-- Contenido: Recursos -->
            <template v-if="type === 'recursos'">
              <p class="m-0 mb-6 text-base leading-[1.6] text-white/[.82]">
                Material de apoyo creado y validado por la comunidad, disponible para reforzar tu
                aprendizaje:
              </p>
              <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                <div
                  v-for="r in recursos"
                  :key="r.title"
                  class="rounded-[18px] border border-white/10 bg-white/[.05] p-5"
                >
                  <div
                    class="mb-3 flex size-[46px] items-center justify-center rounded-[12px] bg-acento/15 text-acento"
                    v-html="r.icon"
                  ></div>
                  <div class="text-[17px] font-semibold text-white">
                    {{ r.title }}
                  </div>
                  <p class="m-0 mt-1.5 text-sm leading-[1.5] text-white/[.72]">
                    {{ r.desc }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
@keyframes modalReveal {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
