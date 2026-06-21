import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import LoginCard from '@/components/login/LoginCard.vue'
import { login } from '@/services/auth.service'

const mocks = vi.hoisted(() => ({
  loginWithToken: vi.fn(),
  routerPush: vi.fn(),
}))

vi.mock('@/services/auth.service', () => ({
  login: vi.fn(),
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    loginWithToken: mocks.loginWithToken,
  }),
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
    mocks.loginWithToken.mockReturnValue(true)
    vi.mocked(login).mockResolvedValue({ token: 'valid-token' })
  })

  it('submits an email with the default alumno role', async () => {
    const wrapper = mountLoginCard()

    await submitCredentials(wrapper, 'alumno@example.com', 'secret')

    expect(login).toHaveBeenCalledWith({
      email: 'alumno@example.com',
      username: undefined,
      pass: 'secret',
      role: 'alumno',
    })
    expect(mocks.loginWithToken).toHaveBeenCalledWith('valid-token')
    expect(mocks.routerPush).toHaveBeenCalledWith('/app')
  })

  it('submits a username with the selected profesor role', async () => {
    const wrapper = mountLoginCard()
    await wrapper.get('button:nth-child(2)').trigger('click')

    await submitCredentials(wrapper, 'profesor01', 'secret')

    expect(login).toHaveBeenCalledWith({
      email: undefined,
      username: 'profesor01',
      pass: 'secret',
      role: 'profesor',
    })
  })

  it('does not navigate when the server omits the token', async () => {
    vi.mocked(login).mockResolvedValue({})
    const wrapper = mountLoginCard()

    await submitCredentials(wrapper, 'alumno01', 'secret')

    expect(wrapper.text()).toMatch(/El servidor no devolvi. un token\./)
    expect(mocks.loginWithToken).not.toHaveBeenCalled()
    expect(mocks.routerPush).not.toHaveBeenCalled()
  })

  it('shows an error and does not navigate when the token is invalid', async () => {
    mocks.loginWithToken.mockReturnValue(false)
    const wrapper = mountLoginCard()

    await submitCredentials(wrapper, 'alumno01', 'secret')

    expect(wrapper.text()).toContain('token invalido o expirado')
    expect(mocks.routerPush).not.toHaveBeenCalled()
  })
})
