<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String, default: null },
  linkedin: { type: String, required: true },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <a
    :href="linkedin"
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col items-center rounded-[24px] border border-white/10 bg-white/[.05] p-7 text-center no-underline transition-[transform,border-color,box-shadow] duration-[250ms] ease-out hover:-translate-y-[6px] hover:border-acento/30 hover:shadow-[0_16px_34px_rgba(0,0,0,.4)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-acento/55"
  >
    <!-- Avatar -->
    <div class="size-[104px] rounded-full bg-[linear-gradient(135deg,#CFA34E,#A86E2E)] p-[3px]">
      <img
        v-if="photo"
        :src="photo"
        :alt="name"
        width="104"
        height="104"
        class="block size-full rounded-full border-[3px] border-[#1a2433] object-cover"
        loading="lazy"
      />
      <div
        v-else
        class="flex size-full items-center justify-center rounded-full border-[3px] border-[#1a2433] bg-[#1a2433] text-2xl font-bold text-acento"
      >
        {{ initials }}
      </div>
    </div>

    <div class="mt-[18px] text-[17px] font-semibold leading-[1.3] text-white">
      {{ name }}
    </div>
    <div class="mt-1.5 text-[13px] text-acento">
      {{ role }}
    </div>

    <!-- Badge LinkedIn -->
    <span
      class="mt-[18px] inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-[18px] py-2 text-sm font-semibold text-white"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
        <path
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
        />
      </svg>
      LinkedIn
    </span>
  </a>
</template>
