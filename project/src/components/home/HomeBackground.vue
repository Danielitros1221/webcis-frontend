<script setup>
import backgroundImage from '@/assets/images/home/home-background.png'
import HomeSections from '@/components/home/HomeSections.vue'
</script>

<template>
  <section id="recursos-webcis" class="relative isolate overflow-hidden bg-[#06152B]">
    <img
      :src="backgroundImage"
      alt=""
      width="1727"
      height="3884"
      loading="lazy"
      class="absolute inset-0 -z-20 size-full object-cover object-center"
    >
    <div class="absolute inset-0 -z-10 bg-[#06152B]/45"></div>

    <div class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <HomeSections />
    </div>
  </section>
</template>
