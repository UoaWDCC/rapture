"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildLoginUrl } from "@/lib/safeRedirect";

// After logging in, the visitor comes back to /news?intent=subscribe and is subscribed automatically
const LOGIN_TO_SUBSCRIBE_URL = buildLoginUrl("/news", "subscribe");

interface SubscribeButtonProps {
  isLoggedIn: boolean;
  isSubscribed: boolean;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
}

export default function SubscribeButton({
  isLoggedIn,
  isSubscribed,
  className,
  labelClassName,
  children,
}: SubscribeButtonProps) {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [loading, setLoading] = useState(false);
  // Stops React Strict Mode (dev) from auto-subscribing twice
  const autoSubscribeRan = useRef(false);

  // Back from login with ?intent=subscribe: clear the param and finish the subscription
  useEffect(() => {
    if (autoSubscribeRan.current || !isLoggedIn) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("intent") !== "subscribe") return;
    autoSubscribeRan.current = true;

    url.searchParams.delete("intent");
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
    if (isSubscribed) return;

    fetch("/api/newsletter/subscribe", { method: "POST" })
      .then((res) => {
        // 409 means they were already subscribed; either way they are now
        if (res.ok || res.status === 409) setSubscribed(true);
      })
      .catch(() => {});
  }, [isLoggedIn, isSubscribed, router]);

  if (!isLoggedIn) {
    return (
      <Link href={LOGIN_TO_SUBSCRIBE_URL} className={className}>
        <span className={labelClassName}>SUBSCRIBE TO NEWS</span>
        {children}
      </Link>
    );
  }

  async function toggleSubscription() {
    setLoading(true);
    const endpoint = subscribed ? "unsubscribe" : "subscribe";
    try {
      const res = await fetch(`/api/newsletter/${endpoint}`, { method: "POST" });
      if (res.ok) setSubscribed(!subscribed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleSubscription}
      disabled={loading}
      className={className}
    >
      <span className={labelClassName}>
        {subscribed ? "UNSUBSCRIBE FROM NEWS" : "SUBSCRIBE TO NEWS"}
      </span>
      {children}
    </button>
  );
}
