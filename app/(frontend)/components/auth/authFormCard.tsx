import Image from "next/image"

interface AuthFormCardProps {
    title: string
    children: React.ReactNode
    theme: "blue" | "gold" | "green"
    titleSize?: string
    cardHeight?: string
    titleAlign?: "left" | "center"
}

// Main card wrapper for the auth form - holds the title, inputs, and button

export default function AuthFormCard({ title, children, theme, titleSize = "4.5rem", cardHeight = "625px", titleAlign = "left" }: AuthFormCardProps) {
    const borderColor = theme === "gold" ? "border-[#F2B423]" : theme === "blue" ? "border-[#0650DA]" : "border-[#20805A]"
    const cardBg = theme === "gold" ? "bg-[#271E06]/80" : theme === "blue" ? "bg-[#010C21]/80" : "bg-[#06140E]/80"
    const textColor = theme === "gold" ? "text-[#F2B423]" : theme === "blue" ? "text-[#82A7ED]" : "text-white"
    const discImage = theme === "gold" ? "/images/gold_disc.png" : theme === "blue" ? "/images/blue_disc.png" : "/images/blue_disc.png"
    const glowColor = theme === "gold" ? "#F2B423" : theme === "blue" ? "#82A7ED" : "#20805A"
    const discMargin = theme === "gold" ? "-mt-52" : theme === "blue" ? "-mt-66" : "-mt-80"
    const discSize = theme === "gold" ? "380px" : theme === "blue" ? "380px" : "340px"
    const discPosition = theme === "green" ? "absolute inset-x-0 mx-auto z-0" : `${discMargin} mx-auto shrink-0 relative z-0`
    const titleAlignClass = titleAlign === "center" ? "text-center" : "text-left"
    return (
        <div className={`border-8 ${borderColor} rounded p-2 relative w-full bg-cover bg-center bg-no-repeat ${cardBg}`}
            style={{ backgroundImage: "url('/images/bit-texture.png')", ...(theme === "green" ? { boxShadow: `0 0 20px ${glowColor}` } : {}) }}>
            <div style={{ height: cardHeight }} className={`rounded ${cardBg} border-2 ${borderColor} px-6 pt-18 pb-8 flex flex-col gap-4 relative`}>
                <h1 style={{ fontFamily: "var(--font-nova-cut)", textShadow: theme === "green" ? "none" : `0 0 15px ${glowColor}`, fontSize: titleSize, letterSpacing: "-0.12em" }} className={`relative z-10 ${theme === "green" ? "not-italic" : "italic"} font-normal ${textColor} ${titleAlignClass}`}>{title}</h1>
                <div className="relative z-10 flex flex-col gap-4">
                    {children}
                </div>
                <div style={{ width: discSize, height: "auto", transform: "translateX(-4px)", ...(theme === "green" ? { bottom: "40px" } : {}) }} className={discPosition}>
                    {theme === "green" ? (
                        <div
                            style={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                backgroundColor: "#20805A",
                                opacity: 0.3,
                                WebkitMaskImage: "url('/images/blue_disc.png')",
                                maskImage: "url('/images/blue_disc.png')",
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                            }}
                        />
                    ) : (
                        <Image
                            src={discImage}
                            alt="disc"
                            width={420}
                            height={420}
                            style={{ width: "100%", height: "auto" }}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}