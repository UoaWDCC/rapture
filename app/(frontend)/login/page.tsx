'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthInput from '../components/auth/authInput'
import AuthButton from '../components/auth/authButton'
import AuthFormCard from '../components/auth/authFormCard'
import AuthSideCard from '../components/auth/authSideCard'
import Image from 'next/image'

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
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Main login form card */}
        <div className="relative w-[450px] h-[600px]">

          {/* Decorative accent panel - form card bottom left */}
          <div className="absolute bottom-6 -left-42 w-60 h-36 border-4 border-[#F2B423] rounded p-0.25 z-20">
            <div className="w-full h-full border-2 border-[#F2B423] rounded bg-[#271E06]/80"></div>
          </div>

          {/* Decorative accent panel - form card bottom right */}
          <div className="hidden md:block absolute bottom-18 -right-23 w-40 h-16 border-4 border-[#F2B423] rounded p-0.25 z-20">
            <div className="w-full h-full border-2 border-[#F2B423] rounded bg-[#271E06]/80"></div>
          </div>

          {/* Mobile-only accent - big top right */}
          <div className="block md:hidden absolute top-8 -right-46 w-48 h-56 border-4 border-[#F2B423] rounded p-0.25 z-20">
            <div className="w-full h-full border-2 border-[#F2B423] rounded bg-[#271E06]/80"></div>
          </div>

          {/* Mobile-only accent - small middle right */}
          <div className="block md:hidden absolute top-80 -right-44 w-40 h-22 border-4 border-[#F2B423] rounded p-0.25 z-20">
            <div className="w-full h-full border-2 border-[#F2B423] rounded bg-[#271E06]/80"></div>
          </div>

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
              <div className="mt-4">
                <AuthButton
                  type="submit"
                  label="sign in"
                  onClick={() => { }}
                  theme="gold"
                />
              </div>
            </form>

            {/* "or log in with" divider and Steam OAuth icon */}
            <div className="flex flex-col items-center gap-3 mt-4">
              <p className="text-gray-400 font-mono text-xs">or log in with</p>
              <div className="border-2 border-[#F2B423] rounded-3xl px-8 py-2">
                <Image src="/steam.png" alt="Sign in with Steam" width={32} height={32} />
              </div>
            </div>

          </AuthFormCard>
        </div>

        <div className="max-md:h-10"></div>

        {/* Side card linking to sign up */}
        <div className="relative w-[275px] mt-4">

          {/* Decorative accent panel - side card top right (behind) */}
          <div className="hidden md:block absolute -top-18 -right-56 w-[400px] h-45 border-4 border-[#F2B423] rounded p-0.25 z-0">
            <div className="w-full h-full border-2 border-[#F2B423] rounded bg-[#F2B423]/15"></div>
          </div>

          {/* Decorative accent panel - side card bottom right */}
          <div className="hidden md:block absolute bottom-14 -right-32 w-60 h-60 border-4 border-[#F2B423] rounded p-0.25 z-20">
            <div className="w-full h-full border-2 border-[#F2B423] rounded bg-[#271E06]/80"></div>
          </div>

          <div className="hidden md:block relative z-10 bg-[#271E06]/80 rounded">
            <AuthSideCard
              title={`NEW\nCUSTOMER?`}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              buttonLabel="sign up"
              onButtonClick={() => router.push('/signup')}
              theme="gold"
            />
          </div>

          <div className="block md:hidden absolute -top-45 left-24 -right-24 z-10 bg-[#271E06] rounded">
            <AuthSideCard
              title={`NEW\nCUSTOMER?`}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              buttonLabel="sign up"
              onButtonClick={() => router.push('/signup')}
              theme="gold"
            />
          </div>

        </div>

      </div>
    </div>
  )
}