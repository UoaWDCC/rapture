interface AuthButtonProps {
  label: string
  onClick: () => void
  type: "submit" | "button"
  theme: "blue" | "gold" | "green"
  size?: "default" | "small"
  font?: "mono" | "display"
}

// Reusable styled button for the auth pages (login & signup)

export default function AuthButton({ label, onClick, type, theme, size = "default", font = "mono" }: AuthButtonProps) {
  const bgColor = theme === "gold" ? "bg-[#CCA43B] hover:bg-[#F2B423]" : theme === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-[#20805A] hover:bg-[#2A9E70]"
  const glow = theme === "gold" ? "shadow-[0_0_15px_#CCA43B]" : theme === "blue" ? "shadow-[0_0_15px_#3727EA]" : ""
  const sizing = size === "small" ? "px-3 py-1 text-[10px]" : "px-3 py-2"
    const textColor = theme === "gold" ? "text-black/70" : theme === "blue" ? "text-white/70" : "text-white/70"
  const fontClass = font === "display" ? "" : "font-mono"
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full mx-auto rounded ${sizing} ${bgColor} ${textColor} ${glow} text-black font-bold ${fontClass} transition-colors`}
    >
      {label}
    </button>
  )
}