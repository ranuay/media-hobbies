import { Link } from 'react-router-dom'
import type { MangaItem } from '../../types'

interface MangaCardProps {
  manga: MangaItem
}

export default function MangaCard({ manga }: MangaCardProps) {
  return (
    <Link
      to={`/manga/${manga.id}`}
      className="group flex-shrink-0 w-48 cursor-pointer transition-transform hover:scale-105"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-netflix-gray mb-2">
        {manga.coverImage ? (
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Cover
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white font-semibold">View Details</span>
        </div>
      </div>
      <h3 className="text-white font-medium line-clamp-2 text-sm">{manga.title}</h3>
    </Link>
  )
}
