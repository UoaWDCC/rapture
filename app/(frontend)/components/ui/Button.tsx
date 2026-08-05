'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
};

export default function Button({ children, onClick, href, disabled, className = "" }: ButtonProps) {
  const baseClassName =
    "inline-flex items-center justify-center px-4 py-2 rounded-md " +
    "bg-blue-600 text-white font-medium truncate max-w-full " +
    "hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed " +
    className;

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        <span className="truncate">{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={baseClassName}>
      <span className="truncate">{children}</span>
    </button>
  );
}