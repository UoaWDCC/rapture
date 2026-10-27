import Image from "next/image";
import ContactFile from "../components/ui/ContactFileDesign";
import GlitchReveal from "../components/GlitchReveal";

export default async function Page() {
  return (
    <section className="relative pb-10">
      <GlitchReveal>
        {/* LEFT - Folders */}
        <div className="absolute left-0 top-0 flex z-100 h-230 w-full max-w-[100%]">
          <div className="w-[100%] h-full relative">
            <ContactFile
              title="ABOUT US"
              bgColor="bg-[#000000]"
              borderColor="#20805A"
              sideHeight="100px"
              zIndex={3}
              className="h-full absolute"
              closedWidthClass="w-0 md:w-[2vw] lg:w-[10vw] xl:w-[21vw]"
              openWidthClass="w-[100vw] md:w-[65vw] lg:w-[70vw] xl:w-[72vw]"
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
              closedWidthClass="w-0 md:w-[6vw] lg:w-[16vw] xl:w-[26vw]"
              openWidthClass="w-[100vw] md:w-[70vw] lg:w-[75vw] xl:w-[76vw]"
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
        <div className="container mx-auto my-6 px-4 space-y-4 relative max-w-6xl min-h-[850px] overflow-hidden sm:overflow-visible">
          <div className="relative">
            <Image
              alt="Computer"
              width={600}
              height={600}
              src="/images/computer.png"
              className="absolute -right-[100px] sm:right-20 lg:right-50 min-w-[600px]"
            />

            <div className="absolute top-28 sm:top-28 -right-[10px] sm:right-48 lg:right-78 max-w-100">
              <h1 className="text-brand-yellow/30 text-stroke text-stroke-brand-yellow">
                USER
              </h1>
              <p className="font-fira-custom text-brand-yellow/30 leading-snug mt-2">
                this is where the text will be written that will be a
                short description of the donor page, each text
                will be place random in this box
                similar to this, it can also overlay the details
                and etc
              </p>
            </div>

            <span className="font-fira-custom absolute top-88 right-40 sm:right-90 lg:right-115 text-brand-yellow/30">
              open it
            </span>
          </div>
        </div>
      </GlitchReveal>
    </section>
  );
}
