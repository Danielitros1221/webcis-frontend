<script setup>
import heroImage from '@/assets/images/itver.jpg'
</script>

<template>
  <section
    class="relative flex items-center overflow-hidden"
    style="min-height: clamp(360px, 52vw, 520px)"
  >
    <img
      :src="heroImage"
      alt="Instalaciones del Instituto Tecnológico de Veracruz"
      width="2048"
      height="1152"
      fetchpriority="high"
      class="absolute inset-0 size-full object-cover"
      style="object-position: 72% center"
    />
    <div
      class="absolute inset-0"
      style="background: linear-gradient(90deg, rgba(8,16,30,.97) 0%, rgba(8,16,30,.92) 30%, rgba(8,16,30,.6) 58%, rgba(8,16,30,.28) 80%, rgba(8,16,30,.12) 100%)"
    ></div>

    <div
      class="relative z-10 w-full max-w-[1460px] mx-auto"
      style="padding: 48px clamp(16px, 5vw, 64px)"
    >
      <div class="max-w-[680px]">
        <p
          class="font-semibold tracking-[.18em] uppercase text-acento mb-3.5"
          style="font-size: clamp(12px, 1.4vw, 15px)"
        >
          Plataforma Educativa Digital · ISC
        </p>
        <h1
          class="font-extrabold text-white m-0 leading-[.98]"
          style="font-size: clamp(56px, 10vw, 112px); text-shadow: 0 6px 30px rgba(0,0,0,.65), 0 2px 8px rgba(0,0,0,.55)"
        >
          Web<span class="text-acento">CIS</span>
        </h1>
        <p
          class="font-semibold text-white mt-4"
          style="font-size: clamp(18px, 2.6vw, 28px); text-shadow: 0 3px 16px rgba(0,0,0,.7)"
        >
          Piensa, aprende, desarrolla y crea.
        </p>
        <p
          class="text-white/90 leading-[1.55] mt-4 max-w-[560px]"
          style="font-size: clamp(15px, 1.7vw, 19px); text-shadow: 0 2px 10px rgba(0,0,0,.6)"
        >
          Una comunidad donde estudiantes, profesores y egresados de Ingeniería en Sistemas
          comparten conocimiento y crecen juntos.
        </p>
        <div class="mt-7">
          <RouterLink
            to="/register"
            class="inline-block font-bold rounded-[15px] no-underline transition-[filter] hover:brightness-[1.07] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
            style="font-size: 17px; color: #3a2a08; background: var(--color-acento); padding: 15px 30px; box-shadow: 0 6px 18px rgba(0,0,0,.35)"
          >
            Forma parte de la comunidad
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
