import Disc from "@/app/(frontend)/components/Disc"

type FooterProps = {
  studioTagline?: string;
  contactEmail?: string;
};

export default function Footer({ studioTagline, contactEmail }: FooterProps) {
    return (
    <footer className="w-full text-white mt-30">
        <div className="flex items-center gap-4 w-full px-20 mb-10">
            <div className="flex-1 h-px bg-white opacity-30"></div>
            <span className="text-white text-2xl tracking-widest">SOCIAL MEDIA</span>
            <div className="flex-1 h-px bg-white opacity-30"></div>
        </div>

        <div className="flex flex-wrap gap-8 justify-center w-full">
            <Disc name="Discord" url="https://discord.com" image="/dvd_player_2.png" icon="/DISCORD.png" iconWidth={60} iconHeight={60} iconTop="top-13" iconRight="right-10" color="bg-[#171947]" />
            <Disc name="Youtube" url="https://www.youtube.com/@STUDIO_RAPTURE" image="/dvd_player_2.png" icon="/YT.png" iconWidth={130} iconHeight={150} iconTop="top-5" iconRight="right-1.5" color="bg-[#4C1010]" />
            <Disc name="Steam" url="https://store.steampowered.com/search/?developer=Lee%20Wilson" image="/dvd_player_2.png" icon="/steam.png" iconWidth={60} iconHeight={60} iconTop="top-13" iconRight="right-10" color="bg-[#171720]" />
        </div>

        <div className="px-20 mt-10">
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
