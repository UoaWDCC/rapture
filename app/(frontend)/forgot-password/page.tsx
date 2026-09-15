'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthInput from '../components/auth/authInput'
import AuthButton from '../components/auth/authButton'
import AuthFormCard from '../components/auth/authFormCard'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend (sending the reset email) is a separate ticket.
    router.push('/change-password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="relative w-full max-w-[450px]">
        <AuthFormCard title="FORGOT PASSWORD" theme="green" titleSize="2.5rem" cardHeight="570px">
          <form onSubmit={handleContinue} className="flex flex-col gap-4">
            <label className="text-white font-mono text-xs">EMAIL</label>
            <AuthInput
              type="email"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              theme="green"
            />
            <div className="mt-4">
              <AuthButton
                type="submit"
                label="CONTINUE"
                onClick={() => {}}
                theme="green"
              />
            </div>
          </form>
        </AuthFormCard>
      </div>
    </div>
  )
}