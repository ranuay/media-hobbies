import { useState, useEffect } from 'react'
import { getMangaAdapter } from '../../services/manga.service'
import { useManga } from '../../hooks/useManga'
import type { MangaItem } from '../../types'
import type { MangaDexLanguage } from '../../adapters/mangadex.types'
import MangaCard from './MangaCard'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'

export default function MangaPage() {
  const [mangaList, setMangaList] = useState<MangaItem[]>([])
  const [language, setLanguage] = useState<MangaDexLanguage>('en')
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoading, error, fetchWithErrorHandling } = useManga()

  const loadPopularManga = async () => {
    const adapter = getMangaAdapter(language)
    const result = await fetchWithErrorHandling(() => adapter.getPopularManga({ perPage: 20 }))
    if (result) setMangaList(result)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadPopularManga()
      return
    }

    const adapter = getMangaAdapter(language)
    const result = await fetchWithErrorHandling(() => adapter.searchManga(searchQuery))
    if (result) setMangaList(result)
  }

  useEffect(() => {
    loadPopularManga()
  }, [language])

  return (
    <div className="pt-20 px-8 pb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Manga</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded transition ${
                language === 'en'
                  ? 'bg-netflix-red text-white'
                  : 'bg-netflix-gray text-gray-400 hover:bg-gray-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-4 py-2 rounded transition ${
                language === 'id'
                  ? 'bg-netflix-red text-white'
                  : 'bg-netflix-gray text-gray-400 hover:bg-gray-700'
              }`}
            >
              Indonesia
            </button>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manga..."
            className="flex-1 px-4 py-2 bg-netflix-gray text-white rounded border border-gray-700 focus:border-netflix-red focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-netflix-red text-white rounded hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Content */}
      {isLoading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} onRetry={loadPopularManga} />}

      {!isLoading && !error && mangaList.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No manga found. Try a different search.
        </div>
      )}

      {!isLoading && !error && mangaList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {mangaList.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  )
}
