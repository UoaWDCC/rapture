'use client';

import { FormEvent, useState } from "react";

type props={
    token?: string;
}

export default function ResetForm({token}: props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("")
        if (!token) {
            setError("Password reset link invalid.")
            return
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }
        if (!(/[\d]/.test(password))) {
            setError("Password must contain a number.")
            return
        }
        if (!(/[a-z]/.test(password) && /[A-Z]/.test(password))) {
            setError("Password must contain both upper and lowercase character.")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setLoading(true)

        try {
            const res = await fetch(
                '/api/users/reset-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token, password
                    }
                )
            })

            const data = await res.json()

            if (!res.ok) {
                setError("error: can't reset password")
                return
            }

            setSuccess(true)
        } catch {
            setError("something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        console.log("successful password reset")
        return <p>Password reset successful</p>
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <input id="password" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" className=" p-2 m-2"></input>
                <input id="confirm-password" type="password" placeholder="New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" className=" p-2 m-2"></input>
                <button type="submit" disabled={loading} className="bg-blue-600 text-white font-medium truncate max-w-full p-2 m-2">
                    {loading ? 'Resetting...' : 'Reset'}
                </button>
            </div>
            {error && (<p className="text-red-400 text-center font-mono">{error}</p>)}
        </form>
    )
}
