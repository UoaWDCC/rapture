'use client'

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product as PayloadProduct } from "@/payload-types";
import MerchSearch from "./MerchSearch";
import MerchFilterSort from "./MerchFilterSort";
import MerchGrid from "./components/MerchGrid";
import MerchPagination from "./components/MerchPagination";

const normalizeProductType = (product: PayloadProduct): string => {
  const name = product.name.toLowerCase();

  if (name.includes("hoodie") || name.includes("jacket")) return "Hoodie";
  if (name.includes("sweater")) return "Sweater";
  if (name.includes("shirt") || name.includes("top") || name.includes("tee"))
    return "Top";
  if (name.includes("pant") || name.includes("trouser")) return "Pants";
  if (name.includes("short")) return "Shorts";
  if (
    name.includes("hat") ||
    name.includes("sock") ||
    name.includes("beanie") ||
    name.includes("cap")
  )
    return "Accessories";
  return "Decor";
};

export default function MerchPageClient({
  initialProducts,
  isAdmin = false,
}: {
  initialProducts: PayloadProduct[];
  isAdmin?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setVisibleCount(4);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setVisibleCount(4);
  };

  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    setVisibleCount(4);
  };

  const filteredProducts = useMemo(() => {
    let results = [...initialProducts];

    if (searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedTypes.length > 0) {
      results = results.filter((product) =>
        selectedTypes.some(
          (type) =>
            normalizeProductType(product).toLowerCase() === type.toLowerCase(),
        ),
      );
    }

    switch (selectedSort) {
      case "Alphabetically : A-Z":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetically : Z-A":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Price : high to low":
        results.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "Price : low to high":
        results.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "Date : old to new":
        results.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "Date : new to old":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        break;
    }

    return results;
  }, [initialProducts, searchTerm, selectedSort, selectedTypes]);

  const productsToDisplay = filteredProducts.slice(0, visibleCount);

  const pxPage = (val: number) => `calc(${val} * var(--scale))`;

  return (
    <div 
      className="merch-wrapper min-h-screen bg-black text-white w-full max-w-[1440px] mx-auto relative flex z-10 overflow-x-clip" 
    >
      <style>{`
        .merch-wrapper {
          /* Mobile: 1px scale */
          --scale: 1px;
          flex-direction: column;
          padding-top: 6rem;
        }
        .merch-mobile-header {
          display: flex;
        }
        .merch-desktop-header {
          display: none;
        }
        .merch-grid {
          align-items: center;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        /* Desktop side-by-side layout: from the navbar's md breakpoint, and only while
           the navbar itself is in desktop mode (it sets data-nav-mobile on <html> when it switches) */
        @media (min-width: 768px) {
          :root:not([data-nav-mobile]) .merch-wrapper {
            flex-direction: row;
            padding-top: 8rem;
          }
          :root:not([data-nav-mobile]) .merch-mobile-header {
            display: none;
          }
          :root:not([data-nav-mobile]) .merch-desktop-header {
            display: block;
          }
          :root:not([data-nav-mobile]) .merch-grid {
            align-items: flex-start;
            padding-left: 0;
            padding-right: 0;
          }
        }

        /* One continuous formula for every desktop width, so nothing jumps as the screen resizes.
           The sidebar never goes below 310px; the grid takes the rest of the row. */
        @media (min-width: 768px) {
          :root:not([data-nav-mobile]) .merch-wrapper {
            --scale: calc(100vw / 1440);
            --sidebar-width: max(310px, calc(456 * var(--scale)));
          }
          :root:not([data-nav-mobile]) .merch-sidebar {
            width: var(--sidebar-width);
          }
          :root:not([data-nav-mobile]) .merch-grid {
            width: calc(100% - var(--sidebar-width) - 76 * var(--scale));
            margin-left: var(--sidebar-width);
            margin-right: calc(76 * var(--scale));
          }
        }
        @media (min-width: 1440px) {
          :root:not([data-nav-mobile]) .merch-wrapper {
            --scale: 1px;
          }
        }
      `}</style>

      <div className="merch-mobile-header flex-col w-full px-8 pb-12 gap-8 items-center text-center">
        <div>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "var(--font-nova-cut), cursive",
              letterSpacing: "-0.01em",
            }}
          >
            MERCH
          </h1>
        </div>

        <MerchSearch onSearch={handleSearch} />

        {/* Filter/Sort mobile */}
        <MerchFilterSort
          isDesktop={false}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
          selectedTypes={selectedTypes}
          onTypeChange={handleTypeChange}
        />

        {isAdmin && (
          <div className="w-full">
            <Link
              href="/admin/collections/products"
              className="flex items-center justify-center w-full hover:opacity-85 transition-opacity duration-200"
              style={{
                height: '44px',
                backgroundColor: 'rgba(32, 128, 90, 0.5)',
                border: '1px solid #20805A',
                fontFamily: 'var(--font-fira-mono), monospace',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
              }}
            >
              ADMIN
            </Link>
          </div>
        )}
      </div>

      <div
        className="merch-desktop-header merch-sidebar absolute"
        style={{ top: `calc(8rem + ${pxPage(-51)})`, left: 0 }}
      >
        <div
          className="flex flex-col mx-auto"
          style={{ width: 'clamp(250px, calc(318 * var(--scale)), 318px)' }}
        >
          {/* Title */}
          <h1
            className="font-bold text-white whitespace-nowrap text-center"
            style={{
              fontFamily: "var(--font-nova-cut), cursive",
              fontSize: 'clamp(28px, calc(48 * var(--scale)), 48px)',
              lineHeight: 1,
              letterSpacing: "-0.01em",
              marginBottom: '24px',
            }}
          >
            MERCH
          </h1>

          <MerchSearch isDesktop onSearch={handleSearch} />

          <MerchFilterSort
            isDesktop
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
            selectedTypes={selectedTypes}
            onTypeChange={handleTypeChange}
          />

          {isAdmin && (
            <Link
              href="/admin/collections/products"
              className="flex items-center justify-center hover:opacity-85 transition-opacity duration-200"
              style={{
                marginTop: '36px',
                width: '100%',
                height: '44px',
                backgroundColor: 'rgba(32, 128, 90, 0.5)',
                border: '1px solid #20805A',
                fontFamily: 'var(--font-fira-mono), monospace',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
              }}
            >
              ADMIN
            </Link>
          )}
        </div>
      </div>

      <div 
        className="merch-grid flex flex-col w-full"
      >
        <MerchGrid products={productsToDisplay} />

        <MerchPagination
          visibleCount={productsToDisplay.length}
          totalCount={filteredProducts.length}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}
