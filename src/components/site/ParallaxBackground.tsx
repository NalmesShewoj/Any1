"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";

/**
 * ParallaxBackground
 *
 * Mehrschichtiger Tiefen-Parallax (kein WebGL):
 *  - Layer A: große, weiche Licht-Orbs (hinten, langsamster Parallax)
 *  - Layer B: feines Punkt-Raster (Mitte)
 *  - Layer C: feine Glints/Partikel (vorne, schnellster Parallax)
 * Jede Schicht reagiert auf Scroll (y) und Maus (x/y) unterschiedlich stark.
 * Monochrom, ruhig, edel. prefers-reduced-motion → statisch.
 */

const GLINTS = [
  { top: "12%", left: "18%", s: 3 },
  { top: "24%", left: "72%", s: 2 },
  { top: "38%", left: "44%", s: 2.5 },
  { top: "55%", left: "84%", s: 2 },
  { top: "63%", left: "12%", s: 3 },
  { top: "72%", left: "58%", s: 2 },
  { top: "82%", left: "32%", s: 2.5 },
  { top: "16%", left: "52%", s: 2 },
  { top: "46%", left: "28%", s: 2 },
  { top: "88%", left: "76%", s: 3 },
];

export function ParallaxBackground() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

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

  // Scroll parallax (different speeds per layer)
  const yA = useTransform(scrollY, [0, 4000], [0, -240]);
  const yB = useTransform(scrollY, [0, 4000], [0, -620]);
  const yC = useTransform(scrollY, [0, 4000], [0, -1100]);

  // Mouse parallax offsets
  const axA = useTransform(smx, [-0.5, 0.5], [-26, 26]);
  const ayA = useTransform(smy, [-0.5, 0.5], [-26, 26]);
  const axB = useTransform(smx, [-0.5, 0.5], [-55, 55]);
  const ayB = useTransform(smy, [-0.5, 0.5], [-55, 55]);
  const axC = useTransform(smx, [-0.5, 0.5], [-95, 95]);
  const ayC = useTransform(smy, [-0.5, 0.5], [-95, 95]);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(255,255,255,0.04), transparent 60%), #000",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* ---- Layer A: soft light orbs (back, slow) ---- */}
      <motion.div
        className="absolute -inset-[15%]"
        style={{ y: yA, x: axA, translateY: ayA }}
      >
        <motion.div
          className="absolute left-[12%] top-[10%] size-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.10), transparent 65%)",
            filter: "blur(40px)",
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[8%] top-[35%] size-[48vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[40%] top-[65%] size-[42vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06), transparent 65%)",
            filter: "blur(45px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -35, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ---- Layer B: fine dot grid (mid) ---- */}
      <motion.div
        className="absolute -inset-[20%]"
        style={{
          y: yB,
          x: axB,
          translateY: ayB,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1.4px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, #000 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, #000 25%, transparent 75%)",
          opacity: 0.5,
        }}
      />

      {/* ---- Layer C: sharp glints (front, fast) ---- */}
      <motion.div
        className="absolute -inset-[25%]"
        style={{ y: yC, x: axC, translateY: ayC }}
      >
        {GLINTS.map((g, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: g.top,
              left: g.left,
              width: g.s,
              height: g.s,
              boxShadow: "0 0 8px 1px rgba(255,255,255,0.6)",
            }}
            animate={{ opacity: [0.25, 0.9, 0.25] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* ---- Vignette ---- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 50% 40%, transparent 45%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* ---- Grain ---- */}
      <div className="absolute inset-0 grain" />
    </div>
  );
}
