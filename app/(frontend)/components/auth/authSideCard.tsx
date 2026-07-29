interface AuthSideCardProps {
  title: string
  description: string
  buttonLabel: string
  onButtonClick: () => void
  theme: "blue" | "gold"
}

// Side card that links to the other auth page (e.g. "NEW CUSTOMER?" or "LOGIN?")

export default function AuthSideCard({ title, description, buttonLabel, onButtonClick, theme }: AuthSideCardProps) {
    const borderColor = theme === "gold" ? "border-[#CCA43B]" : "border-blue-500"
    const outlineColor = theme === "gold" ? "outline-[#CCA43B]" : "outline-blue-500"
    const bgColor = theme === "gold" ? "bg-[#CCA43B] hover:bg-[#F2B423]" : "bg-blue-600 hover:bg-blue-700"
    return (
        <div className={`h-[300px] bg-black/50 border-2 ${borderColor} outline outline-10 ${outlineColor} outline-offset-8 p-6 flex flex-col gap-4`}>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 font-mono text-sm">{description}</p>
            <button onClick={onButtonClick} className={`w-full p-2 ${bgColor} text-white font-bold font-mono transition-colors`}>
                {buttonLabel}
            </button>
        </div>
    )
}