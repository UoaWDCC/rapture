import { getPayload } from 'payload'
import config from "@/payload.config"
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from "next/link"
import LogoutButton from '../components/ui/LogoutButton'

export default async function ProtectedPage() {
  const payload = await getPayload({ config: await config})
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    redirect('/login') 
  }

  return (
  <main className="p-8 font-sans flex flex-col items-center">
    <h1 className="text-3xl font-bold mb-6">Secure User Dashboard</h1>
    <Link href="/" className="mb-4 text-blue-500 hover:underline">Go back to Main Page</Link>
    <p className="mb-4">
      Authentication successful. Logged in as: <strong className="text-blue-500">{user.email}</strong>
    </p>
    <LogoutButton />
  </main>
)
}