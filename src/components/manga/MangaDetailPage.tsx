import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMangaAdapter } from '../../services/manga.service'
import { useManga } from '../../hooks/useManga'
import { useMangaProgress } from '../../hooks/useMangaProgress'
import type { MangaDexChapter } from '../../adapters/mangadex.types'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'

type LanguageFilter = 'all' | 'en' | 'id'

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'EN',
  id: 'ID',
}

export default function MangaDetailPage() {
  const { mangaId } = useParams<{ mangaId: string }>()
  const [chapters, setChapters] = useState<MangaDexChapter[]>([])
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('id')
  const { isLoading, error, fetchWithErrorHandling } = useManga()
  const savedProgress = useMangaProgress().getProgress(mangaId || '')

  const loadChapters = async () => {
    if (!mangaId) return

    const adapter = getMangaAdapter()
    const result = await fetchWithErrorHandling(() => adapter.getMangaChapters(mangaId))
    if (result) setChapters(result)
  }

  useEffect(() => {
    loadChapters()
  }, [mangaId])

  const filteredChapters = languageFilter === 'all'
    ? chapters
    : chapters.filter(c => c.attributes.translatedLanguage === languageFilter)

  const englishCount = chapters.filter(c => c.attributes.translatedLanguage === 'en').length
  const indonesianCount = chapters.filter(c => c.attributes.translatedLanguage === 'id').length

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={loadChapters} />

  return (
    <div className="pt-20 px-8 pb-12">
      <Link to="/manga" className="text-netflix-red hover:underline mb-6 inline-block">
        ← Back to Manga
      </Link>

      <h1 className="text-3xl font-bold mb-4">Chapters</h1>

      <div className="text-gray-400 text-sm mb-6">
        {englishCount} chapters in English · {indonesianCount} chapters in Indonesian
      </div>

      {/* Language filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setLanguageFilter('all')}
          className={`px-4 py-2 rounded transition ${
            languageFilter === 'all'
              ? 'bg-netflix-red text-white'
              : 'bg-netflix-gray text-gray-400 hover:bg-gray-700'
          }`}
        >
          All ({chapters.length})
        </button>
        <button
          onClick={() => setLanguageFilter('en')}
          className={`px-4 py-2 rounded transition ${
            languageFilter === 'en'
              ? 'bg-netflix-red text-white'
              : 'bg-netflix-gray text-gray-400 hover:bg-gray-700'
          }`}
        >
          EN ({englishCount})
        </button>
        <button
          onClick={() => setLanguageFilter('id')}
          className={`px-4 py-2 rounded transition ${
            languageFilter === 'id'
              ? 'bg-netflix-red text-white'
              : 'bg-netflix-gray text-gray-400 hover:bg-gray-700'
          }`}
        >
          ID ({indonesianCount})
        </button>
      </div>

      {savedProgress && (
        <div className="mb-6 p-4 bg-netflix-gray rounded-lg">
          <div className="text-gray-300 mb-2">
            You were reading Chapter {savedProgress.chapterId.slice(0, 8)} - page{' '}
            {savedProgress.page + 1} of {savedProgress.totalPages}
          </div>
          <Link
            to={`/manga/${mangaId}/chapter/${savedProgress.chapterId}`}
            className="inline-block px-6 py-2 bg-netflix-red text-white rounded hover:bg-red-700 transition"
          >
            Continue Reading
          </Link>
        </div>
      )}

      {filteredChapters.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          {chapters.length === 0
            ? 'No chapters available for this manga.'
            : 'No chapters in the selected language.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={`/manga/${mangaId}/chapter/${chapter.id}`}
              className="p-4 bg-netflix-gray rounded-lg hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    chapter.attributes.translatedLanguage === 'id'
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {LANGUAGE_LABELS[chapter.attributes.translatedLanguage] || chapter.attributes.translatedLanguage.toUpperCase()}
                  </span>
                  <div>
                    <div className="text-white font-medium">
                      Chapter {chapter.attributes.chapter}
                    </div>
                    {chapter.attributes.title && (
                      <div className="text-gray-400 text-sm line-clamp-1">
                        {chapter.attributes.title}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-500 text-sm">
                  {chapter.attributes.pages} pages
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
