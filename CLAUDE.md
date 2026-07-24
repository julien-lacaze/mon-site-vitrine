# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the production build locally
- `npm run astro -- --help` — Astro CLI (e.g. `npm run astro check` for type-checking)

There is no lint or test script configured in this project.

## Architecture

Static site (Astro 6, SSG only — no React/Vue/Svelte integration, no islands) for **julienlacaze.fr**, Julien Lacaze's personal site as a freelance CMO in Bordeaux. Deployed URL is set via `site` in `astro.config.mjs`. Styling uses Tailwind v4 (`@tailwindcss/vite`) but pages mostly use inline `style=` attributes rather than Tailwind utility classes — design tokens (colors, fonts) are defined as CSS custom properties in the `@theme` block in `src/styles/global.css` (`--color-bg`, `--color-accent`, `--font-display` = Lora, `--font-body` = DM Sans, etc.). Reuse these tokens instead of hardcoding colors/fonts.

There is no `components/` directory — each page (`src/pages/index.astro`, `clients.astro`, `experimentations.astro`) is a large, self-contained `.astro` file with its own inline sections and styles.

`src/layouts/Layout.astro` wraps every page: nav bar, mobile menu, footer (including a hardcoded, manually-estimated carbon-footprint disclosure — update the date/figures there if that's still being maintained), custom cursor, and a scroll-reveal `IntersectionObserver` — all implemented as plain JS in a single inline `<script>` block.

### Blog

The blog is an Astro content collection (`src/content.config.ts`), loading Markdown files from `src/content/blog/**/*.md`. Frontmatter schema:

```yaml
---
title: "Titre de l'article"
metaTitle: "Titre optionnel pour la balise <title> (sinon: '{title} — Julien Lacaze')"
description: "Résumé court affiché sur la carte dans la liste"
date: YYYY-MM-DD
category: Marketing  # ou : IA, No-code, Productivité, Entrepreneuriat
tldr:
  - "Premier point clé."
  - "Deuxième point clé."
draft: true  # optionnel, exclut l'article des pages statiques générées
---
```

`tldr` is optional — omitting it hides the TL;DR block. If a `tldr` bullet contains `:` or `—`, quote the string. `src/pages/blog/[slug].astro` renders the article, computes reading time from word count (200 wpm), and appends a fixed Calendly CTA.

**Writing style for article bodies and section titles: no em dashes (—).** Use commas, periods, or rephrase instead.

`src/config/dispo.js` exposes a single availability flag (`disponible`, `prochaine_dispo`) consumed elsewhere in the site.

### Marketing skills

`.agents/skills/` bundles marketing-focused Claude skills (`site-architecture`, `seo-audit`, `copywriting`, `page-cro`, `signup-flow-cro`) pulled from `coreyhaines31/marketingskills` (tracked in `skills-lock.json`) — reach for these when working on site structure, SEO, on-page copy, or conversion-focused changes.
