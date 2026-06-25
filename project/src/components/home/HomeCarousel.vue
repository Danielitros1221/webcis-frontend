<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  autoplaySeconds: { type: Number, default: 6 },
})

const current = ref(0)
const paused = ref(false)
let autoTimer = null

const total = computed(() => props.slides.length)

function prev() {
  if (total.value === 0) return
  current.value = (current.value - 1 + total.value) % total.value
}

function next() {
  if (total.value === 0) return
  current.value = (current.value + 1) % total.value
}

function goTo(i) {
  current.value = i
}

const counterText = computed(() => {
  const pad = (n) => (n < 10 ? '0' + n : '' + n)
  if (total.value === 0) return '00 / 00'
  return `${pad(current.value + 1)} / ${pad(total.value)}`
})

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`,
}))

function startAuto() {
  stopAuto()
  if (!props.autoplay || props.slides.length === 0) return
  const secs = Math.max(3, props.autoplaySeconds)
  autoTimer = setInterval(() => {
    if (!paused.value) next()
  }, secs * 1000)
}

function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer)
    autoTimer = null
  }
}

onMounted(startAuto)
onUnmounted(stopAuto)
watch(() => [props.autoplay, props.autoplaySeconds], startAuto)
</script>

<template>
  <div>
    <!-- Encabezado de sección -->
    <div class="text-center mb-3">
      <h2 class="m-0 text-[clamp(28px,4vw,44px)] font-bold text-acento">Objetivos Específicos</h2>
      <p class="mx-auto mt-3 max-w-[620px] text-[clamp(14px,1.6vw,18px)] text-white/80">
        Lo que impulsa a la comunidad WebCIS, en cada paso de su trabajo.
      </p>
    </div>

    <!-- Carrusel -->
    <div
      class="relative mt-9 overflow-hidden rounded-[28px] border border-acento/30 bg-[linear-gradient(160deg,#28384e,#161e29)] shadow-[0_16px_40px_rgba(0,0,0,.4)]"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <!-- Pista de slides -->
      <div class="overflow-hidden">
        <div
          class="flex w-full transition-transform duration-[550ms] ease-[cubic-bezier(.4,0,.2,1)]"
          :style="trackStyle"
        >
          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="flex min-w-full flex-[0_0_100%] flex-wrap"
          >
            <!-- Panel de imagen -->
            <div class="relative min-h-[320px] flex-[1_1_360px] bg-[#0c1830]">
              <img
                :src="slide.img"
                :alt="slide.title"
                class="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,24,48,0)_55%,rgba(12,24,48,.85)_100%)]"
              ></div>
            </div>

            <!-- Panel de texto -->
            <div class="flex flex-[1_1_360px] flex-col justify-center p-[clamp(30px,4vw,56px)]">
              <div class="mb-3 text-[13px] font-semibold uppercase tracking-[.16em] text-acento">
                Objetivo {{ slide.num }}
              </div>
              <h3 class="m-0 mb-4 text-[clamp(22px,2.8vw,32px)] font-bold leading-[1.2] text-white">
                {{ slide.title }}
              </h3>
              <p class="m-0 text-[clamp(15px,1.7vw,19px)] leading-[1.6] text-white/[.86]">
                {{ slide.text }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controles -->
      <div
        class="flex items-center justify-between border-t border-white/10 px-[clamp(20px,3vw,40px)] pb-[22px] pt-[18px]"
      >
        <!-- Anterior -->
        <button
          @click="prev"
          aria-label="Objetivo anterior"
          class="flex size-[50px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/[.08] text-white transition-[background,border-color] hover:border-acento hover:bg-acento/25 focus-visible:outline-2 focus-visible:outline-acento/55"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        <!-- Dots + contador -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <button
              v-for="(_, i) in slides"
              :key="i"
              @click="goTo(i)"
              :aria-label="`Ir al objetivo ${i + 1}`"
              :aria-current="i === current ? 'true' : undefined"
              class="h-[10px] cursor-pointer rounded-full border-none p-0 transition-[width,background] duration-[250ms] ease-out"
              :class="i === current ? 'w-[30px] bg-acento' : 'w-[10px] bg-white/35'"
            ></button>
          </div>
          <span class="min-w-16 text-right text-sm font-semibold tracking-[.08em] text-white/60">
            {{ counterText }}
          </span>
        </div>

        <!-- Siguiente -->
        <button
          @click="next"
          aria-label="Objetivo siguiente"
          class="flex size-[50px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/[.08] text-white transition-[background,border-color] hover:border-acento hover:bg-acento/25 focus-visible:outline-2 focus-visible:outline-acento/55"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
