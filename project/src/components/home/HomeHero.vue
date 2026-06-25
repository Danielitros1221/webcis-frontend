<script setup>
import heroImage from '@/assets/images/home/hero-itver.jpg'
</script>

<template>
  <section
    class="relative isolate flex min-h-[clamp(360px,52vw,520px)] items-center overflow-hidden bg-home-bg"
  >
    <img
      :src="heroImage"
      alt="Instalaciones del Instituto Tecnológico de Veracruz"
      width="2048"
      height="1152"
      fetchpriority="high"
      class="absolute inset-0 -z-20 size-full object-cover object-[72%_center]"
    />
    <div
      class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,16,30,.97)_0%,rgba(8,16,30,.92)_30%,rgba(8,16,30,.6)_58%,rgba(8,16,30,.28)_80%,rgba(8,16,30,.12)_100%)]"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-[1460px] px-[clamp(16px,5vw,64px)] py-12">
      <div class="max-w-[680px]">
        <p
          class="mb-3.5 text-[clamp(12px,1.4vw,15px)] font-semibold uppercase tracking-[.18em] text-acento"
        >
          Plataforma Educativa Digital · ISC
        </p>
        <h1
          class="m-0 text-[clamp(56px,10vw,112px)] font-extrabold leading-[.98] text-white [text-shadow:0_6px_30px_rgba(0,0,0,.65),0_2px_8px_rgba(0,0,0,.55)]"
        >
          Web<span class="text-acento">CIS</span>
        </h1>
        <p
          class="mt-4 text-[clamp(18px,2.6vw,28px)] font-semibold text-white [text-shadow:0_3px_16px_rgba(0,0,0,.7)]"
        >
          Piensa, aprende, desarrolla y crea.
        </p>
        <p
          class="mt-4 max-w-[560px] text-[clamp(15px,1.7vw,19px)] leading-[1.55] text-white/90 [text-shadow:0_2px_10px_rgba(0,0,0,.6)]"
        >
          Una comunidad donde estudiantes, profesores y egresados de Ingeniería en Sistemas
          comparten conocimiento y crecen juntos.
        </p>
        <div class="mt-7">
          <RouterLink
            to="/register"
            class="inline-block rounded-[15px] bg-acento px-[30px] py-[15px] text-[17px] font-bold text-[#3a2a08] no-underline shadow-[0_6px_18px_rgba(0,0,0,.35)] transition-[filter,transform] hover:brightness-[1.07] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          >
            Forma parte de la comunidad
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
