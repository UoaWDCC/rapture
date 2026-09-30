'use client'

import { useState, useEffect } from 'react'

// Sort options
const SORT_OPTIONS = [
  'Featured',
  'Alphabetically : A-Z',
  'Alphabetically : Z-A',
  'Price : high to low',
  'Price : low to high',
  'Date : old to new',
  'Date : new to old',
]

interface MerchFilterSortProps {
  isDesktop?: boolean
  selectedSort: string
  onSortChange: (sort: string) => void
  selectedTypes: string[]
  onTypeChange: (types: string[]) => void
}

// Radio bullet (single select, filled when selected)
function RadioBullet({ selected, size = 16 }: { selected: boolean; size?: number }) {
  return (
    <div
      className="rounded-full border border-white shrink-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: selected ? '#FFFFFF' : 'transparent',
        boxSizing: 'border-box',
      }}
    />
  )
}

// Equilateral triangle (toggles between pointing down and pointing up)
function DropdownTriangle({ expanded, size = 18 }: { expanded: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 18 18"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
      }}
    >
      <polygon
        points="9,3 16.75,14.5 1.25,14.5"
        fill="#FFFFFF"
      />
    </svg>
  )
}

// Collapsible section used by both Sort and Product Type
function FilterSection({
  title,
  options,
  selectedValues,
  onSelect,
  onToggle,
  pxPage,
}: {
  title: string
  options: string[]
  selectedValues: string[]
  onSelect: (value: string) => void
  onToggle: () => void
  pxPage?: (val: number) => string
}) {
  const isDesktop = !!pxPage

  if (isDesktop) {
    return (
      <div className="relative">
        {/* Section header row (clickable) */}
        <button
          onClick={onToggle}
          className="flex items-center bg-transparent border-none p-0"
          style={{
            paddingLeft: pxPage(10),
          }}
        >
          <div
            className="text-white text-left"
            style={{
              width: pxPage(172),
              height: pxPage(30),
              fontFamily: "var(--font-fira-mono), monospace",
              fontSize: pxPage(15),
              lineHeight: pxPage(20),
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginLeft: pxPage(88),
              marginTop: pxPage(4),
            }}
          >
          </div>
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: pxPage(8), paddingLeft: pxPage(10) }}>
          {options.map((option) => {
            const isSelected = selectedValues.includes(option)
            return (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className="flex items-center cursor-pointer bg-transparent border-none p-0"
                style={{ gap: pxPage(8) }}
              >
                <RadioBullet selected={isSelected} size={16} />
                <div
                  className="text-white text-left"
                  style={{
                    width: pxPage(267),
                    height: pxPage(16),
                    fontFamily: "var(--font-fira-mono), monospace",
                    fontSize: pxPage(14),
                    lineHeight: pxPage(16),
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {option}
                </div>
              </button>
            )
          })}
        </div>
      {/* Bottom line */}
      <div
        className="bg-white"
        style={{
          height: '1px',
          width: pxPage(318),
          marginLeft: pxPage(10),
          marginTop: pxPage(18),
        }}
      />
    </div>
    )
  }

  // Mobile layout
  return (
    <div className="relative">
      {/* Section header row (clickable) */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full cursor-pointer bg-transparent border-none p-0 px-4"
      >
        <div
          className="text-white text-left"
          style={{
            fontFamily: "var(--font-fira-mono), monospace",
            fontSize: '15px',
            lineHeight: '20px',
          }}
        >
          {title}
        </div>
      </button>
      <div className="flex flex-col gap-2 px-4">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option)
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
            >
              <RadioBullet selected={isSelected} size={16} />
              <div
                className="text-white text-left"
                style={{
                  fontFamily: "var(--font-fira-mono), monospace",
                  fontSize: '14px',
                  lineHeight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {option}
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom line */}
      <div
        className="bg-white mx-4"
        style={{
          height: '1px',
          marginTop: '18px',
        }}
      />
    </div>
  )
}

export default function MerchFilterSort({
  isDesktop = false,
  selectedSort,
  onSortChange,
  selectedTypes,
  onTypeChange,
}: MerchFilterSortProps) {
  const [sortExpanded, setSortExpanded] = useState(true)
  // Mobile modal state
  const [modalOpen, setModalOpen] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const handleSortSelect = (value: string) => {
    onSortChange(selectedSort === value ? 'Featured' : value)
  }

  const handleTypeSelect = (value: string) => {
    if (selectedTypes.includes(value)) {
      onTypeChange(selectedTypes.filter(t => t !== value))
    } else {
      onTypeChange([...selectedTypes, value])
    }
  }

  const pxPage = (val: number) => `calc(${val} * var(--scale))`

  // DESKTOP/TABLET
  if (isDesktop) {
    return (
      <div>
        {/* First line */}
        <div
          className="bg-white"
          style={{
            height: '1px',
            width: pxPage(318),
            marginLeft: pxPage(10),
            marginTop: pxPage(42),
          }}
        />

        {/* Sort by section */}
        <div style={{ marginTop: pxPage(18) }}>
          <FilterSection
            title="Sort by :"
            options={SORT_OPTIONS}
            selectedValues={[selectedSort]}
            onSelect={handleSortSelect}
            onToggle={() => setSortExpanded(!sortExpanded)}
            pxPage={pxPage}
          />
        </div>
      </div>
    )
  }

  // MOBILE
  const openModal = (preExpand: 'sort' | 'filter') => {
    if (preExpand === 'sort') {
      setSortExpanded(true)
    } else {
      setSortExpanded(false)
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-row gap-3 w-full">
        <button
          onClick={() => openModal('sort')}
          className="flex-1 h-[40px] border border-white bg-transparent text-white cursor-pointer hover:opacity-70"
          style={{
            fontFamily: "var(--font-fira-mono), monospace",
            fontSize: '14px',
          }}
        >
          Sort by
        </button>
      </div>

      {/* Full-screen modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[10000] bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pl-4 pr-8 pt-8 pb-4">
            <h2
              className="text-white"
              style={{
                fontFamily: "var(--font-fira-mono), monospace",
                fontSize: '18px',
              }}
            >
              sort by:
            </h2>
            <button
              onClick={closeModal}
              className="text-white bg-transparent border-none cursor-pointer text-2xl hover:opacity-70"
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div className="bg-white mx-4" style={{ height: '1px' }} />

          {/* Content — only scrolls if expanded sections overflow */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            <FilterSection
              title=""
              options={SORT_OPTIONS}
              selectedValues={[selectedSort]}
              onSelect={handleSortSelect}
              onToggle={() => setSortExpanded(!sortExpanded)}
            />
          </div>

          {/* Footer buttons (half-width each, like Filter/Sort) */}
          <div className="px-8 pb-8">
            <div className="bg-white" style={{ height: '1px', marginBottom: '12px' }} />
            <div className="flex flex-row gap-3 w-full">
              <button
                onClick={closeModal}
                className="relative flex-1 h-[40px] cursor-pointer hover:opacity-60"
              >
                <div className="absolute inset-0 border border-white blur-[2px] opacity-70" />
                <div className="absolute inset-0 border border-white" />
                <p
                  className="relative text-white opacity-70 flex items-center justify-center h-full"
                  style={{ fontFamily: "var(--font-fira-mono), monospace", fontSize: '13px' }}
                >
                  Close
                </p>
              </button>
              <button
                onClick={closeModal}
                className="relative flex-1 h-[40px] cursor-pointer hover:opacity-60"
              >
                <div className="absolute inset-0 border border-white blur-[2px] opacity-70" />
                <div className="absolute inset-0 border border-white" />
                <p
                  className="relative text-white opacity-70 flex items-center justify-center h-full"
                  style={{ fontFamily: "var(--font-fira-mono), monospace", fontSize: '13px' }}
                >
                  Apply
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
