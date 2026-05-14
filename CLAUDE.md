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

A minimal Next.js 16 App Router site (React 19, TypeScript, Tailwind v4) that displays Danish pollen levels for Copenhagen and Aarhus. The React Compiler (`babel-plugin-react-compiler`) is enabled.

**Data flow:**
1. `src/clients/open-meteo-client.ts` — fetches 2-day hourly pollen data from the Open-Meteo air-quality API for each city, computes daily peaks, and classifies severity (`none/low/medium/high`) against per-species thresholds. `getPollenFeed()` uses the Next.js 16 `'use cache'` directive (`cacheLife('hours')` + `cacheTag('pollen-feed')`). The `POLLEN_TYPES` and `CITIES` arrays are the single source of truth for what is shown.
2. `src/app/page.tsx` — server component that calls `getPollenFeed()` directly and renders city cards.
3. `src/app/json/route.ts` — returns `PollenFeedData` as JSON.
4. `src/app/rss/route.ts` — returns an RSS 2.0 feed built with `fast-xml-builder`.

**Styling:** Tailwind v4 is configured via `src/styles/global.css` (single `@import "tailwindcss"`). Severity colours in `ValueItem.tsx` use `class-variance-authority` (`cva`) variants mapped to Tailwind colour classes.

## Deployment

Docker image (`Dockerfile`) runs `npm ci && npm run build` then `npm start`. Published via GitHub Actions (`docker-publish.yml`). The live site is at `https://pollen.dhedegaard.dk/`.
