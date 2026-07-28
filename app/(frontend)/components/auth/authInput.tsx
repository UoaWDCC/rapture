interface AuthInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Reusable styled input for the auth pages (login & signup)

export default function AuthInput({ type, placeholder, value, onChange }: AuthInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-black/50 border border-blue-500 text-white placeholder-gray-400 font-mono focus:outline-none"
    />
  )
}