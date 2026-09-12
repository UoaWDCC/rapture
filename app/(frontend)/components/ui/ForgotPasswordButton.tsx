'use client';
import { useState } from 'react';
import Button from './Button';

export default function ForgotPasswordButton() {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    const handleForgotPassword = async () => {
        const res = await fetch(
            `api/users/forgot-password`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            },
        )
    };

    return(
        <div>
            <Button onClick={() => setOpen(true)}>Forgot Password</Button>

            {open && (
                <div className="z-20 min-h-screen min-w-screen bg-black/70">
                    <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <Button onClick={handleForgotPassword}>Send Reset Password Email</Button>
                </div>
            )}
        </div>
    );
}