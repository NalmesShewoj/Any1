"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * ParallaxBackground — "Signature Pulse" (bold)
 *
 * Mehrlagige, leuchtende EKG-Puls-Wellen als durchgehender roter Faden +
 * energetischer, fließender Gradient-Hintergrund mit rotierendem Lichtspiel.
 * Monochrom, kein WebGL. Maus/Scroll-Parallax.
 */

const EKG_SEG =
  "M0 100 H120 L138 100 L150 60 L162 150 L174 20 L186 170 L198 100 L216 100 H320";

function PulseLine({
  className,
  opacity,
  blur,
  dur,
  strokeW,
  glowStd,
  scaleY,
  yMotion,
}: {
  className?: string;
  opacity: number;
  blur: number;
  dur: number;
  strokeW: number;
  glowStd: number;
  scaleY: number;
  yMotion?: MotionValue<string>;
}) {
  const gid = `ekg-${dur}-${strokeW}`;
  return (
    <motion.div
      className={className}
      style={{ opacity, y: yMotion, filter: blur ? `blur(${blur}px)` : undefined }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1280 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`fade-${gid}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="16%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fff" stopOpacity="1" />
            <stop offset="84%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id={`glow-${gid}`} x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation={glowStd} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={{ x: [0, -320] }}
          transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          <g transform={`translate(0, ${100 - 100 * scaleY}) scale(1, ${scaleY})`}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={EKG_SEG}
                transform={`translate(${i * 320}, 0)`}
                fill="none"
                stroke={`url(#fade-${gid})`}
                strokeWidth={strokeW}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${gid})`}
              />
            ))}
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
}

export function ParallaxBackground() {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  const yA = useTransform(scrollY, [0, 4000], [0, -220]);
  const axA = useTransform(smx, [-0.5, 0.5], [-34, 34]);
  const ayA = useTransform(smy, [-0.5, 0.5], [-34, 34]);
  const axGlint = useTransform(smx, [-0.5, 0.5], [-80, 80]);
  const ayGlint = useTransform(smy, [-0.5, 0.5], [-80, 80]);

  // pulse drifts down through the page + leans with mouse
  const pulseDrift = useTransform(scrollYProgress, [0, 1], ["-8%", "30%"]);
  const pulseLean = useTransform(smy, [-0.5, 0.5], ["-6%", "6%"]);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 25%, rgba(255,255,255,0.07), transparent 60%), #000",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* rotating conic light sweep (more pepp) */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.05) 60deg, transparent 130deg, rgba(255,255,255,0.04) 220deg, transparent 300deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* flowing gradient blobs (brighter + faster) */}
      <motion.div className="absolute -inset-[15%]" style={{ y: yA, x: axA, translateY: ayA }}>
        <motion.div
          className="absolute left-[8%] top-[4%] size-[62vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.13), transparent 60%)", filter: "blur(50px)" }}
          animate={{ x: [0, 110, -30, 0], y: [0, 70, 25, 0], scale: [1, 1.18, 0.92, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[2%] top-[38%] size-[54vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.11), transparent 60%)", filter: "blur(60px)" }}
          animate={{ x: [0, -95, 40, 0], y: [0, 80, -25, 0], scale: [1, 0.9, 1.16, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[42%] top-[70%] size-[48vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.09), transparent 60%)", filter: "blur(55px)" }}
          animate={{ x: [0, 70, -55, 0], y: [0, -55, 40, 0], scale: [1, 1.14, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ---- SIGNATURE: layered EKG pulse ---- */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-[260px] -translate-y-1/2"
        style={{ y: pulseDrift, translateY: pulseLean }}
      >
        {/* glow halo (subtle) */}
        <div
          className="absolute inset-x-0 top-1/2 h-32 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 50% 50%, rgba(255,255,255,0.07), transparent 72%)",
            filter: "blur(24px)",
          }}
        />
        {/* echo wave (back, big, soft) */}
        <PulseLine
          className="absolute inset-0"
          opacity={0.14}
          blur={3}
          dur={5.2}
          strokeW={3}
          glowStd={5}
          scaleY={1.4}
        />
        {/* main wave (dimmed to an accent — keeps the thread, frees the text) */}
        <PulseLine
          className="absolute inset-0"
          opacity={0.4}
          blur={0}
          dur={3.4}
          strokeW={2}
          glowStd={3}
          scaleY={1}
        />
        {/* fast thin wave (front) */}
        <PulseLine
          className="absolute inset-0"
          opacity={0.22}
          blur={0}
          dur={2.4}
          strokeW={1.2}
          glowStd={2}
          scaleY={0.6}
        />
      </motion.div>

      {/* glints */}
      <motion.div className="absolute -inset-[25%]" style={{ x: axGlint, translateY: ayGlint }}>
        {[
          { t: "14%", l: "20%", s: 3 },
          { t: "26%", l: "74%", s: 2 },
          { t: "60%", l: "16%", s: 3 },
          { t: "70%", l: "60%", s: 2 },
          { t: "84%", l: "38%", s: 2.5 },
          { t: "20%", l: "50%", s: 2 },
        ].map((g, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: g.t, left: g.l, width: g.s, height: g.s, boxShadow: "0 0 10px 2px rgba(255,255,255,0.7)" }}
            animate={{ opacity: [0.2, 0.95, 0.2] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* global readability scrim — dampens the whole bg so white text stays crisp */}
      <div className="absolute inset-0 bg-black/35" />
      {/* vignette + grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 50% 40%, transparent 44%, rgba(0,0,0,0.48) 82%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
