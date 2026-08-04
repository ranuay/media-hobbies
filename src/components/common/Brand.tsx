import { Link } from 'react-router-dom'

export default function Brand({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 group">
      <span className="relative flex items-center justify-center w-7 h-7">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-primary dark:text-dark-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="5" cy="6" r="2.2" />
          <circle cx="19" cy="6" r="2.2" />
          <circle cx="12" cy="19" r="2.2" />
          <path d="M7 6h10M6.4 7.8 10.6 17M17.6 7.8 13.4 17" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display font-bold text-xl tracking-tight">
        Cyber<span className="text-primary dark:text-dark-primary">Path</span>
      </span>
    </Link>
  )
}
