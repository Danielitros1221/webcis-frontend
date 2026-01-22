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

/**
 * Reglas de contraseña (segura)
 * - mínimo 8
 * - 1 mayúscula
 * - 1 minúscula
 * - 1 número
 * - 1 símbolo
 */
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

export const registerFormSchema = toTypedSchema(
  yup.object({
    // Datos personales
    name: yup
      .string()
      .required('El nombre es obligatorio')
      .min(2, 'Mínimo 2 caracteres')
      .max(50, 'Máximo 50 caracteres'),

    surname: yup
      .string()
      .required('El primer apellido es obligatorio')
      .min(2, 'Mínimo 2 caracteres')
      .max(40, 'Máximo 40 caracteres'),

    second_surname: yup
      .string()
      .nullable()
      .transform((v) => (v === '' ? null : v))
      .max(40, 'Máximo 40 caracteres'),

    // Cuenta
    username: yup
      .string()
      .required('El usuario es obligatorio')
      .min(4, 'Mínimo 4 caracteres')
      .max(40, 'Máximo 40 caracteres')
      .matches(/^[a-zA-Z0-9._-]+$/, 'Solo letras, números, punto, guion y guion bajo'),

    control_number: yup
      .string()
      .max(10, "Máximo 10 caracteres"),

    pass: yup
      .string()
      .required('La contraseña es obligatoria')
      .matches(
        passwordRules,
        'Mín. 8 caracteres, mayúscula, minúscula, número y símbolo'
      ),

    pass_confirm: yup
      .string()
      .required('Confirma tu contraseña')
      .oneOf([yup.ref('pass')], 'Las contraseñas no coinciden'),
  })
)
