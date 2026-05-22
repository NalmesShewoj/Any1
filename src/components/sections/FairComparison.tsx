"use client";

import { motion } from "framer-motion";
import { Dumbbell, Activity } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PulseWave } from "@/components/site/PulseWave";
import { Counter } from "@/components/site/Counter";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Athlete = {
  name: string;
  sport: string;
  icon: typeof Dumbbell;
  bpm: number;
  duration: string;
  points: number;
};

const LEFT: Athlete = {
  name: "Lena",
  sport: "Gym · Krafttraining",
  icon: Dumbbell,
  bpm: 148,
  duration: "52 Min",
  points: 1840,
};

const RIGHT: Athlete = {
  name: "Jonas",
  sport: "Fußball · Match",
  icon: Activity,
  bpm: 156,
  duration: "48 Min",
  points: 1870,
};

function AthleteCard({
  athlete,
  accent,
  delay,
}: {
  athlete: Athlete;
  accent: string;
  delay: number;
}) {
  const Icon = athlete.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex size-11 items-center justify-center rounded-xl border border-white/10"
            style={{ background: `${accent}1a` }}
          >
            <Icon className="size-5" style={{ color: accent }} strokeWidth={2} />
          </div>
          <div>
            <div className="text-base font-semibold text-white">
              {athlete.name}
            </div>
            <div className="text-xs text-white/50">{athlete.sport}</div>
          </div>
        </div>
        <div className="text-right">
          <div
            className="tabular text-2xl font-semibold leading-none"
            style={{ color: accent }}
          >
            {athlete.bpm}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-white/45">
            bpm
          </div>
        </div>
      </div>

      {/* Pulse */}
      <div className="my-6">
        <PulseWave color={accent} bpm={athlete.bpm} />
      </div>

      {/* Stats */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/45">
            Dauer
          </div>
          <div className="tabular mt-1 text-lg font-medium text-white">
            {athlete.duration}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-white/45">
            any1 Score
          </div>
          <Counter
            value={athlete.points}
            className="tabular mt-1 block text-3xl font-semibold text-white"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function FairComparison() {
  return (
    <section
      id="vergleich"
      className="relative border-t border-border-subtle bg-black/55 py-28 sm:py-36"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 mx-auto h-80 max-w-3xl opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Der faire Vergleich"
          title={
            <>
              Wer hat <span className="text-accent">wirklich</span> mehr
              geleistet?
            </>
          }
          sub="Krafttraining oder Fußball — die Sportart ist egal. any1 misst echte Anstrengung über deinen Puls und macht jede Disziplin vergleichbar."
        />

        {/* Comparison */}
        <div className="mt-16 flex flex-col items-stretch gap-5 md:flex-row md:items-center">
          <AthleteCard athlete={LEFT} accent="#FFFFFF" delay={0} />

          {/* VS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mx-auto flex size-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black text-sm font-bold uppercase tracking-wider text-white/70"
          >
            vs
          </motion.div>

          <AthleteCard athlete={RIGHT} accent="#A1A1AA" delay={0.15} />
        </div>

        {/* Punchline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mx-auto mt-14 max-w-2xl text-center"
        >
          <p className="text-balance text-xl font-medium text-white sm:text-2xl">
            Fast identischer Score — komplett andere Sportart.
          </p>
          <p className="mt-3 text-base text-white/55">
            Das ist <span className="font-semibold text-accent">any1</span>:
            Leistung wird an deinem Körper gemessen, nicht an deiner Disziplin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
