"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Launch: 1. August 2026, 00:00 Mitteleuropa (UTC+2 im Sommer)
const LAUNCH_DATE = new Date("2026-08-01T00:00:00+02:00");

type TimeState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isDone: boolean;
};

function calc(): TimeState {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isDone: diff === 0,
  };
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Countdown({
  spotsLeft = 247,
  spotsTotal = 1000,
}: {
  spotsLeft?: number;
  spotsTotal?: number;
}) {
  // Hydration-safe: server rendert "--", client setzt echte Werte
  const [t, setT] = useState<TimeState | null>(null);

  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const isDone = t?.isDone ?? false;
  const percentLeft = Math.round((spotsLeft / spotsTotal) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
      className="relative w-full max-w-xl rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-2xl"
      style={{
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.08) inset, 0 16px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
        }}
      />

      {isDone ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs uppercase tracking-[0.22em] text-success">
              Live
            </span>
          </div>
          <div className="text-3xl font-semibold tracking-tight text-white">
            any1 ist da.
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Launch in
              </span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
              01.08.2026
            </span>
          </div>

          {/* Counter */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <Cell value={t?.days} label="Tage" />
            <Cell value={t?.hours} label="Std" />
            <Cell value={t?.minutes} label="Min" label2="Sek" alt />
            <Cell value={t?.seconds} label="Sek" />
          </div>
        </>
      )}

      {/* FOMO: Founder-Pass */}
      <div className="mt-6 border-t border-white/8 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="size-2 rounded-full bg-accent"
              style={{ boxShadow: "0 0 12px rgba(255,255,255,0.5)" }}
            />
            <span className="text-sm font-medium text-white">
              Founder-Pass
            </span>
          </div>
          <span className="text-xs font-medium text-white/55">
            Lifetime Pro · gratis
          </span>
        </div>

        {/* Progress: filled = vergeben, accent = noch frei */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-white/30 to-white/15"
            style={{ width: `${100 - percentLeft}%` }}
          />
        </div>

        <p className="mt-2.5 text-xs text-white/55">
          Noch{" "}
          <span className="tabular font-semibold text-accent">
            {spotsLeft.toLocaleString("de-DE")}
          </span>{" "}
          von{" "}
          <span className="tabular text-white/75">
            {spotsTotal.toLocaleString("de-DE")}
          </span>{" "}
          Plätzen — sichere dir lebenslangen Pro-Zugang.
        </p>
      </div>
    </motion.div>
  );
}

function Cell({
  value,
  label,
}: {
  value: number | undefined;
  label: string;
  label2?: string;
  alt?: boolean;
}) {
  const display =
    value === undefined ? "--" : String(value).padStart(2, "0");

  return (
    <div className="group relative flex flex-col items-center rounded-xl border border-white/10 bg-black/30 px-2 py-4 transition-colors hover:border-white/20">
      <span className="tabular text-3xl font-semibold leading-none tracking-tight text-white sm:text-4xl">
        {display}
      </span>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
    </div>
  );
}
