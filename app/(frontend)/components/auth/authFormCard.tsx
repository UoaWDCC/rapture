interface AuthFormCardProps {
  title: string
  children: React.ReactNode
}

// Main card wrapper for the auth form - holds the title, inputs, and button

export default function AuthFormCard({title, children}: AuthFormCardProps) {
    return (
        <div className="bg-black/50 border border-blue-500 p-8 flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
            {children}
        </div>
    )
}