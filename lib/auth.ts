import { AuthClient } from 'payload-auth-plugin/client'

export const testAuthClient = new AuthClient('test', {  
    payloadBaseURL: 'http://localhost:3000'
})