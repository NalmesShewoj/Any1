# any1 — Design Brief & Sections Plan

> Sport-/Challenge-App Landing Page. Redesign von any-1.de.
> Erstellt aus ui-ux-pro-max Reasoning-Engine + User-Briefing.

---

## 1. Brand-Direction

**Sophisticated Athletic** — die Schnittmenge aus _Apple Fitness_ (Premium, Detail, Ruhe), _On Running_ (Eleganz + technische Präzision) und _Whoop_ (Daten-getriebene Performance-Optik).

| Achse | Position |
|---|---|
| Tonalität | Elegant, dynamisch, detailverliebt, modern |
| Energie | Kontrolliert hoch (nicht laut, nicht aggressiv) |
| Vertrauen | Premium-Tech (nicht Indie-MVP) |
| Inklusivität | "Any-one. Anytime. Anywhere." bleibt als sprachliche Klammer |

**Anti-Patterns (zu vermeiden):**
- Bright neon ohne Kontext, Comic-Sport-Optik, Stockfoto-Athleten mit Lens-Flare
- Emoji-Icons (aktuelle 🫀🏆⚔️📊 raus → SVG-Icon-Set: Lucide oder Phosphor Duotone)
- "AI-purple/pink" Gradients (out-of-brand)
- Sprachen-Mix DE/EN auf derselben View (nutze i18n-Switch)
- "Available Soon" ohne Aktion → ersetzt durch Waitlist-Capture

---

## 2. Stack

```
Framework:    Next.js 15 (App Router, RSC)
Styling:      Tailwind CSS v4 (CSS-first config)
Components:   shadcn/ui (Radix + Tailwind)
Animation:    Framer Motion (motion/react) + GSAP für Scroll-Triggers
i18n:         next-intl (DE + EN)
Forms:        react-hook-form + zod (Waitlist)
Mail:         Resend (Waitlist-Confirmation) — TBD
Icons:        Lucide React
Fonts:        s. Typo-Sektion unten
Analytics:    Vercel Analytics + Plausible
Deploy:       Vercel
```

---

## 3. Color-System (Token-Layer, Werte folgen nach User-Input)

**Layer 1: Primitive** (alle Hex-Roots)
- `--brand-primary`, `--brand-secondary`, `--brand-accent` ← User liefert
- Neutrals: `--ink-0` (Background Black) bis `--ink-12` (Off-White)

