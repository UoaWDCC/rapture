"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const glitchKeyframes = {
  opacity: [0, 1, 0.2, 1, 0.1, 0.9, 1],
  filter: [
    "grayscale(1) contrast(2) brightness(1.8)",
    "grayscale(1) contrast(1.3) brightness(0.6)",
    "grayscale(1) contrast(2.2) brightness(1.5)",
    "grayscale(0.7) contrast(1.4) brightness(0.8)",
    "grayscale(0.4) contrast(1.2) brightness(1.2)",
    "none",
    "none",
  ],
};

const times = [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1];

export default function GlitchReveal({
  children,
  className,
  duration = 0.6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={glitchKeyframes}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, times, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
