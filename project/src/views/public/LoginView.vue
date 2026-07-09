<script setup>
  import LoginCard from "@/components/public/login/LoginCard.vue";
  import bgLogin from "@/assets/images/login.jpg";
</script>

<template>
  <section class="min-h-screen relative overflow-hidden">
    <img alt="" :src="bgLogin" class="absolute inset-0 w-full h-full object-cover" />

    <div class="relative min-h-screen flex items-center justify-center lg:justify-end px-6 lg:px-16">
      <div class="w-full max-w-md">

        <div class ="lg:col-span-5 flex items-center justify-center">
          <LoginCard />
        </div>

      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
