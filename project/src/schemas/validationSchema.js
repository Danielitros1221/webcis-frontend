// src/schemas/validationSchema.js
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const registerEmailSchema = toTypedSchema(
  yup.object({
    email: yup
      .string()
      .required('El correo es obligatorio')
      .email('Ingresa un correo válido'),
  })
)
