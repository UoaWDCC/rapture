import Disc from "@/app/(frontend)/components/Disc";
import Image from "next/image";

type FooterProps = {
  studioTagline?: string;
  contactEmail?: string;
};

export default function Footer({ studioTagline, contactEmail }: FooterProps) {
  return (
    <footer className="bg-[url(/images/FOOTER.png)] min-h-250 w-full bg-cover bg-no-repeat text-white mt-10 z-0 relative bg-[center_top_100px]">
      <div className="flex items-center gap-4 w-full px-20 mb-10">
        <div className="flex-1 h-px bg-white opacity-30"></div>
        <span className="text-white text-2xl tracking-widest">
          SOCIAL MEDIA
        </span>
        <div className="flex-1 h-px bg-white opacity-30"></div>
      </div>

      <div className="flex gap-8 justify-center w-full flex-wrap">
        <Disc
          name="Discord"
          url="https://discord.com"
          image="/dvd_player_2.png"
          icon="/DISCORD.png"
          iconWidth={35}
          iconHeight={35}
          iconTop="top-5.5"
          iconRight="right-4"
          color="bg-[#171947]/70"
        />
        <Disc
          name="Youtube"
          url="https://www.youtube.com/@STUDIO_RAPTURE"
          image="/dvd_player_2.png"
          icon="/YT.png"
          iconWidth={70}
          iconHeight={70}
          iconTop="top-1"
          iconRight="right-0"
          color="bg-[#4C1010]/70"
        />
        <Disc
          name="Steam"
          url="https://store.steampowered.com/search/?developer=Lee%20Wilson"
          image="/dvd_player_2.png"
          icon="/steam.png"
          iconWidth={35}
          iconHeight={35}
          iconTop="top-5.5"
          iconRight="right-4"
          color="bg-[#171720]/70"
        />
      </div>

      <div className="px-20 mt-10">
        <div className="w-full h-px bg-white opacity-30 mb-20"></div>
      </div>

      <div className="px-20">
        <div className="w-full border-2 border-amber-400 rounded-3xl flex flex-col gap-4 p-10">
          <h3>STUDIO RAPTURE!: {studioTagline}</h3>
          <h3>CONTACT: {contactEmail}</h3>
        </div>
      </div>
    </footer>
  );
}
