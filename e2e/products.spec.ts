import { test, expect } from '@playwright/test'
import { createTestProduct, deleteTestProduct, hasAdmin, type TestProduct } from './helpers/products'

test.skip(!hasAdmin(), 'Needs E2E_ADMIN_EMAIL/PASSWORD in .env to create products')

let product: TestProduct

test.beforeAll(async () => {
  product = await createTestProduct('listed', { price: 2500 })
})

test.afterAll(async () => {
  if (product) await deleteTestProduct(product)
})

test('published products are listed with their price', async ({ page }) => {
  await page.goto('/products')
  const card = page.getByRole('link').filter({ hasText: product.name })
  await expect(card).toContainText('25 NZD') // 2500 cents
})

// KNOWN ISSUE (fails until fixed): addToCart() is empty, and the cart page isn't connected to products
test('ADD TO BAG puts the product in the cart', async ({ page }) => {
  await page.goto('/products')
  await page.getByRole('button', { name: 'ADD TO BAG' }).click()
  await page.goto('/cart')
  await expect(page.getByText('01 items')).toBeVisible()
})
