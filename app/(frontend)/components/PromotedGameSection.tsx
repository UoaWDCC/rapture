import Image from "next/image";
import GlitchReveal from "./GlitchReveal";

export function PromotedGameSection() {
  const leftPageContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."

  return (
    <section className="bg-background text-brand-blue my-10 w-full">
      <GlitchReveal>
        <div className="relative flex justify-center">
          <div className="hidden md:block">
            <Image
              alt="Book closed 1"
              width={155}
              height={663}
              src="/images/book-closed.png"
            />
          </div>
          <div className="hidden md:block">
            <Image
              alt="Book closed 2"
              width={155}
              height={663}
              src="/images/book-closed.png"
            />
          </div>

          {/* Book open */}
          <div className="relative">
            {/* Mobile - crop to right half only */}
            <div className="md:hidden w-full overflow-hidden">
              <Image
                alt="Book open"
                width={1010}
                height={674}
                src="/images/book-open.png"
                className="w-[200%] max-w-none ml-[-100%]"
              />
            </div>

            {/* Desktop - full image */}
            <div className="hidden md:block">
              <Image
                alt="Book open"
                width={1010}
                height={674}
                src="/images/book-open.png"
                className="w-full h-auto"
              />
            </div>

            {/* Left page - desktop */}
            <div
              className="hidden md:block absolute top-[12%] left-[4%] w-[36%] h-[80%] overflow-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--color-brand-blue) transparent",
              }}
            >
              <p className="text-[clamp(1rem,1.5vw,1.5rem)] leading-snug text-transparent text-stroke text-stroke-color-brand-blue">
                {leftPageContent}
              </p>
            </div>

            {/* Right page - mobile */}
            <div className="md:hidden absolute top-[18%] left-[20%] w-[45%] z-10">
              <div className="relative inline-block">
                <p className="text-[clamp(1.5rem,8vw,3rem)] text-transparent text-stroke text-stroke-color-brand-blue">
                  VITRIOL
                </p>
                <div className="absolute inset-0 flex items-center">
                  <Image
                    alt="Vitriol text overlay"
                    width={171}
                    height={50}
                    src="/images/vitriol-text-overlay-2.png"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right page - desktop */}
            <div className="hidden md:block absolute top-[20%] right-[24%] z-10">
              <div className="relative">
                <p className="text-[clamp(1rem,3.5vw,3rem)] text-transparent text-stroke text-stroke-color-brand-blue">
                  VITRIOL
                </p>
                <div className="absolute inset-0 flex items-center">
                  <Image
                    alt="Vitriol text overlay"
                    width={171}
                    height={50}
                    src="/images/vitriol-text-overlay-2.png"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              alt="Book closed 3"
              width={155}
              height={663}
              src="/images/book-closed.png"
            />
          </div>
        </div>
      </GlitchReveal>

      {/* Left page - mobile */}
      <GlitchReveal delay={0.15}>
        <div
          className="md:hidden m-2 p-4 pt-10 overflow-auto border border-brand-blue"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--color-brand-blue) transparent",
          }}
        >
          <p className="text-xl leading-snug text-transparent text-stroke text-stroke-color-brand-blue">
            {leftPageContent}
          </p>
        </div>
      </GlitchReveal>
    </section>
  )
}