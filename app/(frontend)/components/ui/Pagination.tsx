'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const baseClass = "px-2 hover:opacity-50 transition-all";

function PageButton({
  href,
  disabled,
  children,
  className = "text-xl",
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const sharedClass = `${baseClass} ${className} ${disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`;

  return (
    <span onClick={() => !disabled && router.push(href)} className={sharedClass}>
      {children}
    </span>
  );
}

export function Pagination({ page, totalPages, hasNextPage, hasPrevPage }: PaginationProps) {
  const [input, setInput] = useState(String(page));
  const router = useRouter();

  useEffect(() => {
    setInput(String(page));
  }, [page]);

  function handleNavigate() {
    const parsed = parseInt(input, 10);
    const clamped = isNaN(parsed) ? page : Math.min(Math.max(parsed, 1), totalPages);
    setInput(String(clamped));
    router.push(`?page=${clamped}`);
  }

  return (
    <div className="px-2 flex justify-end items-center gap-3 rounded-xs border-2 border-dotted border-brand-blue">
      <PageButton href={`?page=${1}`} disabled={!hasPrevPage}>
        {`|<`}
      </PageButton>

      <PageButton href={`?page=${page - 1}`} disabled={!hasPrevPage} className="text-2xl">
        {`<`}
      </PageButton>

      <div className="h-8 border-l border-r border-dotted border-brand-blue">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleNavigate}
          onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
          className="text-center text-lg outline-none"
        />
      </div>

      <PageButton href={`?page=${page + 1}`} disabled={!hasNextPage} className="text-2xl">
        {`>`}
      </PageButton>

      <PageButton href={`?page=${totalPages}`} disabled={!hasNextPage}>
        {`>|`}
      </PageButton>
    </div>
  );
}