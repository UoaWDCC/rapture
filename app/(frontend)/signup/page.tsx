'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthInput from '../components/auth/authInput'
import AuthButton from '../components/auth/authButton'
import AuthFormCard from '../components/auth/authFormCard'
import AuthSideCard from '../components/auth/authSideCard'
import Image from 'next/image'
import { testAuthClient } from '@/lib/auth'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const { oauth } = testAuthClient.signin()
    const { password: passwordSignUp} = testAuthClient.register()
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        const result = await passwordSignUp({
            email,
            password,
        })

        console.log(result)

        if (result.isSuccess) {
            router.push('/account')
        } else {
            setError('Could not create account. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Main sign up form card */}
                <div className="relative w-[450px] h-[600px]">

                    {/* Decorative accent panel - form card bottom left */}
                    <div className="absolute bottom-6 -left-42 w-60 h-36 border-4 border-[#0650DA] rounded p-0.25 z-20">
                        <div className="w-full h-full border-2 border-[#0650DA] rounded bg-[#010C21]/80"></div>
                    </div>

                    {/* Decorative accent panel - form card bottom right */}
                    <div className="hidden md:block absolute bottom-18 -right-23 w-40 h-16 border-4 border-[#0650DA] rounded p-0.25 z-20">
                        <div className="w-full h-full border-2 border-[#0650DA] rounded bg-[#010C21]/80"></div>
                    </div>
                    {/* Mobile-only accent - big top right */}
                    <div className="block md:hidden absolute top-8 -right-46 w-48 h-56 border-4 border-[#0650DA] rounded p-0.25 z-20">
                        <div className="w-full h-full border-2 border-[#0650DA] rounded bg-[#0650DA]/15"></div>
                    </div>

                    {/* Mobile-only accent - small middle right */}
                    <div className="block md:hidden absolute top-82 -right-44 w-40 h-22 border-4 border-[#0650DA] rounded p-0.25 z-20">
                        <div className="w-full h-full border-2 border-[#0650DA] rounded bg-[#0650DA]/15"></div>
                    </div>

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
                                    onClick={() => { }}
                                    theme="blue"
                                />
                            </div>
                        </form>

                        {/* "or sign up with" divider and Gmail OAuth icon */}
                        <div className="flex flex-col items-center gap-3 mt-4">
                            <p className="text-gray-400 font-mono text-xs">or log in with</p>
                            <div className="border-2 border-[#0650DA] rounded-3xl px-8 py-2 cursor-pointer"
                                onClick={() => oauth('google')}
                            >
                                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <Image src="/gmail.png" alt="or sign up with" width={24} height={24} />
                                </div>
                            </div>
                        </div>

                    </AuthFormCard>
                </div>

                {/* Side card linking to login */}
                <div className="relative w-[275px] mt-4">

                    {/* Decorative accent panel - side card top right (behind) */}
                    <div className="hidden md:block absolute -top-18 -right-56 w-[400px] h-45 border-4 border-[#0650DA] rounded p-0.25 z-0">
                        <div className="w-full h-full border-2 border-[#0650DA] rounded bg-[#0650DA]/15"></div>
                    </div>

                    {/* Decorative accent panel - side card bottom right */}
                    <div className="hidden md:block absolute bottom-14 -right-32 w-60 h-60 border-4 border-[#0650DA] rounded p-0.25 z-20">
                        <div className="w-full h-full border-2 border-[#0650DA] rounded bg-[#010C21]/80"></div>
                    </div>

                    <div className="hidden md:block relative z-10 bg-[#010C21] rounded">
                        <AuthSideCard
                            title="LOGIN?"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            buttonLabel="login"
                            onButtonClick={() => router.push('/login')}
                            theme="blue"
                        />
                    </div>

                    {/* Mobile view side card */}
                    <div className="block md:hidden absolute -top-28 left-24 -right-24 z-10 bg-[#010C21] rounded">
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
        </div>
    )
}