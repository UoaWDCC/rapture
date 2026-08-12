'use client'
import { useState } from "react";
import MerchSearch from "./MerchSearch";
import MerchFilterSort from "./MerchFilterSort";
import ProductCard, { Product } from "./ProductCard";

// Mock Data
const DUMMY_PRODUCTS: Product[] = [
  { id: 1, name: "White Shirt", type: "top" },
  { id: 2, name: "Black Hoodie", type: "hoodie" },
  { id: 3, name: "Graphic Shirt", type: "top" },
  { id: 4, name: "Beanie", type: "accessories" },
  { id: 5, name: "Longsleeve Shirt", type: "top" },
  { id: 6, name: "Sweatpants", type: "pants" },
  { id: 7, name: "Vintage Shirt", type: "top" },
  { id: 8, name: "Socks", type: "accessories" },
  { id: 9, name: "Jacket", type: "hoodie" },
  { id: 10, name: "Tank Top", type: "top" },
  { id: 11, name: "Running Shorts", type: "shorts" },
  { id: 12, name: "Cozy Sweater", type: "sweater" },
  { id: 13, name: "Wall Art", type: "decor" },
  { id: 14, name: "Cargo Pants", type: "pants" },
];

export default function MerchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setVisibleCount(4);
  };

  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    setVisibleCount(4);
  };

  // ========== Filter & Sort Pipeline ==========
  let results = [...DUMMY_PRODUCTS];

  // 1. Search filter
  if (searchTerm) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 2. Product type filter (multi-select)
  if (selectedTypes.length > 0) {
    results = results.filter(p =>
      selectedTypes.some(t => t.toLowerCase() === p.type.toLowerCase())
    );
  }

  // 3. Sort
  switch (selectedSort) {
    case "Alphabetically : A-Z":
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Alphabetically : Z-A":
      results.sort((a, b) => b.name.localeCompare(a.name));
      break;
    // Other sort options are placeholders for now
  }

  const filteredProducts = results;
  const productsToDisplay = filteredProducts.slice(0, visibleCount);

  // Base 1440px scaling
  const pxPage = (val: number) => `calc(${val} * var(--scale))`;
  // Grid scaling
  const px = (val: number) => `calc(${val} / 908 * 100cqw)`;

  // Always 2 per row
  const rows: Product[][] = [];
  for (let i = 0; i < productsToDisplay.length; i += 2) {
    rows.push(productsToDisplay.slice(i, i + 2));
  }

  return (
    <div 
      className="merch-wrapper min-h-screen bg-black text-white w-full max-w-[1440px] mx-auto relative flex flex-col md:flex-row"
    >
      <style>{`
        .merch-wrapper {
          /* Mobile: 1px scale */
          --scale: 1px; 
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .merch-wrapper {
            /* Tablet scaling */
            --scale: calc(900px / 1440);
          }
          .merch-grid {
            /* Left column offset */
            width: calc(100% - 270px);
            margin-left: 270px;
            margin-right: 24px;
          }
        }
        @media (min-width: 1024px) {
          .merch-wrapper {
            /* Desktop scaling */
            --scale: calc(100vw / 1440);
          }
          .merch-grid {
            /* Grid spacing */
            width: calc(908 * var(--scale));
            margin-left: calc(456 * var(--scale));
            margin-right: calc(76 * var(--scale));
          }
        }
        @media (min-width: 1440px) {
          .merch-wrapper {
            /* Max-width cap */
            --scale: 1px;
          }
        }
      `}</style>
      {/* ========================================= */}
      {/* Mobile Left Column                        */}
      {/* ========================================= */}
      <div className="flex flex-col md:hidden w-full px-8 pb-12 gap-8 items-center text-center">
        <div>
          <h1 
            className="text-4xl font-bold" 
            style={{ fontFamily: "var(--font-nova-cut), cursive", letterSpacing: '-0.01em' }}
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

        {/* NOTE: Filter/Sort mobile. Remove if unused. */}
        <MerchFilterSort
          isDesktop={false}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
          selectedTypes={selectedTypes}
          onTypeChange={handleTypeChange}
        />
      </div>

      {/* ========================================= */}
      {/* Desktop Left Column                       */}
      {/* ========================================= */}
      <div className="hidden md:block absolute" style={{ top: '8rem', left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Title */}
        <h1 
          className="absolute font-bold text-white whitespace-nowrap"
          style={{ 
            left: pxPage(78), top: pxPage(-51),
            width: pxPage(308), height: pxPage(33),
            fontFamily: "var(--font-nova-cut), cursive",
            fontSize: pxPage(67.47),
            lineHeight: pxPage(32.4),
            letterSpacing: '-0.01em',
            pointerEvents: 'auto'
          }}
        >
          Title Here
        </h1>

        {/* Subtext */}
        <h2 
          className="absolute text-gray-300 whitespace-nowrap"
          style={{
            left: pxPage(97), top: pxPage(15),
            width: pxPage(211), height: pxPage(21),
            fontFamily: "var(--font-fira-mono), monospace",
            fontSize: pxPage(30),
            lineHeight: pxPage(20.2),
            pointerEvents: 'auto'
          }}
        >
          S u b t e x t
        </h2>

        {/* Search Bar */}
        <div 
          className="absolute"
          style={{
            left: pxPage(78), top: pxPage(69),
            pointerEvents: 'auto'
          }}
        >
          <MerchSearch isDesktop={true} onSearch={handleSearch} />
        </div>

        <div
          className="absolute"
          style={{
            left: pxPage(78),
            top: pxPage(69 + 35 + 34), // 34px gap
            pointerEvents: 'auto',
          }}
        >
          {/* Filter/Sort */}
          <MerchFilterSort
            isDesktop={true}
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
            selectedTypes={selectedTypes}
            onTypeChange={handleTypeChange}
          />
        </div>
      </div>

      {/* ========================================= */}
      {/* Product Grid                              */}
      {/* ========================================= */}
      <div 
        className="merch-grid flex flex-col items-center md:items-start px-4 md:px-0"
      >
        <div className="flex flex-col w-full" style={{ gap: '18px' }}>
          {rows.map((row, rowIndex) => (
            <div 
              key={`row-${rowIndex}`}
              className="w-full relative"
              style={{ clipPath: 'inset(0 0 -200px 0)' }}
            >
              <div 
                className="flex flex-row w-full"
                style={{ padding: '8px 18px 0 21px', gap: '27px' }}
              >
                {row.map((card) => (
                  <div key={card.id} className="flex-1 min-w-0">
                    <ProductCard product={card} />
                  </div>
                ))}
                {/* Invisible placeholder */}
                {row.length === 1 && (
                  <div className="flex-1 min-w-0 pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div 
          className="w-full mt-24 mb-24"
          style={{ maxWidth: '908px', containerType: 'inline-size' }}
        >
          <div 
            className="w-full flex flex-col items-center"
            style={{ marginTop: px(57) }}
          >
            {/* Load status */}
            <div 
              className="text-white flex items-center justify-center text-center whitespace-nowrap"
              style={{
                width: px(193),
                height: px(13),
                fontFamily: "var(--font-fira-mono), monospace",
                fontSize: px(10),
                lineHeight: px(26)
              }}
            >
              you have loaded {productsToDisplay.length} out of {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}
            </div>

            {/* Load more button */}
            {visibleCount < filteredProducts.length && (
              <button 
                onClick={handleLoadMore}
                className="text-white flex items-center justify-center hover:bg-[#1a6b4a]"
                style={{
                  marginTop: px(18),
                  width: px(260),
                  height: px(35),
                  backgroundColor: '#20805A',
                  border: '1px solid #FFFFFF',
                  boxSizing: 'border-box',
                  fontFamily: "var(--font-fira-mono), monospace",
                  fontSize: px(13),
                  lineHeight: px(26)
                }}
              >
                LOAD MORE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
