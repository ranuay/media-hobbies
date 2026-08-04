import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const NAV_ITEMS = [
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/resources', label: 'Resources' },
  { to: '/credentials', label: 'Free Certificates & Badges' },
  { to: '/progress', label: 'Progres' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur border-b border-border dark:border-dark-border">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-bold text-xl tracking-tight whitespace-nowrap">
          Cyber<span className="text-primary dark:text-dark-primary">Path</span>
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === item.to || pathname.startsWith(item.to + '/')
                  ? 'bg-primary-light dark:bg-dark-primary-light text-primary-dark dark:text-dark-primary-dark'
                  : 'text-muted dark:text-dark-muted hover:text-foreground dark:hover:text-dark-foreground hover:bg-border/50 dark:hover:bg-dark-border/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
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