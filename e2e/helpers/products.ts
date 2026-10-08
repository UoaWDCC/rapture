import { request, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

export type TestProduct = { id: string; name: string; description: string; price: number }

export const hasAdmin = () => !!(process.env.E2E_ADMIN_EMAIL && process.env.E2E_ADMIN_PASSWORD)

async function adminApi() {
  const api = await request.newContext({ baseURL: BASE_URL })
  const login = await api.post('/api/users/login', {
    data: { email: process.env.E2E_ADMIN_EMAIL, password: process.env.E2E_ADMIN_PASSWORD },
  })
  expect(login.ok(), 'Admin login failed - check E2E_ADMIN_* in .env').toBeTruthy()
  const { token } = await login.json()
  return { api, headers: { Authorization: `JWT ${token}` } }
}

export async function createTestProduct(
  label: string,
  opts: { price?: number; status?: 'published' | 'draft' } = {},
): Promise<TestProduct> {
  const { api, headers } = await adminApi()
  const name = `E2E ${label} ${Date.now()}`
  const description = `e2e description for ${name}`
  const price = opts.price ?? 2500 // stored in cents

  const res = await api.post('/api/products', {
    headers,
    data: { name, description, price, currency: 'NZD', _status: opts.status ?? 'published' },
  })
  expect(res.ok(), `Failed to create product: ${await res.text()}`).toBeTruthy()

  const { doc } = await res.json()
  await api.dispose()
  return { id: doc.id, name, description, price }
}

export async function deleteTestProduct(product: TestProduct) {
  const { api, headers } = await adminApi()
  await api.delete(`/api/products/${product.id}`, { headers })
  await api.dispose()
}
