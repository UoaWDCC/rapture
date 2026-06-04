import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const baseClass = "px-4 py-2 rounded border";

function PageButton({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className={`${baseClass} opacity-40 cursor-not-allowed pointer-events-none`}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      {children}
    </Link>
  );
}

export function Pagination({ page, totalPages, hasNextPage, hasPrevPage }: PaginationProps) {
  return (
    <div className="flex justify-end items-center gap-4">
      <PageButton href={`?page=${page - 1}`} disabled={!hasPrevPage}>
        Previous
      </PageButton>

      <span>Page {page} of {totalPages}</span>

      <PageButton href={`?page=${page + 1}`} disabled={!hasNextPage}>
        Next
      </PageButton>
    </div>
  );
}