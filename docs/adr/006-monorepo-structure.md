# ADR-006: Monorepo Structure — Turborepo + pnpm Workspaces

Date: 2026-07-29
Status: Accepted

## Context

OmniJournal will eventually have: a Next.js web app, a React Native mobile app, shared type definitions, a shared design system, and shared config (ESLint, TypeScript, Tailwind). Code sharing without duplication requires a monorepo.

## Decision

Use **Turborepo** orchestrating **pnpm workspaces**.

## Structure

```
omnijournal/
├── apps/web/          # Next.js 15 web app
├── packages/types/    # Shared TypeScript types
├── packages/ui/       # Shared design system (React components + tokens)
└── packages/config/   # Shared configs (eslint, ts, tailwind)
```

## Rationale

### pnpm workspaces
- pnpm is the standard (per `use-pnpm` rule)
- Native workspace protocol (`workspace:*`) for inter-package deps
- Hoisted deduplication — single `node_modules` at root

### Turborepo
- Incremental builds: only rebuilds changed packages
- Parallel task execution with dependency graph awareness
- Remote caching (Vercel) available for CI speed
- Simple `turbo.json` config — not complex

### Rejected Alternatives

- **Nx**: Heavier, more opinionated, slower DX for small teams
- **Lerna**: Maintenance mode
- **Single repo (no monorepo)**: Can't share types/UI between web + future mobile
- **Rush**: Microsoft-specific, overkill

## Consequences

- All packages must declare explicit `workspace:*` deps — no implicit sharing
- `@omnijournal/types` and `@omnijournal/ui` are TypeScript source packages (no build step) — apps import source directly via `paths` alias
- Adding React Native app = add `apps/mobile` — no restructuring needed
