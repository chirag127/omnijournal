import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// root is pinned to this package so a parent-dir vitest.config does not hijack resolution
export default defineConfig({
  test: {
    root,
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', 'tests/e2e/**', '.next/**'],
  },
  resolve: {
    alias: {
      '@': root.replace(/\/$/, ''),
    },
  },
})
