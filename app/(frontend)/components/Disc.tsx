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
}

export default function Disc({ name, url, image, icon, iconWidth, iconHeight, iconRight, iconTop, color }: DiscProps) {
    return (
        <Link href={url} target="_blank">
            <div className={`relative w-44 h-52 ${color} rounded-xl overflow-hidden`}>
                <Image src={image} width={192} height={224} alt={name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48" />
                {icon && <Image src={icon} alt={name + " icon"} width={iconWidth || 56} height={iconHeight || 56} 
                className= {`absolute ${iconTop || 'top-4'} ${iconRight || 'right-2'} object-contain`} />}
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-lg uppercase" 
                style={{ fontFamily: "'Nova Cut', cursive" }}>{name}</p>
            </div>
        </Link>
    )
}