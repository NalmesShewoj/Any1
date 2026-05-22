"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "Wann startet any1?",
    a: "any1 launcht am 1. August 2026 für iOS und Android. Die ersten 1.000 Nutzer auf der Warteliste erhalten den Founder-Pass mit lebenslangem Pro-Zugang.",
  },
  {
    q: "Wie kann man verschiedene Sportarten fair vergleichen?",
    a: "any1 misst nicht die Sportart, sondern deine körperliche Anstrengung — über Herzfrequenz, Dauer und Intensität. So zählt ein intensives Fußballspiel genauso wie eine harte Gym-Session. Die Punkte spiegeln echte Leistung wider, unabhängig von der Disziplin.",
  },
  {
    q: "Welche Geräte werden unterstützt?",
    a: "Alles, was mit Apple Health (iOS) oder Google Fit (Android) verbunden ist — Apple Watch, Wear-OS-Uhren, Fitnesstracker und viele mehr. Du brauchst keine zusätzliche Hardware.",
  },
  {
    q: "Was kostet any1?",
    a: "any1 startet mit einem kostenlosen Plan. Pro-Features (erweiterte Statistiken, exklusive Challenges) sind optional — und für die ersten 1.000 Founder dauerhaft gratis.",
  },
  {
    q: "Was passiert mit meinen Gesundheitsdaten?",
    a: "Sie werden ausschließlich für dein Scoring genutzt, niemals verkauft und nicht für Werbung verwendet. Du kannst die Verbindung jederzeit trennen.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-border-subtle bg-bg-base py-28 sm:py-36"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-white">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-accent transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
