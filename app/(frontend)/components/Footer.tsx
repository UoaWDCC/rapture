type NavigationLink = {
    label: string;
    href: string;
};

type ExternalLink = {
  label: string;
  href: string;
};

type FooterProps = {
  navigationLinks?: NavigationLink[];
  externalLinks?: ExternalLink[];
  text?: string;
};

export default function Footer({ navigationLinks, externalLinks, text }: FooterProps) {
    return (
    <footer className="w-full bg-gray-900 text-white mtauto">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-row gap-10">

            {navigationLinks && navigationLinks.length > 0 && (
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Navigation</h3>
                    <ul className="flex flex-col gap-1">
                        {navigationLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="hover:underline">
                            {link.label}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
            )}

            {externalLinks && externalLinks.length > 0 && (
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Links</h3>
                    <ul className="flex flex-col gap-1">
                        {externalLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {link.label}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
            )}

            {text && (
                <div className="flex items-end ml-auto">
                    <p className="text-sm text-gray-400">{text}</p>
                </div>
            )}

        </div>
    </footer>
    );
}
