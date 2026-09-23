'use client'
import { useState } from 'react'
import GlitchReveal from "../components/GlitchReveal"

export default function LeaderBoardSearch({
    onSearch,
    onFindMe,
}: {
    onSearch?: (username : string) => void
    onFindMe?: () => void
}) {
    const [username, setUsername] = useState('')

    const commonInputClasses = "w-full rounded-xs border-2 border-dashed border-[#3B28FF] bg-[#0a0a1a] px-3 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#6a6aff] focus:outline-none"
    const commonButtonClasses = "w-full cursor-pointer rounded-xs border border-[#3B28FF] bg-[#3B28FF] px-3 py-3 text-sm font-bold text-white transition duration-200 hover:bg-[#3a3a8e]"

    return (
        <>
            <GlitchReveal delay={1} className="hidden w-full md:block">
                <div className="ml-auto flex w-full max-w-[250px] flex-col gap-2 self-end rounded-xs border-2 border-dashed border-[#3B28FF] bg-[#0a0a1a] p-3">
                    <input
                        type="text"
                        placeholder="find username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={commonInputClasses}
                        style={{ fontFamily: "'Nova Cut', cursive" }}
                    />

                    <button
                        onClick={() => onSearch?.(username)}
                        className={commonButtonClasses}
                        style={{ fontFamily: "'Nova Cut', cursive" }}
                    >
                        SEARCH
                    </button>

                    <button
                        onClick={() => onFindMe?.()}
                        className={commonButtonClasses}
                        style={{ fontFamily: "'Nova Cut', cursive" }}
                    >
                        FIND ME
                    </button>
                </div>
            </GlitchReveal>

            <GlitchReveal delay={1} className="block w-full md:hidden">
                <div className="mx-auto flex h-20 w-full flex-row gap-2 rounded-xs border-2 border-dashed border-[#3B28FF] bg-[#0a0a1a] p-3">
                    <input
                        type="text"
                        placeholder="find username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={commonInputClasses}
                        style={{ fontFamily: "'Nova Cut', cursive" }}
                    />

                    <div className="flex w-full gap-2">
                        <button
                            onClick={() => onSearch?.(username)}
                            className={`${commonButtonClasses} flex-1`}
                            style={{ fontFamily: "'Nova Cut', cursive" }}
                        >
                            SEARCH
                        </button>

                        <button
                            onClick={() => onFindMe?.()}
                            className={`${commonButtonClasses} flex-1`}
                            style={{ fontFamily: "'Nova Cut', cursive" }}
                        >
                            FIND ME
                        </button>
                    </div>
                </div>
            </GlitchReveal>
        </>
    )
}