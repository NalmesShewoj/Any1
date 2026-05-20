"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    // TODO: Anbindung an Resend/Loops/eigene API. Aktuell nur Fake-Success.
    await new Promise((r) => setTimeout(r, 700));
    setState("success");
  }

  if (state === "success") {
    return (
      <div
        className={cn(
          "flex h-14 items-center gap-3 rounded-2xl border border-success/30 bg-success/10 px-5 text-success",
          className
        )}
        role="status"
      >
        <Check className="size-5" />
        <span className="text-sm font-medium">
          Du bist dabei. Wir melden uns vor dem Launch.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "group flex h-14 items-center rounded-2xl border border-white/15 bg-white/[0.04] pl-5 pr-2 backdrop-blur-md transition-all focus-within:border-accent/60 focus-within:bg-white/[0.07] hover:border-white/25",
        className
      )}
      aria-label="Waitlist beitreten"
    >
      <input
        type="email"
        required
        placeholder="deine@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-full flex-1 bg-transparent text-base text-white placeholder-white/40 outline-none"
        aria-label="E-Mail-Adresse"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-all hover:bg-accent-hover disabled:opacity-50"
      >
        {state === "loading" ? "..." : "Notify me"}
        <ArrowRight className="size-4" strokeWidth={2.4} />
      </button>
    </form>
  );
}
