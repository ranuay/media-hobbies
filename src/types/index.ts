export interface MediaProgress {
  lastAccessed: number
  progress: number
}

export interface MangaProgress extends MediaProgress {
  chapterId: string
  page: number
  totalPages: number
}

export interface FilmProgress extends MediaProgress {
  timestamp: number
  duration: number
}

export interface BookProgress extends MediaProgress {
  position: number
  totalLength: number
}

export interface MangaItem {
  id: string
  title: string
  coverImage: string
  description?: string
}

export interface FilmItem {
  id: string
  title: string
  posterImage: string
  description?: string
  duration?: number
}

export interface BookItem {
  id: string
  title: string
  coverImage: string
  author?: string
  description?: string
}
