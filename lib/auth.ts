import { AuthClient } from 'payload-auth-plugin/client'

export const testAuthClient = new AuthClient('app', {  
    payloadBaseURL: 'http://localhost:3000'
})