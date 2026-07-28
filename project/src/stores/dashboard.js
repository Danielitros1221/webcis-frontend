import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// GET /dashboard (ver auth.js/refreshSession) devuelve, junto con `user`:
// { medals: number, progress: number (0-100, promedio global de todos los
// cursos activos, no por curso), recent_courses: [{ token, title,
// short_title, icon, last_accessed_at }] } — máx. 5, solo cursos con
// last_accessed_at no nulo (confirmado en EnrollmentService del backend).
// No es la lista completa de cursos inscritos.
function normalizeCourse(course) {
  if (!course || typeof course !== 'object') return null

  return {
    token: course.token ?? null,
    title: course.title ?? null,
    shortTitle: course.short_title ?? null,
    icon: course.icon ?? null,
    lastAccessedAt: course.last_accessed_at ?? null,
  }
}

export function normalizeDashboardData(payload) {
  if (!payload || typeof payload !== 'object') return null

  return {
    medals: payload.medals ?? null,
    progress: payload.progress ?? null,
    recentCourses: Array.isArray(payload.recent_courses)
      ? payload.recent_courses.map(normalizeCourse).filter(Boolean)
      : [],
  }
}

export const useDashboardStore = defineStore('dashboard', () => {
  const medals = ref(null)
  const progress = ref(null)
  const recentCourses = ref([])
  const loaded = ref(false)

  // Curso más reciente entre los inscritos con actividad; base para
  // "Continúa donde lo dejaste".
  const latestCourse = computed(() => recentCourses.value[0] ?? null)

  function setDashboardData(payload) {
    const normalized = normalizeDashboardData(payload)
    if (!normalized) {
      clear()
      return false
    }

    medals.value = normalized.medals
    progress.value = normalized.progress
    recentCourses.value = normalized.recentCourses
    loaded.value = true
    return true
  }

  function clear() {
    medals.value = null
    progress.value = null
    recentCourses.value = []
    loaded.value = false
  }

  return {
    medals,
    progress,
    recentCourses,
    loaded,
    latestCourse,
    setDashboardData,
    clear,
  }
})
