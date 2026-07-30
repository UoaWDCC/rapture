interface AuthSideCardProps {
  title: string
  description: string
  buttonLabel: string
  onButtonClick: () => void
  theme: "blue" | "gold"
}

// Side card that links to the other auth page (e.g. "NEW CUSTOMER?" or "LOGIN?")

export default function AuthSideCard({ title, description, buttonLabel, onButtonClick, theme }: AuthSideCardProps) {
    const borderColor = theme === "gold" ? "border-[#F2B423]" : "border-[#0650DA]"
    const bgColor = theme === "gold" ? "bg-[#F2B423] hover:bg-[#F2B423]" : "bg-blue-600 hover:bg-blue-700"
    const cardBg = theme === "gold" ? "bg-[#F2B423]/10" : "bg-blue-500/10"
    const textColor = theme === "gold" ? "text-[#F2B423]" : "text-[#0650DA]"
    const strokeColor = theme === "gold" ? "#F2B423" : "#0650DA"
    const buttonTextColor = theme === "gold" ? "text-black" : "text-white"
    return (
        <div className={`border-8 ${borderColor} rounded p-2`}>
            <div className={`h-[350px] rounded ${cardBg} border-2 ${borderColor} px-6 pt-10 pb-6 flex flex-col gap-4`}>
                <h2 className={`italic !text-2xl font-medium ${textColor} whitespace-nowrap -ml-2`}>{title}</h2>
                <p style={{ color: "#150703", WebkitTextStroke: `0.4px ${strokeColor}` }} className="font-mono text-sm font-bold -ml-2">{description}</p>
                <button onClick={onButtonClick} className={`w-36 self-center mt-4 px-3 py-1 rounded ${bgColor} ${buttonTextColor} font-bold font-mono transition-colors`}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
}