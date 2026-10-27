"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { buildLoginUrl } from "@/lib/safeRedirect";

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
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <Link href={buildLoginUrl("/news")} className={className}>
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
