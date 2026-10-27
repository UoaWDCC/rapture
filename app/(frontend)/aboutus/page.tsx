import Image from "next/image";
import ContactFile from "../components/ui/ContactFileDesign";
import GlitchReveal from "../components/GlitchReveal";

// Left edge of the centred desktop navbar: half of (page width - navbar content width).
// Content = logo (156px) + mr-8 (32px) + 4 nav buttons at clamp(8rem,16vw,12.5rem)
// + gaps (12px) + account icon (60px). Update if the navbar layout changes.
const NAVBAR_LEFT_EDGE = "max(0px, calc(50% - 130px - 2 * clamp(8rem, 16vw, 12.5rem)))";

type TeamMember = { role: string; name: string };

const TEAM_ROWS: TeamMember[][] = [
  [
    { role: "Project Manager", name: "Emily Ha" },
    { role: "Technical Lead", name: "Shazeel Ali" },
  ],
  [
    { role: "Developer", name: "Aeriel Cruz" },
    { role: "Designer", name: "Vivien Trinh" },
    { role: "Developer", name: "Tom Suh" },
  ],
  [
    { role: "Developer", name: "Leona Zhao" },
    { role: "Developer", name: "James Anderson" },
    { role: "Developer", name: "Xavier Miller" },
    { role: "Developer", name: "Irene Andyna Tendean" },
  ],
];

const ROW_COLUMNS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export default async function Page() {
  return (
    <section className="relative">
      <GlitchReveal>
        {/* LEFT - Folders */}
        <div
          className="absolute left-0 right-0 top-0 flex z-100 h-172.5 nav-desktop:left-(--navbar-left-edge)"
          style={{ "--navbar-left-edge": NAVBAR_LEFT_EDGE } as React.CSSProperties}
        >
          <div className="w-[100%] h-full relative">
            <ContactFile
              title="ABOUT US"
              bgColor="bg-[#000000]"
              borderColor="#20805A"
              sideHeight="100px"
              zIndex={3}
              className="h-full absolute"
              closedWidthClass="w-6 nav-desktop:w-[calc((260px_+_4_*_clamp(8rem,16vw,12.5rem))_*_0.1208)]"
              openWidthClass="w-[calc(100%-5rem)] nav-desktop:w-[calc((260px_+_4_*_clamp(8rem,16vw,12.5rem))_*_0.6934)]"
            >
              <div className="w-full flex flex-col">
                <h1 className="mt-10 mb-15 text-left">STUDIO RAPTURE!</h1>

                <p className="self-end w-[85%] mb-10 text-right text-xl">
                  we are very enthusiastic about VR
                </p>
              </div>
            </ContactFile>

            <ContactFile
              title="MEET THE DEVS"
              bgColor="bg-[#070604]"
              borderColor="#F2B423"
              sideHeight="300px"
              zIndex={2}
              className="h-full absolute"
              closedWidthClass="w-10 nav-desktop:w-[calc((260px_+_4_*_clamp(8rem,16vw,12.5rem))_*_0.1698)]"
              openWidthClass="w-[calc(100%-5rem)] nav-desktop:w-[calc((260px_+_4_*_clamp(8rem,16vw,12.5rem))_*_0.75)]"
            >
              <div className="w-full h-full overflow-y-auto scrollbar-hidden fade-bottom pb-20 flex flex-col pl-16 nav-desktop:pl-[calc((260px_+_4_*_clamp(8rem,16vw,12.5rem))_*_0.1208_+_1.5rem)]">
                <h1 className="mt-10 mb-15 text-left">TEAM RAP!</h1>

                <p className="w-full mb-5 text-right">
                  This dedicated website for Studio Rapture was created by team RAP from the Web Development
                  & Coding Club (WDCC) at the University of Auckland. As a team of 9 with 6 developers, 1 designer
                  and 2 leads, we&apos;ve worked hard for a full year on this website and was able to complete it
                  before the expected deadline. Despite some challenges, late nights, and last minute edits, 
                  this experience was definitely worthwhile for the whole team.
                </p>
                <p className="w-full mb-10 text-right">
                  We hope all users (including Studio Rapture) loves this website, as much as we do.
                </p>
                <div className="flex flex-col gap-y-6">
                  {TEAM_ROWS.map((row, rowIndex) => (
                    <div key={rowIndex} className={`grid gap-x-8 gap-y-6 ${ROW_COLUMNS[row.length]}`}>
                      {row.map((member, i) => (
                        <div key={i} className="text-center">
                          <p className="font-fira-custom text-sm opacity-60">{member.role}</p>
                          <p>{member.name}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </ContactFile>
          </div>
        </div>

        {/* RIGHT - Computer */}
        {/* Same height as the folders so the computer centres against them */}
        <div className="container mx-auto px-4 relative max-w-6xl h-172.5 flex items-center justify-center overflow-hidden sm:overflow-visible">
          <div className="relative w-150 h-150 shrink-0">
            <Image
              alt="Computer"
              width={600}
              height={600}
              src="/images/computer.png"
              className="absolute inset-0 w-full"
            />

            <div className="absolute top-28 right-28 max-w-100">
              <h1 className="text-brand-yellow/30 text-stroke text-stroke-brand-yellow">
                ABOUT US
              </h1>
              <p className="font-fira-custom text-brand-yellow/30 leading-snug mt-2">
                click on the file buttons on the left to view information
                about the studio and the developers !
              </p>
            </div>
          </div>
        </div>
      </GlitchReveal>
    </section>
  );
}
