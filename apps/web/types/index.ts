// App-level TypeScript types

export type ID = string

export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface Attachment {
  id: ID
  name: string
  type: string
  size: number
  url: string
  createdAt: Date
}

export interface Tag {
  id: ID
  name: string
  color?: string
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface SearchResult {
  id: ID
  type: 'journal' | 'note' | 'task'
  title: string
  excerpt: string
  score: number
}
