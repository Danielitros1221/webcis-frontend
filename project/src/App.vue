<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useAuthStore} from "@/stores/auth.js";

import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

const auth = useAuthStore();
let timerOut = null

onMounted(() => {
  timerOut = setInterval(() => {
    auth.ensureValidSession()
  }, 30_000)
})

onBeforeUnmount(() => {
  if (timerOut) clearInterval(timerOut)
})

</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style scoped>
</style>
