import { test, expect } from '@playwright/test'

test.describe('homepage', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/OmniJournal/)
  })

  test('shows OmniJournal heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'OmniJournal' })).toBeVisible()
  })

  test('shows tagline text', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('AI-powered journaling')).toBeVisible()
  })

  test('has Get Started link pointing to /login', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: 'Get Started' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/login')
  })

  test('has View on GitHub link', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: 'View on GitHub' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', /github\.com\/chirag127\/omnijournal/)
  })

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    expect(errors).toHaveLength(0)
  })
})
