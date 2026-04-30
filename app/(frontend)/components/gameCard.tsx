import Link from "next/link";
import Image from "next/image";

type GameCardProps = {
  title?: string;
  image?: string;
  description?: string;
  link?: string;
  variant?: "card" | "list";
};

function Wrapper({ link, children, className }: { link?: string; children: React.ReactNode; className: string }) {
  if (link) {
    return (
      <Link href={link} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export default function GameCard({ title = "Untitled", image, description, link, variant = "card" }: GameCardProps) {
  // List variant - horizontal row, no image for list layout
  if (variant === "list") {
    return (
      <Wrapper
        link={link}
        className={`group flex items-center justify-between gap-4 px-5 py-4 rounded-lg bg-gray-900 border border-gray-800
                   ${link ? "hover:border-sky-600 cursor-pointer" : "opacity-75 cursor-default"} transition duration-300`}
      >
        <h3 className="text-base font-bold text-white min-w-0 truncate">{title}</h3>

        {description && (
          <p className="text-sm text-gray-400 truncate flex-1 min-w-0">{description}</p>
        )}

        <span className={`text-sm shrink-0 ${link ? "text-sky-500" : "text-gray-500 italic"}`}>
          {link ? "View →" : "Coming soon"}
        </span>
      </Wrapper>
    );
  }

  // Card variant - for grid layout
  return (
    <Wrapper
      link={link}
      className={`group block rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 
                 ${link ? "hover:border-sky-600 cursor-pointer" : "opacity-75 cursor-default"} transition duration-300`}
    >
      {/* Image section */}
      <div className="relative w-full aspect-video bg-gray-800">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No image available
          </div>
        )}
      </div>

      {/* Text section */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>

        {description && (
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        )}

        {!link && (
          <p className="text-sm text-gray-500 italic">Coming soon</p>
        )}
      </div>
    </Wrapper>
  );
}
