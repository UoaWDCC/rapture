import { test, expect, type Page } from '@playwright/test'

const PRICE_ID = 'price_1TRQuyPgB8PggCocyrPvde6P' // hard-coded test product in cart/page.tsx

const addTestItem = (page: Page) => page.getByRole('button', { name: 'Add to cart' }).click()
const checkoutBtn = (page: Page) => page.getByRole('button', { name: 'GO TO CHECKOUT' })
const qty = (page: Page) =>
  page.getByRole('button', { name: 'Increase quantity' }).locator('xpath=preceding-sibling::span')

test.describe('cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cart')
  })

  test('starts empty with checkout disabled', async ({ page }) => {
    await expect(page.getByText('00 items')).toBeVisible()
    await expect(page.getByText('Your cart is empty.')).toBeVisible()
    await expect(checkoutBtn(page)).toBeDisabled()
  })

  test('adding an item shows it in the cart', async ({ page }) => {
    await addTestItem(page)
    await expect(page.getByRole('heading', { name: 'Rapture Shirt' })).toBeVisible()
    await expect(page.getByText('01 items')).toBeVisible()
    await expect(checkoutBtn(page)).toBeEnabled()
  })

  test('quantity can be changed and the item removed', async ({ page }) => {
    await addTestItem(page)
    await page.getByRole('button', { name: 'Increase quantity' }).click()
    await expect(qty(page)).toHaveText('2')

    // decreasing stops at 1
    await page.getByRole('button', { name: 'Decrease quantity' }).click()
    await page.getByRole('button', { name: 'Decrease quantity' }).click()
    await expect(qty(page)).toHaveText('1')

    await page.getByRole('button', { name: 'Remove item' }).click()
    await expect(page.getByText('Your cart is empty.')).toBeVisible()
  })
})

test.describe('checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cart')
  })

  test('sends the item to the checkout API and follows the redirect', async ({ page }) => {
    let body: any
    await page.route('**/api/checkout_sessions', async route => {
      body = route.request().postDataJSON()
      await route.fulfill({ json: { url: '/' } })
    })
    await addTestItem(page)
    await checkoutBtn(page).click()
    await expect(page).toHaveURL('/')
    expect(body.price_id).toBe(PRICE_ID)
  })

  test('shows an error if checkout fails', async ({ page }) => {
    await page.route('**/api/checkout_sessions', route =>
      route.fulfill({ status: 500, json: { error: 'Stripe is down' } }),
    )
    const dialogPromise = page.waitForEvent('dialog')
    await addTestItem(page)
    await checkoutBtn(page).click()
    const dialog = await dialogPromise
    expect(dialog.message()).toContain('Something went wrong on checkout')
    await dialog.dismiss()
  })

  // KNOWN ISSUE (fails until fixed): only price_id of the first item is sent; quantity is hard-coded to 1 in the API route
  test('sends the quantity to the checkout API', async ({ page }) => {
    let body: any
    await page.route('**/api/checkout_sessions', async route => {
      body = route.request().postDataJSON()
      await route.fulfill({ json: { url: '/' } })
    })
    await addTestItem(page)
    await page.getByRole('button', { name: 'Increase quantity' }).click()
    await checkoutBtn(page).click()
    await expect(page).toHaveURL('/')
    expect(body).toMatchObject({ quantity: 2 })
  })
})

test('success page without a session id shows the error page', async ({ page }) => {
  await page.goto('/success')
  await expect(page.getByText('error #500')).toBeVisible()
})
