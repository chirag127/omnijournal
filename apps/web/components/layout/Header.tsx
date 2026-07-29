'use client'
import { Menu, Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useUIStore } from '@/stores/ui.store'
import { useAuth } from '@/features/auth/useAuth'

export function Header() {
  const { toggleSidebar } = useUIStore()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4">
      <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-accent" aria-label="Toggle sidebar">
        <Menu size={18} />
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg hover:bg-accent"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {user && (
          <button onClick={logout} className="p-2 rounded-lg hover:bg-accent" aria-label="Sign out">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  )
}
