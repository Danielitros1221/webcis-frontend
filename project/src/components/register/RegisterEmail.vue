<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from "vee-validate"
import { schema } from '@/schemas/validationSchema.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const serverError = ref('')

async function onSubmit(values) {
  serverError.value = ''
  loading.value = true

  try {
    // Por ahora solo UI: luego aquí se llamará al backend para enviar token
    // await registerService.sendEmailVerification(values.email)
    // y avanzarías al step 2 en RegisterView

    console.log('Enviar verificación a:', values.email)

  } catch (err) {
    err.value = err?.message || 'No se pudo enviar el correo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Card principal -->
    <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-6">
      <h1 class="mt-5 text-4xl font-semibold text-white/70 leading-tight text-center">
        Regístrate
      </h1>

      <div class="mt-3 h-1 w-full bg-blue-600/80"></div>

      <p class="mt-5 text-center text-white/60 text-lg leading-relaxed">
        Como primer paso, necesitamos que ingreses tu correo electrónico
        para poder registrarte.
      </p>

      <Form class="mt-10 space-y-4" :validation-schema="schema" @submit="onSubmit">
        <div>
          <Field
            name="email"
            type="email"
            autocomplete="email"
            :disabled="loading"
            placeholder="Correo Electrónico"
            class="w-full rounded-lg border border-white/20 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 placeholder:italic outline-none focus:border-white/70"
          />
        </div>

        <ErrorMessage name="email" v-slot="{ message }">
          <p class="mt-2 text-sm text-red-300">
            {{ message }}
          </p>
        </ErrorMessage>

        <p v-if="serverError" class="text-sm text-red-300">
          {{ serverError }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-primario px-4 py-3 text-xl font-semibold text-white hover:bg-[#12294A]"
        >
          {{ loading ? 'Enviando...' : '¡REGISTRARTE!' }}
        </button>
      </Form>
    </div>

    <!-- Card inferior -->
    <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md py-3 px-3">
      <div class="text-center text-sm text-white/70 font-semibold">
        ¿Tienes una cuenta?
        <button
          type="button"
          class="ml-2 font-semibold text-orange-400 hover:underline"
          @click="router.push('/login')"
        >
          ENTRAR
        </button>
      </div>
    </div>
  </div>
</template>
