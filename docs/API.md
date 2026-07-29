# OmniJournal API Reference

OmniJournal has no custom HTTP API server. All data flows through Firebase directly from the client. This document covers the service functions in `features/` and `lib/`.

---

## Firebase Auth

All auth via Firebase Auth SDK (oriz-app project).

### `signInWithEmailAndPassword(auth, email, password)`
Signs in with email/password.

### `signInWithPopup(auth, new GoogleAuthProvider())`
Signs in with Google OAuth.

### `createUserWithEmailAndPassword(auth, email, password)`
Creates a new account.

### `onAuthStateChanged(auth, callback)`
Subscribe to auth state. Returns unsubscribe function.

---

## Journal Service (`features/journal/journal.service.ts`)

### `subscribeJournalEntries(userId, onData)`
Real-time subscription to all non-deleted journal entries for a user.
- Mirrors to Dexie on each update.
- Returns Firestore `Unsubscribe`.

### `createJournalEntry(userId, data)`
Creates a new journal entry in Firestore.
- Returns: `Promise<string>` (document ID)

### `updateJournalEntry(id, data)`
Partial update of a journal entry.

### `deleteJournalEntry(id)`
Soft delete: sets `isDeleted: true`.

---

## Notes Service (`features/notes/notes.service.ts`)

### `subscribeNotes(userId, onData)`
Real-time subscription to all non-deleted notes.

### `createNote(userId, data)`
Returns: `Promise<string>` (document ID)

### `updateNote(id, data)`
Partial update.

### `deleteNote(id)`
Soft delete.

### `extractWikilinks(content)`
Parses `[[wikilink]]` patterns from content string.
- Returns: `string[]` (link targets)

---

## AI Provider (`lib/ai/providers.ts`)

### `callAI(config, messages, options?)`

```typescript
callAI(
  config: { provider: string; apiKey: string; baseUrl?: string; model: string },
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  options?: { stream?: boolean }
): Promise<string | ReadableStream>
```

Calls any OpenAI-compatible provider. Returns string or ReadableStream (if `stream: true`).

---

## Search Service (`features/search/search.service.ts`)

### `indexDocuments(journals, notes)`
Indexes all journal entries and notes into MiniSearch.

### `search(query)`
Returns MiniSearch results with `id`, `type`, `title`, score.

---

## Dexie Schema (`lib/db/schema.ts`)

```typescript
db.journalEntries  // EntityTable<JournalEntry>
db.notes           // EntityTable<Note>
db.tasks           // EntityTable<Task>
```

Use standard Dexie query API: `.where()`, `.filter()`, `.toArray()`, `.bulkPut()`.

---

## Firestore Collections

```
/journalEntries/{id}   — JournalEntry documents
/notes/{id}            — Note documents
/tasks/{id}            — Task documents
```

Security rules (deploy to Firebase Console):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{docId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```
