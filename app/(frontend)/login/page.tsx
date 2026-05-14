'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      {error && (
          <p className="text-white text-center mt-2 font-medium mb-4">
            {error}
          </p>
        )}
      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm gap-4">
        <input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  )
}