import Link from "next/link"

export default function Disc() {
    return (
        <div className="text-center py-8 w-full">
            <h2 className="text-[#CCA43B] text-2xl mb-4">SOCIAL MEDIA</h2>

            <div className="flex gap-4 justify-center">
                <div className="border border-[#5865F2] p-6 rounded">
                    <Link href="https://discord.com" target="_blank">
                        Discord
                    </Link>
                </div>

                <div className="border border-[#FF0000] p-6 rounded">
                    <Link href="https://youtube.com" target="_blank">
                        Youtube
                    </Link>
                </div>

                <div className="border border-[#171720] p-6 rounded">
                    <Link href="https://store.steampowered.com" target="_blank">
                        Steam
                    </Link>
                </div>
            </div>
        </div>
    )
}