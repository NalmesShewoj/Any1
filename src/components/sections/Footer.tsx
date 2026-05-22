"use client";

import { LogoImage } from "@/components/site/LogoImage";

const LINKS = {
  Produkt: [
    { label: "Features", href: "#vergleich" },
    { label: "Wie es funktioniert", href: "#app" },
    { label: "Ranglisten", href: "#challenges" },
    { label: "FAQ", href: "#faq" },
  ],
  Rechtliches: [
    { label: "Datenschutz", href: "#" },
    { label: "Impressum", href: "#" },
    { label: "AGB", href: "#" },
  ],
  Kontakt: [
    { label: "any1.hassel@gmail.com", href: "mailto:any1.hassel@gmail.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-black">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoImage
                alt="any1"
                width={28}
                height={32}
                className="text-white"
                style={{ width: "auto", height: "26px" }}
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                any1
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              Anyone. Anytime. Anywhere. Die Sport-App, die echte Anstrengung
              fair vergleicht — über jede Sportart hinweg.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                {title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © 2026 Hassel Group. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-white/40">
            Launch 1. August 2026 · Made in Heidelberg
          </p>
        </div>
      </div>
    </footer>
  );
}
