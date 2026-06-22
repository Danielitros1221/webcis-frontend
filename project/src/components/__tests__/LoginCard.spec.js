import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import LoginCard from '@/components/login/LoginCard.vue'

const mocks = vi.hoisted(() => ({
  authLogin: vi.fn(),
  routerPush: vi.fn(),
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({ login: mocks.authLogin }),
}))

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useRouter: () => ({ push: mocks.routerPush }),
  }
})

function mountLoginCard() {
  return mount(LoginCard, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a><slot /></a>',
        },
      },
    },
  })
}

async function submitCredentials(wrapper, identifier, password) {
  const [identifierInput, passwordInput] = wrapper.findAll('input')
  await identifierInput.setValue(identifier)
  await passwordInput.setValue(password)
  await wrapper.find('form').trigger('submit')
  await flushPromises()
}

describe('LoginCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.authLogin.mockResolvedValue({ user: { id: 1 } })
  })

  it('submits an email with the default alumno role', async () => {
    const wrapper = mountLoginCard()

    await submitCredentials(wrapper, 'alumno@example.com', 'secret')

    expect(mocks.authLogin).toHaveBeenCalledWith({
      email: 'alumno@example.com',
      username: undefined,
      pass: 'secret',
      role: 'alumno',
    })
    expect(mocks.routerPush).toHaveBeenCalledWith('/app')
  })

  it('submits a username with the selected profesor role', async () => {
    const wrapper = mountLoginCard()
    await wrapper.get('button:nth-child(2)').trigger('click')

    await submitCredentials(wrapper, 'profesor01', 'secret')

    expect(mocks.authLogin).toHaveBeenCalledWith({
      email: undefined,
      username: 'profesor01',
      pass: 'secret',
      role: 'profesor',
    })
  })

  it('shows the login error and does not navigate', async () => {
    mocks.authLogin.mockRejectedValue({ message: 'Credenciales inválidas.' })
    const wrapper = mountLoginCard()

    await submitCredentials(wrapper, 'alumno01', 'wrong-password')

    expect(wrapper.text()).toContain('Credenciales inválidas.')
    expect(mocks.routerPush).not.toHaveBeenCalled()
  })
})
