import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import RecoverInfo from '@/components/recover/RecoverInfo.vue'
import RecoverReset from '@/components/recover/RecoverReset.vue'

const mocks = vi.hoisted(() => ({
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
}))

vi.mock('@/services/auth.service', () => ({
  forgotPassword: mocks.forgotPassword,
  resetPassword: mocks.resetPassword,
}))

const global = {
  stubs: {
    RouterLink: {
      props: ['to'],
      template: '<a><slot /></a>',
    },
  },
}

describe('recover flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.forgotPassword.mockResolvedValue({ message: 'Código enviado' })
    mocks.resetPassword.mockResolvedValue({ message: 'Contraseña actualizada' })
  })

  it('step 1 requests the recovery code with the user email', async () => {
    const wrapper = mount(RecoverInfo, { global })

    await wrapper.get('input[type="email"]').setValue('ana@example.com')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(mocks.forgotPassword).toHaveBeenCalledWith({
      email: 'ana@example.com',
    })
    expect(wrapper.emitted('continue')?.[0]).toEqual([
      { email: 'ana@example.com' },
    ])
  })

  it('step 3 resets the password with email, password and reset token', async () => {
    const wrapper = mount(RecoverReset, {
      props: {
        email: 'ana@example.com',
        token: 'reset-token',
      },
      global,
    })
    const [passwordInput, confirmPasswordInput] = wrapper.findAll('input[type="password"]')

    await passwordInput.setValue('Secret1!')
    await confirmPasswordInput.setValue('Secret1!')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(mocks.resetPassword).toHaveBeenCalledWith({
      email: 'ana@example.com',
      password: 'Secret1!',
      token: 'reset-token',
    })
    expect(wrapper.emitted('continue')).toHaveLength(1)
  })

  it('step 3 keeps the user on the form when the backend rejects the reset', async () => {
    mocks.resetPassword.mockRejectedValue({ message: 'Token inválido.' })
    const wrapper = mount(RecoverReset, {
      props: {
        email: 'ana@example.com',
        token: 'bad-token',
      },
      global,
    })
    const [passwordInput, confirmPasswordInput] = wrapper.findAll('input[type="password"]')

    await passwordInput.setValue('Secret1!')
    await confirmPasswordInput.setValue('Secret1!')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Token inválido.')
    expect(wrapper.emitted('continue')).toBeUndefined()
  })
})
