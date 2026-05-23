"use client";

import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { StoreBadge } from "@/components/site/StoreBadge";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border-subtle bg-black/35 py-28 sm:py-36">
      {/* Accent glow band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.0 }}
        >
          Sei einer der{" "}
          <span className="text-accent">ersten 1.000</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mx-auto mt-5 max-w-xl text-base text-white/65 sm:text-lg"
        >
          Sichere dir den Founder-Pass mit lebenslangem Pro-Zugang. Launch am
          1. August 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mx-auto mt-10 max-w-xl"
        >
          <WaitlistForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <StoreBadge variant="ios" status="soon" />
          <StoreBadge variant="android" status="soon" />
        </motion.div>
      </div>
    </section>
  );
}
