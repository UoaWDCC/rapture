interface AuthButtonProps {
  label: string
  onClick: () => void
  type: "submit" | "button"
}

// Reusable styled button for the auth pages (login & signup)

export default function AuthButton({ label, onClick, type }: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full p-3 bg-blue-600 text-white font-bold font-mono hover:bg-blue-700 transition-colors"
    >
        {label}
    </button>
  )
}