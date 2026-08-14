import { describe, it, expect } from 'vitest'
import { indexDocuments, search } from './search.service'
import type { JournalEntry, Note } from '@/lib/db/schema'

function journal(id: string, title: string, content: string, tags: string[] = []): JournalEntry {
  return {
    id,
    userId: 'u1',
    title,
    content,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }
}

function note(id: string, title: string, content: string, tags: string[] = []): Note {
  return {
    id,
    userId: 'u1',
    title,
    content,
    tags,
    wikilinks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }
}

describe('search service', () => {
  it('returns an empty array for a blank query', () => {
    indexDocuments([], [])
    expect(search('')).toEqual([])
    expect(search('   ')).toEqual([])
  })

  it('finds an indexed journal entry by title', () => {
    indexDocuments([journal('j1', 'Morning Pages', 'woke up early and wrote')], [])
    const results = search('Morning')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].id).toBe('journal:j1')
    expect(results[0].type).toBe('journal')
  })

  it('finds an indexed note by content', () => {
    indexDocuments([], [note('n1', 'Recipes', 'sourdough bread technique')])
    const results = search('sourdough')
    expect(results.map((r) => r.id)).toContain('note:n1')
  })

  it('matches tags as a searchable field', () => {
    indexDocuments([], [note('n2', 'Untitled', 'body', ['gardening', 'spring'])])
    const results = search('gardening')
    expect(results.map((r) => r.id)).toContain('note:n2')
  })

  it('re-indexing replaces the previous document set', () => {
    indexDocuments([journal('old', 'Obsolete Entry', 'gone')], [])
    indexDocuments([journal('new', 'Fresh Entry', 'present')], [])
    expect(search('Obsolete')).toEqual([])
    expect(search('Fresh').map((r) => r.id)).toContain('journal:new')
  })

  it('supports prefix search', () => {
    indexDocuments([journal('j3', 'Journaling', 'reflection content')], [])
    // configured with prefix: true
    expect(search('Journ').map((r) => r.id)).toContain('journal:j3')
  })
})
