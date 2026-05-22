"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LogoImage } from "./LogoImage";

const NAV = [
  { href: "#vergleich",  label: "Vergleich" },
  { href: "#app",        label: "So geht's" },
  { href: "#challenges", label: "Ranglisten" },
  { href: "#faq",        label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border-subtle bg-black/65 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" aria-label="any1 Startseite" className="flex items-center gap-2.5">
          <LogoImage
            alt=""
            width={28}
            height={32}
            priority
            className="text-white"
            style={{ width: "auto", height: "28px" }}
          />
          <span className="text-lg font-semibold tracking-tight text-white">
            any1
          </span>
        </Link>

        {/* Nav (Desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side: lang + CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden text-xs font-medium tracking-wider text-white/60 transition-colors hover:text-white sm:inline-flex"
            aria-label="Sprache wechseln"
          >
            DE / <span className="text-white/40">EN</span>
          </button>
          <a
            href="#waitlist"
            className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-fg transition-all hover:bg-accent-hover hover:shadow-[0_0_28px_var(--accent-glow)]"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </header>
  );
}
