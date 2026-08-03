import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMangaAdapter } from '../../services/manga.service'
import { useManga } from '../../hooks/useManga'
import { useMangaProgress } from '../../hooks/useMangaProgress'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'

export default function MangaReaderPage() {
  const { mangaId, chapterId } = useParams<{ mangaId: string; chapterId: string }>()
  const navigate = useNavigate()
  const [pages, setPages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const { isLoading, error, fetchWithErrorHandling } = useManga()
  const { getProgress, saveProgress } = useMangaProgress()

  const loadChapterPages = async () => {
    if (!mangaId || !chapterId) return

    const adapter = getMangaAdapter()
    const result = await fetchWithErrorHandling(() =>
      adapter.getChapterPages(mangaId, chapterId)
    )
    if (result) {
      setPages(result)

      const savedProgress = getProgress(mangaId)
      if (savedProgress?.chapterId === chapterId && savedProgress.page > 0) {
        setCurrentPage(savedProgress.page)
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevPage()
    if (e.key === 'ArrowRight') handleNextPage()
  }

  useEffect(() => {
    setCurrentPage(0)
    setPages([])
    loadChapterPages()
  }, [mangaId, chapterId])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage, pages.length])

  useEffect(() => {
    if (!mangaId || !chapterId || pages.length === 0) return
    saveProgress(mangaId, {
      chapterId,
      page: currentPage,
      totalPages: pages.length,
    })
  }, [currentPage, pages.length, mangaId, chapterId])

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={loadChapterPages} />

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/manga/${mangaId}`)}
            className="text-white hover:text-netflix-red transition"
          >
            ← Back
          </button>
          <div className="text-white">
            Page {currentPage + 1} / {pages.length}
          </div>
        </div>
      </div>

      {/* Reader */}
      {pages.length > 0 && (
        <div className="flex items-center justify-center min-h-screen pt-16 pb-20">
          <img
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className="max-w-full max-h-screen object-contain"
          />
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="px-6 py-2 bg-netflix-gray text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
            className="px-6 py-2 bg-netflix-red text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
        <div className="text-center text-gray-400 text-sm mt-2">
          Use arrow keys (← →) to navigate
        </div>
      </div>
    </div>
  )
}
