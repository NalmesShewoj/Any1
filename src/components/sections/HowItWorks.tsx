"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Watch, HeartPulse, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

// 3D nur clientseitig laden (kein SSR), lazy
const Phone3D = dynamic(
  () => import("@/components/site/Phone3D").then((m) => m.Phone3D),
  { ssr: false }
);

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

export function HowItWorks() {
  return (
    <section
      id="app"
      className="relative overflow-hidden border-t border-border-subtle bg-bg-base py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Wie es funktioniert"
          title="In drei Schritten von Null zur Liga."
          sub="Kein manuelles Eintragen, kein Schummeln. any1 läuft mit den Daten, die deine Smartwatch ohnehin schon sammelt."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Steps */}
          <ol className="flex flex-col gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.n}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10">
                      <Icon className="size-5 text-accent" strokeWidth={2} />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-gradient-to-b from-accent/30 to-transparent" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-3">
                      <span className="tabular text-xs font-semibold text-accent">
                        {step.n}
                      </span>
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
                      {step.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* 3D Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative h-[420px] w-full sm:h-[520px]"
          >
            {/* glow */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,165,0,0.4), transparent 65%)",
              }}
            />
            <Phone3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
