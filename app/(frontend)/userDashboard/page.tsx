import { getPayload } from 'payload'
import config from "@/payload.config"
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from "next/link"

export default async function ProtectedPage() {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    redirect('/login')
  }

  async function updateAccount(formData: FormData) {
    'use server'
    const payload = await getPayload({ config: await config })
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) redirect('/login')

    const currentPassword = String(formData.get('currentPassword') ?? '')
    const newEmail = String(formData.get('email') ?? '').trim()
    const newPassword = String(formData.get('newPassword') ?? '')
    // in the frontend-fixed version of this we need an error on the return
    try {
      await payload.login({ collection: 'users', data: { email: user.email, password: currentPassword } })
    } catch {
      return
    }

    const data: Record<string, unknown> = {}
    if (newEmail && newEmail !== user.email) data.email = newEmail
    if (newPassword) data.password = newPassword

    if (Object.keys(data).length > 0) {
      await payload.update({ collection: 'users', id: user.id, data, user })
    }
  }

  return (
    <main className="p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Secure User Dashboard</h1>
      <Link href="/" className="mb-4 text-blue-500 hover:underline">Go back to Main Page</Link>
      <p className="mb-4">
        Authentication successful. Logged in as: <strong className="text-blue-500">{user.email}</strong>
      </p>

      <form action={updateAccount} className="flex flex-col gap-2">
        <input name="currentPassword" type="password" placeholder="Current password" required />
        <input name="email" type="email" placeholder="New email" defaultValue={user.email ?? ''} />
        <input name="newPassword" type="password" placeholder="New password (optional)" />
        <button type="submit">Save</button>
      </form>
    </main>
  )
}