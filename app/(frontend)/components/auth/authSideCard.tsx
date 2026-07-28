interface AuthSideCardProps {
  title: string
  description: string
  buttonLabel: string
  onButtonClick: () => void
}

// Side card that links to the other auth page (e.g. "NEW CUSTOMER?" or "LOGIN?")

export default function AuthSideCard({title, description, buttonLabel, onButtonClick}: AuthSideCardProps) {
    return (
        <div className="bg-black/50 border border-blue-500 p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 font-mono text-sm">{description}</p>
            <button onClick={onButtonClick} className="w-full p-2 bg-blue-600 text-white font-bold font-mono hover:bg-blue-700 transition-colors">
                {buttonLabel}
            </button>
        </div>
    )
}