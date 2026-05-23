"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Watch, HeartPulse, Trophy } from "lucide-react";
import { PhoneMockup } from "@/components/site/PhoneMockup";

const STEPS = [
  {
    icon: Watch,
    n: "01",
    title: "Verbinden",
    text: "Koppel Apple Health oder Google Fit. Deine Smartwatch liefert Herzfrequenz, Schritte und Höhenmeter — automatisch, im Hintergrund.",
  },
  {
    icon: HeartPulse,
    n: "02",
    title: "Tracken",
    text: "Jeder Workout zählt. any1 wandelt deine echte Anstrengung in Punkte um — Intensität, Dauer und Konsistenz fließen in deinen Score.",
  },
  {
    icon: Trophy,
    n: "03",
    title: "Antreten",
    text: "Steig in lokalen und deutschlandweiten Ranglisten auf, sichere dir Medaillen und tritt in täglichen Challenges gegen andere an.",
  },
];

function StoryStep({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const total = STEPS.length;
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  // active window → full opacity + slight lift; otherwise dimmed
  const opacity = useTransform(
    progress,
    [start - 0.08, start + 0.04, end - 0.04, end + 0.08],
    [0.25, 1, 1, 0.25]
  );
  const x = useTransform(progress, [start, mid, end], [12, 0, 12]);
  const Icon = step.icon;

  return (
    <motion.div style={{ opacity, x }} className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05]">
          <Icon className="size-5 text-white" strokeWidth={2} />
        </div>
      </div>
      <div className="pb-2">
        <div className="flex items-center gap-3">
          <span className="tabular text-xs font-semibold text-white/50">
            {step.n}
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {step.title}
          </h3>
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
          {step.text}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // progress-driven fill of the vertical line
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      id="app"
      className="relative h-[300vh] border-t border-border-subtle"
    >
      {/* Pinned stage */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          {/* LEFT — scroll story */}
          <div>
            <div className="mb-10">
              <span className="mb-4 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                <span className="h-px w-8 bg-white/40" />
                Wie es funktioniert
              </span>
              <h2
                className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                style={{ letterSpacing: "-0.035em", lineHeight: 1.04 }}
              >
                In drei Schritten
                <br />
                von Null zur Liga.
              </h2>
            </div>

            {/* Steps with progress line */}
            <div className="relative pl-0">
              {/* track + fill */}
              <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-white/10">
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top bg-white/70"
                  style={{ scaleY: lineScale, height: "100%" }}
                />
              </div>

              <div className="flex flex-col gap-10">
                {STEPS.map((step, i) => (
                  <StoryStep
                    key={step.n}
                    step={step}
                    index={i}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — phone stays pinned alongside */}
          <div className="hidden items-center justify-center lg:flex">
            <PhoneMockup />
          </div>
        </div>

        {/* scroll progress hint */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/30">
          scroll
        </div>
      </div>
    </section>
  );
}
