import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AIConfig } from '@/lib/ai/providers'

interface AIState {
  config: AIConfig
  setConfig: (config: Partial<AIConfig>) => void
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      config: {
        provider: 'openrouter',
        apiKey: '',
        model: 'meta-llama/llama-3.3-70b-instruct:free',
      },
      setConfig: (config) => set((state) => ({ config: { ...state.config, ...config } })),
    }),
    { name: 'omnijournal-ai-config' }
  )
)
