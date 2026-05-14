# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server with Turbopack
npm run build      # production build (also validates types)
npm run lint       # ESLint
```

There are no tests. CI runs `build` then `lint` on every push.

## Architecture

A minimal Next.js 16 App Router site (React 19, TypeScript, Tailwind v4 + DaisyUI) that displays Danish pollen levels for Copenhagen and Aarhus.

**Data flow:**
1. `src/clients/open-meteo-client.ts` — fetches 2-day hourly pollen data from the Open-Meteo air-quality API for each city, computes daily peaks, and classifies severity (`none/low/medium/high`) against per-species thresholds. The `POLLEN_TYPES` and `CITIES` arrays are the single source of truth for what is shown.
2. `src/actions/data-action.ts` — a `'use server'` wrapper around the client, used by both the page and the route handlers.
3. `src/app/page.tsx` — ISR page (`revalidate = 3600`) that calls `getData()` and renders city cards.
4. `src/app/json/route.ts` — returns `PollenFeedData` as JSON.
5. `src/app/rss/route.ts` — returns an RSS 2.0 feed built with `xmlbuilder2`.

**Styling:** Tailwind v4 is configured via `src/styles/global.css` (single `@import "tailwindcss"` + DaisyUI plugin, light theme only). Severity colours are applied inline in `ValueItem.tsx` using `clsx`.

## Deployment

Docker image (`Dockerfile`) runs `npm ci && npm run build` then `npm start`. Published via GitHub Actions (`docker-publish.yml`). The live site is at `https://pollen.dhedegaard.dk/`.
