import MiniSearch from 'minisearch'
import type { JournalEntry, Note } from '@/lib/db/schema'

type SearchDoc = {
  id: string
  type: 'journal' | 'note'
  title: string
  content: string
  tags: string
}

const miniSearch = new MiniSearch<SearchDoc>({
  fields: ['title', 'content', 'tags'],
  storeFields: ['id', 'type', 'title'],
  searchOptions: { prefix: true, fuzzy: 0.2 },
})

let indexed = false

export function indexDocuments(journals: JournalEntry[], notes: Note[]) {
  if (indexed) miniSearch.removeAll()
  const docs: SearchDoc[] = [
    ...journals.map((j) => ({
      id: `journal:${j.id}`,
      type: 'journal' as const,
      title: j.title,
      content: j.content,
      tags: j.tags.join(' '),
    })),
    ...notes.map((n) => ({
      id: `note:${n.id}`,
      type: 'note' as const,
      title: n.title,
      content: n.content,
      tags: n.tags.join(' '),
    })),
  ]
  miniSearch.addAll(docs)
  indexed = true
}

export function search(query: string) {
  if (!query.trim()) return []
  return miniSearch.search(query)
}
