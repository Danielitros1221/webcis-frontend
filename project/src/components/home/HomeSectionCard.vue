<script setup>
import webcisLogo from '@/assets/images/webcis_shield.png'

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
    class="will-change-[opacity,transform] transition-[opacity,transform] duration-1600 ease-[cubic-bezier(.16,1,.3,1)]"
    :class="revealed ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'"
    :style="{ transitionDelay: `${revealDelay}s` }"
  >
    <article
      @click="emit('open')"
      @keydown="handleKey"
      tabindex="0"
      role="button"
      :aria-label="`Ver más sobre ${title}`"
      class="group relative flex h-[360px] cursor-pointer overflow-hidden rounded-[28px] shadow-[0_12px_30px_rgba(0,0,0,.4)] transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(0,0,0,.5)] focus-visible:outline-2 focus-visible:outline-offset-[3px]"
      :class="type === 'webcis' ? 'bg-[#050608]' : 'bg-black/40'"
    >
      <!-- Imagen de fondo (unificada para las 3 cards) -->
      <img
        :src="type === 'webcis' ? webcisLogo : bgImage"
        :alt="type === 'webcis' ? '' : title"
        :aria-hidden="type === 'webcis' ? 'true' : undefined"
        class="absolute inset-0 size-full transition-transform duration-900 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]"
        :class="type === 'webcis' ? 'object-contain p-10' : 'object-cover'"
        loading="lazy"
      />
      <!-- Overlay de gradiente (por tipo) -->
      <div
        class="absolute inset-0"
        :class="
          type === 'webcis'
            ? 'bg-[radial-gradient(circle_at_center,rgba(5,6,8,.05)_25%,rgba(5,6,8,.75)_100%)]'
            : type === 'categorias'
              ? 'bg-[linear-gradient(180deg,rgba(40,10,55,.45)_0%,rgba(20,8,40,.7)_100%)]'
              : 'bg-[linear-gradient(180deg,rgba(15,40,80,.4)_0%,rgba(8,20,45,.72)_100%)]'
        "
      ></div>

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
          class="rounded-xl bg-[#ededed] px-7 py-2.5 text-base font-bold text-[#1c1c1c] shadow-[0_4px_10px_rgba(0,0,0,.3)] transition-[filter] group-hover:brightness-95"
        >
          Ver más
        </span>
      </div>
    </article>
  </div>
</template>
