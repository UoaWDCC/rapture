import { BinaryFlicker } from "./binaryFlicker";
import GlitchReveal from "./GlitchReveal";

const COLUMN_SPACING = 8; // px between each column

const binaryFlickerLengths = [50, 50, 20, 60, 25, 30, 30, 30, 30, 30, 30, 15, 40, 20, 25, 25, 25, 25, 25, 15, 35, 35, 35, 35, 35, 35, 15, 40, 40, 40, 40, 5, 35, 30, 25, 20, 20, 15, 10, 20, 15, 15, 10, 15, 15, 5, 10];

export function HomeHeroSection() {
  return (
    <GlitchReveal className="relative -z-10 w-full max-w-7xl mx-auto flex flex-col justify-center pt-6 px-4">
      <div className="relative">
        <div className="border-2 border-white rounded-t-xl pointer-events-none absolute top-0 left-0 w-[100%] h-[100%] overflow-hidden z-10">
          {binaryFlickerLengths.map((length, i) => (
            <div key={i} className="absolute top-0" style={{ left: i * COLUMN_SPACING }}>
              <BinaryFlicker length={length} intervalMs={150} />
            </div>
          ))}
        </div>
        <div className="absolute top-10 left-0 right-0 border-b-2 border-white" />

        <img
          src="/images/title-screen-rapture.gif"
          alt="Rapture title screen"
          className="w-full h-auto max-h-[700px] object-cover object-bottom block rounded-t-xl"
        />
      </div>
      <div
        className="bg-brand-yellow/10 w-1/3 h-10 border-2 border-white border-t-0"
        style={{ borderBottomLeftRadius: "30px", borderBottomRightRadius: "100px" }}
      />
    </GlitchReveal>
  );
}

