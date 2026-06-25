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
onUnmounted(() => document.removeEventListener('keydown', onKey))

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
    pillStyle: { background: '#BBD9F7', color: '#0B2545' },
  },
  {
    tag: 'Algoritmo',
    name: 'Algoritmos y Estructuras de Datos',
    desc: 'Lógica, estructuras y resolución de problemas paso a paso.',
    pillStyle: { background: '#F7A8C4', color: '#6E1233' },
  },
  {
    tag: 'Web',
    name: 'Desarrollo Web',
    desc: 'HTML, CSS, JavaScript y frameworks para construir aplicaciones modernas.',
    pillStyle: { background: '#C9E8D0', color: '#1E5631' },
  },
  {
    tag: 'Datos',
    name: 'Bases de Datos',
    desc: 'Modelado, SQL y administración de bases de datos relacionales.',
    pillStyle: { background: '#F4D9A0', color: '#7A4E12' },
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
        class="fixed inset-0 z-[100] flex items-center justify-center"
        style="
          background: rgba(5,8,16,.72);
          backdrop-filter: blur(6px);
          padding: clamp(16px,4vw,40px);
        "
        role="dialog"
        :aria-label="modalTitles[type]"
        aria-modal="true"
      >
        <div
          @click.stop
          class="w-full max-w-[720px] max-h-[86vh] overflow-y-auto rounded-[28px]"
          style="
            background: linear-gradient(180deg, #15294a, #0e1b32);
            border: 1px solid rgba(207,163,78,.35);
            box-shadow: 0 30px 70px rgba(0,0,0,.6);
            animation: modalReveal .28s cubic-bezier(.2,.8,.2,1);
          "
        >
          <!-- Cabecera fija -->
          <div
            class="sticky top-0 flex items-center justify-between gap-4 border-b"
            style="
              padding: 24px clamp(22px,4vw,36px);
              background: linear-gradient(180deg, #15294a, rgba(21,41,74,.9));
              border-color: rgba(255,255,255,.1);
            "
          >
            <h2
              class="font-bold text-acento m-0"
              style="font-size: clamp(22px, 3vw, 30px)"
            >
              {{ modalTitles[type] }}
            </h2>
            <button
              @click="emit('close')"
              aria-label="Cerrar"
              class="flex size-11 shrink-0 items-center justify-center rounded-full border text-white cursor-pointer transition-[background] hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-acento/55"
              style="background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.2)"
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
          <div :style="{ padding: 'clamp(22px,4vw,36px)' }">

            <!-- Contenido: Categorías -->
            <template v-if="type === 'categorias'">
              <p class="text-white/82 leading-[1.6] m-0 mb-6" style="font-size: 16px">
                Los contenidos de WebCIS se organizan en cuatro pilares de aprendizaje de la
                carrera de ISC:
              </p>
              <div class="flex flex-col gap-4">
                <div
                  v-for="cat in categories"
                  :key="cat.tag"
                  class="flex items-start gap-4 rounded-[18px]"
                  style="
                    padding: 18px 20px;
                    background: rgba(255,255,255,.05);
                    border: 1px solid rgba(255,255,255,.1);
                  "
                >
                  <span
                    class="shrink-0 font-bold rounded-full px-4 py-1.5"
                    :style="{ ...cat.pillStyle, fontSize: '14px' }"
                  >
                    {{ cat.tag }}
                  </span>
                  <div>
                    <div class="font-semibold text-white" style="font-size: 17px">
                      {{ cat.name }}
                    </div>
                    <p class="text-white/72 leading-[1.5] m-0 mt-1" style="font-size: 14px">
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
                  class="h-[120px]"
                  style="filter: drop-shadow(0 6px 18px rgba(207,163,78,.3))"
                />
              </div>
              <p
                v-for="(para, i) in aboutParas"
                :key="i"
                class="text-white/86 leading-[1.65] mb-4"
                style="font-size: 16px"
              >
                {{ para }}
              </p>
              <div class="text-center font-bold text-acento mt-2" style="font-size: 20px">
                Piensa, aprende, desarrolla y crea.
              </div>
            </template>

            <!-- Contenido: Recursos -->
            <template v-if="type === 'recursos'">
              <p class="text-white/82 leading-[1.6] m-0 mb-6" style="font-size: 16px">
                Material de apoyo creado y validado por la comunidad, disponible para reforzar
                tu aprendizaje:
              </p>
              <div
                class="grid"
                style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px"
              >
                <div
                  v-for="r in recursos"
                  :key="r.title"
                  class="rounded-[18px] p-5"
                  style="background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1)"
                >
                  <div
                    class="flex size-[46px] items-center justify-center rounded-[12px] mb-3 text-acento"
                    style="background: rgba(207,163,78,.16)"
                    v-html="r.icon"
                  ></div>
                  <div class="font-semibold text-white" style="font-size: 17px">
                    {{ r.title }}
                  </div>
                  <p class="text-white/72 leading-[1.5] m-0 mt-1.5" style="font-size: 14px">
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