**Layer 2: Semantic**
- `--bg-base`, `--bg-elevated`, `--bg-overlay`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--accent`, `--accent-hover`, `--accent-fg`
- `--border-subtle`, `--border-strong`
- `--success`, `--warning`, `--danger` (Aktivitäts-States)

**Layer 3: Component**
- `--btn-primary-bg`, `--btn-primary-fg`, etc.
- `--card-bg`, `--card-border`
- `--chart-pulse`, `--chart-grid`

**Dark Mode = Default.** Light Mode als Option (Premium-Apps haben fast immer Dark als Standard für Activity-Aesthetik).

---

## 4. Typography

**Headline:** _Geist_ oder _Inter Display_ (variable, OpenType-Features für Stylistic Sets)
**Body:** _Geist Sans_ / _Inter_
**Mono / Stats:** _JetBrains Mono_ oder _Geist Mono_ — wichtig für Zahlen (BPM, Pace, Stats — tabular-nums Pflicht)

**Scale (rem):**
```
xs: 0.75   sm: 0.875   base: 1   lg: 1.125
xl: 1.25   2xl: 1.5    3xl: 1.875   4xl: 2.25
5xl: 3     6xl: 3.75   7xl: 4.5    8xl: 6
display: clamp(3rem, 8vw, 7rem)   ← Hero-Headline
```

**Headline-Spec:** `font-weight: 600` (nicht 800/900 — Eleganz), `letter-spacing: -0.04em` (tight, modern), `line-height: 0.95`.

---

## 5. Sections-Plan (Landing-Page)

```
┌────────────────────────────────────────────────────────┐
│ 0. Sticky Header                                       │
│    Logo · Features · Challenges · App · DE/EN · CTA   │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 1. HERO (Pattern #9 Video-First)                       │
│    Slow-Mo Athletik-Loop (50-60% opacity, dark grade) │
│    H1: "Anyone. Anytime. Anywhere." (split-text in)   │
│    Sub: 1 Satz USP                                     │
│    CTAs: [App Store - Coming Soon] [Play Store - CS]  │
│    Inline-Waitlist: E-Mail-Input + "Notify me"        │
│    Trust-Strip: "1.247 schon dabei · Launch Q3 2026"  │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 2. WHAT IS ANY1 (3-Zeiler-Story)                       │
│    Große Typo, kein Bild, viel Whitespace             │
│    Scroll-Reveal Word-by-Word                          │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 3. LIVE-STATS-DEMO (Custom-Eye-Catcher)                │
│    Mini-Leaderboard das animiert auf-zählt            │
│    "Du gegen die Welt" — Live-Counter, animierte       │
│    Activity-Rings, Sparkline mit Heart-Rate            │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 4. FEATURES (Bento-Grid, 5 Cards)                      │
│    a) Apple Health / Google Fit (Integration-Logos)   │
│    b) Daily / Weekly / Special Challenges              │
│    c) Smart Scoring (BPM × Steps × Elevation)         │
│    d) Squad & Leaderboards                             │
│    e) Privacy First (Dein Body, deine Daten)          │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 5. APP-SHOWCASE (Pattern #15 angelehnt)                │
│    iPhone-Mockup mit auto-rotierenden Screenshots      │
│    Side-by-Side: Feature-Bullet → Screenshot          │
│    Scroll-pinned (GSAP ScrollTrigger)                  │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 6. CHALLENGES (Karussell / Cards)                      │
│    "30-Day Push", "10k Steps Streak", "Climb Everest" │
│    Jede Card mit Progress-Bar, Teilnehmerzahl, Badge  │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 7. COMMUNITY / SOCIAL PROOF                            │
│    Wenn Testimonials: 3 echte. Sonst: Discord/IG-      │
│    Counter + UGC-Stream (Insta-Embed)                  │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 8. FAQ (Accordion, shadcn)                             │
│    Wann Launch? Welche Devices? Kostenlos? Privacy?    │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 9. FINAL CTA-BAND                                      │
│    Full-Width Dark mit Accent-Glow                     │
│    "Be one of the first." → Waitlist + Badges         │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ 10. FOOTER                                             │
│     Legal · Privacy · Impressum · Kontakt · Socials   │
└────────────────────────────────────────────────────────┘
```

---

## 6. Hero-Section Spec (Detail)

**Layout (Desktop):**
- Full-viewport (`100svh`), Video-Background fills.
- Content-Grid: 12-col, Content sitzt in col 2-8 (links-gewichtet, asymmetrisch).
- Rechts oben: kleine Live-Stat-Karte (z.B. "Heute: 12.481 Workouts logged") als zarter Glas-Layer.

**Video:**
- 1080p `.mp4` (H.264) + `.webm` (VP9) Fallback
- 8-12s Loop, lautlos, `playsinline`
- Dark Gradient-Overlay: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)`
- Inhalt: Slow-Motion Lauf-/Sprung-/Push-up-Szenen, gemischte Bodies, neutrale Locations
- Performance: `poster=` für initial paint, `loading=lazy` für Below-Fold

**Headline-Animation (Framer Motion):**
- Split-Text Word-by-Word (`stagger: 0.06`)
- `clipPath` reveal von unten (`inset(100% 0 0 0)` → `inset(0 0 0 0)`)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (sehr smooth)
- Duration: 800ms total

**Sub-Headline:** fadet 200ms nach H1 ein, `translate-y: 12px → 0`.

**CTAs:**
- Primary-Style: App Store + Play Store Pill-Badges in echtem Design (SVG, dunkles Glas mit weißer Schrift), Hover: subtle scale 1.02 + glow.
- Beide mit Coming-Soon-Tooltip / Click → öffnet Waitlist-Modal.
- Inline-Form direkt darunter: `[E-Mail ____________]  [Notify me →]` (Pill-Shape, große Touch-Targets).

**Mikro-Detail:**
- Cursor: Custom Cursor in Hero (kleiner Kreis, lerpt mit Maus, expandiert auf interaktiven Elementen) — _nicht_ auf Mobile.
- Scroll-Hint unten Mitte: animiertes Chevron + "scroll" (fadet nach 4s ein).

**Accessibility:**
- `prefers-reduced-motion: reduce` → Video pausiert auf Poster-Frame, Headline-Animation skipped.
- Text-Kontrast min 7:1 gegen Overlay-Dunkelheit.
- Video hat Caption-Track (auch wenn stumm — beschreibt Szene).

---

## 7. Animations-Inventar (Framer Motion + GSAP)

| Element | Animation | Library | Trigger |
|---|---|---|---|
| Hero Headline | Split-Text + Clip-Reveal | Framer | Mount |
| Hero CTAs | Stagger fade-up | Framer | Mount + 600ms |
| Live-Stat-Card | Number count-up | Framer (`useMotionValue`) | InView |
| Section-Reveals | Fade + 24px translate-y | Framer (`whileInView`) | InView |
| App-Showcase | Pinned scroll, Screenshot-Crossfade | GSAP ScrollTrigger | Scroll |
| Bento-Cards | Lift on hover (`y: -4px`, shadow grow) | Tailwind + Framer | Hover |
| Activity-Rings | SVG-Stroke-Dasharray-Animation | Framer | InView |
| Cursor | Lerp follow | Framer (`useMotionValue` + `useSpring`) | Mouse |
| Smooth-Scroll | Lenis | Lenis | Global |

---

## 8. Copywriting-Richtung

**Tonalität:** kurz, präzise, motivierend ohne Bro-Talk. Englisch und Deutsch separat (kein DE/EN-Mix in einem Satz).

**Hero-Varianten zur Auswahl:**

A) `Anyone. Anytime. Anywhere.`
   _Sub:_ "Track your effort. Earn your level. Beat your circle."

