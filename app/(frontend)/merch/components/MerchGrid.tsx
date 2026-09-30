'use client'

import React from 'react';
import ProductCard from '../ProductCard';
import type { Product as PayloadProduct } from "@/payload-types";

export interface MerchGridProps {
  products: PayloadProduct[];
  className?: string;
  columns?: 1 | 2;
}

export default function MerchGrid({ products, className = '', columns }: MerchGridProps) {
  // If columns is explicitly passed (e.g. for testing), apply explicit style overrides
  const inlineGridStyle: React.CSSProperties | undefined = columns
    ? columns === 1
      ? { gridTemplateColumns: '1fr', padding: '8px 0 0 0', justifyItems: 'center' }
      : { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', padding: '8px 18px 0 21px', justifyItems: 'stretch' }
    : undefined;

  return (
    <div className={`merch-grid-wrapper w-full ${className}`}>
      <style>{`
        .merch-products-grid {
          display: grid;
          width: 100%;
          /* Mobile & small desktop (< 1024px): 1 card per row */
          grid-template-columns: 1fr;
          row-gap: 20px;
          column-gap: 27px;
          justify-items: center;
          padding: 8px 0 0 0;
        }

        /* Full desktop side-by-side (>= 1024px): 2 cards per row */
        @media (min-width: 1024px) {
          .merch-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            justify-items: stretch;
            padding: 8px 18px 0 21px;
            row-gap: 18px;
          }
        }
      `}</style>
      <div 
        className="merch-products-grid"
        style={inlineGridStyle}
        data-testid="merch-products-grid"
        data-columns={columns}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="w-full max-w-[421px] flex justify-center"
            data-testid={`merch-product-item-${product.id}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
