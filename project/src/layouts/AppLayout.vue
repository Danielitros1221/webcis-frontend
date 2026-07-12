<script setup>
import AppSidebar from '@/components/navigation/AppSidebar.vue'
import AppTopbar from '@/components/navigation/AppTopbar.vue'
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <AppTopbar />
    <div class="flex flex-1 overflow-hidden bg-(image:--gradient-page)">
      <AppSidebar />
      <main class="flex-1 overflow-y-auto px-6 py-8 md:px-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>
