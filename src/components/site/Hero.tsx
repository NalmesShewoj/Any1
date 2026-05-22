"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { Countdown } from "./Countdown";
import { StoreBadge } from "./StoreBadge";
import { WaitlistForm } from "./WaitlistForm";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const HEADLINE_WORDS = ["Anyone.", "Anytime.", "Anywhere."];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* =====================================================================
          BACKGROUND
          ===================================================================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        {reduced ? (
          <div className="absolute inset-0 hero-mesh-fallback" aria-hidden />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              // Monochrom: komplett entsättigt → reines Schwarz/Weiß-Linienspiel
              filter: "saturate(0) contrast(1.15) brightness(0.95)",
            }}
            aria-hidden
          >
            <ShaderAnimation />
          </div>
        )}

        {/* Center-fade vignette — sanfter, lässt Shader im Center atmen */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 90% at 50% 45%, transparent 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.78) 88%, rgba(0,0,0,0.95) 100%)",
          }}
          aria-hidden
        />

        {/* Sanfter zentraler Dim-Layer für Text-Kontrast (nur dort wo Headline+Sub sitzen) */}
        <div
          className="absolute inset-x-0 top-1/4 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        {/* Soft neutral light bloom from center (statt Orange) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,255,255,0.12), transparent 70%)",
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

        {/* Bottom fade (transition to next section) */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--bg-base) 100%)",
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
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium tracking-wide text-white/80">
            Launching 1. August 2026
          </span>
          <span className="text-white/25">·</span>
          <span className="text-xs font-medium tracking-wide text-accent">
            Founder-Pass für die ersten 1.000
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="mt-2 font-display text-white"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 0.96,
            letterSpacing: "-0.045em",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={word}
              className="mr-[0.18em] inline-block overflow-hidden align-baseline"
            >
              <motion.span
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.7 + i * 0.09,
                  duration: 0.9,
                  ease: EASE_OUT_EXPO,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
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
