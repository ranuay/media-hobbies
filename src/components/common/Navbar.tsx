import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-8 py-4">
        <Link to="/" className="text-netflix-red text-3xl font-bold">
          MEDIAFLIX
        </Link>
        <div className="flex gap-6">
          <Link to="/manga" className="text-white hover:text-gray-300 transition">
            Manga
          </Link>
          <Link to="/films" className="text-white hover:text-gray-300 transition">
            Films
          </Link>
          <Link to="/books" className="text-white hover:text-gray-300 transition">
            Books
          </Link>
        </div>
      </div>
    </nav>
  )
}
