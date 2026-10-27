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

// Tab outline in a 130 x 44 box: softly rounded top corners, then a stepped tail on the right that runs
// past the box (to x=148) so it extends under the next tab. vectorEffect keeps the line an even thickness when the box is stretched.
const TAB_OUTLINE = "M0,44 L0,6 Q0,2 4,2 L96,2 Q98,2 99,4 L105,26 L141,26 L148,44";
const TAB_FILL = `${TAB_OUTLINE} Z`;

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
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <path d={TAB_FILL} fill={fillColor} />
        <path
          d={TAB_OUTLINE}
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
      </svg>
      <GlowingHeader
        intensity="low"
        className="absolute left-2.5 top-1.5 text-[15px] font-semibold uppercase italic leading-none sm:left-3.5 sm:top-2 sm:text-[22px]"
        style={{ color }}
      >
        {label}
      </GlowingHeader>
    </button>
  );
}
