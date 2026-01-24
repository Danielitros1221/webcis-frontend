<script setup>

</script>

<template>
  <div class="bg-primario contain w-screen h-auto">

    <div class="left bg-primario">
      <h1 class="text-white text-6xl font-bold">
        Categorías
      </h1>
    </div>
    <div class="center bg-primario">
      <h1 class="text-white text-6xl font-bold">
        WebCIS
      </h1>
    </div>
    <div class="right bg-primario">
      <h1 class="text-white text-6xl font-bold">
        Recursos
      </h1>
      <h1 class="text-white"></h1>
    </div>

  </div>
</template>

<style scoped>

.contain{
  margin: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  display: flex;
  max-width: 100%;
  border-radius: 20px;

}

.trigger:hover + .text {
  opacity: 1;
}

.left {
  height: 50%;
  width: 50%;
  aspect-ratio: 1/1;
  background-image: url("@/assets/images/home/code.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.center{
  height: 50%;
  width: 50%;
  aspect-ratio: 1/1;
  //background-image: url("@/assets/images/home/");
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.right {
  height: 50%;
  width: 50%;
  aspect-ratio: 1/1;
  background-image: url("@/assets/images/home/coding-stock-image.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.center:hover{
  transform: scale(1.05);
}

</style>
