'use client'

import NextImage from "next/image"
import { useState } from "react"

type DonorContent = {
    name: string;
    className?: string;
    text?: string;
    image?: string;
    tabColor?: string;
}

export default function DonorBox({ name, className, text, image, tabColor}: DonorContent) {
    const [expanded, setExpanded] = useState(false);

    return(
        <div className={`flex flex-col ${className ?? ''} transition-all duration-300 ${expanded ? 'h-100' : 'h-50 overflow-hidden'}`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className={`w-9/10 rounded-t-md [clip-path:polygon(0_0,85%_0,100%_100%,0_100%)]`}
                style={{ backgroundColor: tabColor ?? '#c69825', height: '40px', minHeight: '40px' }}   
            ></div>
            
            <div className="w-full min-h-40 flex flex-col items-center bg-[#22180c] border p-4 rounded-b-md rounded-tr-md"
                style={{borderColor: tabColor ?? '#c69825',}}>
                <h2 className="pt-5 pb-5 text-center" style={{lineHeight: '1.5'}}>{name}</h2>
                { image && <NextImage src={image} alt={name} width={150} height={150} className="mb-5 object-contain" />}
                { text && <p>{text}</p>}
            </div>
        </div>
    )
}