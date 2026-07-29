interface AuthFormCardProps {
  title: string
  children: React.ReactNode
  theme: "blue" | "gold"
}

// Main card wrapper for the auth form - holds the title, inputs, and button

export default function AuthFormCard({ title, children, theme }: AuthFormCardProps) {
    const borderColor = theme === "gold" ? "border-[#CCA43B]" : "border-blue-500"
    const outlineColor = theme === "gold" ? "outline-[#CCA43B]" : "outline-blue-500"
    return (
        <div className={`min-h-[600px] h-full bg-black/50 border-2 ${borderColor} outline outline-10 ${outlineColor} outline-offset-8 p-8 flex flex-col gap-4`}>
            <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
            {children}
        </div>
    )
}