"use client";

import { colorToRgba } from "@/lib/colour";
import GlowingHeader from "./ui/GlowingHeader";

type UserDashboardTabProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
  className?: string;
};

export default function UserDashboardTab({
  label,
  active,
  onClick,
  color,
  className = "",
}: UserDashboardTabProps) {
  const fillColor = active ? colorToRgba(color, 0.25) : "#000000";
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative ${active ? "z-30" : "z-10"} ${className}`}
      style={{ background: "transparent", border: "none" }}
    >
      <svg
        viewBox="0 0 130 44"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <polygon points="0,2 90,2 100,21 120,21 128,44 0,44" fill={fillColor} />
        <path
          d="M0,44 L0,2 L90,2 L100,21 L120,21 L128,44"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <GlowingHeader
        intensity="low"
        className="absolute top-0 left-2 text-sm font-semibold font-nova-cut italic"
        style={{ color }}
      >
        {label}
      </GlowingHeader>
    </button>
  );
}
