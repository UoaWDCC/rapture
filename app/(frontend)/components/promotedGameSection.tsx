'use client'

import Image from "next/image";
import GlitchReveal from "./GlitchReveal";
import { useEffect, useRef, useState } from "react";

function VitriolRing({ playing }: { playing?: boolean }) {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const offset = useRef(12.5); // start position in % (12.5 = old begin="-1s")

  useEffect(() => {
    if (!playing) return;
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      offset.current = (offset.current + ((now - last) / 4000) * 50) % 50; // 4000 = 4s per lap
      last = now;
      textPathRef.current?.setAttribute("startOffset", `${offset.current}%`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <svg
      viewBox="0 0 1024 800"
      className="absolute inset-0 z-5 w-full h-full pointer-events-none [overflow:visible]"
    >
      <defs>
        <path
          id='vitriol-arc'
          className="fill-none"
          d="M840,370
             a69.87,93 0 1,1 139.74,0 a69.87,93 0 1,1 -139.74,0
             a69.87,93 0 1,1 139.74,0 a69.87,93 0 1,1 -139.74,0"
        />
      </defs>
      {/* rotate(angle centerX centerY) */}
      <g transform="rotate(140 840 370)">
        <text className="text-[clamp(1rem,7.8cqw,5rem)] tracking-[-0.08em] fill-[#FF0000]/50 stroke-[#FF0000] stroke-1">
          <textPath ref={textPathRef} href='#vitriol-arc' startOffset="12.5%">
            VITRIOL
          </textPath>
        </text>
      </g>
    </svg>
  );
}

export function PromotedGameSection() {
  const leftPageContent1 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
  const leftPageContent2 = "enean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
  const leftPageContent3 = "enean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes,Lorem ipsum dolor sit amet, con"

  const [isVitriolHovering, setIsVitriolHovering] = useState(false);

  return (
    <section className="w-full container mx-auto text-brand-blue pt-16 md:pt-28 lg:pt-45">
      <GlitchReveal>
        <div className="relative flex justify-center -translate-x-[5%]">
          <div
            className="group relative z-4 @container w-[70%]"
            onMouseEnter={() => setIsVitriolHovering(true)}
            onMouseLeave={() => setIsVitriolHovering(false)}
          >
            {/* DVD CASE OPEN */}
            <Image
              alt="DVD case open"
              width={1024}
              height={800}
              src="/images/dvd-case-open.png"
              className="w-full h-auto"
            />

            {/* LEFT TEXT */}
            <div className="absolute top-[18%] left-[5%] w-[35%] h-[70%]">
              <p className="mb-[10%] -skew-12 -rotate-11 leading-snug text-[#53A5F1] text-[clamp(0.65rem,1.5cqw,1.1rem)]">
                {leftPageContent1}
              </p>

              <p className="mb-[10%] -skew-12 -rotate-11 leading-snug text-[#53A5F1] text-[clamp(0.65rem,1.5cqw,1.1rem)]">
                {leftPageContent2}
              </p>

              <p className="-skew-12 -rotate-11 leading-snug text-[#53A5F1] text-[clamp(0.65rem,1.5cqw,1.1rem)]">
                {leftPageContent3}
              </p>
            </div>

            {/* TEAM RAPTURE */}
            <p className="absolute rotate-90 top-[30%] left-[50%] -translate-x-1/2 whitespace-nowrap text-[clamp(1rem,4cqw,2.5rem)]">TEAM RAPTURE</p>

            {/* VITRIOL */}
            <VitriolRing playing={isVitriolHovering} />
          </div>

          <Image
            alt="DVD case closed 1"
            width={515}
            height={828}
            src="/images/dvd-case-closed.png"
            className="absolute z-3 -top-[6%] right-[12%] w-[35%] h-auto transition-transform duration-300 hover:-translate-y-[5%]"
          />
          <Image
            alt="DVD case closed 2"
            width={515}
            height={828}
            src="/images/dvd-case-closed.png"
            className="absolute z-2 -top-[11%] right-[8%] w-[35%] h-auto transition-transform duration-300 hover:-translate-y-[5%]"
          />
          <Image
            alt="DVD case closed 3"
            width={515}
            height={828}
            src="/images/dvd-case-closed.png"
            className="absolute z-1 -top-[16%] right-[4%] w-[35%] h-auto transition-transform duration-300 hover:-translate-y-[5%]"
          />
        </div>
      </GlitchReveal>
    </section>
  )
}