'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthInput from '../components/auth/authInput'
import AuthButton from '../components/auth/authButton'
import AuthFormCard from '../components/auth/authFormCard'

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    // Backend (actually saving the new password) is a separate ticket.
    // For now, send the user back to login.
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="relative w-full max-w-[450px]">
        <AuthFormCard title="CHANGE PASSWORD" theme="green" titleSize="2.5rem" cardHeight="480px" titleAlign="center">
          {error && (
            <p className="text-red-400 text-center font-mono">{error}</p>
          )}
          <form onSubmit={handleContinue} className="flex flex-col gap-4">
            <label className="text-white font-mono text-xs">create new password</label>
            <AuthInput
              type="password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              theme="green"
            />
            <label className="text-white font-mono text-xs">confirm new password</label>
            <AuthInput
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              theme="green"
            />
            <div className="mt-4">
              <AuthButton
                type="submit"
                label="CONTINUE"
                onClick={() => {}}
                theme="green"
                font="display"
              />
            </div>
          </form>
        </AuthFormCard>
      </div>
    </div>
  )
}