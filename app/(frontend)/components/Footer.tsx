type Links = {
    label: string;
    href: string;
};

type FooterProps = {
  navigationLinks?: Links[];
  externalLinks?: Links[];
  title?: string;
  text1?: string;
  text2?: string;
  copyright?: string;
};

export default function Footer({ navigationLinks, externalLinks, title, text1, text2, copyright }: FooterProps) {
    return (
    <footer className="w-full bg-gray-900 text-white mt-auto">
        <div className="w-full min-h-70 px-10 py-10 flex flex-row flex-wrap items-center gap-10">

            <div className="max-w-70 mr-20 flex items-center justify-center text-7xl">
                <h1 className="font-serif">{title}</h1>
            </div>

            <div className="flex flex-row flex-wrap gap-20">
                {navigationLinks && navigationLinks.length > 0 && (
                    <div className="flex flex-col gap-5">
                        <h3 className="font-bold text-2xl">Navigation</h3>
                        <ul className="flex flex-col gap-3">
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
                    <div className="flex flex-col gap-5">
                        <h3 className="font-bold text-2xl">Links</h3>
                        <ul className="flex flex-col gap-3">
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
            </div>

            <div className="max-w-100 font-serif text-2xl flex flex-col justify-center gap-5 ml-auto mr-20">
                <h3>{text1}</h3>
                <h3>{text2}</h3>
            </div>
        </div>

        <div className="w-full h-15 bg-gray-950 flex items-center justify-center text-sm">
            <p>{copyright}</p>
        </div>
    </footer>
    );
}
