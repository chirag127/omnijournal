import Dexie, { type EntityTable } from 'dexie'

export interface JournalEntry {
  id: string
  userId: string
  title: string
  content: string
  mood?: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
  syncedAt?: Date
  isDeleted: boolean
}

export interface Note {
  id: string
  userId: string
  title: string
  content: string
  parentId?: string
  tags: string[]
  wikilinks: string[]
  createdAt: Date
  updatedAt: Date
  syncedAt?: Date
  isDeleted: boolean
}

export interface Task {
  id: string
  userId: string
  title: string
  completed: boolean
  dueDate?: Date
  priority: 'low' | 'medium' | 'high'
  noteId?: string
  createdAt: Date
  updatedAt: Date
}

export class OmniJournalDB extends Dexie {
  journalEntries!: EntityTable<JournalEntry, 'id'>
  notes!: EntityTable<Note, 'id'>
  tasks!: EntityTable<Task, 'id'>

  constructor() {
    super('OmniJournalDB')
    this.version(1).stores({
      journalEntries: 'id, userId, createdAt, updatedAt, syncedAt, *tags',
      notes: 'id, userId, parentId, createdAt, updatedAt, syncedAt, *tags, *wikilinks',
      tasks: 'id, userId, noteId, completed, dueDate, createdAt',
    })
  }
}

export const db = new OmniJournalDB()
