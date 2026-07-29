# ADR-004: Offline Strategy

Date: 2026-07-29
Status: Accepted

## Context

OmniJournal is a PKM app — users expect it to work without internet. Writes must never be lost.

## Decision

**Two-layer offline strategy**: Firestore IndexedDB persistence (sync layer) + Dexie.js (local query layer).

## Layers

### Layer 1: Firestore IndexedDB Persistence

`enableIndexedDbPersistence(db)` caches all Firestore data to IndexedDB automatically. When offline:
- Reads serve from cache immediately
- Writes go to a pending queue, flushed on reconnect
- `onSnapshot` listeners continue firing from cache

This gives us free offline for all CRUD operations with zero extra code.

### Layer 2: Dexie.js

Firestore's cache is not queryable via standard Dexie-style compound queries. For complex local queries (search, tag filtering, graph traversal), we maintain a Dexie mirror:
- `onSnapshot` handlers also call `localDb.*.bulkPut(docs)` to mirror to Dexie
- Search and graph features query Dexie directly — always fast, always offline

## Sync Conflict Strategy

Last-write-wins with optimistic UI:
1. Write to Dexie immediately (optimistic)
2. Write to Firestore (queued if offline)
3. On reconnect: Firestore flushes queue; `onSnapshot` re-fires; Dexie mirrors final state

No CRDTs needed for MVP — journal entries and notes are single-author.

## Consequences

- Dexie schema must stay in sync with Firestore collection structure
- Deleted documents: soft delete (`isDeleted: true`) — never hard delete from Dexie until sync confirmed
- Multi-tab: Firestore persistence may fail in second tab (`failed-precondition`) — gracefully degraded, still usable
