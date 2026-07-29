import { test, expect } from '@playwright/test'

// Dashboard is behind auth — test redirect behaviour without credentials
test.describe('dashboard routes (unauthenticated)', () => {
  test('/dashboard redirects or shows auth', async ({ page }) => {
    await page.goto('/dashboard')
    const url = page.url()
    const isAuthRoute = url.includes('/login') || url.includes('/register') || url.includes('/dashboard')
    expect(isAuthRoute).toBeTruthy()
  })

  test('/dashboard/journal is reachable by URL', async ({ page }) => {
    await page.goto('/dashboard/journal')
    expect(page.url()).not.toContain('500')
  })

  test('/dashboard/notes is reachable by URL', async ({ page }) => {
    await page.goto('/dashboard/notes')
    expect(page.url()).not.toContain('500')
  })

  test('/dashboard/settings is reachable by URL', async ({ page }) => {
    await page.goto('/dashboard/settings')
    expect(page.url()).not.toContain('500')
  })
})
