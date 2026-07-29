# ADR-001: Firebase Firestore vs PostgreSQL for Primary Database

Date: 2026-07-29
Status: Accepted

## Context

OmniJournal needs a database that supports real-time sync, offline-first operation, and scales to millions of users without requiring a custom backend.

## Decision

Use **Firebase Firestore** as the primary database.

## Rationale

- Real-time listeners built-in — no WebSocket infrastructure to manage
- IndexedDB persistence via `enableIndexedDbPersistence` — offline-first out of the box
- Free Spark plan: 1 GiB storage, 50K reads/day, 20K writes/day, 1K deletes/day — sufficient for personal PKM
- No server required — client connects directly, zero backend cost
- Scales automatically — no connection pooling, no migrations

## Rejected Alternatives

- **Neon Postgres**: Requires custom sync layer for offline; better for structured analytics queries but needs server infrastructure
- **Supabase**: Pauses after 7 days inactivity on free plan — catastrophic for a PKM app
- **PocketBase**: Self-hosted only, no managed free tier
- **Turso (libSQL)**: No offline-first story for web

## Consequences

- No complex SQL queries — must design Firestore-friendly data model (denormalized)
- Firestore security rules must enforce `userId` ownership on every collection
- Binary file storage (images, PDFs) goes to Neon Object Storage (Firebase Storage requires Blaze/card since Feb 2026)
- Cost monitoring needed — alert at 60% of free tier limits per the `never-hit-quotas` rule
