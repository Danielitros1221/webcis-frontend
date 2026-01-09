<script setup>

</script>

<template>
  <div class=" contain margin:auto w-screen h-130">
    <div class="center bg-primario w-105 h-105 ">
      <h1 class="text-white text-6xl font-bold">
        Categorías
      </h1>
    </div>
    <div class="center bg-primario w-105 h-105">
      <h1 class="text-white text-6xl font-bold">
        WebCIS
      </h1>
    </div>
    <div class="center bg-primario w-105 h-105">
      <h1 class="text-white text-6xl font-bold">
        Recursos
      </h1>
    </div>

  </div>
</template>

<style scoped>
.contain{
  align-items: center;
  justify-content: center;
  display: flex;
}
.center {
  background-image: url("@/assets/images/ph.png");
  background-size: auto; /*placeholder*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  float: left;
  border-radius: 15px;
}
</style>
