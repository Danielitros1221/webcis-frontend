import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Form } from 'vee-validate'

import RegisterForm from '@/components/register/RegisterForm.vue'
import RegisterView from '@/views/public/RegisterView.vue'

const mocks = vi.hoisted(() => ({
  register: vi.fn(),
  route: { path: '/register/verify' },
  routerPush: vi.fn(),
}))

vi.mock('@/services/auth.service', () => ({
  register: mocks.register,
}))

vi.mock('vue3-recaptcha-v2', () => ({
  RecaptchaV2: {
    props: ['onLoadCallback'],
    template: `
      <button
        type="button"
        data-test="captcha"
        @click="onLoadCallback('captcha-token')"
      />
    `,
  },
}))

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useRoute: () => mocks.route,
    useRouter: () => ({ push: mocks.routerPush }),
  }
})

function pendingPromise() {
  return new Promise(() => {})
}

function mountRegisterForm() {
  return mount(RegisterForm, {
    props: {
      email: 'ana@example.com',
      token: 'verify-token',
    },
  })
}

async function completeRegisterForm(wrapper) {
  await wrapper.get('input[name="name"]').setValue('Ana')
  await wrapper.get('input[name="surname"]').setValue('López')
  await wrapper.get('input[name="username"]').setValue('ana_lopez')
  await wrapper.get('input[name="control_number"]').setValue('12345678')
  await wrapper.get('input[name="pass"]').setValue('Secret1!')
  await wrapper.get('input[name="pass_confirm"]').setValue('Secret1!')
  await wrapper.get('[data-test="captcha"]').trigger('click')
}

async function submitRegisterForm(wrapper) {
  await wrapper.findComponent(Form).vm.$emit('submit', {
    name: 'Ana',
    surname: 'López',
    second_surname: '',
    email: 'ana@example.com',
    username: 'ana_lopez',
    control_number: '12345678',
    pass: 'Secret1!',
    pass_confirm: 'Secret1!',
  })
}

describe('register flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.route.path = '/register/verify'
    mocks.register.mockResolvedValue({ id: 1 })
  })

  it('transitions to the success confirmation after a successful registration', async () => {
    const wrapper = mount(RegisterView, {
      global: {
        stubs: {
          RegisterEmail: { template: '<div />' },
          RegisterInfo: { template: '<div />' },
          RegisterConfirmed: {
            template: '<button data-test="confirmed" @click="$emit(\'continue\', { token: \'verify-token\', email: \'ana@example.com\' })" />',
          },
          RegisterForm: {
            template: '<button data-test="registered" @click="$emit(\'registered\')" />',
          },
          RegisterSuccess: {
            template: '<div data-test="register-success">Cuenta creada exitosamente</div>',
          },
        },
      },
    })

    await wrapper.get('[data-test="confirmed"]').trigger('click')
    await wrapper.get('[data-test="registered"]').trigger('click')

    expect(wrapper.find('[data-test="register-success"]').exists()).toBe(true)
  })

  it('shows the backend error when the register token is invalid', async () => {
    mocks.register.mockRejectedValue({ message: 'Token inválido.' })
    const wrapper = mountRegisterForm()

    await completeRegisterForm(wrapper)
    await submitRegisterForm(wrapper)
    await flushPromises()

    expect(wrapper.text()).toContain('Token inválido.')
    expect(wrapper.emitted('registered')).toBeUndefined()
  })

  it('disables the submit button while the registration request is pending', async () => {
    mocks.register.mockReturnValue(pendingPromise())
    const wrapper = mountRegisterForm()

    await completeRegisterForm(wrapper)
    await submitRegisterForm(wrapper)
    await wrapper.vm.$nextTick()

    const submit = wrapper.get('button[type="submit"]')
    expect(submit.attributes('disabled')).toBeDefined()
    expect(submit.text()).toBe('Registrando...')
  })
})
