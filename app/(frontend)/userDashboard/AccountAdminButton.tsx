import React from 'react';
import Link from 'next/link';
import styles from './AccountAdminButton.module.css';

interface AccountAdminButtonProps {
  isAdmin?: boolean;
}

export default function AccountAdminButton({ isAdmin }: AccountAdminButtonProps) {
  if (!isAdmin) return null;

  return (
    <Link href="/admin/collections/users" className={styles.button}>
      <span className={styles.text}>ADMIN UPDATE</span>
    </Link>
  );
}
