import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from './ui.store'
import { useAIStore } from './ai.store'

describe('ui.store', () => {
  beforeEach(() => {
    useUIStore.setState({ sidebarOpen: true, theme: 'system' })
  })

  it('toggleSidebar flips the open state', () => {
    expect(useUIStore.getState().sidebarOpen).toBe(true)
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarOpen).toBe(false)
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarOpen).toBe(true)
  })

  it('setSidebarOpen sets an explicit value', () => {
    useUIStore.getState().setSidebarOpen(false)
    expect(useUIStore.getState().sidebarOpen).toBe(false)
  })

  it('setTheme updates the theme', () => {
    useUIStore.getState().setTheme('amoled')
    expect(useUIStore.getState().theme).toBe('amoled')
  })
})

describe('ai.store', () => {
  beforeEach(() => {
    useAIStore.setState({
      config: {
        provider: 'openrouter',
        apiKey: '',
        model: 'meta-llama/llama-3.3-70b-instruct:free',
      },
    })
  })

  it('setConfig merges a partial patch into the existing config', () => {
    useAIStore.getState().setConfig({ apiKey: 'sk-test' })
    const cfg = useAIStore.getState().config
    expect(cfg.apiKey).toBe('sk-test')
    // untouched fields preserved
    expect(cfg.provider).toBe('openrouter')
    expect(cfg.model).toBe('meta-llama/llama-3.3-70b-instruct:free')
  })

  it('setConfig can switch provider and model together', () => {
    useAIStore.getState().setConfig({ provider: 'groq', model: 'llama3-8b-8192' })
    const cfg = useAIStore.getState().config
    expect(cfg.provider).toBe('groq')
    expect(cfg.model).toBe('llama3-8b-8192')
  })
})
