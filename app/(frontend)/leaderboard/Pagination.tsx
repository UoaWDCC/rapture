'use client'

import { useRouter } from "next/navigation";
import { useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleNavigate() {
    const inputValue = inputRef.current?.value ?? String(page);
    const parsed = parseInt(inputValue, 10);
    const clamped = isNaN(parsed) ? page : Math.min(Math.max(parsed, 1), totalPages);
    if (inputRef.current) {
      inputRef.current.value = String(clamped);
    }
    router.push(`?page=${clamped}`);
  }

  return (
    <div className="flex items-center justify-end gap-1 rounded-xs border-2 border-dashed border-brand-blue px-1 py-1 md:gap-3 md:px-2">
      <PageButton href={`?page=${1}`} disabled={!hasPrevPage} className="text-xs md:text-xl">
        {`<|`}
      </PageButton>

      <PageButton href={`?page=${page - 1}`} disabled={!hasPrevPage} className="text-sm md:text-2xl">
        {`<`}
      </PageButton>

      <div className="h-8 border-l border-r border-dashed border-brand-blue px-2 pt-1 md:h-10 md:px-4">
        <input
          key={page}
          ref={inputRef}
          type="number"
          min={1}
          max={totalPages}
          defaultValue={page}
          onBlur={handleNavigate}
          onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
          className="w-8 text-center text-sm outline-none [appearance:textfield] md:w-10 md:text-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <PageButton href={`?page=${page + 1}`} disabled={!hasNextPage} className="text-sm md:text-2xl">
        {`>`}
      </PageButton>

      <PageButton href={`?page=${totalPages}`} disabled={!hasNextPage} className="text-xs md:text-xl">
        {`|>`}
      </PageButton>
    </div>
  );
}