"use client";

import { motion } from "framer-motion";
import { Watch, Footprints, Mountain, ShieldCheck, EyeOff, Lock } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PulseWave } from "@/components/site/PulseWave";

const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS = [
  { icon: Watch, label: "Herzfrequenz", value: "BPM in Echtzeit" },
  { icon: Footprints, label: "Schritte", value: "Tagesaktivität" },
  { icon: Mountain, label: "Höhenmeter", value: "Anstieg & Distanz" },
];

const PRIVACY = [
  {
    icon: EyeOff,
    title: "Keine Werbung",
    text: "Null Tracking-Pixel, null Ads. Deine Daten werden niemals verkauft.",
  },
  {
    icon: Lock,
    title: "Nur fürs Spiel",
    text: "Gesundheitsdaten werden ausschließlich für dein Scoring genutzt — sonst nichts.",
  },
  {
    icon: ShieldCheck,
    title: "Du behältst die Kontrolle",
    text: "Verbindung jederzeit trennbar. Dein Körper, deine Daten, deine Entscheidung.",
  },
];

export function Integration() {
  return (
    <section className="relative overflow-hidden border-t border-border-subtle bg-black/55 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Integration block */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Smartwatch-Integration"
              title="Läuft mit dem, was du schon trägst."
              sub="any1 verbindet sich nahtlos mit Apple Health und Google Fit. Keine neue Hardware, kein manuelles Eintragen — deine Uhr macht den Rest."
            />

            <div className="mt-8 flex flex-wrap gap-3">
              {["Apple Health", "Google Fit"].map((p) => (
                <div
                  key={p}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md"
                >
                  <Watch className="size-4 text-accent" />
                  <span className="text-sm font-medium text-white">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric card with live pulse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
                Live-Tracking
              </span>
              <span className="flex items-center gap-2 text-sm">
                <span className="tabular text-2xl font-semibold text-accent">
                  152
                </span>
                <span className="text-white/50">bpm</span>
              </span>
            </div>
            <PulseWave color="var(--accent)" bpm={152} className="my-5" />
            <div className="grid grid-cols-3 gap-3">
              {METRICS.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/8 bg-black/30 p-3"
                  >
                    <Icon className="size-4 text-accent" strokeWidth={2} />
                    <div className="mt-2 text-xs font-medium text-white">
                      {m.label}
                    </div>
                    <div className="text-[10px] text-white/40">{m.value}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Privacy block */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Privacy-first"
            title="Deine Daten gehören dir. Punkt."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRIVACY.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10">
                    <Icon className="size-5 text-accent" strokeWidth={2} />
                  </div>
                  <h4 className="mt-4 text-base font-semibold text-white">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {p.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
