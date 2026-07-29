import Image from "next/image"

interface AuthFormCardProps {
  title: string
  children: React.ReactNode
  theme: "blue" | "gold"
}

// Main card wrapper for the auth form - holds the title, inputs, and button

export default function AuthFormCard({ title, children, theme }: AuthFormCardProps) {
    const borderColor = theme === "gold" ? "border-[#F2B423]" : "border-[#0650DA]"
    const cardBg = theme === "gold" ? "bg-[#F2B423]/10" : "bg-blue-[#0650DA]/10"
    const textColor = theme === "gold" ? "text-[#F2B423]" : "text-[#82A7ED]"
    const discImage = theme === "gold" ? "/images/gold_disc.png" : "/images/blue_disc.png"
    const glowColor = theme === "gold" ? "#F2B423" : "#82A7ED"
    const discMargin = theme === "gold" ? "-mt-52" : "-mt-66"
    return (
    <div className={`border-8 ${borderColor} rounded p-2 relative w-full bg-cover bg-center bg-no-repeat `}
        style={{ backgroundImage: "url('/images/bit-texture.png')" }}>
        <div className={`h-[625px] rounded ${cardBg} border-2 ${borderColor} px-6 pt-18 pb-8 flex flex-col gap-4`}>
            <h1 style={{ fontFamily: "var(--font-nova-cut)", textShadow: `0 0 15px ${glowColor}`, fontSize: "4.5rem"}} className={`italic font-bold ${textColor} text-left`}>{title}</h1>
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