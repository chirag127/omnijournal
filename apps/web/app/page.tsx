import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">OmniJournal</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          AI-powered journaling, note-taking and personal knowledge management.
          Open source. Privacy-first. Offline-capable.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/chirag127/omnijournal"
            className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </main>
  )
}
