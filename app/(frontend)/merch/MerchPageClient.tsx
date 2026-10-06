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

        /* Desktop side-by-side layout begins above 800px */
        @media (min-width: 801px) {
          .merch-wrapper {
            flex-direction: row;
            padding-top: 8rem;
          }
          .merch-mobile-header {
            display: none;
          }
          .merch-desktop-header {
            display: block;
          }
          .merch-grid {
            align-items: flex-start;
            padding-left: 0;
            padding-right: 0;
          }
        }

        @media (min-width: 801px) and (max-width: 1023px) {
          .merch-wrapper {
            --scale: calc(900px / 1440);
          }
          .merch-grid {
            /* Left column offset */
            width: calc(100% - 310px);
            margin-left: 310px;
            margin-right: 20px;
          }
        }
        @media (min-width: 1024px) {
          .merch-wrapper {
            --scale: calc(100vw / 1440);
          }
          .merch-grid {
            width: calc(908 * var(--scale));
            margin-left: calc(456 * var(--scale));
            margin-right: calc(76 * var(--scale));
          }
        }
        @media (min-width: 1440px) {
          .merch-wrapper {
            --scale: 1px;
          }
        }
      `}</style>

      {/* ========================================= */}
      {/* Mobile Left Column (Stacked Header)       */}
      {/* ========================================= */}
      <div className="merch-mobile-header flex-col w-full px-8 pb-12 gap-8 items-center text-center">
        <div>
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "var(--font-nova-cut), cursive",
              letterSpacing: "-0.01em",
            }}
          >
            Title Here
          </h1>
          <h2
            className="mt-2 text-xl text-gray-300"
            style={{ fontFamily: "var(--font-fira-mono), monospace" }}
          >
            S u b t e x t
          </h2>
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

      {/* ========================================= */}
      {/* Desktop Left Column (Side-by-side)        */}
      {/* ========================================= */}
      <div className="merch-desktop-header absolute" style={{ top: '8rem', left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Title */}
        <h1 
          className="absolute font-bold text-white whitespace-nowrap"
          style={{
            left: pxPage(78),
            top: pxPage(-51),
            width: pxPage(308),
            height: pxPage(33),
            fontFamily: "var(--font-nova-cut), cursive",
            fontSize: pxPage(67.47),
            lineHeight: pxPage(32.4),
            letterSpacing: "-0.01em",
            pointerEvents: "auto",
          }}
        >
          Title Here
        </h1>

        <h2
          className="absolute text-gray-300 whitespace-nowrap"
          style={{
            left: pxPage(97),
            top: pxPage(15),
            width: pxPage(211),
            height: pxPage(21),
            fontFamily: "var(--font-fira-mono), monospace",
            fontSize: pxPage(30),
            lineHeight: pxPage(20.2),
            pointerEvents: "auto",
          }}
        >
          S u b t e x t
        </h2>

        <div
          className="absolute"
          style={{ left: pxPage(78), top: pxPage(69), pointerEvents: "auto" }}
        >
          <MerchSearch isDesktop onSearch={handleSearch} />
        </div>

        <div
          className="absolute"
          style={{
            left: pxPage(78),
            top: pxPage(69 + 35 + 34),
            pointerEvents: "auto",
          }}
        >
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
                width: 'clamp(250px, calc(317 * var(--scale)), 317px)',
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

      {/* ========================================= */}
      {/* Product Grid & Pagination                 */}
      {/* ========================================= */}
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
