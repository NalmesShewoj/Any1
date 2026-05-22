"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * PulseWave — animierte EKG-/Herzfrequenz-Linie.
 * Läuft horizontal durch, color steuerbar. bpm beeinflusst die Geschwindigkeit.
 */
export function PulseWave({
  color = "var(--accent)",
  bpm = 140,
  className,
}: {
  color?: string;
  bpm?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  // schnellerer Puls → schnellere Animation
  const dur = Math.max(1.1, 180 / bpm) * 1.4;

  // Ein EKG-Segment (PQRST-artig), wird horizontal getilet
  const seg =
    "M0 40 H30 L36 40 L42 22 L48 58 L54 12 L60 64 L66 40 L72 40 H110";

  return (
    <div className={cn("relative h-20 w-full overflow-hidden", className)}>
      <svg
        viewBox="0 0 220 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`pw-fade-${bpm}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="15%" stopColor={color} stopOpacity="1" />
            <stop offset="85%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.g
          initial={false}
          animate={reduced ? undefined : { x: [0, -110] }}
          transition={
            reduced
              ? undefined
              : { duration: dur, ease: "linear", repeat: Infinity }
          }
        >
          <path
            d={seg}
            fill="none"
            stroke={`url(#pw-fade-${bpm})`}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={seg}
            transform="translate(110,0)"
            fill="none"
            stroke={`url(#pw-fade-${bpm})`}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}
