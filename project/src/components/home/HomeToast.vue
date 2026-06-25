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
        class="fixed bottom-7 left-1/2 z-[200] flex items-center gap-3 -translate-x-1/2 rounded-[14px]"
        style="
          background: #15294a;
          border: 1px solid rgba(207,163,78,.45);
          padding: 14px 22px;
          box-shadow: 0 14px 36px rgba(0,0,0,.5);
        "
        role="status"
        aria-live="polite"
      >
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-full text-acento"
          style="background: rgba(207,163,78,.2)"
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
        <span class="font-medium text-white whitespace-nowrap" style="font-size: 15px">
          {{ message }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>
