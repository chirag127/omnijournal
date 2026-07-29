'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, FileText, Settings, LayoutDashboard } from 'lucide-react'
import { useUIStore } from '@/stores/ui.store'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/journal', label: 'Journal', icon: BookOpen },
  { href: '/dashboard/notes', label: 'Notes', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen } = useUIStore()

  if (!sidebarOpen) return null

  return (
    <aside className="w-60 border-r border-border flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <span className="font-bold text-lg">OmniJournal</span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
