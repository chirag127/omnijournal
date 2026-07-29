import { useState, useCallback } from 'react'
import { callAI } from '@/lib/ai/providers'
import { useAIStore } from '@/stores/ai.store'

export function useAI() {
  const { config } = useAIStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const complete = useCallback(
    async (prompt: string, systemPrompt?: string) => {
      setLoading(true)
      setError(null)
      try {
        const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = []
        if (systemPrompt) messages.push({ role: 'system', content: systemPrompt })
        messages.push({ role: 'user', content: prompt })
        const result = await callAI(config, messages)
        return result as string
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'AI request failed'
        setError(msg)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [config]
  )

  return { complete, loading, error }
}
