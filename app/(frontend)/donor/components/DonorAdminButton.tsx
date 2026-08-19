import React from 'react';
import Link from 'next/link';
import styles from './DonorAdminButton.module.css';

interface DonorAdminButtonProps {
  isAdmin?: boolean;
}

export default function DonorAdminButton({ isAdmin }: DonorAdminButtonProps) {
  if (!isAdmin) return null;

  return (
    <div className={styles.wrapper}>
      <Link href="/admin" className={styles.button}>
        <svg
          viewBox="0 0 322 52"
          className={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 5 0 L 246.2 0 Q 251.2 0 255.9 5 L 285.3 36 Q 290 41 290 46 L 290 47 Q 290 52 285 52 L 5 52 Q 0 52 0 47 L 0 5 Q 0 0 5 0 Z"
            fill="rgba(242, 180, 35, 0.9)"
            stroke="none"
          />
        </svg>
        <span className={styles.text}>ADMIN</span>
      </Link>
    </div>
  );
}
