<script setup>
defineProps({
  bannerSrc: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  roleLabel: {
    type: String,
    default: '',
  },
  avatarSrc: {
    type: String,
    default: null,
  },
  initials: {
    type: String,
    default: '',
  },
})

const tab = defineModel('tab', { default: 'muro' })
</script>

<template>
  <div>
    <div class="relative h-[140px] overflow-hidden sm:h-[200px]">
      <img :src="bannerSrc" alt="" class="size-full object-cover">
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(10, 10, 10, 0.55))"
      />
    </div>

    <div class="mx-auto max-w-[900px] px-6">
      <div class="relative z-10 -mt-[38px] flex items-end gap-4 sm:-mt-[52px] sm:gap-5">
        <div
          class="size-20 flex-none overflow-hidden rounded-full border-4 border-[#e7e5df] sm:size-28"
          style="box-shadow: 0 0 0 3px var(--color-oro-ingenieril)"
        >
          <img v-if="avatarSrc" :src="avatarSrc" alt="" class="size-full object-cover">
          <div
            v-else
            class="flex size-full items-center justify-center bg-primario font-display text-lg font-semibold text-white sm:text-2xl"
          >
            {{ initials }}
          </div>
        </div>

        <div class="min-w-0 flex-1 pb-1.5">
          <h1 class="truncate font-display text-lg font-bold text-white sm:text-2xl">{{ fullName }}</h1>
          <p class="mt-0.5 truncate font-display text-xs text-white/60 sm:text-sm">
            @{{ username }} · {{ roleLabel }}
          </p>
        </div>
      </div>

      <div class="mt-4 flex w-max gap-1.5 rounded-[14px] border border-white/12 bg-white/6 p-1 sm:mt-5.5">
        <button
          type="button"
          class="rounded-[10px] px-4 py-2 font-display text-sm font-semibold sm:px-5.5"
          :class="tab === 'muro' ? 'bg-oro-ingenieril text-[#3a2a08]' : 'text-white/70'"
          @click="tab = 'muro'"
        >
          Muro
        </button>
        <button
          type="button"
          class="rounded-[10px] px-4 py-2 font-display text-sm font-semibold sm:px-5.5"
          :class="tab === 'editar' ? 'bg-oro-ingenieril text-[#3a2a08]' : 'text-white/70'"
          @click="tab = 'editar'"
        >
          Editar perfil
        </button>
      </div>
    </div>
  </div>
</template>
