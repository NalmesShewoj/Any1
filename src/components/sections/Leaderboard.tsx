"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Medal, TrendingUp, Award } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Row = { rank: number; name: string; sport: string; points: number };

const BOARDS: Record<string, Row[]> = {
  Heidelberg: [
    { rank: 1, name: "Lena K.", sport: "Crossfit", points: 12840 },
    { rank: 2, name: "Jonas R.", sport: "Fußball", points: 12610 },
    { rank: 3, name: "Mira S.", sport: "Laufen", points: 11990 },
    { rank: 4, name: "David B.", sport: "Radfahren", points: 11420 },
    { rank: 5, name: "Aylin T.", sport: "Schwimmen", points: 10980 },
  ],
  Deutschland: [
    { rank: 1, name: "Noah W.", sport: "Triathlon", points: 28910 },
    { rank: 2, name: "Lena K.", sport: "Crossfit", points: 27640 },
    { rank: 3, name: "Finn H.", sport: "Rudern", points: 26880 },
    { rank: 4, name: "Sophie M.", sport: "Klettern", points: 25510 },
    { rank: 5, name: "Jonas R.", sport: "Fußball", points: 24990 },
  ],
};

const MEDAL_COLOR = ["#FFD24D", "#C7CDD4", "#E0935A"];

export function Leaderboard() {
  const [tab, setTab] = useState<"Heidelberg" | "Deutschland">("Heidelberg");

  return (
    <section
      id="challenges"
      className="relative border-t border-border-subtle bg-bg-base py-28 sm:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Ranglisten & Rewards"
          title={
            <>
              Miss dich mit deiner Stadt.{" "}
              <span className="text-accent">Und dem ganzen Land.</span>
            </>
          }
          sub="Egal welche Sportart — alle treten in derselben Liga an. Klettere nach oben, hol dir Medaillen und bleib in den Top 10 für exklusive Rewards."
        />

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            {(["Heidelberg", "Deutschland"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  tab === t ? "text-black" : "text-white/60 hover:text-white"
                )}
              >
                {tab === t && (
                  <motion.span
                    layoutId="lb-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {t === "Heidelberg" ? "Heidelberg" : "Deutschlandweit"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Board */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {BOARDS[tab].map((row, i) => {
                const isTop3 = row.rank <= 3;
                return (
                  <motion.li
                    key={`${tab}-${row.rank}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 sm:px-7",
                      i !== BOARDS[tab].length - 1 &&
                        "border-b border-white/[0.06]"
                    )}
                  >
                    {/* Rank / Medal */}
                    <div className="flex w-9 justify-center">
                      {isTop3 ? (
                        <Medal
                          className="size-6"
                          style={{ color: MEDAL_COLOR[row.rank - 1] }}
                          strokeWidth={2}
                        />
                      ) : (
                        <span className="tabular text-sm font-semibold text-white/40">
                          {row.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/80">
                      {row.name.charAt(0)}
                    </div>

                    {/* Name + sport */}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">
                        {row.name}
                      </div>
                      <div className="text-xs text-white/45">{row.sport}</div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="tabular text-base font-semibold text-white">
                        {row.points.toLocaleString("de-DE")}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">
                        pts
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Reward cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Medal,
              title: "Top-10-Medaille",
              text: "Monatliche Platzierung sichert dir eine exklusive Saison-Medaille.",
            },
            {
              icon: TrendingUp,
              title: "Streak-Bonus",
              text: "Bleib konsistent — tägliche Aktivität multipliziert deinen Score.",
            },
            {
              icon: Award,
              title: "Founder-Rewards",
              text: "Die ersten 1.000 erhalten lebenslangen Pro-Zugang gratis.",
            },
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
              >
                <Icon className="size-6 text-accent" strokeWidth={2} />
                <h4 className="mt-4 text-base font-semibold text-white">
                  {r.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {r.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