B) `Bewege dich. Werde gesehen.`
   _Sub:_ "any1 verwandelt jeden Schritt, jeden Schlag, jeden Höhenmeter in Punkte — und stellt dich gegen alle, die mithalten wollen."

C) `Die App für alle, die nicht stehenbleiben.`
   _Sub:_ "Daily Challenges. Echte Leaderboards. Apple Health & Google Fit ready."

→ Empfehlung: **A für EN, B oder C für DE.** A passt zur Markenklammer und ist eingeführt.

---

## 9. Pre-Delivery-Checklist (aus SKILL.md)

- [ ] Keine Emojis als Icons (Lucide / Phosphor)
- [ ] `cursor: pointer` auf allen klickbaren Elementen
- [ ] Hover-States mit Transition 150-300ms
- [ ] Text-Kontrast 4.5:1 minimum (7:1 für Hero über Video)
- [ ] Focus-States sichtbar (Tab-Nav)
- [ ] `prefers-reduced-motion` respektiert
- [ ] Responsive: 375 / 768 / 1024 / 1440 / 1920
- [ ] Lighthouse: Perf > 90, A11y 100, SEO 100
- [ ] LCP < 2.0s (Video-Poster muss optimiert sein)
- [ ] Open Graph + Twitter Cards + Favicon-Set
- [ ] i18n: kein Mix DE/EN auf einer View
- [ ] DSGVO: Cookie-Banner (Consent-Mode v2 wenn Analytics)
- [ ] Impressum + Datenschutzerklärung (DACH-Pflicht)

---

## 10. Open Questions (an Stakeholder)

- Brand-Farben (Hex) → User liefert
- Logo-SVG → User legt nach `assets/logo.svg`
- Hero-Video-Footage: Lizenz/Stock-Auswahl bestätigen
- App-Store-Listing-Links sobald verfügbar
- Tatsächliche App-Screenshots für App-Showcase (sobald App-Build da)
- Anbieter für Waitlist-Backend (Resend/Loops/Mailchimp/eigene DB?)
- Domain: bleibt any-1.de oder migration?
- Analytics: nur Vercel oder zusätzlich Plausible/PostHog?
