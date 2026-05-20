"use client";

import { Apple, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant: "ios" | "android";
  status?: "live" | "soon";
  href?: string;
  className?: string;
};

export function StoreBadge({
  variant,
  status = "soon",
  href,
  className,
}: Props) {
  const isComingSoon = status === "soon";
  const Icon = variant === "ios" ? Apple : Play;
  const platformLabel = variant === "ios" ? "App Store" : "Google Play";
  const actionLabel = isComingSoon ? "Coming soon to" : "Download on the";

  const baseClass = cn(
    "group relative inline-flex h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-5 backdrop-blur-md transition-all",
    "hover:border-white/30 hover:bg-white/[0.08]",
    isComingSoon && "cursor-default",
    className
  );

  const inner = (
    <>
      <Icon
        className="size-7 text-white"
        strokeWidth={1.6}
        aria-hidden
        fill={variant === "ios" ? "currentColor" : "none"}
      />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/55">
          {actionLabel}
        </span>
        <span className="text-base font-semibold tracking-tight text-white">
          {platformLabel}
        </span>
      </div>
      {isComingSoon && (
        <span className="ml-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
          Soon
        </span>
      )}
    </>
  );

  if (isComingSoon) {
    return (
      <button
        type="button"
        aria-label={`${actionLabel} ${platformLabel}`}
        className={baseClass}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      aria-label={`${actionLabel} ${platformLabel}`}
      className={baseClass}
    >
      {inner}
    </a>
  );
}
