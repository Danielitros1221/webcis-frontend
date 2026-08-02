<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate'

import BaseButton from '@/components/ui/BaseButton.vue'
import { profileEditSchema } from '@/schemas/validationSchema.js'

defineProps({
  initialValues: {
    type: Object,
    required: true,
  },
  roleLabel: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit', 'cancel'])

function onSubmit(values) {
  emit('submit', values)
}

const inputClass =
  'h-12 w-full rounded-[13px] border-[1.5px] border-gris-interfaz px-3.5 font-display text-[14.5px] outline-none focus:border-cobre-digital'
</script>

<template>
  <Form class="flex flex-col gap-[18px]" :validation-schema="profileEditSchema" :initial-values="initialValues" @submit="onSubmit">
    <div class="rounded-(--radius-card) bg-white p-[18px] shadow-(--shadow-card) sm:p-6">
      <p class="font-display text-[17px] font-bold text-negro-sintaxis">Información de la cuenta</p>

      <div class="mt-4 flex flex-col gap-4">
        <div>
          <label for="email" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Correo electrónico
          </label>
          <Field id="email" name="email" type="email" autocomplete="email" :class="inputClass" />
          <ErrorMessage v-slot="{ message }" name="email">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>

        <div>
          <label for="username" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Nombre de usuario
          </label>
          <div class="flex h-12 items-center rounded-[13px] border-[1.5px] border-gris-interfaz px-3.5 focus-within:border-cobre-digital">
            <span class="font-display text-[14.5px] text-[#999]">@</span>
            <Field
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              class="ml-0.5 h-full flex-1 font-display text-[14.5px] outline-none"
            />
          </div>
          <ErrorMessage v-slot="{ message }" name="username">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>

        <div>
          <label for="description" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Descripción
          </label>
          <Field
            id="description"
            name="description"
            as="textarea"
            rows="3"
            class="w-full resize-y rounded-[13px] border-[1.5px] border-gris-interfaz px-3.5 py-2.5 font-display text-[14.5px] outline-none focus:border-cobre-digital"
          />
          <p class="mt-1.5 font-display text-xs text-[#999]">Visible en tu muro para toda la comunidad WebCIS.</p>
          <ErrorMessage v-slot="{ message }" name="description">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>
      </div>
    </div>

    <div class="rounded-(--radius-card) bg-white p-[18px] shadow-(--shadow-card) sm:p-6">
      <p class="font-display text-[17px] font-bold text-negro-sintaxis">Información personal</p>

      <div class="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label for="names" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Nombre(s)
          </label>
          <Field id="names" name="names" type="text" autocomplete="given-name" :class="inputClass" />
          <ErrorMessage v-slot="{ message }" name="names">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>

        <div>
          <label for="control_number" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Número de control
          </label>
          <Field id="control_number" name="control_number" type="text" autocomplete="off" :class="inputClass" />
          <ErrorMessage v-slot="{ message }" name="control_number">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>

        <div>
          <label for="surname" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Primer apellido
          </label>
          <Field id="surname" name="surname" type="text" autocomplete="family-name" :class="inputClass" />
          <ErrorMessage v-slot="{ message }" name="surname">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>

        <div>
          <label for="second_surname" class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">
            Segundo apellido
          </label>
          <Field id="second_surname" name="second_surname" type="text" autocomplete="additional-name" :class="inputClass" />
          <ErrorMessage v-slot="{ message }" name="second_surname">
            <p class="mt-1 font-display text-xs text-red-600">{{ message }}</p>
          </ErrorMessage>
        </div>

        <div class="sm:col-span-2">
          <p class="mb-1.5 block font-display text-[13.5px] font-semibold text-negro-sintaxis">Tipo de usuario</p>
          <div class="flex h-12 items-center gap-2.5 rounded-[13px] bg-[#f6f7f9] px-3.5">
            <span
              class="rounded-full px-2.5 py-0.5 font-display text-xs font-bold"
              style="background: var(--color-tag-poo-bg); color: var(--color-tag-poo-fg)"
            >{{ roleLabel }}</span>
            <span class="ml-auto font-display text-[11.5px] text-[#999]">Solo informativo · asignado por administración</span>
          </div>
        </div>
      </div>

      <div class="mt-5 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-[13px] border-[1.5px] border-[#e2e4e8] px-5 py-2.5 font-display text-sm font-semibold text-[#555]"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <BaseButton type="submit" variant="gold">Guardar cambios</BaseButton>
      </div>
    </div>
  </Form>
</template>
