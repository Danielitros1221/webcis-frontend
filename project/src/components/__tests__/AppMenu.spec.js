import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import AppMenu from '@/components/AppMenu.vue'

const global = {
  stubs: {
    RouterLink: {
      props: ['to'],
      template: '<a><slot /></a>',
    },
    PublicNav: {
      template: '<div data-test="public-nav" />',
    },
    AppNav: {
      template: '<div data-test="app-nav" />',
    },
    AdminNav: {
      template: '<div data-test="admin-nav" />',
    },
  },
}

describe('AppMenu', () => {
  it('renders public navigation by default', () => {
    const wrapper = mount(AppMenu, { global })

    expect(wrapper.find('[data-test="public-nav"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="app-nav"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="admin-nav"]').exists()).toBe(false)
  })

  it('renders app navigation when variant is app', () => {
    const wrapper = mount(AppMenu, {
      props: { variant: 'app' },
      global,
    })

    expect(wrapper.find('[data-test="app-nav"]').exists()).toBe(true)
  })

  it('renders admin navigation when variant is admin', () => {
    const wrapper = mount(AppMenu, {
      props: { variant: 'admin' },
      global,
    })

    expect(wrapper.find('[data-test="admin-nav"]').exists()).toBe(true)
  })
})
