<script setup>

</script>

<template>
  <div class=" contain margin:auto w-screen h-auto">
    <div class="center bg-primario">
      <h1 class="text-white text-6xl font-bold">
        Categorías
      </h1>
    </div>
    <div class="center bg-primario">
      <h1 class="text-white text-6xl font-bold">
        WebCIS
      </h1>
    </div>
    <div class="center bg-primario">
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
  height: 100%;
  width: 100%;
  aspect-ratio: 1/1;
  max-height: 90%;
  max-width: 90%;
  background-image: url("@/assets/images/ph.png");
  background-size: auto; /*placeholder*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  float: left;
  border-radius: 15px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.center:hover {
  transform: scale(1.05);
}
</style>
