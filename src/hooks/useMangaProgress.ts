import { useLocalStorage } from './useLocalStorage'

export interface MangaProgressData {
  lastAccessed?: number
  chapterId: string
  page: number
  totalPages: number
  chapterTitle?: string
}

const MANGA_PROGRESS_KEY = 'manga-progress'

export function useMangaProgress() {
  const [progressMap, setProgressMap] = useLocalStorage<Record<string, MangaProgressData>>(
    MANGA_PROGRESS_KEY,
    {}
  )

  const saveProgress = (mangaId: string, progress: MangaProgressData) => {
    setProgressMap((prev) => ({
      ...prev,
      [mangaId]: {
        ...progress,
        lastAccessed: Date.now(),
      },
    }))
  }

  const getProgress = (mangaId: string): MangaProgressData | undefined => {
    return progressMap[mangaId]
  }

  const clearProgress = (mangaId: string) => {
    setProgressMap((prev) => {
      const next = { ...prev }
      delete next[mangaId]
      return next
    })
  }

  return { progressMap, saveProgress, getProgress, clearProgress }
}
