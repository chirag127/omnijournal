import { describe, it, expect } from 'vitest'
import { extractWikilinks } from './notes.service'

describe('extractWikilinks', () => {
  it('extracts a single wikilink', () => {
    expect(extractWikilinks('see [[Daily Note]] here')).toEqual(['Daily Note'])
  })

  it('extracts multiple wikilinks preserving order', () => {
    expect(extractWikilinks('[[One]] and [[Two]] then [[Three]]')).toEqual([
      'One',
      'Two',
      'Three',
    ])
  })

  it('returns an empty array when there are no wikilinks', () => {
    expect(extractWikilinks('plain text with no links')).toEqual([])
  })

  it('keeps duplicates (does not dedupe)', () => {
    expect(extractWikilinks('[[A]] [[A]]')).toEqual(['A', 'A'])
  })

  it('captures inner content with spaces and punctuation', () => {
    expect(extractWikilinks('[[My Note: v2]]')).toEqual(['My Note: v2'])
  })

  it('does not match single brackets', () => {
    expect(extractWikilinks('[not a link]')).toEqual([])
  })

  it('does not match an empty target', () => {
    // [^\]]+ requires at least one non-] char, so [[]] is not a link
    expect(extractWikilinks('[[]]')).toEqual([])
  })

  it('handles wikilinks across multiple lines', () => {
    expect(extractWikilinks('line one [[A]]\nline two [[B]]')).toEqual(['A', 'B'])
  })
})
