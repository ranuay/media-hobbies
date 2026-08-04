import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/resources', label: 'Resources' },
  { to: '/credentials', label: 'Free Certificates & Badges' },
  { to: '/progress', label: 'Progres' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-bold text-xl tracking-tight whitespace-nowrap">
          Cyber<span className="text-primary">Path</span>
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === item.to || pathname.startsWith(item.to + '/')
                  ? 'bg-primary-light text-primary-dark'
                  : 'text-muted hover:text-foreground hover:bg-border/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
