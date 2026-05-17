'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
};

export default function Button({ children, onClick, href }: ButtonProps) {
  const className =
    "inline-flex items-center justify-center px-4 py-2 rounded-md " +
    "bg-blue-600 text-white font-medium truncate max-w-full " +
    "hover:bg-blue-700";

  if (href) { 
    return (
      <Link href={href} className={className}>
        <span className="truncate">{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <span className="truncate">{children}</span>
    </button>
  );
}