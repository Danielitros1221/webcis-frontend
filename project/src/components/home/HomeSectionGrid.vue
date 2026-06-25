<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomeSectionCard from './HomeSectionCard.vue'
import categoriasImg from '@/assets/images/home/code.jpg'
import recursosImg from '@/assets/images/home/coding-stock-image.jpg'

const emit = defineEmits(['open-modal'])

const cards = [
  { type: 'categorias', title: 'Categorías', bgImage: categoriasImg },
  { type: 'webcis', title: 'WebCIS', bgImage: null },
  { type: 'recursos', title: 'Recursos', bgImage: recursosImg },
]

const revealed = ref([false, false, false])
const gridRef = ref(null)
let revealObserver = null

onMounted(() => {
  if (!gridRef.value) return
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const i = Number(entry.target.dataset.idx)
          revealed.value[i] = true
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  )
  Array.from(gridRef.value.children).forEach((el, i) => {
    el.dataset.idx = i
    revealObserver.observe(el)
  })
})

onUnmounted(() => revealObserver?.disconnect())
</script>

<template>
  <section
    class="w-full border-b"
    style="
      background: linear-gradient(180deg, #060d18 0px, #0b1626 64px, #101d33 150px);
      border-color: rgba(207,163,78,.35);
      padding: clamp(56px,7vw,104px) clamp(16px,5vw,64px) clamp(48px,6vw,84px);
      margin-bottom: 84px;
    "
  >
    <div class="max-w-[1460px] mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-3.5">
        <h2
          class="font-bold text-acento m-0"
          style="font-size: clamp(28px, 4vw, 44px)"
        >
          Secciones de Interés
        </h2>
        <p
          class="text-white/80 mx-auto mt-3 max-w-[620px]"
          style="font-size: clamp(14px, 1.6vw, 18px)"
        >
          Explora la plataforma: descubre las categorías de aprendizaje, conoce el proyecto y
          accede a todos los recursos.
        </p>
      </div>

      <!-- Grid de tarjetas -->
      <div
        ref="gridRef"
        class="grid mt-10"
        style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px"
      >
        <HomeSectionCard
          v-for="(card, i) in cards"
          :key="card.type"
          :type="card.type"
          :title="card.title"
          :bg-image="card.bgImage"
          :reveal-delay="i * 0.12"
          :revealed="revealed[i]"
          @open="emit('open-modal', card.type)"
        />
      </div>
    </div>
  </section>
</template>
