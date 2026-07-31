import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { normalizeDashboardData, useDashboardStore } from '@/stores/dashboard'

const REAL_PAYLOAD = {
  user: { username: 'student', type: 'Student' },
  medals: 1,
  progress: 80,
  recent_courses: [
    {
      token: '000000000001',
      title: 'Laravel desde Cero: El framework moderno de PHP',
      short_title: 'Laravel desde cero',
      icon: null,
      last_accessed_at: '2026-07-27 23:52:09',
    },
    {
      token: '000000000002',
      title: 'Docker desde Cero: Aprendiendo sobre contenerización',
      short_title: 'Docker desde cero',
      icon: null,
      last_accessed_at: '2026-07-26 01:52:09',
    },
  ],
}

describe('normalizeDashboardData', () => {
  it('maps medals/progress/recent_courses to camelCase, ignoring the nested user', () => {
    expect(normalizeDashboardData(REAL_PAYLOAD)).toEqual({
      medals: 1,
      progress: 80,
      recentCourses: [
        {
          token: '000000000001',
          title: 'Laravel desde Cero: El framework moderno de PHP',
          shortTitle: 'Laravel desde cero',
          icon: null,
          lastAccessedAt: '2026-07-27 23:52:09',
        },
        {
          token: '000000000002',
          title: 'Docker desde Cero: Aprendiendo sobre contenerización',
          shortTitle: 'Docker desde cero',
          icon: null,
          lastAccessedAt: '2026-07-26 01:52:09',
        },
      ],
    })
  })

  it('defaults medals/progress to null and recent_courses to [] when absent', () => {
    expect(normalizeDashboardData({})).toEqual({ medals: null, progress: null, recentCourses: [] })
  })

  it('returns null for a non-object payload', () => {
    expect(normalizeDashboardData(null)).toBeNull()
    expect(normalizeDashboardData(undefined)).toBeNull()
  })
})

describe('dashboard store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts empty', () => {
    const dashboard = useDashboardStore()

    expect(dashboard.medals).toBeNull()
    expect(dashboard.progress).toBeNull()
    expect(dashboard.recentCourses).toEqual([])
    expect(dashboard.loaded).toBe(false)
    expect(dashboard.latestCourse).toBeNull()
  })

  it('sets the normalized data and exposes the most recent course', () => {
    const dashboard = useDashboardStore()

    expect(dashboard.setDashboardData(REAL_PAYLOAD)).toBe(true)
    expect(dashboard.medals).toBe(1)
    expect(dashboard.progress).toBe(80)
    expect(dashboard.recentCourses).toHaveLength(2)
    expect(dashboard.loaded).toBe(true)
    expect(dashboard.latestCourse).toEqual({
      token: '000000000001',
      title: 'Laravel desde Cero: El framework moderno de PHP',
      shortTitle: 'Laravel desde cero',
      icon: null,
      lastAccessedAt: '2026-07-27 23:52:09',
    })
  })

  it('clears back to the empty state', () => {
    const dashboard = useDashboardStore()
    dashboard.setDashboardData(REAL_PAYLOAD)

    dashboard.clear()

    expect(dashboard.medals).toBeNull()
    expect(dashboard.progress).toBeNull()
    expect(dashboard.recentCourses).toEqual([])
    expect(dashboard.loaded).toBe(false)
  })

  it('clears the state when given a non-object payload', () => {
    const dashboard = useDashboardStore()
    dashboard.setDashboardData(REAL_PAYLOAD)

    expect(dashboard.setDashboardData(null)).toBe(false)
    expect(dashboard.loaded).toBe(false)
  })
})
