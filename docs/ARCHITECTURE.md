# OmniJournal Architecture

## System Overview

OmniJournal is a client-first application. The browser does most of the work. There is no custom backend server.

```
Browser (Next.js PWA)
├── BlockNote Editor
├── Zustand stores (in-memory)
├── Dexie (IndexedDB — offline cache + local queries)
├── TanStack Query (server-state + Firestore subscriptions)
└── Firebase SDK
    ├── Firebase Auth (SSO via oriz-app project)
    └── Firestore (real-time sync + IndexedDB persistence)

External Services (direct from browser)
├── AI Providers (OpenRouter / Groq / OpenAI / etc.) — user keys only
└── Neon Object Storage (presigned URLs for file uploads)
```

## Data Flow

### Write flow (online)
1. User action → Zustand state update (optimistic)
2. `updateDoc(db, ...)` → Firestore SDK queues write
3. Dexie mirror updated synchronously
4. Firestore sends write to server
5. `onSnapshot` fires with confirmed data
6. Dexie re-synced from snapshot

### Write flow (offline)
1. User action → Zustand state update (optimistic)
2. `updateDoc(db, ...)` → Firestore queues write in IndexedDB
3. Dexie mirror updated synchronously
4. On reconnect → Firestore flushes queue automatically
5. `onSnapshot` fires with confirmed data

### Read flow
1. `onSnapshot` listener fires (from cache if offline, from server if online)
2. TanStack Query invalidated → component re-renders
3. Dexie updated for complex local queries

## Auth Flow

1. User hits `/login` → Firebase Auth popup/email
2. `onAuthStateChanged` fires → `useAuthStore.setUser(user)`
3. All Firestore queries scoped to `userId == auth.currentUser.uid`
4. Firestore security rules enforce same constraint server-side

## Directory Structure (apps/web)

```
app/              Next.js App Router pages
components/       Pure UI components (no business logic)
  ui/             shadcn primitives
  layout/         Sidebar, Header
  editor/         BlockNote wrapper + custom blocks
  shared/         Providers, ErrorBoundary
features/         Business logic modules
  auth/           Firebase Auth integration
  journal/        Journal CRUD + Firestore
  notes/          Notes CRUD + wikilinks + Firestore
  ai/             AI chat hook + provider integration
  search/         MiniSearch indexing + query
lib/
  firebase/       Firebase app init + exports
  db/             Dexie schema + db instance
  ai/             AI provider config + callAI()
  utils/          cn(), generateId(), formatDate()
stores/           Zustand stores (auth, ai config, ui)
hooks/            Custom React hooks
types/            App-level type aliases
```

## Security Model

- Firestore security rules: all documents require `request.auth.uid == resource.data.userId`
- No server-side secrets exposed to client
- AI API keys: user-owned, localStorage only, never transmitted to OmniJournal
- File uploads: presigned URLs with 15-minute expiry
