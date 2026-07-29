import { test, expect } from '@playwright/test'

test.describe('navigation', () => {
  test('homepage to login via Get Started', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Get Started' }).click()
    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  })

  test('login page to register', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('link', { name: 'Register' }).click()
    await expect(page).toHaveURL('/register')
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible()
  })

  test('register page back to login', async ({ page }) => {
    await page.goto('/register')
    await page.getByRole('link', { name: 'Sign in' }).click()
    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  })

  test('browser back works from login to homepage', async ({ page }) => {
    await page.goto('/')
    await page.goto('/login')
    await page.goBack()
    await expect(page).toHaveURL('/')
  })
})
