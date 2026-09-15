import Image from "next/image"

interface AuthFormCardProps {
    title: string
    children: React.ReactNode
    theme: "blue" | "gold" | "green"
    titleSize?: string
    cardHeight?: string
}

// Main card wrapper for the auth form - holds the title, inputs, and button

export default function AuthFormCard({ title, children, theme, titleSize = "4.5rem", cardHeight = "625px" }: AuthFormCardProps) {
    const borderColor = theme === "gold" ? "border-[#F2B423]" : theme === "blue" ? "border-[#0650DA]" : "border-[#20805A]"
    const cardBg = theme === "gold" ? "bg-[#271E06]/80" : theme === "blue" ? "bg-[#010C21]/80" : "bg-[#0A2117]/80"
    const textColor = theme === "gold" ? "text-[#F2B423]" : theme === "blue" ? "text-[#82A7ED]" : "text-white"
    const discImage = theme === "gold" ? "/images/gold_disc.png" : theme === "blue" ? "/images/blue_disc.png" : "/images/blue_disc.png"
    const glowColor = theme === "gold" ? "#F2B423" : theme === "blue" ? "#82A7ED" : "#20805A"
    const discMargin = theme === "gold" ? "-mt-52" : theme === "blue" ? "-mt-66" : "-mt-66"
    return (
        <div className={`border-8 ${borderColor} rounded p-2 relative w-full bg-cover bg-center bg-no-repeat ${cardBg}`}
            style={{ backgroundImage: "url('/images/bit-texture.png')" }}>
            <div style={{height : cardHeight}} className={`rounded ${cardBg} border-2 ${borderColor} px-6 pt-18 pb-8 flex flex-col gap-4`}>
                <h1 style={{ fontFamily: "var(--font-nova-cut)", textShadow: `0 0 15px ${glowColor}`, fontSize: titleSize, letterSpacing: "-0.12em" }} className={`italic font-normal ${textColor} text-left`}>{title}</h1>
                <div className="relative z-10 flex flex-col gap-4">
                    {children}
                </div>
                <div style={{ width: "380px", height: "auto", transform: "translateX(-4px)" }} className={`${discMargin} mx-auto shrink-0 relative z-0`}>
                    <Image
                        src={discImage}
                        alt="disc"
                        width={420}
                        height={420}
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>

            </div>
        </div>
    )
}