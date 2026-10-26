import { request, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'
const TEST_PASSWORD = 'Test-password-123'

export type TestUser = { id: string; email: string; password: string }

// A fresh email every run, so tests never collide with leftover users
function uniqueEmail(label: string) {
    return `e2e-${label}-${Date.now()}@example.com`
    }

    export async function createTestUser(label = 'user'): Promise<TestUser> {
    const api = await request.newContext({ baseURL: BASE_URL })
    const email = uniqueEmail(label)

    const res = await api.post('/api/users', { data: { email, password: TEST_PASSWORD } })
    expect(res.ok(), `Failed to create test user: ${await res.text()}`).toBeTruthy()

    const body = await res.json()
    await api.dispose()
    return { id: body.doc.id, email, password: TEST_PASSWORD }
    }

    // Only admins can delete users, so this logs in as an admin first.
    // If no admin credentials are set, it quietly skips cleanup.
    export async function deleteTestUser(user: TestUser) {
    const adminEmail = process.env.E2E_ADMIN_EMAIL
    const adminPassword = process.env.E2E_ADMIN_PASSWORD
    if (!adminEmail || !adminPassword) return

    const api = await request.newContext({ baseURL: BASE_URL })
    const login = await api.post('/api/users/login', {
        data: { email: adminEmail, password: adminPassword },
    })
    const { token } = await login.json()

    await api.delete(`/api/users/${user.id}`, {
        headers: { Authorization: `JWT ${token}` },
    })
    await api.dispose()
}