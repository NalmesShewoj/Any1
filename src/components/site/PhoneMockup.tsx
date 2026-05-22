"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Flame, Trophy, ChevronRight } from "lucide-react";
import { PulseWave } from "./PulseWave";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Activity ring (Apple-Fitness-style), animated on view */
function ActivityRing({ progress = 0.78 }: { progress?: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 140 140" className="size-36">
      <circle
        cx="70"
        cy="70"
        r={R}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="11"
      />
      <motion.circle
        cx="70"
        cy="70"
        r={R}
        fill="none"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        whileInView={{ strokeDashoffset: C * (1 - progress) }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      />
    </svg>
  );
}

export function PhoneMockup() {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center [perspective:2000px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 45%, rgba(255,255,255,0.14), transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateY: -24 }}
        whileInView={{ opacity: 1, y: 0, rotateY: -15 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -14, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 6, ease: "easeInOut", repeat: Infinity }
          }
          style={{ rotateX: 3 }}
        >
          {/* PHONE BODY */}
          <div
            className="relative h-[560px] w-[272px] rounded-[3rem] p-[3px]"
            style={{
              background:
                "linear-gradient(150deg, #3a3a3d 0%, #0c0c0d 30%, #050505 60%, #2a2a2d 100%)",
              boxShadow:
                "0 40px 120px rgba(0,0,0,0.7), 0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* side buttons */}
            <div className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-white/15" />
            <div className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-white/15" />
            <div className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-white/15" />

            {/* SCREEN */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.75rem] bg-black">
              {/* dynamic island */}
              <div className="absolute left-1/2 top-3 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

              {/* APP UI */}
              <div className="flex h-full flex-col px-5 pb-5 pt-3">
                {/* status bar */}
                <div className="flex items-center justify-between text-[10px] font-medium text-white/80">
                  <span className="tabular pl-2">9:41</span>
                  <span className="flex items-center gap-1 pr-1">
                    <span className="inline-block h-2.5 w-3.5 rounded-[2px] border border-white/50" />
                  </span>
                </div>

                {/* header */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Heute
                    </div>
                    <div className="text-lg font-semibold text-white">
                      Hey, Marcus
                    </div>
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    M
                  </div>
                </div>

                {/* Activity ring + score */}
                <div className="relative mt-4 flex items-center justify-center">
                  <ActivityRing progress={0.78} />
                  <div className="absolute flex flex-col items-center">
                    <span className="tabular text-3xl font-semibold leading-none text-white">
                      1.840
                    </span>
                    <span className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/45">
                      Punkte
                    </span>
                  </div>
                </div>

                {/* live pulse */}
                <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-white/70">
                      <Heart className="size-3.5 fill-white text-white" />
                      Live
                    </span>
                    <span className="tabular text-sm font-semibold text-white">
                      152 <span className="text-white/45">bpm</span>
                    </span>
                  </div>
                  <PulseWave color="#ffffff" bpm={152} className="mt-1 h-8" />
                </div>

                {/* stats row */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
                    <Flame className="size-4 text-white/70" />
                    <div className="tabular mt-1.5 text-base font-semibold text-white">
                      12
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-white/40">
                      Tage Streak
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
                    <Trophy className="size-4 text-white/70" />
                    <div className="tabular mt-1.5 text-base font-semibold text-white">
                      #2
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-white/40">
                      in Heidelberg
                    </div>
                  </div>
                </div>

                {/* challenge card */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-black/50">
                      Daily Challenge
                    </div>
                    <div className="text-sm font-semibold text-black">
                      30 Min · 800 pts
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-black/60" />
                </div>
              </div>

              {/* screen reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2.75rem]"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,0.10) 0%, transparent 22%, transparent 80%, rgba(255,255,255,0.04) 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
