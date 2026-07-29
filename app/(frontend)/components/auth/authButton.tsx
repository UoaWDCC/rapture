interface AuthButtonProps {
  label: string
  onClick: () => void
  type: "submit" | "button"
  theme: "blue" | "gold"
}

// Reusable styled button for the auth pages (login & signup)

export default function AuthButton({ label, onClick, type, theme }: AuthButtonProps) {
  const bgColor = theme === "gold" ? "bg-[#CCA43B] hover:bg-[#F2B423]" : "bg-blue-600 hover:bg-blue-700"
  const glow = theme === "gold" ? "shadow-[0_0_15px_#CCA43B]" : "shadow-[0_0_15px_#3727EA]"
  const textColor = theme === "gold" ? "text-black/70" : "text-white/70"
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full mx-auto px-3 py-2 rounded ${bgColor} ${textColor} ${glow} text-black font-bold font-mono transition-colors`}
    >
        {label}
    </button>
  )
}