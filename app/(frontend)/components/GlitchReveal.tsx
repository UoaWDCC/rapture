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
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  /**
   * Fraction of the element that must be visible before the reveal fires.
   * Lower it for tall elements (e.g. news cards inside the scroll window)
   * so they do not have to be almost fully on screen first.
   */
  amount?: number;
}) {
  return (
    <div className={className ? `glitch-reveal ${className}` : "glitch-reveal"}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={glitchKeyframes}
        viewport={{ once: true, amount }}
        transition={{ duration, delay, times, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
