export type AIProvider = {
  id: string
  name: string
  baseUrl: string
  models: string[]
  supportsStreaming: boolean
  requiresApiKey: boolean
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    supportsStreaming: true,
    requiresApiKey: true,
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: ['meta-llama/llama-3.3-70b-instruct:free', 'deepseek/deepseek-r1:free'],
    supportsStreaming: true,
    requiresApiKey: true,
  },
  groq: {
    id: 'groq',
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: ['llama-3.3-70b-versatile', 'llama3-8b-8192', 'mixtral-8x7b-32768'],
    supportsStreaming: true,
    requiresApiKey: true,
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro'],
    supportsStreaming: true,
    requiresApiKey: true,
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama (Local)',
    baseUrl: 'http://localhost:11434/v1',
    models: ['llama3.2', 'mistral', 'gemma3'],
    supportsStreaming: true,
    requiresApiKey: false,
  },
  cerebras: {
    id: 'cerebras',
    name: 'Cerebras',
    baseUrl: 'https://api.cerebras.ai/v1',
    models: ['llama-3.3-70b', 'qwen-3-32b'],
    supportsStreaming: true,
    requiresApiKey: true,
  },
  together: {
    id: 'together',
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    models: ['meta-llama/Llama-3.3-70B-Instruct-Turbo'],
    supportsStreaming: true,
    requiresApiKey: true,
  },
  custom: {
    id: 'custom',
    name: 'Custom Endpoint',
    baseUrl: '',
    models: [],
    supportsStreaming: true,
    requiresApiKey: false,
  },
}

export type AIConfig = {
  provider: string
  apiKey: string
  baseUrl?: string
  model: string
}

export async function callAI(
  config: AIConfig,
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  options: { stream?: boolean } = {}
): Promise<string | ReadableStream> {
  const provider = AI_PROVIDERS[config.provider]
  const baseUrl = config.baseUrl || provider?.baseUrl || ''

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: config.model,
      messages,
      stream: options.stream ?? false,
    }),
  })

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status} ${response.statusText}`)
  }

  if (options.stream) {
    return response.body as ReadableStream
  }

  const data = await response.json()
  return data.choices[0]?.message?.content ?? ''
}
