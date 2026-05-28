'use client'
import { useState } from 'react'

export default function LeaderBoardSearch({
    onSearch,
    onFindMe,
}: {
    onSearch?: (username : string) => void
    onFindMe?: () => void
}) {
    const [username, setUsername] = useState('')

    return (
        <div className="flex flex-col gap-2 w-full max-w-[200px]">
            <input
                type="text"
                placeholder="find username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#0a0a1a] border border-[#4C5091] text-white text-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-[#6a6aff]"
                style={{ fontFamily: "'Fira Mono', monospace" }}
            />

            <button
                onClick={() => onSearch?.(username)}
                className="bg-[#4C5091] hover:bg-[#5a5ea8] text-white text-sm font-bold py-2 px-3 border border-[#4C5091] transition duration-200 cursor-pointer"
                style={{ fontFamily: "'Nova Cut', cursive" }}
            >
                SEARCH
            </button>

            <button
                onClick={() => onFindMe?. ()}
                className="bg-[#4C5091] hover:bg-[#5a5ea8] text-white text-sm font-bold py-2 px-3 border border-[#4C5091] transition duration-200 cursor-pointer"
                style={{ fontFamily: "'Nova Cut', cursive" }}
            >
                FIND ME  
            </button>

        </div>
    )
}