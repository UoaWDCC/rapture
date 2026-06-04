'use client';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' });
    router.refresh();
  };

  return <Button onClick={handleLogout}>Log out</Button>;
}