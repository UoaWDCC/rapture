import { test, expect, type Page } from '@playwright/test'
import { createTestUser, deleteTestUser, type TestUser } from './helpers/users'

const PASSWORD = 'Test-password-123'

async function fillSignup(page: Page, email: string, password: string, confirm: string) {
    await page.goto('/signup')
    await page.getByPlaceholder('email').fill(email)
    // exact: true, otherwise 'password' also matches 'confirm password'
    await page.getByPlaceholder('password', { exact: true }).fill(password)
    await page.getByPlaceholder('confirm password').fill(confirm)
}

test('user can sign up with valid details', async ({ page }) => {
    const email = `e2e-signup-${Date.now()}@example.com`
    await fillSignup(page, email, PASSWORD, PASSWORD)

  // Catch the API call the form makes, to confirm the account was really created
    const [res] = await Promise.all([
    page.waitForResponse(r => r.url().endsWith('/api/users') && r.request().method() === 'POST'),
    page.getByRole('button', { name: 'sign up' }).click(),
    ])
    expect(res.status()).toBe(201)
    const { doc } = await res.json()
    expect(doc.email).toBe(email)

    // Redirect not asserted: it goes to /account, which doesn't exist (noted in PR)
    await deleteTestUser({ id: doc.id, email, password: PASSWORD })
})

test('mismatched passwords show an error', async ({ page }) => {
    await fillSignup(page, `e2e-mismatch-${Date.now()}@example.com`, PASSWORD, 'something-else-123')
    await page.getByRole('button', { name: 'sign up' }).click()

    await expect(page.getByText('Passwords do not match.')).toBeVisible()
    await expect(page).toHaveURL('/signup')
})

test('existing email shows an error', async ({ page }) => {
    const existing: TestUser = await createTestUser('dupe')
    await fillSignup(page, existing.email, PASSWORD, PASSWORD)
    await page.getByRole('button', { name: 'sign up' }).click()

    await expect(page.getByText('Could not create account. Please try again.')).toBeVisible()
    await expect(page).toHaveURL('/signup')
    await deleteTestUser(existing)
})

test('"login" button goes to the login page', async ({ page }) => {
    await page.goto('/signup')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page).toHaveURL('/login')
})