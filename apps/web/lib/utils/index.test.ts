import { describe, it, expect } from 'vitest'
import { cn, generateId, formatDate } from './index'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b')
  })

  it('supports conditional object syntax', () => {
    expect(cn('base', { active: true, hidden: false })).toBe('base active')
  })

  it('merges conflicting tailwind utilities (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('generateId', () => {
  it('returns a v4-shaped uuid', () => {
    expect(generateId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  })

  it('returns unique ids on successive calls', () => {
    expect(generateId()).not.toBe(generateId())
  })
})

describe('formatDate', () => {
  it('formats a date as a medium en-US string', () => {
    // 2024-01-15 UTC noon avoids timezone date-rollover
    const d = new Date('2024-01-15T12:00:00Z')
    expect(formatDate(d)).toBe('Jan 15, 2024')
  })
})
