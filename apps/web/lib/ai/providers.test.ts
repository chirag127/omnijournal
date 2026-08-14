import { describe, it, expect } from 'vitest'
import { AI_PROVIDERS } from './providers'

describe('AI_PROVIDERS registry', () => {
  it('keys the record by each provider id', () => {
    for (const [key, provider] of Object.entries(AI_PROVIDERS)) {
      expect(provider.id).toBe(key)
    }
  })

  it('gives every provider a non-empty display name', () => {
    for (const provider of Object.values(AI_PROVIDERS)) {
      expect(provider.name.length).toBeGreaterThan(0)
    }
  })

  it('lists at least one model for hosted providers', () => {
    for (const provider of Object.values(AI_PROVIDERS)) {
      if (provider.id === 'custom') continue
      expect(provider.models.length).toBeGreaterThan(0)
    }
  })

  it('marks local ollama and custom endpoint as not requiring an api key', () => {
    expect(AI_PROVIDERS.ollama.requiresApiKey).toBe(false)
    expect(AI_PROVIDERS.custom.requiresApiKey).toBe(false)
  })

  it('marks hosted cloud providers as requiring an api key', () => {
    expect(AI_PROVIDERS.openai.requiresApiKey).toBe(true)
    expect(AI_PROVIDERS.openrouter.requiresApiKey).toBe(true)
    expect(AI_PROVIDERS.groq.requiresApiKey).toBe(true)
  })

  it('uses https base urls for all hosted providers', () => {
    for (const provider of Object.values(AI_PROVIDERS)) {
      if (provider.id === 'custom' || provider.id === 'ollama') continue
      expect(provider.baseUrl.startsWith('https://')).toBe(true)
    }
  })
})
