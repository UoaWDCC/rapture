'use client'
import { useState } from 'react'

interface MerchSearchProps {
    onSearch?: (term: string) => void;
    isDesktop?: boolean;
}

export default function MerchSearch({
    onSearch,
    isDesktop = false
}: MerchSearchProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (onSearch) onSearch(searchTerm.trim())
        }
    }

    // Base 1440px scaling
    const pxPage = (val: number) => `calc(${val} * var(--scale))`

    const showPlaceholder = !isFocused && !searchTerm

    // Desktop layout
    if (isDesktop) {
        return (
            <div 
                className="relative bg-transparent border border-white box-border flex items-center"
                style={{
                    width: pxPage(317),
                    height: pxPage(35),
                    borderWidth: '1px'
                }}
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-0 w-full h-full bg-transparent text-white outline-none ring-0 border-none z-10"
                    style={{
                        fontFamily: "var(--font-fira-mono), monospace",
                        fontSize: pxPage(16),
                        paddingLeft: pxPage(10),
                        paddingRight: pxPage(10)
                    }}
                />

                {showPlaceholder && (
                    <div 
                        className="absolute text-white pointer-events-none"
                        style={{
                            left: pxPage(10),
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontFamily: "var(--font-fira-mono), monospace",
                            fontSize: pxPage(16),
                            letterSpacing: '0px'
                        }}
                    >
                        search
                    </div>
                )}
            </div>
        )
    }

    // Mobile layout
    return (
        <div className="relative flex flex-row items-center w-full h-[35px] border border-white">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full h-full bg-transparent text-white outline-none ring-0 border-none z-10"
                style={{
                    fontFamily: "var(--font-fira-mono), monospace",
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}
            />

            {showPlaceholder && (
                <div 
                    className="absolute text-white pointer-events-none"
                    style={{
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: "var(--font-fira-mono), monospace",
                        fontSize: '16px'
                    }}
                >
                    search
                </div>
            )}
        </div>
    )
}
