# OmniJournal

[![GitHub stars](https://img.shields.io/github/stars/chirag127/omnijournal?style=social)](https://github.com/chirag127/omnijournal)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-Spark-orange.svg)](https://firebase.google.com)

**AI-powered journaling, note-taking and personal knowledge management. Open source.**

The best open-source alternative to Notion, Obsidian, Logseq, Day One and more — with AI built in, privacy first, offline capable.

## Live Site

**https://omnijournal.oriz.in** (coming soon)

## Features

- Rich text editor (BlockNote) with Markdown, tables, code blocks
- Wikilinks + backlinks + knowledge graph
- AI assistant (8+ providers, user-provided keys, no proxy)
- PWA + offline-first (Firestore + IndexedDB)
- Firebase Auth SSO (oriz.in)
- Dark/Light/AMOLED themes
- Plugin system
- Full-text search + fuzzy search

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · BlockNote · Firebase · Dexie · Zustand · TanStack Query

## Quick Start

```bash
git clone https://github.com/chirag127/omnijournal
cd omnijournal
pnpm install
cp apps/web/.env.example apps/web/.env.local
# Add your Firebase config to .env.local
pnpm dev
```

Open http://localhost:3000.

## AI Setup

In Settings > AI: pick a provider and paste your API key. Recommended free start: **OpenRouter** with `meta-llama/llama-3.3-70b-instruct:free` (no cost). Keys stay in your browser only.

## Monorepo Structure

```
apps/web/        Next.js 15 app
packages/types/  Shared TypeScript types
packages/ui/     Design system
packages/config/ Shared configs
docs/            PRD, ADRs, architecture docs
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
