import Image from "next/image";
import ContactForm from "../components/ContactForm";
import ContactFile from "../components/ui/ContactFileDesign";

// TODO: Add back ContactForm

export default async function Page() {
  return (
    <section className="relative">
      {/* LEFT - Folders */}
      <div className="absolute left-50 flex z-100 h-200 max-w-[100%]">
        <div className="w-[100%] h-full">
          <ContactFile
            title="ABOUT US"
            bgColor="bg-[#000000]"
            borderColor="#20805A"
            sideHeight="100px"
            zIndex={3}
            mlValue={0}
            translateValueOpen="-translate-x-[30%]"
            translateValueClosed="translate-x-[90px]"
            className=" h-full absolute -left-150"
          >
            <div className="w-250 flex flex-row max-w-fulloverflow-y-auto scrollbar-none">
              <div className="flex flex-col items-end">
                <h1 className="mb-20 mr-10 mt-10">STUDIO RAPTURE!</h1>

                <p className="w-[100%] mb-10 mr-10 text-right">
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
            mlValue={50}
            translateValueOpen="-translate-x-[30%]"
            translateValueClosed="translate-x-[90px]"
            className=" h-full absolute -left-150"
          >
            <div className="w-260 h-full flex flex-col items-end overflow-y-auto scrollbar-none">
              <h1 className="mb-20 mr-10 mt-10">About Us</h1>

              <p className="w-[60%] mb-10 text-left">
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

          <ContactFile
            title="CONTACT US"
            bgColor="bg-[#020A15]"
            borderColor="#0650DA"
            sideHeight="500px"
            zIndex={1}
            mlValue={50}
            translateValueOpen="-translate-x-[30%]"
            translateValueClosed="translate-x-[90px]"
            className="h-full absolute -left-150"
          >
            <div className="w-290 h-full flex flex-col items-end overflow-y-auto scrollbar-none">
              <ContactForm />
            </div>
          </ContactFile>
        </div>
      </div>

      {/* RIGHT - Computer */}
      <div className="container mx-auto my-6 px-4 space-y-4 relative max-w-6xl min-h-[850px]">
        <div className="relative">
          <Image
            alt="Computer"
            width={600}
            height={600}
            src="/images/computer.png"
            className="absolute right-50"
          />

          <Image
            alt="Computer detail"
            width={650}
            height={650}
            src="/images/computer-detail.png"
            className="absolute right-25 top-90 h-auto"
          />

          <div className="absolute top-28 right-78 max-w-100">
            <h3 className="text-brand-yellow/30">
              USER
            </h3>
            <p className="text-brand-yellow/30 leading-snug mt-2">
              this is where the text will be written that will be a
              short description of the donor page, each text
              will be place random in this box
              similar to this, it can also overlay the details
              and etc
            </p>
          </div>

          <span className="absolute top-88 right-115 text-brand-yellow/30">
            open it
          </span>

          <p className="absolute text-white/30 top-161 right-124 leading-snug max-w-[220px] text-right">
            more text will overlap
            here as well to explain the user to press to donate
          </p>

          <p className="absolute text-white/30 top-152 right-48 leading-snug max-w-[150px] text-right">
            more text will overlap
            here as well for maybe an
            easter egg
          </p>

          <p className="absolute text-white/30 [writing-mode:vertical-rl] rotate-360 top-193 right-58 leading-snug max-h-[120px]">
            WANT TO JOIN?
          </p>
        </div>
      </div>
    </section>
  );
}
