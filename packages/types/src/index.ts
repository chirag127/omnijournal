// Shared types across the monorepo

export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: Date
}

export interface JournalEntry {
  id: string
  userId: string
  title: string
  content: string
  mood?: MoodLevel
  tags: string[]
  attachments: Attachment[]
  createdAt: Date
  updatedAt: Date
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface Note {
  id: string
  userId: string
  workspaceId: string
  title: string
  content: string
  parentId?: string
  icon?: string
  coverImage?: string
  tags: string[]
  wikilinks: string[]
  backlinks: string[]
  isArchived: boolean
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Workspace {
  id: string
  userId: string
  name: string
  icon?: string
  description?: string
  createdAt: Date
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  createdAt: Date
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}
