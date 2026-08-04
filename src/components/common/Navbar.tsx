import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import Brand from './Brand'

const NAV_ITEMS = [
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/resources', label: 'Resources' },
  { to: '/credentials', label: 'Credentials' },
  { to: '/progress', label: 'Progres' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/85 dark:bg-dark-surface/85 backdrop-blur border-b border-border dark:border-dark-border">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Brand />
        <div className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.to || pathname.startsWith(item.to + '/')
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary-light dark:bg-dark-primary-light text-primary-dark dark:text-dark-primary-dark'
                    : 'text-muted dark:text-dark-muted hover:text-foreground dark:hover:text-dark-foreground hover:bg-border/50 dark:hover:bg-dark-border/50'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-2 px-3 py-2 rounded-lg border border-border dark:border-dark-border text-muted dark:text-dark-muted hover:bg-border/50 dark:hover:bg-dark-border/50 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
