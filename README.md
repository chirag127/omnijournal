# OmniJournal

> Open-source, AI-powered journaling, note-taking, and personal knowledge management — privacy-first and offline-capable.

[![License](https://img.shields.io/github/license/chirag127/omnijournal?style=flat-square)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/chirag127/omnijournal?style=flat-square)](https://github.com/chirag127/omnijournal/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/chirag127/omnijournal?style=flat-square)](https://github.com/chirag127/omnijournal/commits)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)

**Live site:** https://omnijournal.oriz.in · **GHP landing:** https://chirag127.github.io/omnijournal/ · **Repo:** https://github.com/chirag127/omnijournal

⭐ If this is useful, please star the repo — it helps others find it.

An open-source alternative to Notion / Obsidian / Logseq / Day One with AI built in. Rich block editing, wikilinks and backlinks, a knowledge graph, and bring-your-own-key AI — all offline-first, with your keys staying in your browser.

## Architecture & data flow

```mermaid
flowchart TB
  subgraph Client["apps/web — Next.js 15 / React 19 (PWA)"]
    editor["BlockNote editor"]
    graph["@xyflow/react<br/>knowledge graph + backlinks"]
    search["MiniSearch + Fuse.js<br/>full-text + fuzzy"]
    store["Zustand stores"]
    query["TanStack Query"]
    dexie[("Dexie / IndexedDB<br/>offline-first cache")]
    ai["AI panel<br/>(user-provided keys)"]
  end

  fb[("Firebase<br/>Auth SSO + Firestore")]
  neon[("Neon Object Storage<br/>attachments")]
  providers["8+ AI providers<br/>(OpenRouter, … — no proxy)"]

  editor --> store --> dexie
  store <-->|sync| query <--> fb
  editor --> graph
  editor --> search
  editor --> neon
  ai -->|browser → provider, keys never leave| providers
  Client --> vercel["Vercel (hosting)"]
```

## Features

- **Rich block editor** — BlockNote with Markdown, tables, and code blocks.
- **Wikilinks + backlinks + knowledge graph** — visualised with `@xyflow/react`.
- **AI assistant** — 8+ providers, user-provided keys, no proxy; keys stay in your browser.
- **Offline-first PWA** — Firestore + IndexedDB (Dexie) with local caching and sync.
- **Firebase Auth SSO** — shared `*.oriz.in` account.
- **Search** — full-text (MiniSearch) + fuzzy (Fuse.js).
- **Theming** — Dark / Light / AMOLED via `next-themes`.

## Tech stack

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS v4 · BlockNote (`core` / `react` / `mantine`) · Zustand · TanStack Query · Dexie (IndexedDB) · Firebase (Auth + Firestore) · Neon Object Storage · `@xyflow/react` · MiniSearch + Fuse.js · react-hook-form + Zod · Framer Motion · Recharts · Lucide. Monorepo: pnpm + Turborepo.

## Repo structure

```
apps/web/            # Next.js 15 app
  app/               # routes
  components/ · features/ · hooks/ · stores/ · lib/ · types/
  next.config.ts · playwright.config.ts
packages/
  types/             # shared TypeScript types (@omnijournal/types)
  ui/                # design system (@omnijournal/ui)
  config/            # shared configs
docs/                # PRD, ADRs, architecture
turbo.json · vercel.json · pnpm-workspace.yaml
```

## Quick start

```bash
git clone https://github.com/chirag127/omnijournal
cd omnijournal
pnpm install
cp apps/web/.env.example apps/web/.env.local   # add your Firebase config
pnpm dev                                        # turbo dev → http://localhost:3000
```

Other tasks: `pnpm build` · `pnpm test` · `pnpm lint` · `pnpm type-check` (all via Turborepo).

**AI setup:** Settings → AI, pick a provider and paste your key. Free start: **OpenRouter** with `meta-llama/llama-3.3-70b-instruct:free`. Keys stay in your browser only.

## Configuration

See [`apps/web/.env.example`](./apps/web/.env.example) for names. Firebase project is on the Spark plan (no card required).

| Variable | Purpose |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase client API key (client-only). |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth domain for shared `*.oriz.in` SSO. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project id. |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket. |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender id. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app id. |
| `NEON_STORAGE_ENDPOINT` | Neon Object Storage endpoint for attachments. |
| `NEON_STORAGE_ACCESS_KEY` | Neon storage access key (server-side). |
| `NEON_STORAGE_SECRET_KEY` | Neon storage secret key (server-side). |
| `NEON_STORAGE_BUCKET` | Neon storage bucket name. |
| `NEXT_PUBLIC_APP_URL` | App base URL. |

## Security note

No secrets in repo. AI provider keys are **user-provided and stay in the browser** — there is no proxy. `NEXT_PUBLIC_*` values are client-only; `NEON_STORAGE_*` secret keys are server-side only and never exposed to the client. See [SECURITY.md](./SECURITY.md).

## Part of the oriz family

One of ~80 sites and tools in the [oriz](https://blog.oriz.in) family by Chirag Singhal. **Note: OmniJournal is deployed on Vercel, not Cloudflare** (see `vercel.json`), on Firebase's free Spark plan. Siblings: [oriz-home](https://github.com/chirag127/oriz-home) (family hub) · [oriz-lore](https://github.com/chirag127/oriz-lore) (knowledge summaries).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [ROADMAP.md](./ROADMAP.md). Conventional commits are the changelog.

## Status

WIP — v0.1.0, active development.

## License

MIT © Chirag Singhal — chirag@oriz.in · see [LICENSE](./LICENSE).
