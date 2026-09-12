'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/ui/Button";

type props={
    token?: string;
}

export default function ResetForm({token}: props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleSubmit() {}

    return(
        <form onSubmit={handleSubmit}>
            <input id="password" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"></input>
            <input id="confirm-password" type="password" placeholder="New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password"></input>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white font-medium truncate max-w-full">
                {loading ? 'Resetting...' : 'Reset'}
            </button>
        </form>
    )
}
