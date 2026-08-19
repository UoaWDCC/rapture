import Image from "next/image"
import Link from "next/link"

interface DiscProps {
    name: string
    url: string
    image: string
    icon?: string
    iconWidth?: number
    iconHeight?: number
    iconTop?: string
    iconRight?: string
    color: string
    ringText?: string
    discColor?: string
    ringColor?: string
}

export default function Disc({ name, url, image, icon, iconWidth, iconHeight, iconRight, iconTop, color, ringText = "RAPTURE", discColor = "#0650DA", ringColor = "#4C5091" }: DiscProps) {
    return (
        <Link href={url} target="_blank">
            <div className={`group w-60 h-65 ${color} bg-opacity-10 rounded-xl overflow-hidden`}>
                <Image src={image} width={122} height={154} alt={name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -mr-2" />
                <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 w-20 h-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ marginLeft: "-4px", marginTop: "5.5px" }}>
                    <defs>
                        <path id={`ring-${name}`} d="M 50,50 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" fill="none" />
                    </defs>
                    <circle cx="50" cy="50" r="36" fill={discColor} fillOpacity="0.35" />
                    <circle cx="50" cy="52" r="14" fill="#000000" fillOpacity="0.5" />
                    <circle cx="50" cy="52" r="14" fill="none" stroke={ringColor} strokeWidth="1" />
                    <circle cx="50" cy="50" r="36" fill="none" stroke={ringColor} strokeWidth="1" />
                    <g className="disc-ring">
                        <text fill="#ffffff" fontSize="6" letterSpacing="1" style={{ fontFamily: "'Fira Mono'" }}>
                            <textPath href={`#ring-${name}`} startOffset="0%">{ringText}</textPath>
                        </text>
                        <text fill="#ffffff" fontSize="6" letterSpacing="1" style={{ fontFamily: "'Fira Mono'" }}>
                            <textPath href={`#ring-${name}`} startOffset="33.33%">{ringText}</textPath>
                        </text>
                        <text fill="#ffffff" fontSize="6" letterSpacing="1" style={{ fontFamily: "'Fira Mono'" }}>
                            <textPath href={`#ring-${name}`} startOffset="66.66%">{ringText}</textPath>
                        </text>
                    </g>
                </svg>
                {icon && <Image src={icon} alt={name + " icon"} width={iconWidth || 56} height={iconHeight || 56} 
                className= {`absolute ${iconTop || 'top-4'} ${iconRight || 'right-2'} object-contain`} />}
                <p className="absolute bottom-7.5 left-1/2 -translate-x-1/2 text-white text-[24px] uppercase" 
                style={{ fontFamily: "'Nova Cut', cursive" }}>{name}</p>
            </div>
        </Link>
    )
}