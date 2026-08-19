"use client";

import { useEffect, useState } from "react";

export const BinaryFlicker = ({
  length,
  flipChance = 0.3,
  intervalMs = 200,
}: {
  length: number;
  flipChance?: number;
  intervalMs?: number;
}) => {
  const [digits, setDigits] = useState<number[]>(() =>
    Array.from({ length }, () => Math.round(Math.random())),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDigits((prev) =>
        prev.map((digit) => (Math.random() < flipChance ? 1 - digit : digit)),
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [flipChance, intervalMs]);

  return (
    <div className="flex flex-col items-center text-white/40 text-[8px] font-mono leading-tight">
      {digits.map((digit, i) => (
        <span key={i} className="w-3 text-center">
          {digit}
        </span>
      ))}
    </div>
  );
};
