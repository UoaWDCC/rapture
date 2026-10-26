import { test, expect, type Page } from '@playwright/test'

// /merch uses 14 hard-coded sample products (MerchPageClient.tsx)
const cards = (page: Page) => page.getByRole('link').filter({ hasText: 'item description here' })

test.beforeEach(async ({ page }) => {
  await page.goto('/merch')
})

test('shows the first 4 products and LOAD MORE shows more', async ({ page }) => {
  await expect(cards(page)).toHaveCount(4)
  await expect(page.getByText('you have loaded 4 out of 14 products')).toBeVisible()

  await page.getByRole('button', { name: 'LOAD MORE' }).click()
  await expect(cards(page)).toHaveCount(8)
})

// KNOWN ISSUE (fails until fixed): every product card links to the home page ("/")
test('clicking a product opens its product page', async ({ page }) => {
  await cards(page).first().click()
  await expect(page).toHaveURL(/\/(merch|products)\/.+/)
})
