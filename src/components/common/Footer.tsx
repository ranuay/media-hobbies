import { Link } from 'react-router-dom'
import Brand from './Brand'

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-dark-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-muted dark:text-dark-muted">
        <div>
          <Brand />
          <p className="mt-2 max-w-sm">
            Kurator belajar cybersecurity lintas platform. Informasi dapat berubah.
          </p>
        </div>
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <Link to="/about" className="hover:text-foreground dark:hover:text-dark-foreground transition-colors">
            Tentang & Disclaimer
          </Link>
          <Link to="/progress" className="hover:text-foreground dark:hover:text-dark-foreground transition-colors">
            Progres Saya
          </Link>
        </nav>
      </div>
    </footer>
  )
}
