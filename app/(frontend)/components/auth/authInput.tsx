interface AuthInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  theme: "blue" | "gold"
}

// Reusable styled input for the auth pages (login & signup)

export default function AuthInput({ type, placeholder, value, onChange, theme }: AuthInputProps) {
  const borderColor = theme === "gold" ? "border-[#CCA43B]" : "border-blue-500"
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 bg-black/50 border ${borderColor} text-white placeholder-gray-400 font-mono focus:outline-none`}
    />
  )
}