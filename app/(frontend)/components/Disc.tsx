import Image from "next/image"
import Link from "next/link"

interface DiscProps {
    name: string
    url: string
    image: string
    icon?: string
    color: string
}

export default function Disc({ name, url, image, icon, color }: DiscProps) {
    return (
        <Link href={url} target="_blank">
            <div className={`relative w-44 h-52 ${color} rounded-xl overflow-hidden`}>
                <Image src={image} alt={name} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48" />
                {icon && <Image src={icon} alt={name + " icon"} className="absolute top-4 right-2 w-14 h-14 object-contain" />}
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-lg uppercase" style={{ fontFamily: "'Nova Cut', cursive" }}>{name}</p>
            </div>
        </Link>
    )
}