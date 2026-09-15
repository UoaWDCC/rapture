interface AuthInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  theme: "blue" | "gold" | "green"
}

// Reusable styled input for the auth pages (login & signup)

export default function AuthInput({ type, placeholder, value, onChange, theme }: AuthInputProps) {
  const borderColor = theme === "gold" ? "border-[#F2B423]" : theme === "blue" ? "border-[#0650DA]" : "border-[#20805A]"
  const inputBg = theme === "gold" ? "bg-[#F29123]/40" : theme === "blue" ? "bg-[#0650DA]/40" : "bg-[#20805A]/40"
  const textColor = theme === "gold" ? "text-black" : theme === "blue" ? "text-white" : "text-white"
  const placeholderColor = theme === "gold" ? "placeholder-black/70" : theme === "blue" ? "placeholder-white/70" : "placeholder-white/70"
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