"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // subtle parallax drift as the heading travels through the viewport
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-4 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/55"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="h-px w-8 origin-left bg-white/40"
          />
          {eyebrow}
        </motion.span>
      )}

      {/* Title with clip reveal */}
      <h2
        className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        style={{
          letterSpacing: "-0.035em",
          lineHeight: 1.04,
          textShadow: "0 2px 36px rgba(0,0,0,0.75), 0 1px 10px rgba(0,0,0,0.5)",
        }}
      >
        <span className="inline-block overflow-hidden align-bottom">
          <motion.span
            initial={reduced ? false : { y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="inline-block"
          >
            {title}
          </motion.span>
        </span>
      </h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className={cn(
            "mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/65 sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
