import { test, expect } from '@playwright/test'

test.describe('auth pages', () => {
  test.describe('login page', () => {
    test('renders sign in heading', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
    })

    test('shows email and password inputs', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByPlaceholder('Email')).toBeVisible()
      await expect(page.getByPlaceholder('Password')).toBeVisible()
    })

    test('shows Sign in submit button', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    })

    test('shows Continue with Google button', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
    })

    test('has link to register page', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register')
    })

    test('navigates to register from login', async ({ page }) => {
      await page.goto('/login')
      await page.getByRole('link', { name: 'Register' }).click()
      await expect(page).toHaveURL('/register')
    })
  })

  test.describe('register page', () => {
    test('renders Create account heading', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible()
    })

    test('shows name, email, password inputs', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByPlaceholder('Display name')).toBeVisible()
      await expect(page.getByPlaceholder('Email')).toBeVisible()
      await expect(page.getByPlaceholder(/Password/)).toBeVisible()
    })

    test('shows Create account submit button', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible()
    })

    test('has link back to sign in', async ({ page }) => {
      await page.goto('/register')
      await expect(page.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login')
    })

    test('navigates to login from register', async ({ page }) => {
      await page.goto('/register')
      await page.getByRole('link', { name: 'Sign in' }).click()
      await expect(page).toHaveURL('/login')
    })
  })

  test('Get Started from homepage navigates to login', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Get Started' }).click()
    await expect(page).toHaveURL('/login')
  })
})
