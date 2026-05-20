# Projekt Any1

## Design-Skill-Setup

Dieses Projekt nutzt das **UI/UX Pro Max** Skill-Bundle (v2.5.0, MIT, [Repo](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)).

Sieben Skills sind unter `.claude/skills/` installiert:

| Skill | Zweck |
|---|---|
| `ui-ux-pro-max` | Haupt-Skill: 67 Styles, 161 Paletten, 57 Font-Pairings, 25 Chart-Typen, 15+ Stacks |
| `design-system` | Komplette Design-System-Generierung (Reasoning-Engine) |
| `design` | Allgemeine Design-Entscheidungen |
| `brand` | Brand-Identity, Logo, Voice |
| `ui-styling` | Style-Patterns (Glassmorphism, Bento, Neumorphism, …) |
| `banner-design` | Banner / Hero / Social-Cards |
| `slides` | Präsentations-Folien |

Die Skills werden automatisch geladen, wenn Claude Code im Projektverzeichnis läuft. Trigger-Wörter sind in den jeweiligen `SKILL.md` definiert (z. B. „landing page", „dashboard", „color palette", „design system").

## UI-Komponenten-Referenz: 21st.dev

Für konkrete React/Tailwind-Komponenten als visuelle Vorlage:
**https://21st.dev/community/components**

Kategorien: Buttons, Heroes, Pricing, AI Chat, Navbars, Cards, Forms u. a. Die Snippets sind copy-paste-fähig (shadcn/ui + Tailwind).

> Hinweis: Der Magic-MCP-Server von 21st.dev wurde **nicht** eingerichtet. Bei Bedarf manuell nachrüsten via `.mcp.json`:
> ```json
> {
>   "mcpServers": {
>     "magic": {
>       "command": "npx",
>       "args": ["-y", "@21st-dev/magic@latest"],
>       "env": { "API_KEY": "<dein-key-von-21st.dev/magic/console>" }
>     }
>   }
> }
> ```

## Workflow-Vorschlag

1. Briefing/Intent formulieren („Landing Page für X")
2. `design-system` Skill triggert Reasoning-Engine → Style + Palette + Typo
3. Komponenten-Vorlage von 21st.dev kopieren
4. Mit `ui-styling` an Brand-Sprache anpassen
5. Pre-Delivery-Checklist aus `ui-ux-pro-max/SKILL.md` abarbeiten
