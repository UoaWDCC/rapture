'use client'

import React from 'react';

export interface MerchPaginationProps {
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
}

export default function MerchPagination({
  visibleCount,
  totalCount,
  onLoadMore,
}: MerchPaginationProps) {
  return (
    <div
      className="merch-pagination w-full mt-16 md:mt-24 mb-16 md:mb-24"
      style={{ maxWidth: '908px' }}
    >
      <style>{`
        .merch-pagination-status {
          font-family: var(--font-fira-mono), monospace;
          font-size: 15px;
          line-height: 22px;
          color: #FFFFFF;
        }
        .merch-load-more-btn {
          margin-top: 16px;
          width: 260px;
          height: 44px;
          background-color: #20805A;
          border: 1px solid #FFFFFF;
          box-sizing: border-box;
          font-family: var(--font-fira-mono), monospace;
          font-size: 16px;
          line-height: 26px;
          color: #FFFFFF;
        }
      `}</style>
      <div className="w-full flex flex-col items-center">
        {/* Load status */}
        <div 
          className="merch-pagination-status text-white flex items-center justify-center text-center whitespace-nowrap"
          data-testid="merch-pagination-status"
        >
          you have loaded {visibleCount} out of {totalCount} product{totalCount === 1 ? '' : 's'}
        </div>

        {/* Load more button */}
        {visibleCount < totalCount && (
          <button 
            onClick={onLoadMore}
            className="merch-load-more-btn text-white flex items-center justify-center hover:bg-[#1a6b4a] transition-colors cursor-pointer"
            data-testid="merch-load-more-btn"
          >
            LOAD MORE
          </button>
        )}
      </div>
    </div>
  );
}
