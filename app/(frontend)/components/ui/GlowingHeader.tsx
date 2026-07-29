import { motion } from "motion/react";
import { ReactNode, CSSProperties } from "react";

type GlowingHeaderProps = {
  children: ReactNode[] | ReactNode;
  intensity?: "low" | "high";
  className?: string;
  style?: CSSProperties;
};

const glowMap: Record<"high" | "low", string[]> = {
  high: [
    "drop-shadow(0 0 4px currentColor)",
    "drop-shadow(0 0 16px currentColor)",
    "drop-shadow(0 0 4px currentColor)",
  ],
  low: [
    "drop-shadow(0 0 2px currentColor)",
    "drop-shadow(0 0 6px currentColor)",
    "drop-shadow(0 0 2px currentColor)",
  ],
};

const defaultHeaderClass =
  "relative z-10 w-full text-right text-3xl uppercase  opacity-90 font-nova-cut italic text-emerald-500";

export default function GlowingHeader({
  children,
  intensity = "high",
  className,
  style,
}: GlowingHeaderProps) {
  const headerClassName = className?.trim() ? className : defaultHeaderClass;

  return (
    <motion.span
      className={headerClassName}
      style={style}
      animate={{ filter: glowMap[intensity] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}
