<script setup>
import webcisLogo from '@/assets/images/Logo.png'

const props = defineProps({
  type: { type: String, required: true },
  title: { type: String, required: true },
  bgImage: { type: String, default: null },
  revealDelay: { type: Number, default: 0 },
  revealed: { type: Boolean, default: false },
})

const emit = defineEmits(['open'])

function handleKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('open')
  }
}
</script>

<template>
  <div
    :style="{
      transition: `opacity .75s ease ${revealDelay}s, transform .75s ease ${revealDelay}s`,
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'none' : 'translateY(36px)',
      willChange: 'opacity, transform',
    }"
  >
    <article
      @click="emit('open')"
      @keydown="handleKey"
      tabindex="0"
      role="button"
      :aria-label="`Ver más sobre ${title}`"
      class="group relative flex h-[360px] cursor-pointer overflow-hidden rounded-[28px] border border-white/15 transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-[6px] hover:shadow-[0_20px_44px_rgba(0,0,0,.5)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-acento"
      :class="type === 'webcis' ? 'bg-[#050608]' : 'bg-black/40'"
      style="box-shadow: 0 12px 30px rgba(0,0,0,.4)"
    >
      <!-- Fondo para categorías/recursos -->
      <template v-if="type !== 'webcis' && bgImage">
        <img
          :src="bgImage"
          :alt="title"
          class="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
        <div
          class="absolute inset-0"
          :style="
            type === 'categorias'
              ? 'background: linear-gradient(180deg, rgba(40,10,55,.45) 0%, rgba(20,8,40,.7) 100%)'
              : 'background: linear-gradient(180deg, rgba(15,40,80,.4) 0%, rgba(8,20,45,.72) 100%)'
          "
        ></div>
      </template>

      <!-- Fondo para WebCIS: logo centrado + viñeta radial -->
      <template v-if="type === 'webcis'">
        <div class="absolute inset-0 flex items-center justify-center">
          <img
            :src="webcisLogo"
            alt=""
            aria-hidden="true"
            class="h-[230px] opacity-[.85]"
            style="filter: drop-shadow(0 6px 22px rgba(207,163,78,.25))"
            loading="lazy"
          />
        </div>
        <div
          class="absolute inset-0"
          style="background: radial-gradient(circle at center, rgba(5,6,8,.15) 30%, rgba(5,6,8,.78) 100%)"
        ></div>
      </template>

      <!-- Contenido centrado -->
      <div class="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 p-7 text-center">
        <h3
          class="font-extrabold text-white m-0"
          style="font-size: clamp(34px, 4.5vw, 48px); text-shadow: 0 4px 18px rgba(0,0,0,.6)"
        >
          {{ title }}
        </h3>
        <span
          class="font-bold text-base rounded-[12px] px-7 py-2.5 transition-[filter] group-hover:brightness-95"
          style="color: #1c1c1c; background: #EDEDED; box-shadow: 0 4px 10px rgba(0,0,0,.3)"
        >
          Ver más
        </span>
      </div>
    </article>
  </div>
</template>
