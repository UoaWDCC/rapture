import Image from "next/image";
import Link from "next/link";
import GlitchReveal from "./GlitchReveal";

const BottomArrow = () => (
  <div className="relative w-[28px] h-[20px]">
    {/* gradient border layer */}
    <div
      className="absolute inset-0"
      style={{
        clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
        background:
          "linear-gradient(140deg, rgba(255, 255, 255, 1) 0%, rgba(180, 150, 0, 0.7) 50%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 100%)",
      }}
    />
    {/* dark fill layer */}
    <div
      className="absolute inset-0"
      style={{
        clipPath: "polygon(50% 95%, 4% 3%, 95% 4%)",
        background: "#1a1500",
      }}
    />
  </div>
);

const Divider = () => <div className="bg-brand-yellow h-[1px]" />;

const NotificationButton = ({ children }: { children: string }) => {
  return (
    <Link href="#">
      <div className="relative px-8 py-0.5 cursor-pointer hover:opacity-60 transition-all">
        <div className="absolute inset-0 border blur-[2px] opacity-70" />
        <div className="absolute inset-0 border" />
        <p className="relative opacity-70">{children}</p>
      </div>
    </Link>
  );
};

const ReadMoreButton = () => {
  return (
    <Link href="/news">
      <div className="mt-4 flex flex-col items-center space-y-2 cursor-pointer hover:opacity-60 transition-all">
        <BottomArrow />
        <p className="cursor-pointer">READ MORE</p>
      </div>
    </Link>
  );
};

export function NewsSection() {
  const description =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Cum sociis natoque penatibus et magnis dis parturient montes, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";

  return (
    <section className="bg-background text-brand-yellow mt-10 w-full">
      {/* Spacing */}
      <div className="h-40 md:h-30" />

      <div className="space-y-4">
        <Divider />
        <Divider />
      </div>
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bit-texture.png')" }}
      >
        {/* Dark overlay on top of TV image */}
        <div className="absolute inset-0 bg-brand-dark-brown/50 z-10 pointer-events-none" />

        <div className="relative max-w-280 mx-auto">
          {/* TV image*/}
          <GlitchReveal className="absolute top-[-140] md:top-[-88] left-00 md:left-10 z-20">
            {/* Overlay */}
            <div className="absolute z-1 w-64 md:w-62 h-1 bg-background top-30 left-6 md:top-17 md:left-33" />
            <div className="absolute z-1 w-64 md:w-70 h-1 bg-background top-34 left-6 md:top-21 md:left-29" />

            <div className="relative z-2">
              <Image
                alt="TV"
                width={420}
                height={420}
                src="/images/tv.png"
                className="w-[300px] h-[280px] md:w-[430px] md:h-[410px]"
              />
              <h2 className="absolute z-20 top-25 md:top-36 left-39 md:left-62">
                NEWS
              </h2>
            </div>
          </GlitchReveal>

          <div className="h-36 md:h-60" />

          {/* Notification */}
          <GlitchReveal
            className="relative z-30 mx-4 mb-6 md:mb-0 md:absolute md:right-18 md:top-30 md:mx-0"
            delay={0.15}
          >
            <div
              className="relative bg-brand-yellow text-background p-5 md:w-xl"
              style={{ boxShadow: "0 0 12px 2px rgba(255, 220, 0, 0.5)" }}
            >
              <div className="space-y-1">
                <div className="relative">
                  <h4 className="absolute left-[2px] blur-[1px]">
                    NOTIFICATION
                  </h4>
                  <h4>NOTIFICATION</h4>
                </div>
                <p className="opacity-70">
                  Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor
                  sit amet, consectetuer.
                </p>
              </div>
              <div className="bg-background h-[1px] mt-5 mb-3" />
              <div className="flex flex-row justify-end space-x-2">
                <NotificationButton>(Y) Accept</NotificationButton>
                <NotificationButton>(N) Dismiss</NotificationButton>
              </div>
            </div>
          </GlitchReveal>

          {/* Main content */}
          <GlitchReveal className="relative" delay={0.3}>
            {/* Overlay */}
            <div className="absolute z-1 w-90 h-[1px] md:bg-background left-20" />
            <div className="absolute z-1 w-[1px] h-10 md:bg-background left-20" />

            <div className="relative mx-4 md:mx-20 pt-8 md:pt-30 pb-3 border border-brand-yellow">
              <h2 className="mb-4 px-4 md:px-10">HEADER</h2>
              <div className="px-4 md:px-18">
                {/* Mobile description */}
                <p className="mb-2 md:hidden">
                  {description.length > 120
                    ? description.slice(0, 120) + "..."
                    : description}
                </p>
                {/* Desktop description */}
                <p className="mb-2 hidden md:block">{description}</p>

                <p className="text-right">VS 3.01</p>
                <Divider />
                <ReadMoreButton />
              </div>
            </div>
          </GlitchReveal>

          <div className="h-10 md:h-20" />
        </div>
      </div>
      <div className="space-y-4">
        <Divider />
        <Divider />
      </div>

      {/* Spacing */}
      <div className="h-20 md:h-30" />
    </section>
  );
}
