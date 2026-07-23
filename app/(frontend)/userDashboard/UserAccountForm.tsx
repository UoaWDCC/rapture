'use client'

import { useActionState } from 'react'

export type UpdateAccountState = {
  status: 'success' | 'error'
  message: string
}

export default function UserAccountForm({
  action,
  currentEmail,
}: {
  action: (prev: UpdateAccountState | null, formData: FormData) => Promise<UpdateAccountState>
  currentEmail: string
}) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction}>
      <input name="currentPassword" type="password" placeholder="Current password" required />
      <input name="email" type="email" placeholder="New email" defaultValue={currentEmail} />
      <input name="newPassword" type="password" placeholder="New password" />
      <button type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
      {state && <p>{state.message}</p>}
    </form>
  )
}