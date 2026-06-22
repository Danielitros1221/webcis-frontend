<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { registerFormSchema } from '@/schemas/validationSchema.js'
import { RecaptchaV2 } from 'vue3-recaptcha-v2'
import { api } from '@/services/api'

const props = defineProps({
  email: { type: String, default: '' },
  token: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})

const recaptchaToken = ref('')
const captchaError = ref('')
const serverError = ref('')

function onCaptchaVerified(token) {
  recaptchaToken.value = token
}

function onCaptchaExpired() {
  recaptchaToken.value = ''
}

async function onSubmit(values) {
  captchaError.value = ''
  serverError.value = ''

  if (!recaptchaToken.value) {
    captchaError.value = 'Confirma que no eres un robot.'
    return
  }

  try {
    await api.post('/auth/register', {
      ...values,
      token: props.token,
      recaptcha_token: recaptchaToken.value,
    })
  } catch (err) {
    serverError.value = err?.message || 'No se pudo completar el registro.'
  }
}



</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-8">
      <h1 class="text-4xl font-semibold text-white leading-tight text-center py-2">
        Completa tus Datos de Registro
      </h1>

      <div class="mt-3 h-1 w-full bg-blue-600/80"></div>

      <Form class="mt-10 space-y-10" :validation-schema="registerFormSchema" :initial-values="{ email: props.email }" @submit="onSubmit">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Datos Personales -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-white/90 leading-tight py-2">
              Datos Personales
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col md:col-span-2">
                <label class="text-white/60 italic p-1">Nombre(s)</label>
                <Field name="name" type="text" autocomplete="given-name" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="name" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>


              <div class="flex flex-col">
                <label class="text-white/60 italic p-1">Primer Apellido</label>
                <Field name="surname" type="text" autocomplete="family-name" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="surname" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>

              <div class="flex flex-col">
                <label class="text-white/60 italic p-1">Segundo Apellido</label>
                <Field name="second_surname" type="text" autocomplete="additional-name" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="second_surname" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>

              <h2 class="text-2xl font-semibold text-white/90 leading-tight py-2">
                Captcha
              </h2>
              <div class="pt-4 flex justify-center md:col-span-2">
                <div class="space-y-2">
                  <RecaptchaV2
                    @load-callback="onCaptchaVerified"
                    @expired-callback="onCaptchaExpired"
                    @error-callback="() => (captchaError = 'Error cargando reCAPTCHA')"
                  />
                  <p v-if="captchaError" class="text-center text-sm text-red-300">
                    {{ captchaError }}
                  </p>
                </div>
              </div>


            </div>
          </section>

          <!-- Información de la Cuenta -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-white/90 leading-tight py-2">
              Información de la Cuenta
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col md:col-span-2">
                <label class="text-white/60 italic p-1">Correo Electrónico</label>
                <Field name="email" type="email" autocomplete="email" disabled
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="email" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>

              <div class="flex flex-col">
                <label class="text-white/60 italic p-1">Nombre de Usuario</label>
                <Field name="username" type="text" autocomplete="username" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="username" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>

              <div class="flex flex-col">
                <label class="text-white/60 italic p-1">Número de Control</label>
                <Field name="control_number" type="text" autocomplete="off" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="control_number" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>

              <div class="flex flex-col md:col-span-2">
                <label class="text-white/60 italic p-1">Contraseña</label>
                <Field name="pass" type="password" autocomplete="new-password" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="pass" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>

              <div class="flex flex-col md:col-span-2">
                <label class="text-white/60 italic p-1">Confirmar Contraseña</label>
                <Field name="pass_confirm" type="password" autocomplete="new-password" :disabled="loading"
                       class="w-full mt-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white outline-none focus:border-white/70" />
                <ErrorMessage name="pass_confirm" v-slot="{ message }">
                  <p class="mt-1 text-sm text-red-300">{{ message }}</p>
                </ErrorMessage>
              </div>
            </div>
          </section>
        </div>

        <!-- Botón -->
        <div class="pt-2 flex justify-end gap-4">
          <p v-if="serverError" class="self-center text-sm text-red-300">
            {{ serverError }}
          </p>
          <button type="submit" :disabled="!recaptchaToken || loading" class="px-7 py-3 rounded-lg bg-primario text-sm font-semibold text-white hover:bg-[#12294A]">
            Registrar
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>


<style scoped>

</style>
