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
        console.log("successfully sent email")
        return <p>If the email address exists, email have been sent successfully.</p>
    }

    return(
        <div>
            <Button onClick={() => setOpen(true)} className=" p-2 m-2">Forgot Password</Button>

            {open && (
                <div className="relative top-0 z-200 w-90vh min-h-screen bg-black/70 m-5 items-center">
                    <div className="items-center mx-50% my-auto">
                    <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} className=" p-2 m-2"></input>
                    <Button onClick={handleForgotPassword} className=" p-2 m-2">Send Reset Password Email</Button>
                    {error && (<p className="text-red-400 text-center font-mono">{error}</p>)}
                    </div>
                </div>
            )}
        </div>
    );
}