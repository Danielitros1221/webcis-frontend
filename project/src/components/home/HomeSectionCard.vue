<script setup>
import webcisLogo from '@/assets/images/Logo.png'

defineProps({
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
    class="transition-[opacity,transform] duration-[750ms] ease-out [will-change:opacity,transform]"
    :class="revealed ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'"
    :style="{ transitionDelay: `${revealDelay}s` }"
  >
    <article
      @click="emit('open')"
      @keydown="handleKey"
      tabindex="0"
      role="button"
      :aria-label="`Ver más sobre ${title}`"
      class="group relative flex h-[360px] cursor-pointer overflow-hidden rounded-[28px] border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,.4)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-[6px] hover:shadow-[0_20px_44px_rgba(0,0,0,.5)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-acento"
      :class="type === 'webcis' ? 'bg-[#050608]' : 'bg-black/40'"
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
          :class="
            type === 'categorias'
              ? 'bg-[linear-gradient(180deg,rgba(40,10,55,.45)_0%,rgba(20,8,40,.7)_100%)]'
              : 'bg-[linear-gradient(180deg,rgba(15,40,80,.4)_0%,rgba(8,20,45,.72)_100%)]'
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
            class="h-[230px] opacity-[.85] drop-shadow-[0_6px_22px_rgba(207,163,78,.25)]"
            loading="lazy"
          />
        </div>
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,6,8,.15)_30%,rgba(5,6,8,.78)_100%)]"
        ></div>
      </template>

      <!-- Contenido centrado -->
      <div
        class="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 p-7 text-center"
      >
        <h3
          class="m-0 text-[clamp(34px,4.5vw,48px)] font-extrabold text-white [text-shadow:0_4px_18px_rgba(0,0,0,.6)]"
        >
          {{ title }}
        </h3>
        <span
          class="rounded-[12px] bg-[#ededed] px-7 py-2.5 text-base font-bold text-[#1c1c1c] shadow-[0_4px_10px_rgba(0,0,0,.3)] transition-[filter] group-hover:brightness-95"
        >
          Ver más
        </span>
      </div>
    </article>
  </div>
</template>
