import { test, expect, type Page } from '@playwright/test'
import { createTestUser, deleteTestUser, type TestUser } from './helpers/users'

let user: TestUser

test.beforeAll(async () => {
    user = await createTestUser('login')
})

test.afterAll(async () => {
    await deleteTestUser(user)
})

test('user can log in with valid credentials', async ({ page }: { page: Page }) => {
    await page.goto('/login')

    await page.getByPlaceholder('email').fill(user.email)
    await page.getByPlaceholder('password').fill(user.password)
    await page.getByRole('button', { name: 'sign in' }).click()

  // Redirected home...
    await expect(page).toHaveURL('/')

  // ...and Payload actually gave us a session cookie
    const cookies = await page.context().cookies()
    expect(cookies.some(c => c.name === 'payload-token')).toBe(true)
})

// Small helper so each test reads as "what's being tested", not form-filling
async function submitLogin(page: Page, email: string, password: string) {
    await page.goto('/login')
    await page.getByPlaceholder('email').fill(email)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'sign in' }).click()
}

test('wrong password shows an error and does not log in', async ({ page }) => {
    await submitLogin(page, user.email, 'definitely-wrong-password')

    await expect(page.getByText('Invalid credentials. Please try again.')).toBeVisible()
    await expect(page).toHaveURL('/login')

    const cookies = await page.context().cookies()
    expect(cookies.some(c => c.name === 'payload-token')).toBe(false)
})

test('unknown email shows the same error', async ({ page }) => {
    await submitLogin(page, 'nobody-here@example.com', 'whatever-123')

    await expect(page.getByText('Invalid credentials. Please try again.')).toBeVisible()
    await expect(page).toHaveURL('/login')
})

test('"sign up" button goes to the sign up page', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'sign up' }).click()
    await expect(page).toHaveURL('/signup')
})

test('"forgot password" button goes to the forgot password page', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'forgot password' }).click()
    await expect(page).toHaveURL('/forgot-password')
})