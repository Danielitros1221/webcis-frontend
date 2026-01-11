<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useAuthStore} from "@/stores/auth.js";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const auth = useAuthStore();
let timerOut = null

onMounted(() => {
  auth.initFromStorage()
  timerOut = setInterval(() => {
    auth.ensureValidSession()
  }, 30_000)
})

onBeforeUnmount(() => {
  if (timerOut) clearInterval(timerOut)
})

</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped>
</style>
