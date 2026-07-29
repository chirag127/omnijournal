'use client'
import { useState, useCallback } from 'react'
import { callAI } from '@/lib/ai/providers'
import { useAIStore } from '@/stores/ai.store'
import type { AIMessage } from '@/types'

export function useAIChat(systemPrompt?: string) {
  const { config } = useAIStore()
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = useCallback(
    async (content: string) => {
      const userMsg: AIMessage = { role: 'user', content, timestamp: new Date() }
      setMessages((prev) => [...prev, userMsg])
      setLoading(true)
      setError(null)

      try {
        const history = messages.map(({ role, content }) => ({ role, content }))
        const allMsgs = systemPrompt
          ? [{ role: 'system' as const, content: systemPrompt }, ...history, { role: 'user' as const, content }]
          : [...history, { role: 'user' as const, content }]

        const response = await callAI(config, allMsgs)
        const assistantMsg: AIMessage = {
          role: 'assistant',
          content: response as string,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMsg])
        return response as string
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'AI request failed'
        setError(msg)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [config, messages, systemPrompt]
  )

  const clear = useCallback(() => setMessages([]), [])

  return { messages, send, clear, loading, error }
}
