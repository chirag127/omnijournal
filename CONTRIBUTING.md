# Contributing to OmniJournal

## Setup

```bash
git clone https://github.com/chirag127/omnijournal
cd omnijournal
pnpm install
cp apps/web/.env.example apps/web/.env.local
```

## Development

```bash
pnpm dev          # start all apps
pnpm type-check   # TypeScript check
pnpm lint         # ESLint
pnpm test         # Vitest unit tests
pnpm build        # production build
```

## Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- TypeScript strict mode — no `any`
- Components in `components/`, business logic in `features/`
- No business logic in components; no UI in feature services

## Pull Requests

1. Fork + branch from `main`
2. Write tests for new features
3. `pnpm type-check && pnpm lint && pnpm test` must pass
4. Open PR with description of what + why

## Issue Reporting

Use GitHub Issues. Search before filing. Bug reports: repro steps + expected vs actual.
