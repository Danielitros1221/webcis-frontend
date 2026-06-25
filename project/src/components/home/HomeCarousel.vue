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
  current.value = (current.value - 1 + total.value) % total.value
}

function next() {
  current.value = (current.value + 1) % total.value
}

function goTo(i) {
  current.value = i
}

const counterText = computed(() => {
  const pad = (n) => (n < 10 ? '0' + n : '' + n)
  return `${pad(current.value + 1)} / ${pad(total.value)}`
})

const trackStyle = computed(() => ({
  display: 'flex',
  width: '100%',
  transform: `translateX(-${current.value * 100}%)`,
  transition: 'transform .55s cubic-bezier(.4,0,.2,1)',
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
      <h2
        class="font-bold text-acento m-0"
        style="font-size: clamp(28px, 4vw, 44px)"
      >
        Objetivos Específicos
      </h2>
      <p
        class="text-white/80 mx-auto mt-3 max-w-[620px]"
        style="font-size: clamp(14px, 1.6vw, 18px)"
      >
        Lo que impulsa a la comunidad WebCIS, en cada paso de su trabajo.
      </p>
    </div>

    <!-- Carrusel -->
    <div
      class="relative mt-9 rounded-[28px] overflow-hidden"
      style="
        background: linear-gradient(160deg, #28384e, #161e29);
        border: 1px solid rgba(207,163,78,.32);
        box-shadow: 0 16px 40px rgba(0,0,0,.4);
      "
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <!-- Pista de slides -->
      <div class="overflow-hidden">
        <div :style="trackStyle">
          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="flex flex-[0_0_100%] min-w-full flex-wrap"
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
                class="absolute inset-0"
                style="background: linear-gradient(105deg, rgba(12,24,48,0) 55%, rgba(12,24,48,.85) 100%)"
              ></div>
            </div>

            <!-- Panel de texto -->
            <div
              class="flex flex-[1_1_360px] flex-col justify-center"
              style="padding: clamp(30px, 4vw, 56px)"
            >
              <div
                class="font-semibold tracking-[.16em] uppercase text-acento mb-3"
                style="font-size: 13px"
              >
                Objetivo {{ slide.num }}
              </div>
              <h3
                class="font-bold text-white m-0 mb-4 leading-[1.2]"
                style="font-size: clamp(22px, 2.8vw, 32px)"
              >
                {{ slide.title }}
              </h3>
              <p
                class="text-white/86 leading-[1.6] m-0"
                style="font-size: clamp(15px, 1.7vw, 19px)"
              >
                {{ slide.text }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controles -->
      <div
        class="flex items-center justify-between border-t"
        style="padding: 18px clamp(20px,3vw,40px) 22px; border-color: rgba(255,255,255,.1)"
      >
        <!-- Anterior -->
        <button
          @click="prev"
          aria-label="Objetivo anterior"
          class="flex size-[50px] shrink-0 items-center justify-center rounded-full border text-white cursor-pointer transition-[background,border-color] hover:bg-acento/25 hover:border-acento focus-visible:outline-2 focus-visible:outline-acento/55"
          style="background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2)"
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
              class="h-[10px] rounded-full border-none cursor-pointer p-0 transition-[width,background] duration-[250ms] ease-out"
              :style="
                i === current
                  ? 'width: 30px; background: #CFA34E'
                  : 'width: 10px; background: rgba(255,255,255,.35)'
              "
            ></button>
          </div>
          <span
            class="font-semibold text-white/60 min-w-16 text-right"
            style="font-size: 14px; letter-spacing: .08em"
          >
            {{ counterText }}
          </span>
        </div>

        <!-- Siguiente -->
        <button
          @click="next"
          aria-label="Objetivo siguiente"
          class="flex size-[50px] shrink-0 items-center justify-center rounded-full border text-white cursor-pointer transition-[background,border-color] hover:bg-acento/25 hover:border-acento focus-visible:outline-2 focus-visible:outline-acento/55"
          style="background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2)"
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
