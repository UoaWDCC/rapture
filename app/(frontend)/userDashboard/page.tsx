import { getPayload } from 'payload'
import config from "@/payload.config"
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from "next/link"
import UserAccountForm, { type UpdateAccountState } from './UserAccountForm'

export default async function ProtectedPage() {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    redirect('/login')
  }

  async function updateAccount(
    _prev: UpdateAccountState,
    formData: FormData,
  ): Promise<UpdateAccountState> {
    'use server'
    const payload = await getPayload({ config: await config })
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) redirect('/login')

    const currentPassword = String(formData.get('currentPassword') ?? '')
    const newEmail = String(formData.get('email') ?? '').trim()
    const newPassword = String(formData.get('newPassword') ?? '')

    try {
      await payload.login({ collection: 'users', data: { email: user.email, password: currentPassword } })
    } catch {
      return { status: 'error', message: 'Current password is incorrect.' }
    }

    const data: Record<string, unknown> = {}
    if (newEmail && newEmail !== user.email) data.email = newEmail
    if (newPassword) data.password = newPassword

    if (Object.keys(data).length === 0) {
      return { status: 'error', message: 'Nothing to update.' }
    }

    try {
      await payload.update({ collection: 'users', id: user.id, data, user })
      revalidatePath('/userDashboard')
      return { status: 'success', message: 'Account updated.' }
    } catch (err: any) {
      const msg = err?.data?.errors?.[0]?.message ?? err?.message ?? 'Update failed.'
      return { status: 'error', message: msg }
    }
  }

  return (
    <main className="p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Secure User Dashboard</h1>
      <Link href="/" className="mb-4 text-blue-500 hover:underline">Go back to Main Page</Link>
      <p className="mb-4">
        Authentication successful. Logged in as: <strong className="text-blue-500">{user.email}</strong>
      </p>

      <UserAccountForm action={updateAccount} currentEmail={user.email ?? ''} />
    </main>
  )
}