import { AuthClient } from 'payload-auth-plugin/client'

export const authClient = new AuthClient('app', {  
    payloadBaseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
})