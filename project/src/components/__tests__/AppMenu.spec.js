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

  it('toggles the mobile navigation', async () => {
    const wrapper = mount(AppMenu, { global })
    const toggle = wrapper.get('button[aria-controls="primary-navigation"]')
    const navigation = wrapper.get('[data-test="primary-navigation"]')

    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(navigation.classes()).toContain('hidden')

    await toggle.trigger('click')

    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(navigation.classes()).toContain('block')
  })
})
