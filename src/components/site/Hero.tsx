"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Countdown } from "./Countdown";
import { StoreBadge } from "./StoreBadge";
import { WaitlistForm } from "./WaitlistForm";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force-play the background video (autoplay is often blocked)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.play().catch(() => {});
  }, [reduced]);

  // Rotating last line — plays on the "Any…" brand bracket (any1 = anyone)
  const rotating = useMemo(
    () => ["Anywhere.", "Any sport.", "Any level.", "Anyone."],
    []
  );
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(
      () => setIdx((i) => (i + 1) % rotating.length),
      2200
    );
    return () => clearTimeout(id);
  }, [idx, rotating, reduced]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* =====================================================================
          BACKGROUND — monochrome video loop (falls offline: globaler Shader
          scheint durch). Darüber Scrims für Text-Lesbarkeit.
          ===================================================================== */}
      <div className="absolute inset-0 -z-[1] overflow-hidden">
        {!reduced && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.1) brightness(0.8)" }}
            src="https://videos.pexels.com/video-files/18526841/uhd_30fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          />
        )}

        {/* base darken over video */}
        <div className="absolute inset-0 bg-black/45" aria-hidden />

        {/* Dim hinter Headline/Sub für Kontrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 62% at 50% 42%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 42%, transparent 80%)",
          }}
          aria-hidden
        />

        {/* Top fade (Header readability) */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
          aria-hidden
        />

        {/* Bottom fade → transition to sections */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #000 100%)",
          }}
          aria-hidden
        />

        {/* Premium-Grain */}
        <div className="absolute inset-0 grain" aria-hidden />
      </div>

      {/* =====================================================================
          CONTENT (centered, single column)
          ===================================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-28">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-spark opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-spark" />
          </span>
          <span className="text-xs font-medium tracking-wide text-white/80">
            Launching 1. August 2026
          </span>
          <span className="text-white/25">·</span>
          <span className="text-xs font-medium tracking-wide text-accent">
            Founder-Pass für die ersten 1.000
          </span>
        </motion.div>

        {/* Headline — fixed bracket + rotating "Any…" word */}
        <h1
          className="mt-2 font-display text-white"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
            textShadow: "0 2px 40px rgba(0,0,0,0.85), 0 1px 12px rgba(0,0,0,0.7)",
          }}
        >
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT_EXPO }}
            className="block"
          >
            Anyone. Anytime.
          </motion.span>

          {/* rotating line */}
          <span className="relative mt-1 flex h-[1.15em] w-full items-center justify-center overflow-hidden">
            {rotating.map((word, i) => (
              <motion.span
                key={word}
                className="absolute inline-block"
                initial={{ opacity: 0, y: "120%" }}
                animate={
                  idx === i
                    ? { opacity: 1, y: "0%" }
                    : { opacity: 0, y: idx > i ? "-120%" : "120%" }
                }
                transition={{ type: "spring", stiffness: 70, damping: 16 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Gym oder Fußball — wer hat wirklich mehr geleistet? any1 misst echte
          Anstrengung über deinen Puls und macht jede Sportart vergleichbar.
          Tritt an, steig im Leaderboard auf, hol dir Medaillen.
        </motion.p>

        {/* USP-Pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            "Puls-basiertes Scoring",
            "Sportart-übergreifend fair",
            "Lokale + deutschlandweite Ranglisten",
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        {/* Countdown + FOMO Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mt-8 w-full"
        >
          <div className="flex justify-center">
            <Countdown spotsLeft={247} spotsTotal={1000} />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <StoreBadge variant="ios" status="soon" />
          <StoreBadge variant="android" status="soon" />
        </motion.div>

        {/* Waitlist Inline */}
        <motion.div
          id="waitlist"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-5 w-full max-w-xl"
        >
          <WaitlistForm />
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-white/45">
            <span className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-accent" />
              Lifetime Pro für Founder
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-white/35" />
              Kein Spam
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-white/35" />
              Jederzeit abmeldbar
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll-Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/40"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">scroll</span>
        <ChevronDown className="size-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
