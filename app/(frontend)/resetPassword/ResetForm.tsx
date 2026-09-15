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
            setError("Password reset link invalid")
            return
        }
        if (password.length < 8) {
            setError("Password(s) must be at least 8 characters.")
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
        return <p>Password reset successful</p>
    }

    return(
        <form onSubmit={handleSubmit}>
            <input id="password" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"></input>
            <input id="confirm-password" type="password" placeholder="New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password"></input>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white font-medium truncate max-w-full">
                {loading ? 'Resetting...' : 'Reset'}
            </button>
            {error && (<p className="text-red-400 text-center font-mono">{error}</p>)}
        </form>
    )
}
