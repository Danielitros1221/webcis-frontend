<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: { type: String, default: null },
})

const visible = ref(false)
let timer = null

watch(
  () => props.message,
  (msg) => {
    clearTimeout(timer)
    if (msg) {
      visible.value = true
      timer = setTimeout(() => {
        visible.value = false
      }, 2600)
    } else {
      visible.value = false
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(.2,.8,.2,1)]"
      leave-active-class="transition-[opacity,transform] duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-4"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="visible && message"
        class="fixed bottom-7 left-1/2 z-[200] flex w-[min(calc(100%-2rem),520px)] -translate-x-1/2 items-center gap-3 rounded-[14px] border border-acento/45 bg-[#15294a] px-[22px] py-3.5 shadow-[0_14px_36px_rgba(0,0,0,.5)]"
        role="status"
        aria-live="polite"
      >
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-full bg-acento/20 text-acento"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 8v5M12 16h.01"></path>
          </svg>
        </span>
        <span class="text-[15px] font-medium leading-snug text-white">
          {{ message }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>
