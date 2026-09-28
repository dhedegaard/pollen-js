# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server with Turbopack
npm run build      # production build (also validates types)
npm run lint       # ESLint
```

There are no tests. CI runs `build` then `lint` on every push.

MCP smoke test (after `npm run build && npm start`): `curl -X POST localhost:3000/mcp -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` — both `Accept` types are required (406 otherwise); replies come back as SSE `data:` lines.

## Architecture

A minimal Next.js 16 App Router site (React 19, TypeScript, Tailwind v4) that displays Danish pollen levels for Copenhagen and Aarhus. The React Compiler (`babel-plugin-react-compiler`) is enabled.

**Data flow:**
1. `src/clients/open-meteo-client.ts` — fetches 2-day hourly pollen data from the Open-Meteo air-quality API for each city, computes daily peaks, and classifies severity (`none/low/medium/high`) against per-species thresholds. `getPollenFeed()` uses the Next.js 16 `'use cache'` directive (`cacheLife('hours')` + `cacheTag('pollen-feed')`). The `POLLEN_TYPES` and `CITIES` arrays are exported as the single source of truth — consumed by the page, JSON/RSS routes, and the MCP `list_*` tools.
2. `src/app/page.tsx` — server component that calls `getPollenFeed()` directly and renders city cards.
3. `src/app/json/route.ts` — returns `PollenFeedData` as JSON.
4. `src/app/rss/route.ts` — returns an RSS 2.0 feed built with `fast-xml-builder`.
5. `src/app/mcp/route.ts` — Model Context Protocol server (Streamable HTTP, **POST-only**). Uses `mcp-handler` v2 (on `@modelcontextprotocol/server` v2), which mounts at whatever route file it's exported from — no route/transport config. It serves the stateless 2026-07-28 protocol with a legacy fallback for 2025-era Streamable HTTP clients; tool `inputSchema`s must be full `z.object(...)` schemas. Only `POST` is exported: the endpoint is stateless and needs no GET listen stream, and without a GET export `GET`/`HEAD` return 405. Four tools — `get_pollen_feed`, `get_city_pollen`, `list_cities`, `list_species` — all delegate to `getPollenFeed()` so the existing `'use cache'` layer applies unchanged. Invalid tool arguments come back as a tool result with `isError: true`; an unknown tool name is a JSON-RPC `-32602` error.

**Styling:** Tailwind v4 is configured via `src/styles/global.css` (single `@import "tailwindcss"`). Severity colours in `ValueItem.tsx` use `class-variance-authority` (`cva`) variants mapped to Tailwind colour classes.

## Deployment

Docker image (`Dockerfile`) runs `npm ci && npm run build` then `npm start`. Published via GitHub Actions (`docker-publish.yml`). The live site is at `https://pollen.dhedegaard.dk/` and exposes JSON (`/json`), RSS (`/rss`), and MCP (`/mcp`) endpoints in addition to the HTML page.

A push to `main` runs two workflows, Node.js CI (`node.js.yml`) and Docker (`docker-publish.yml`), plus CodeQL via GitHub's default code-scanning setup (no workflow file). The live site picks up the new image automatically once Docker succeeds, so `https://pollen.dhedegaard.dk/mcp` can be used to confirm a deploy.
