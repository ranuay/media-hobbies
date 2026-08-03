export interface MediaProgress {
  /** Unix timestamp (ms) of the last access */
  lastAccessed: number
  /** Progress fraction from 0 to 1 (0 = not started, 1 = completed) */
  progress: number
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
