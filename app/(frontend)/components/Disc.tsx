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
        <div className="max-w-full max-h-full">
            <Link href={url} target="_blank">
                <div className={`group relative lg:w-60 lg:h-65 md:w-42 md:h-45.5 sm:w-30 sm:h-35 w-24 h-26 ${color} bg-opacity-10 rounded-xl overflow-hidden`}>
                    <Image src={image} width={122} height={154} alt={name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -mr-2" />
                    <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 z-10 md:w-20 md:h-20 w-10 h-10 overflow-visible pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ marginLeft: "-4px", marginTop: "5.5px" }}>
                        <defs>
                            <path id={`ring-${name}`} d="M 48,54 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
                        </defs>
                        <circle cx="48" cy="54" r="56" fill={discColor} fillOpacity="0.35" />
                        <circle cx="48" cy="54" r="14" fill="#000000" fillOpacity="0.5" />
                        <circle cx="48" cy="54" r="14" fill="none" stroke={ringColor} strokeWidth="1" />
                        <circle cx="48" cy="54" r="56" fill="none" stroke={ringColor} strokeWidth="1" />
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
                    className= {`absolute ${iconTop || 'top-4'} ${iconRight || 'right-2'} object-contain w-[20%]`} />}
                    <p className="absolute sm:bottom-[10%] bottom-[5.5%] left-1/2 -translate-x-1/2 text-white lg:text-[24px] md:text-[20px] sm:text-sm text-[8.5px] uppercase" 
                    style={{ fontFamily: "'Nova Cut', cursive" }}>{name}</p>
                </div>
            </Link>
        </div>
    )
}