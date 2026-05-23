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
 * ParallaxBackground — "Signature Pulse"
 *
 * Durchgehendes Signature-Element: eine große, leuchtende EKG-Puls-Welle,
 * die kontinuierlich quer durch den Viewport läuft (auf jeder Section sichtbar
 * = roter Faden) — thematisch der Puls, der Kern von any1.
 * Plus ein energetischer, fließender Gradient-Hintergrund (Bewegung + Glow)
 * und Maus/Scroll-Parallax. Monochrom, kein WebGL.
 */

// One PQRST-style EKG segment (tiles seamlessly across width)
const EKG_SEG =
  "M0 100 H120 L138 100 L150 60 L162 150 L174 20 L186 170 L198 100 L216 100 H320";

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

  // parallax
  const yA = useTransform(scrollY, [0, 4000], [0, -200]);
  const axA = useTransform(smx, [-0.5, 0.5], [-28, 28]);
  const ayA = useTransform(smy, [-0.5, 0.5], [-28, 28]);
  const axGlint = useTransform(smx, [-0.5, 0.5], [-70, 70]);
  const ayGlint = useTransform(smy, [-0.5, 0.5], [-70, 70]);

  // the pulse line drifts slightly with scroll (keeps it alive through the page)
  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const pulseOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.9, 1],
    [0.85, 0.7, 0.7, 0.9]
  );

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 25%, rgba(255,255,255,0.06), transparent 60%), #000",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* ---- Flowing gradient blobs (pepp + movement) ---- */}
      <motion.div className="absolute -inset-[15%]" style={{ y: yA, x: axA, translateY: ayA }}>
        <motion.div
          className="absolute left-[10%] top-[6%] size-[60vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.16), transparent 62%)",
            filter: "blur(50px)",
          }}
          animate={{ x: [0, 80, -20, 0], y: [0, 50, 20, 0], scale: [1, 1.12, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[4%] top-[40%] size-[52vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.13), transparent 62%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, -70, 30, 0], y: [0, 60, -20, 0], scale: [1, 0.92, 1.1, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[44%] top-[72%] size-[46vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.10), transparent 62%)",
            filter: "blur(55px)",
          }}
          animate={{ x: [0, 50, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.94, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ---- SIGNATURE: continuous EKG pulse line ---- */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-[200px]"
        style={{ y: pulseY, opacity: pulseOpacity }}
      >
        {/* glow halo behind the line */}
        <div
          className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(255,255,255,0.12), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1280 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ekg-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="18%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#fff" stopOpacity="1" />
              <stop offset="82%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter id="ekg-glow" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.g
            animate={{ x: [0, -320] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={EKG_SEG}
                transform={`translate(${i * 320}, 0)`}
                fill="none"
                stroke="url(#ekg-fade)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ekg-glow)"
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      {/* ---- Glints (front, fast parallax) ---- */}
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
            style={{
              top: g.t,
              left: g.l,
              width: g.s,
              height: g.s,
              boxShadow: "0 0 10px 2px rgba(255,255,255,0.7)",
            }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* ---- Vignette + grain ---- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 50% 40%, transparent 42%, rgba(0,0,0,0.5) 82%, rgba(0,0,0,0.82) 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
