import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-dark-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-muted dark:text-dark-muted">
        <div>
          <div className="font-semibold text-foreground dark:text-dark-foreground mb-1">
            Cyber<span className="text-primary dark:text-dark-primary">Path</span>
          </div>
          <p>Kurator belajar cybersecurity lintas platform. Informasi dapat berubah.</p>
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
