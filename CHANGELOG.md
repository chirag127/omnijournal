# Changelog

All notable changes to OmniJournal.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

## [0.1.0] — 2026-07-29

### Added
- Turborepo + pnpm workspaces monorepo
- Next.js 15 App Router with TypeScript strict
- Firebase Auth (email/password + Google OAuth)
- Firestore real-time sync + IndexedDB persistence
- Dexie v4 offline schema (journalEntries, notes, tasks)
- AI provider abstraction: OpenAI, OpenRouter, Groq, Gemini, Ollama, Cerebras, Together AI, Custom
- Zustand stores: auth, AI config, UI
- TanStack Query v5 setup
- Sidebar + Header layout components
- Dashboard, Journal, Notes, Settings pages
- Notes service with wikilink extraction
- Journal service with Firestore + Dexie sync
- MiniSearch full-text search service
- AI chat hook with message history
- packages/types: shared TypeScript interfaces
- packages/ui: Button, Input, Card, design tokens
- 6 ADRs covering all major architectural decisions
- PRD with 10 user story flows
- GitHub Actions CI workflow
- Vercel deploy workflow
