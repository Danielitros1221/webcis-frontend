// Etiquetas visibles para los roles normalizados en stores/auth.js
// (student/professor/extern/admin).
export const ROLE_LABELS = {
  student: 'Alumno',
  professor: 'Profesor',
  extern: 'Egresado',
  admin: 'Administrador',
}

export function roleLabel(role) {
  return ROLE_LABELS[role] ?? ''
}
