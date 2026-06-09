<script setup>
import backgroundImage from "@/assets/images/home/home-background.png";
import HomeSections from "@/components/home/HomeSections.vue";
</script>

<template>
    <section
        class="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
    
        <div class="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <HomeSections />
        </div>
    </section>
</template>