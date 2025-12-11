<script setup>
  import logoGobierno from "@/assets/images/logo-gobierno.png";
  import logoITVER from "@/assets/images/logo-ITVER.png";
  import logoSEP from "@/assets/images/logo-SEP.png";
  import logoTECNM from "@/assets/images/logo-TECNM.png";
</script>

<template>
  <header>
    <div class="bg-[#610D31] w-full h-11">
      <img :src="logoGobierno" alt="Logo del Gobierno de Mexico" class="w-25">
    </div>
    <div class=" bg-white w-full h-18 px-8 py-4 flex items-center space-x-11">
      <img :src="logoSEP" alt="Logo de la SEP" class="w-45">
      <img :src="logoTECNM" alt="Logo del TECNM" class="w-35">
      <img :src="logoITVER" alt="Logo de la ITVER" class="w-15">
    </div>
  </header>
</template>

<style scoped>
</style>
