# ADR-003: AI Provider Abstraction

Date: 2026-07-29
Status: Accepted

## Context

OmniJournal needs AI features (chat, summarize, autocomplete, translate). Users have different AI provider preferences and API keys.

## Decision

Implement a **multi-provider client-side AI abstraction** where users bring their own API keys. All AI calls go directly from the browser to the provider — no OmniJournal proxy.

## Rationale

### No proxy
- Running a proxy costs money and requires a server — violates no-paid-self-hosting rule
- A proxy is a MITM for user API keys — privacy violation
- Direct browser→provider calls are simpler and faster

### User-provided keys
- OmniJournal never pays for AI usage — users fund their own usage
- Free providers (OpenRouter free models, Groq free tier, Ollama local) = zero cost
- Keys stored in localStorage only — never sent to OmniJournal servers

### OpenAI-compatible interface
All providers expose an OpenAI-compatible `/chat/completions` endpoint. Single `callAI()` function handles all providers — `openai-compat-for-all-ai-providers` rule.

## Supported Providers

| Provider | Free Tier | Notes |
|---|---|---|
| OpenRouter | Yes (free models) | Best for zero-cost start |
| Groq | Yes | Fast inference |
| OpenAI | No | GPT-4o |
| Google Gemini | Yes | Flash models |
| Ollama | Yes (local) | Private, no API key |
| Cerebras | Yes | Fast inference |
| Together AI | Yes (some models) | Large model selection |
| Custom | User-defined | Any OpenAI-compat endpoint |

## Consequences

- Browser CORS: providers must allow cross-origin requests (all listed do)
- No server-side AI features — all AI is client-side
- Users must configure provider + key in Settings before AI features work
- Streaming via `ReadableStream` — UI must handle token-by-token rendering
