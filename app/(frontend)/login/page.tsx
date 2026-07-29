'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthInput from '../components/auth/authInput'
import AuthButton from '../components/auth/authButton'
import AuthFormCard from '../components/auth/authFormCard'
import AuthSideCard from '../components/auth/authSideCard'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  const res = await fetch('/api/users/login', {
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
    router.push('/') 
  } else {
    setError('Invalid credentials. Please try again.');
  }
}

  return (
    <div className="min-h-screen bg-[#171720] flex items-center justify-center p-8">
        <div className="flex gap-16">

            {/* Main login form card */}
            <div className="w-[400px] h-[600px]">
            <AuthFormCard title="LOGIN" theme="gold">
                {error && (
                    <p className="text-red-400 text-center font-mono">{error}</p>
                )}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <AuthInput
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        theme="gold"
                    />
                    <AuthInput
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        theme="gold"
                    />
                    <AuthButton
                        type="submit"
                        label="sign in"
                        onClick={() => {}}
                        theme="gold"
                    />
                </form>
            </AuthFormCard>
            </div>

            {/* Side card linking to sign up */}
            <div className="w-[250px] h-[600px]">
              <AuthSideCard
                title="NEW CUSTOMER?"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonLabel="Sign Up"
                onButtonClick={() => router.push('/signup')}
                theme="gold"
            />
            </div>

        </div>
    </div>
  )
}