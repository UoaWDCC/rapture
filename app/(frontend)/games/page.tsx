import Image from "next/image"
import PopUp from '../components/ui/PopUp'
import GlitchReveal from "../components/GlitchReveal"

export default async function GamesPage() {
  return (
    <section>

      {/* Mobile */}
      <div className="flex flex-col items-center gap-4 px-4 md:hidden">
        <div className="w-full space-y-3 my-2">
          <div className="bg-foreground h-[1px]" />
          <div className="bg-foreground h-[1px]" />
        </div>

        <GlitchReveal className="w-full">
          <Image
            src="/images/vitriol-hero.png"
            alt="Vitriol Hero"
            width={1565}
            height={895}
            className="w-full h-auto"
          />
        </GlitchReveal>

        <GlitchReveal>
          <Image
            className="h-10 w-auto"
            alt="Rapture Logo"
            height={47}
            width={131}
            src="/LOGO.png"
          />
        </GlitchReveal>

        <GlitchReveal className="w-full">
          <PopUp title="MOVEMENT SHOOTER REIMAGINED!" className="w-full" />
        </GlitchReveal>

        <GlitchReveal className="w-full">
          <PopUp src="/images/popup-01.png" alt="popup-01.png" width={1339} height={440} />
        </GlitchReveal>
        <GlitchReveal className="w-full" delay={0.1}>
          <PopUp
            text={"Shooter mechanics new & old have been retooled & reimagined for Virtual Reality.\n\nUsing familiar Physics as a tool to build NEW FEATURES that capture the OLD RUSH of a demon below your Iron"}
            className="w-full"
          />
        </GlitchReveal>

        <GlitchReveal className="w-full">
          <PopUp title={"ELBOWS\nUNLOCKED!"} titleClassName="text-right" className="w-full" />
        </GlitchReveal>

        <GlitchReveal className="w-full">
          <PopUp src="/images/popup-02.png" alt="popup-02.png" width={684} height={289} />
        </GlitchReveal>
        <GlitchReveal className="w-full" delay={0.1}>
          <PopUp
            text={
              <>
                With Torque based Physics Arms & Advanced Elbow Estimation{" "}
                <u>YOU</u> can larp upper body tracking with <u>any</u> headset
                & its two motion controllers.
              </>
            }
            className="w-full"
          />
        </GlitchReveal>

        <div className="flex flex-wrap justify-center gap-2">
          <GlitchReveal>
            <PopUp title="SLIDE" titleClassName="text-center" width={120} />
          </GlitchReveal>
          <GlitchReveal>
            <PopUp title="PUNCH" titleClassName="text-center" width={120} />
          </GlitchReveal>
          <GlitchReveal>
            <PopUp title="SPIN" titleClassName="text-center" width={120} />
          </GlitchReveal>
          <GlitchReveal>
            <PopUp title="SHOOT!" titleClassName="text-center" width={120} />
          </GlitchReveal>
        </div>

        <GlitchReveal className="w-full">
          <PopUp src="/images/popup-03.png" alt="popup-03.png" width={702} height={276} />
        </GlitchReveal>

        <GlitchReveal className="w-full">
          <PopUp
            text={"Bullets WILL fly, Demons WILL explode, and Blood WILL rain over a World of Ashes"}
            className="w-full"
          />
        </GlitchReveal>
      </div>

      {/* Tablet */}
      <div className="relative mx-auto hidden md:block lg:hidden w-full max-w-2xl px-4 min-h-[1450px]">

        <div className="my-4 space-y-3">
          <div className="bg-foreground h-[1px]" />
          <div className="bg-foreground h-[1px]" />
        </div>

        <GlitchReveal>
          <Image
            src="/images/vitriol-hero.png"
            alt="Vitriol Hero"
            width={1565}
            height={895}
            className="w-full h-auto"
          />
        </GlitchReveal>

        <div className="border-t border-dotted border-foreground mx-10 mt-1 mb-4" />

        {/* section 1 */}
        <div className="relative mb-40">
          <GlitchReveal className="absolute right-4 z-10">
            <PopUp title="MOVEMENT SHOOTER REIMAGINED!" width={420} />
          </GlitchReveal>
          <GlitchReveal>
            <Image
              className="h-9 w-auto shrink-0 ml-4"
              alt="Rapture Logo"
              height={47}
              width={131}
              src="/LOGO.png"
            />
          </GlitchReveal>
          <GlitchReveal className="mx-4 mt-2">
            <PopUp src="/images/popup-01.png" alt="popup-01.png" width={620} height={204} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-55">
            <PopUp
              text={"Shooter mechanics new & old have been retooled & reimagined for Virtual Reality.\n\nUsing familiar Physics as a tool to build NEW FEATURES that capture the OLD RUSH of a demon below your Iron"}
              width={520}
            />
          </GlitchReveal>
        </div>

        {/* section 2 */}
        <div className="relative mb-30">
          <GlitchReveal className="mx-4">
            <PopUp src="/images/popup-02.png" alt="popup-02.png" width={540} height={144} />
          </GlitchReveal>
          <GlitchReveal className="absolute -top-20 -right-10">
            <PopUp title={"ELBOWS\nUNLOCKED!"} titleClassName="text-right" width={150} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-40 right-4">
            <PopUp
              text={
                <>
                  With Torque based Physics Arms & Advanced Elbow Estimation{" "}
                  <u>YOU</u> can larp upper body tracking with <u>any</u> headset
                  & its two motion controllers.
                </>
              }
              textClassName="text-right"
              width={520}
            />
          </GlitchReveal>
        </div>

        {/* section 3 */}
        <div className="relative">
          <GlitchReveal className="absolute -top-5 left-4 z-10">
            <PopUp title="SLIDE" titleClassName="text-center" width={110} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-14 left-12 z-10">
            <PopUp title="PUNCH" titleClassName="text-center" width={110} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-34 -left-2 z-10">
            <PopUp title="SPIN" titleClassName="text-center" width={110} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-46 left-20 z-10">
            <PopUp title="SHOOT!" titleClassName="text-center" width={110} />
          </GlitchReveal>
          <GlitchReveal className="mx-4">
            <PopUp src="/images/popup-03.png" alt="popup-03.png" width={580} height={150} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-60 left-8 -z-10">
            <PopUp
              text={"Bullets WILL fly, Demons WILL explode, and Blood WILL rain over a World of Ashes"}
              width={620}
            />
          </GlitchReveal>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden lg:block w-full max-w-6xl min-h-[1100px]">

        <div className="my-5 space-y-5">
          <div className="bg-foreground h-[1px]" />
          <div className="bg-foreground h-[1px]" />
        </div>

        <GlitchReveal>
          <Image src="/images/vitriol-hero.png" alt="Vitriol Hero" width={1800} height={0} />
        </GlitchReveal>

        <div className="border-t border-dotted border-foreground mx-20 mt-[1] mb-[10]" />

        {/* section 1 */}
        <div className="relative mb-50">
          <GlitchReveal className="absolute right-25 z-10">
            <PopUp title="MOVEMENT SHOOTER REIMAGINED!" width={520} />
          </GlitchReveal>
          <GlitchReveal>
            <Image
              className="h-14 w-auto shrink-0 ml-25"
              alt="Rapture Logo"
              height={120}
              width={120}
              src="/LOGO.png"
            />
          </GlitchReveal>
          <GlitchReveal className="mx-30">
            <PopUp src="/images/popup-01.png" alt="popup-01.png" width={1500} height={0} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-90 left-25">
            <PopUp
              text={"Shooter mechanics new & old have been retooled & reimagined for Virtual Reality.\n\nUsing familiar Physics as a tool to build NEW FEATURES that capture the OLD RUSH of a demon below your Iron"}
              width={580}
            />
          </GlitchReveal>
        </div>

        {/* section 2 */}
        <div className="relative mb-30">
          <GlitchReveal className="mx-30">
            <PopUp src="/images/popup-02.png" alt="popup-02.png" width={700} height={0} />
          </GlitchReveal>
          <GlitchReveal className="absolute -top-20 right-60">
            <PopUp title={"ELBOWS\nUNLOCKED!"} titleClassName="text-right" width={200} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-52 right-50">
            <PopUp
              text={
                <>
                  With Torque based Physics Arms & Advanced Elbow Estimation{" "}
                  <u>YOU</u> can larp upper body tracking with <u>any</u> headset
                  & its two motion controllers.
                </>
              }
              textClassName="text-right"
              width={580}
            />
          </GlitchReveal>
        </div>

        {/* section 3 */}
        <div className="relative">
          <GlitchReveal className="absolute -top-3 left-30 z-10">
            <PopUp title={"SLIDE"} titleClassName="text-center" width={150} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-16 left-40 z-10">
            <PopUp title={"PUNCH"} titleClassName="text-center" width={150} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-37 left-22 z-10">
            <PopUp title={"SPIN"} titleClassName="text-center" width={150} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-49 left-50 z-10">
            <PopUp title={"SHOOT!"} titleClassName="text-center" width={150} />
          </GlitchReveal>
          <GlitchReveal className="mx-30">
            <PopUp src="/images/popup-03.png" alt="popup-03.png" width={780} height={0} />
          </GlitchReveal>
          <GlitchReveal className="absolute top-75 left-35 -z-10">
            <PopUp
              text={"Bullets WILL fly, Demons WILL explode, and Blood WILL rain over a World of Ashes"}
              width={700}
            />
          </GlitchReveal>
        </div>
      </div>
      <div className='mb-40'></div>
    </section >
  )
}
