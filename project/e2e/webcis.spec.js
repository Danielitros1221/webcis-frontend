import { expect, test } from '@playwright/test'

test.describe('WebCIS public flows', () => {
  test('renders the home page', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/WebCIS/i)
    await expect(page.getByRole('heading', { name: 'WebCIS', exact: true }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Iniciar sesi.n/i })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Registrarse' })).toBeVisible()
  })

  test('renders the login form', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByRole('heading', { name: /Inicio de sesi.n/ })).toBeVisible()
    await expect(page.getByPlaceholder(/Usuario o correo electr.nico/)).toBeVisible()
    await expect(page.getByPlaceholder(/Contrase.a/)).toBeVisible()
  })

  test('starts registration at the email step', async ({ page }) => {
    await page.goto('/register')

    await expect(page.getByRole('heading', { name: /Reg.strate/ })).toBeVisible()
    await expect(page.getByPlaceholder(/Correo Electr.nico/)).toBeVisible()
  })

  test('shows an invalid verification state without a token', async ({ page }) => {
    await page.goto('/register/verify')

    await expect(page.getByRole('heading', { name: 'Correo NO Confirmado' })).toBeVisible()
    await expect(page.getByText(/No se encontr. el token de verificaci.n en el enlace/)).toBeVisible()
  })

  test('redirects anonymous users from private routes', async ({ page }) => {
    await page.goto('/app')

    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByRole('heading', { name: /Inicio de sesi.n/ })).toBeVisible()
  })
})

test.describe('WebCIS responsive layout', () => {
  test('has no horizontal overflow on desktop', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const overflow = await page.evaluate(() => (
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    ))

    expect(overflow).toBeLessThanOrEqual(1)
    await page.screenshot({ path: testInfo.outputPath('home-desktop.png'), fullPage: true })
  })

  test('opens the menu without horizontal overflow on mobile', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const toggle = page.getByRole('button', { name: /Abrir men./ })
    await expect(toggle).toBeVisible()
    await toggle.click()
    await expect(page.getByRole('link', { name: /Iniciar sesi.n/i })).toBeVisible()

    const overflow = await page.evaluate(() => (
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    ))

    expect(overflow).toBeLessThanOrEqual(1)
    await page.screenshot({ path: testInfo.outputPath('home-mobile-menu.png'), fullPage: true })
  })
})
