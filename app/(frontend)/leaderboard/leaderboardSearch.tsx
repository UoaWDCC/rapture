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
        <div className="flex flex-col gap-2 w-full max-w-[250px] border border-dashed border-[#3B28FF] bg-[#0a0a1a] p-3 self-end">
            <input
                type="text"
                placeholder="find username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#0a0a1a] border border-dashed border-[#3B28FF] text-white text-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-[#6a6aff]"
                style={{ fontFamily: "'Nova Cut', cursive" }}
            />

            <button
                onClick={() => onSearch?.(username)}
                className="bg-[#3B28FF] hover:bg-[#3a3a8e] text-white text-sm font-bold py-2 px-3 border border-[#3B28FF] transition duration-200 cursor-pointer"
                style={{ fontFamily: "'Nova Cut', cursive" }}
            >
                SEARCH
            </button>

            <button
                onClick={() => onFindMe?. ()}
                className="bg-[#3B28FF] hover:bg-[#3a3a8e] text-white text-sm font-bold py-2 px-3 border border-[#3B28FF] transition duration-200 cursor-pointer"
                style={{ fontFamily: "'Nova Cut', cursive" }}
            >
                FIND ME  
            </button>

        </div>
    )
}