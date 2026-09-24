import Disc from "@/app/(frontend)/components/Disc";
import Image from "next/image";

type FooterProps = {
  contactEmail?: string;
  className?: string;
};

export default function Footer({ contactEmail, className }: FooterProps) {
  return (
    <footer className={`bg-[url(/images/FOOTER.png)] w-full bg-cover bg-no-repeat text-white z-0 relative bg-[center_top_100px] ${className}`}>
      <div className="flex items-center gap-4 w-full px-20 mb-10">
        <div className="flex-1 h-px bg-white opacity-30"></div>
        <span className="text-white md:text-2xl text-xl tracking-widest">
          SOCIAL MEDIA
        </span>
        <div className="flex-1 h-px bg-white opacity-30"></div>
      </div>

      <div className="flex gap-8 justify-center w-full flex-wrap">
        <Disc
          name="Discord"
          url="https://www.discord.gg/w4D5rn6Tnf"
          image="/dvd_player_2.png"
          icon="/DISCORD.png"
          iconWidth={50}
          iconHeight={50}
          iconTop="lg:top-8 md:top-5.75 sm:top-4 top-3"
          iconRight="lg:right-5.75 md:right-4.5 sm:right-[9.5%] right-2.25"
          color="bg-[#5865F2]/15"
          discColor="#0650DA"
          ringColor="#0650DA"
          iconClassName="lg:w-12.5 lg:h-12.5 md:w-8.5 md:h-8.5 sm:w-6.5 w-5"
        />
        <Disc
          name="Youtube"
          url="https://www.youtube.com/@STUDIO_RAPTURE"
          image="/dvd_player_2.png"
          icon="/YT.png"
          iconWidth={95}
          iconHeight={95}
          iconTop="lg:top-2 md:top-[2.25%] sm:top-1.25 top-0.5"
          iconRight="lg:right-0 md:-right-0.25 sm:-right-0.25 -right-0.25"
          color="bg-[#4C1010]/70"
          discColor="#FF0000"
          ringColor="#FF0000"
          iconClassName="lg:w-24 md:w-17.5 sm:w-12.5 w-10"
        />
        <Disc
          name="Steam"
          url="https://store.steampowered.com/app/2908090/VITRIOL/"
          image="/dvd_player_2.png"
          icon="/steam.png"
          iconWidth={50}
          iconHeight={50}
          iconTop="lg:top-4 md:top-5.5 sm:top-3.75 top-[9.25%]"
          iconRight="lg:right-5.75 md:right-4.25 sm:right-[9.5%] right-[9.25%]"
          color="bg-[#171720]/70"
          discColor="#FFFFFF"
          ringColor="#FFFFFF"
          iconClassName="lg:w-12.5 lg:h-20 md:w-8.5 md:h-8.5 sm:w-6.5 sm:h-7.5 w-5 h-6.5"
        />
      </div>

      <div className="px-20 mt-10">
        <div className="w-full h-px bg-white opacity-30 mb-10"></div>
      </div>

      <div className="md:px-20 md:pb-15 px-10 pb-7.5">
        <div className="w-full border-2 border-amber-400 bg-black rounded-3xl flex flex-col gap-2 p-5">
          <h5 className="md:text-l text-[80%]">STUDIO RAPTURE!</h5>
          <h5 className="md:text-l text-[80%]">CONTACT: {contactEmail}</h5>
        </div>
      </div>
    </footer>
  );
}
