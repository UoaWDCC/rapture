'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthInput from '../components/auth/authInput'
import AuthButton from '../components/auth/authButton'
import AuthFormCard from '../components/auth/authFormCard'
import AuthSideCard from '../components/auth/authSideCard'
import Image from 'next/image'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({
        email,
        password
    }),
  })

  if (res.ok) {
        router.push('/account')
    } else {
        const data = await res.json()
        console.log('Signup error:', data)
        setError('Could not create account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#171720] flex items-center justify-center p-8">
        <div className="flex gap-8">

            {/* Main sign up form card */}
            <div className="w-[450px] h-[600px]">
            <AuthFormCard title="SIGN UP" theme="blue">
                {error && (
                    <p className="text-red-400 text-center font-mono">{error}</p>
                )}
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <AuthInput
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        theme="blue"
                    />
                    <AuthInput
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        theme="blue"
                    />
                    <AuthInput
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        theme="blue"
                    />
                    <div className="mt-4">
                        <AuthButton
                            type="submit"
                            label="sign up"
                            onClick={() => {}}
                            theme="blue"
                        />
                    </div>
                </form>

            {/* "or sign up with" divider and Steam OAuth icon */}
              <div className="flex flex-col items-center gap-3 mt-4">
                  <p className="text-gray-400 font-mono text-xs">or sign up with</p>
                  <div className="border-2 border-[#0650DA] rounded-3xl px-8 py-2">
                      <Image src="/steam.png" alt="Sign up with Steam" width={32} height={32} />
                  </div>
              </div>

            </AuthFormCard>
            </div>

            {/* Side card linking to login */}
            <div className="w-[275px] mt-4">
              <AuthSideCard
                title="LOGIN?"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonLabel="login"
                onButtonClick={() => router.push('/login')}
                theme="blue"
              />
            </div>

        </div>
    </div>
  )
}