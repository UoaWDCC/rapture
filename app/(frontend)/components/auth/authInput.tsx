interface AuthInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  theme: "blue" | "gold"
}

// Reusable styled input for the auth pages (login & signup)

export default function AuthInput({ type, placeholder, value, onChange, theme }: AuthInputProps) {
  const borderColor = theme === "gold" ? "border-[#F2B423]" : "border-[#0650DA]"
  const inputBg = theme === "gold" ? "bg-[#F29123]/40" : "bg-[#0650DA]/40"
  const textColor = theme === "gold" ? "text-black" : "text-white"
  const placeholderColor = theme === "gold" ? "placeholder-black/70" : "placeholder-white/70"
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full mx-auto px-3 py-2 rounded ${inputBg} border ${borderColor} ${textColor} ${placeholderColor} font-mono focus:outline-none`}
    />
  )
}