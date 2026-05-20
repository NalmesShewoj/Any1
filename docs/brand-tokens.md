# any1 — Brand Tokens

Quelle: User-Briefing 2026-05-20

## Brand-Roots

| Token | Hex | Verwendung |
|---|---|---|
| `--brand-primary` | `#000000` | Background-Base (Dark Mode default), Headlines auf hell |
| `--brand-secondary` | `#FFFFFF` | Text auf Dark, Logo-Fill, Cards (light mode) |
| `--brand-accent` | `#FFA500` | CTAs, Highlights, Activity-Glow, Focus-Rings |

## Layer 1 — Primitive (CSS Custom Properties)

```css
:root {
  /* Brand */
  --brand-primary: #000000;
  --brand-secondary: #FFFFFF;
  --brand-accent: #FFA500;

  /* Neutrals (12-step ramp, anchored zu #000/#FFF) */
  --ink-0:  #000000;
  --ink-1:  #0A0A0B;
  --ink-2:  #111113;
  --ink-3:  #18181B;
  --ink-4:  #232327;
  --ink-5:  #2E2E33;
  --ink-6:  #3F3F46;
  --ink-7:  #52525B;
  --ink-8:  #71717A;
  --ink-9:  #A1A1AA;
  --ink-10: #D4D4D8;
  --ink-11: #F4F4F5;
  --ink-12: #FFFFFF;

  /* Accent ramp (von #FFA500 deriviert) */
  --accent-50:  #FFF7E6;
  --accent-100: #FFE9BF;
  --accent-200: #FFD480;
  --accent-300: #FFBF4D;
  --accent-400: #FFB121;
  --accent-500: #FFA500;  /* base */
  --accent-600: #E08F00;
  --accent-700: #B57100;
  --accent-800: #8A5600;
  --accent-900: #5E3B00;

  /* Status (athletic, von accent harmonisiert) */
  --success: #34D399;
  --warning: #F59E0B;
  --danger:  #F43F5E;
  --info:    #38BDF8;
}
```

## Layer 2 — Semantic (Dark Mode default)

```css
:root, .dark {
  --bg-base:     var(--ink-0);     /* Hero-Bg, Hauptseite */
  --bg-elevated: var(--ink-2);     /* Cards, Modals */
  --bg-overlay:  var(--ink-3);     /* Dropdowns, Popovers */
  --bg-inverse:  var(--ink-12);    /* Light-Sections */

  --text-primary:   var(--ink-12); /* Headlines, wichtiger Text */
  --text-secondary: var(--ink-10); /* Sub-Text */
  --text-muted:     var(--ink-8);  /* Captions, Labels */
  --text-inverse:   var(--ink-0);  /* Text auf Light-Bg */

  --accent:       var(--accent-500);
  --accent-hover: var(--accent-400);
  --accent-fg:    var(--ink-0);   /* Text auf Orange — Schwarz für Kontrast */
  --accent-glow:  rgba(255,165,0,0.45);

  --border-subtle: var(--ink-4);
  --border-strong: var(--ink-6);
  --border-accent: var(--accent-500);

  --focus-ring: var(--accent-500);
}

.light {
  --bg-base:     var(--ink-12);
  --bg-elevated: var(--ink-11);
  --bg-overlay:  #FFFFFFEE;
  --bg-inverse:  var(--ink-0);

  --text-primary:   var(--ink-0);
  --text-secondary: var(--ink-3);
  --text-muted:     var(--ink-6);
  --text-inverse:   var(--ink-12);

  --accent-fg: var(--ink-12); /* Weiß auf Orange im Light-Mode */
  --border-subtle: var(--ink-10);
  --border-strong: var(--ink-8);
}
```

## Layer 3 — Component

```css
:root {
  /* Buttons */
  --btn-primary-bg:    var(--accent);
  --btn-primary-fg:    var(--accent-fg);
  --btn-primary-hover: var(--accent-hover);
  --btn-secondary-bg:  transparent;
  --btn-secondary-fg:  var(--text-primary);
  --btn-secondary-border: var(--border-strong);
  --btn-ghost-hover-bg: var(--ink-3);

  /* Cards */
  --card-bg:     var(--bg-elevated);
  --card-border: var(--border-subtle);
  --card-radius: 16px;
  --card-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4);

  /* Inputs */
  --input-bg:     var(--ink-1);
  --input-border: var(--border-subtle);
  --input-focus:  var(--accent);

  /* Activity-/Stat-Charts */
  --chart-track:  var(--ink-4);
  --chart-fill:   var(--accent);
  --chart-pulse:  var(--accent-glow);
  --chart-text:   var(--text-primary);

  /* Hero-Overlay */
  --hero-overlay: linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.78) 100%);
}
```

## Typografie

```css
:root {
  --font-display: 'Geist', 'Inter', system-ui, sans-serif;
  --font-body:    'Geist', 'Inter', system-ui, sans-serif;
  --font-mono:    'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;

  /* Scale */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;
  --text-6xl:  3.75rem;
  --text-7xl:  4.5rem;
  --text-8xl:  6rem;
  --text-display: clamp(3rem, 8vw, 7rem); /* Hero-H1 */
}
```

## Spacing & Radius

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 20px;  --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;
  --space-32: 128px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

## Motion

```css
:root {
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-snap:      cubic-bezier(0.4, 0, 0.2, 1);

  --duration-fast: 150ms;
  --duration-base: 240ms;
  --duration-slow: 480ms;
  --duration-hero: 800ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

**Anwendungs-Hinweis:** Diese Tokens werden in `src/app/globals.css` von Next.js übernommen, sobald das Projekt initialisiert ist (Task #9). Tailwind v4 nutzt CSS-First-Config — alle Tokens hier sind direkt als Tailwind-Utilities verfügbar (`bg-accent`, `text-text-primary` etc.).
