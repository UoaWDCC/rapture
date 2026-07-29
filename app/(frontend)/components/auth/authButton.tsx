interface AuthButtonProps {
  label: string
  onClick: () => void
  type: "submit" | "button"
  theme: "blue" | "gold"
}

// Reusable styled button for the auth pages (login & signup)

export default function AuthButton({ label, onClick, type, theme }: AuthButtonProps) {
  const bgColor = theme === "gold" ? "bg-[#CCA43B] hover:bg-[#F2B423]" : "bg-blue-600 hover:bg-blue-700"
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-3 ${bgColor} text-white font-bold font-mono transition-colors`}
    >
        {label}
    </button>
  )
}