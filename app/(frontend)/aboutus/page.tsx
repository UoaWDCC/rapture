import Image from "next/image";
import ContactFile from "../components/ui/ContactFileDesign";
import GlitchReveal from "../components/GlitchReveal";

// Left edge of the centred desktop navbar: half of (page width - navbar content width).
// Content = logo (156px) + mr-8 (32px) + 4 nav buttons at clamp(8rem,16vw,12.5rem)
// + gaps (12px) + account icon (60px). Update if the navbar layout changes.
// From xl up the nav buttons hit their 12.5rem cap, so the navbar is a fixed 1060px wide;
// the xl open widths below keep the files within 3/4 of it (795px).
const NAVBAR_LEFT_EDGE = "max(0px, calc(50% - 130px - 2 * clamp(8rem, 16vw, 12.5rem)))";

export default async function Page() {
  return (
    <section className="relative">
      <GlitchReveal>
        {/* LEFT - Folders */}
        <div
          className="absolute right-0 top-0 flex z-100 h-172.5"
          style={{ left: NAVBAR_LEFT_EDGE }}
        >
          <div className="w-[100%] h-full relative">
            <ContactFile
              title="ABOUT US"
              bgColor="bg-[#000000]"
              borderColor="#20805A"
              sideHeight="100px"
              zIndex={3}
              className="h-full absolute"
              closedWidthClass="w-0 md:w-[2vw] lg:w-[10vw] xl:w-32"
              openWidthClass="w-[100vw] md:w-[65vw] lg:w-[70vw] xl:w-[735px]"
            >
              <div className="w-full flex flex-row justify-end items-end max-w-full">
                <div className="flex flex-col items-end">
                  <h1 className="mb-20 mr-10 mt-10">STUDIO RAPTURE!</h1>

                  <p className="w-[60%] mb-10 mr-10 text-right">
                    we are very enthusiastic about VR
                  </p>
                </div>
              </div>
            </ContactFile>

            <ContactFile
              title="MEET THE DEVS"
              bgColor="bg-[#070604]"
              borderColor="#F2B423"
              sideHeight="300px"
              zIndex={2}
              className="h-full absolute"
              closedWidthClass="w-0 md:w-[6vw] lg:w-[16vw] xl:w-45"
              openWidthClass="w-[100vw] md:w-[70vw] lg:w-[75vw] xl:w-[795px]"
            >
              <div className="pl-20 w-full h-full flex flex-col items-end">
                <h1 className="mb-20 mr-10 mt-10">Meet the Devs</h1>

                <p className="w-full mb-10 text-left">
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                  Loren als ser pal Loren als ser pal Loren als ser pal
                </p>
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
