<script setup>

</script>
<link crossorigin="anonymous"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      referrerpolicy="no-referrer" rel="stylesheet"/>
<template>
  <div class=" menu flex flex-col h-16 w-screen bg-sky-900 shadow-lg items-end">
    <img src="@/assets/donfondo.png" alt="placeholder" class="don">
    <button class=" inicioSesion text-white bg-yellow-500">
      Iniciar Sesión
    </button>
    <button class=" registro text-white bg-yellow-500">
      Registrarse
    </button>
  </div>
</template>

<style scoped>
  .don{
    position: fixed;
    left: 50px;
    height: 50px;
    width: 120px;
    top: 6px;
  }
  .inicioSesion{
    position: fixed;
    right: 160px;
    top: 15px;
  }
  .registro{
    position: fixed;
    top: 15px;
    right: 15px;
  }
  button {
    border-radius: 10px;
    padding:  4px 20px;
    text-align: center;
    font-family: Helvetica, sans-serif;
  }
  button:hover {
    position: fixed;
    border-color: oklch(79.5% 0.184 86.047);
    border-width: 3px;
    cursor: pointer;
    transition-duration: 70ms;
    background-color: oklch(29.3% 0.066 243.157);
  }
</style>
