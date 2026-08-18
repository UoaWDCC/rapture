import Link from "next/link";

import GlitchReveal from "./GlitchReveal";

const JoinButton = ({
  href,
  children,
  newTab,
}: {
  href: string;
  children: string;
  newTab?: boolean;
}) => (
  <Link
    href={href}
    target={newTab ? "_blank" : undefined}
    rel={newTab ? "noopener noreferrer" : undefined}
    className="bg-brand-green/30 flex-1 flex items-center justify-center py-4 px-6 text-brand-white -tracking-[0.1em] text-sm md:text-base hover:bg-brand-green/10 transition-colors"
  >
    {children}
  </Link>
);

export function JoinNowSection() {
  return (
    <section className=" text-brand-yellow mt-10 w-full px-4">
      <GlitchReveal>
        <div
          className="bg-brand-green/50 relative w-full max-w-6xl mx-auto bg-cover bg-center bg-no-repeat rounded-[15px] border border-brand-green p-6 overflow-hidden"
          style={{ backgroundImage: "url('/images/bit-texture.png')" }}
        >
          <div className="relative rounded-[15px] border border-brand-green bg-black/50 flex flex-col md:flex-row gap-20 p-6 md:py-18 md:px-12">
            <p
              className="text-[clamp(4rem,12vw,8rem)] mt-10 md:mt-0 md:text-[clamp(2rem,6vw,6rem)] -tracking-[0.2em] text-transparent text-stroke text-stroke-color-brand-green whitespace-nowrap"
              style={{ WebkitTextStrokeWidth: "2px" }}
            >
              JOIN NOW!
            </p>

            <div
              className="p-2 mt-10 bg-brand-green/40 w-full md:ml-auto border-2 border-brand-green"
              style={{ boxShadow: "0 0 12px 2px rgba(32, 128, 90, 0.6)" }}
            >
              <div className=" border border-brand-green flex flex-col divide-y divide-brand-green md:min-w-90">
                <JoinButton href="https://discord.gg" newTab>DISCORD</JoinButton>
                <div className="h-3"></div>
                <JoinButton href="/">WEBSITE</JoinButton>
              </div>
            </div>
          </div>
        </div>
      </GlitchReveal>

      {/* Spacing */}
      <div className="h-5" />
    </section>
  );
}
