<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import bgRegister from "@/assets/images/register.png";
  import RegisterEmail from '@/components/register/RegisterEmail.vue'

  const route = useRoute()
  const isVerifyRoute = computed(() => route.path.includes('/register/verify'))
</script>

<template>
  <section class="relative min-h-screen overflow-hidden">
    <img :src="bgRegister" alt="bgImg" class="absolute inset-0 w-full h-full object-cover" />

    <div class="relative min-h-screen flex items-center justify-center lg:justify-end px-6 lg:px-16 py-10">
      <div class="w-full max-w-md">
        <RegisterEmail v-if="!isVerifyRoute" />

      </div>
    </div>

  </section>
</template>

<style scoped>

</style>
