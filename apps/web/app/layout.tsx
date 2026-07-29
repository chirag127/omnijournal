import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/shared/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'OmniJournal', template: '%s | OmniJournal' },
  description: 'AI-powered journaling, note-taking and personal knowledge management',
  manifest: '/manifest.json',
  keywords: ['journal', 'notes', 'pkm', 'ai', 'obsidian', 'notion', 'open-source'],
  authors: [{ name: 'OmniJournal Contributors' }],
  openGraph: {
    title: 'OmniJournal',
    description: 'AI-powered journaling, note-taking and personal knowledge management',
    type: 'website',
    url: 'https://omnijournal.oriz.in',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
