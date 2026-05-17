type FooterProps = {
  studioTagline?: string;
  contactEmail?: string;
};

export default function Footer({ studioTagline, contactEmail }: FooterProps) {
    return (
    <footer className="w-full text-white mt-30">
        <div className="flex items-center gap-4 w-full px-20 mb-200">
            <div className="flex-1 h-px bg-white opacity-30"></div>
            <span className="text-white text-1xl tracking-widest">SOCIAL MEDIA</span>
            <div className="flex-1 h-px bg-white opacity-30"></div>
        </div>

        <div className="px-20">
            <div className="w-full h-px bg-white opacity-30 mb-20"></div>
        </div>

        <div className="px-20 mb-100">
            <div className="w-full border-2 border-amber-400 rounded-3xl flex flex-col gap-4 p-10">
                <h3>STUDIO RAPTURE!: {studioTagline}</h3>
                <h3>CONTACT: {contactEmail}</h3>
            </div>
        </div>
    </footer>
    );
}
