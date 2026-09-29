"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import GlitchReveal from "./GlitchReveal";
import PopUp from "./ui/PopUp";
import { buildLoginUrl } from "@/lib/safeRedirect";

import type { News } from "@/payload-types";

type RichTextNode = {
  type: string;
  text?: string | null;
  children?: RichTextNode[];
  [key: string]: unknown;
};

type RichTextField = {
  root: {
    type: string;
    children: RichTextNode[];
    direction: "ltr" | "rtl" | null;
    format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
    indent: number;
    version: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function extractPlainText(richText: RichTextField | null | undefined): string {
  if (!richText?.root?.children) return "";

  function getText(node: RichTextNode): string {
    if (node.type === "text") return node.text || "";
    if (node.children) return node.children.map(getText).join(" ");
    return "";
  }

  return richText.root.children.map(getText).join(" ").trim();
}


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

const NotificationButton = ({
  children,
  onClick,
  disabled,
}: {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative px-8 py-0.5 cursor-pointer hover:opacity-60 transition-all disabled:opacity-50 disabled:cursor-wait"
    >
      <span className="absolute inset-0 border blur-[2px] opacity-70" />
      <span className="absolute inset-0 border" />
      <span className="relative block opacity-70">{children}</span>
    </button>
  );
};

const SUBSCRIBE_POPUPS = {
  subscribed: {
    title: "SUBSCRIBE SUCCESS",
    text: "You're now subscribed to Studio Rapture news. Check your inbox for a confirmation email.",
  },
  already_subscribed: {
    title: "EMAIL ALREADY SUBSCRIBED",
    text: "This email is already subscribed to news updates.",
  },
  error: {
    title: "SUBSCRIBE FAILED",
    text: "Something went wrong. Please try again later.",
  },
};

type SubscribePopup = keyof typeof SUBSCRIBE_POPUPS;

/** Calls the subscribe endpoint and returns which popup to show. */
async function requestSubscribe(): Promise<SubscribePopup | "unauthenticated"> {
  try {
    const res = await fetch("/api/newsletter/subscribe", { method: "POST" });
    const data: { status?: string } | null = await res.json().catch(() => null);

    if (data?.status === "subscribed") return "subscribed";
    if (data?.status === "already_subscribed") return "already_subscribed";
    if (res.status === 401) return "unauthenticated";
    return "error";
  } catch {
    return "error";
  }
}

const LOGIN_TO_SUBSCRIBE_URL = buildLoginUrl("/", "subscribe");

const ReadMoreButton = ({ articleId }: { articleId?: string }) => {
  const href = articleId ? `/news?article=${articleId}` : "/news";

  return (
    <Link href={href}>
      <div className="mt-4 flex flex-col items-center space-y-2 cursor-pointer hover:opacity-60 transition-all">
        <BottomArrow />
        <p className="cursor-pointer">READ MORE</p>
      </div>
    </Link>
  );
};

export function NewsSection({
  latestNews,
  isLoggedIn,
}: {
  latestNews: News | null;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [popup, setPopup] = useState<SubscribePopup | null>(null);
  const [subscribing, setSubscribing] = useState(false);
  // Stops React Strict Mode (dev) from auto-subscribing twice, which would show "already subscribed"
  const autoSubscribeRan = useRef(false);

  const showPopup = useCallback((key: SubscribePopup) => {
    setPopup(key);
    setTimeout(() => setPopup(null), 3000);
  }, []);

  // Back from login with /?intent=subscribe: clear the param and subscribe automatically
  useEffect(() => {
    if (autoSubscribeRan.current) return;
    if (new URLSearchParams(window.location.search).get("intent") !== "subscribe") return;
    autoSubscribeRan.current = true;

    router.replace("/", { scroll: false });
    void requestSubscribe().then((result) => {
      if (result !== "unauthenticated") showPopup(result);
    });
  }, [router, showPopup]);

  const handleSubscribe = () => {
    if (!isLoggedIn) {
      router.push(LOGIN_TO_SUBSCRIBE_URL);
      return;
    }
    setSubscribing(true);
    void requestSubscribe()
      .then((result) => {
        if (result === "unauthenticated") router.push(LOGIN_TO_SUBSCRIBE_URL);
        else showPopup(result);
      })
      .finally(() => setSubscribing(false));
  };

  const description = latestNews
    ? extractPlainText(latestNews.description)
    : "";
  const title = latestNews?.title ?? "No News Available";

  return (
    <section className="text-brand-yellow mt-10 w-full">
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
              <div className="space-y-3">
                <div className="relative">
                  <h4 className="absolute left-[2px] blur-[1px]">
                    SUBSCRIBE?
                  </h4>
                  <h4>SUBSCRIBE?</h4>
                </div>
                <p className="opacity-70">
                  Join our email newsletter subscription for fast and easy updates !
                </p>
              </div>
              <div className="bg-background h-[1px] mt-5 mb-3" />
              <div className="flex flex-row justify-end space-x-2">
                <NotificationButton onClick={handleSubscribe} disabled={subscribing}>
                  (Y) Subscribe
                </NotificationButton>
              </div>

              {/* Subscribe result popup, centred over this box (click to close, auto-closes after 3s) */}
              {popup && (
                <div
                  className="absolute inset-0 z-40 flex items-center justify-center p-2 cursor-pointer"
                  onClick={() => setPopup(null)}
                >
                  <PopUp
                    title={SUBSCRIBE_POPUPS[popup].title}
                    text={SUBSCRIBE_POPUPS[popup].text}
                    className="w-full max-w-md"
                  />
                </div>
              )}
            </div>
          </GlitchReveal>

          {/* Main content */}
          <GlitchReveal className="relative" delay={0.3}>
            {/* Overlay */}
            <div className="absolute z-1 w-90 h-[1px] md:bg-background left-20" />
            <div className="absolute z-1 w-[1px] h-10 md:bg-background left-20" />

            <div className="relative mx-4 md:mx-20 pt-8 md:pt-30 pb-3 border border-brand-yellow">
              <h2 className="mb-4 px-4 md:px-10">{title}</h2>
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
                <ReadMoreButton articleId={latestNews?.id} />
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
