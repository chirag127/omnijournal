# OmniJournal Database Schema

## Firestore Collections

### `journalEntries`

```
{
  id: string                  // auto-generated Firestore ID
  userId: string              // Firebase Auth UID (security rule enforced)
  title: string               // entry title (auto: "Journal — Mon Jul 29")
  content: string             // BlockNote JSON string
  mood: number | null         // 1-5 mood level
  tags: string[]              // tag names
  attachments: Attachment[]   // file metadata (URLs from Neon storage)
  createdAt: Timestamp
  updatedAt: Timestamp
  syncedAt: Timestamp | null  // null if unsynced (offline)
  isDeleted: boolean          // soft delete
}
```

**Indexes:** `userId + createdAt (desc)`, `userId + isDeleted + createdAt`

### `notes`

```
{
  id: string
  userId: string
  workspaceId: string         // workspace scoping
  title: string
  content: string             // BlockNote JSON string
  parentId: string | null     // for nested notes
  icon: string | null         // emoji or URL
  coverImage: string | null   // URL
  tags: string[]
  wikilinks: string[]         // outgoing [[links]] — note titles
  backlinks: string[]         // incoming links — maintained on write
  isArchived: boolean
  isFavorite: boolean
  isDeleted: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  syncedAt: Timestamp | null
}
```

**Indexes:** `userId + workspaceId + updatedAt (desc)`, `userId + *tags`

### `tasks`

```
{
  id: string
  userId: string
  title: string
  completed: boolean
  dueDate: Timestamp | null
  priority: "low" | "medium" | "high"
  noteId: string | null       // linked note
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### `workspaces`

```
{
  id: string
  userId: string
  name: string
  icon: string | null
  description: string | null
  createdAt: Timestamp
}
```

---

## Dexie (IndexedDB) Schema

Mirrors Firestore for offline queries. See `lib/db/schema.ts`.

```typescript
version(1).stores({
  journalEntries: 'id, userId, createdAt, updatedAt, syncedAt, *tags',
  notes: 'id, userId, parentId, createdAt, updatedAt, syncedAt, *tags, *wikilinks',
  tasks: 'id, userId, noteId, completed, dueDate, createdAt',
})
```

`*` prefix = multi-entry index (array fields).

---

## Data Size Estimates (Spark free tier)

| Item | Size | 50K entries |
|---|---|---|
| Journal entry (text only) | ~2 KB | 100 MB |
| Note (average) | ~5 KB | 250 MB |
| Task | ~0.5 KB | 25 MB |

Firestore Spark: 1 GiB storage → comfortable for years of personal use.

Read/write costs: 50K reads/day, 20K writes/day → ~1 write per minute average — fine for a single user.
