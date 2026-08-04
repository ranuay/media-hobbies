import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-5xl font-bold tracking-tight mb-4">
        Your media, <span className="text-primary">organized.</span>
      </h1>
      <p className="text-lg text-muted mb-8 max-w-xl">
        Browse and read manga, watch films, and read books — all in one clean
        and minimal place.
      </p>
      <div className="flex gap-3">
        <Link
          to="/manga"
          className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
        >
          Start Reading Manga
        </Link>
        <Link
          to="/films"
          className="px-6 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-surface transition-colors"
        >
          Watch Films
        </Link>
      </div>
    </div>
  )
}
