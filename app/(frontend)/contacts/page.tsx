import Image from "next/image";
import ContactForm from "../components/ContactForm";

// TODO: Add back ContactForm

export default async function Page() {
  return (
    <section className="relative">
      {/* LEFT - Folders */}
      <div className="absolute z-[3] left-[-300px] top-0 w-[560px] h-[620px]">
        <div
          className="absolute inset-0 bg-[#20805A]"
          style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 12.2%, 92% 12.2%, 92% 33%, 88% 38%, 88% 100%, 0% 100%)" }}
        />
        <div
          className="absolute inset-[1.5px] bg-[#05130d]"
          style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 12.2%, 92% 12.2%, 92% 32.8%, 88% 37.8%, 88% 100%, 0% 100%)" }}
        />
        <span
          className="absolute text-white text-xs top-22 right-13 uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-360"
        >
          ABOUT US
        </span>
      </div>

      <div className="absolute z-[2] left-[-200px] top-0  w-[560px] h-[620px]" >
        <div
          className="absolute inset-0 bg-[#F2B423]"
          style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 12.2%, 92% 12.2%, 92% 33%, 88% 38%, 88% 100%, 0% 100%)" }}
        />
        <div
          className="absolute inset-[1.5px] bg-[#070604]"
          style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 12.2%, 92% 12.2%, 92% 32.8%, 88% 37.8%, 88% 100%, 0% 100%)" }}
        />
        <span
          className="absolute text-white text-xs top-22 right-13 uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-360"
        >
          MEET THE DEVS
        </span>
      </div>

      <div className="absolute z-[1] left-[-100px] top-0  w-[560px] h-[620px]" >
        <div
          className="absolute inset-0 bg-[#0650DA]"
          style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 12.2%, 92% 12.2%, 92% 33%, 88% 38%, 88% 100%, 0% 100%)" }}
        />
        <div
          className="absolute inset-[1.5px] bg-[#020A15]"
          style={{ clipPath: "polygon(0% 0%, 88% 0%, 88% 12.2%, 92% 12.2%, 92% 32.8%, 88% 37.8%, 88% 100%, 0% 100%)" }}
        />
        <span
          className="absolute text-white text-xs top-22 right-13 uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-360"
        >
          CONTACT US
        </span>
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
