'use client';
import { useState } from 'react';
import Button from './Button';

export default function ForgotPasswordButton() {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleForgotPassword = async () => {
        setError("")
        setSuccess(false)

        try {
            const res = await fetch(
                `/api/users/forgot-password`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                },
            )

            if (!res.ok) {
                setError("Email couldn't be sent.")
            }

            setSuccess(true)
        } catch {
            setError("Sorry, something went wrong.")
        }
    };

    if (success) {
        return <p>If email exists, email have been sent successfully.</p>
    }

    return(
        <div>
            <Button onClick={() => setOpen(true)}>Forgot Password</Button>

            {open && (
                <div className="z-20 min-h-screen min-w-screen bg-black/70">
                    <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <Button onClick={handleForgotPassword}>Send Reset Password Email</Button>
                    {error && (<p className="text-red-400 text-center font-mono">{error}</p>)}
                </div>
            )}
        </div>
    );
}