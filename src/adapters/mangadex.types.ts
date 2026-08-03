export type MangaDexLanguage = 'en' | 'id'

export interface MangaDexManga {
  id: string
  type: string
  attributes: {
    title: Record<string, string>
    description?: Record<string, string>
    status?: string
    contentRating?: string
  }
  relationships: Array<{
    id: string
    type: string
    attributes?: {
      fileName?: string
    }
  }>
}

export interface MangaDexChapter {
  id: string
  type: string
  attributes: {
    chapter: string
    title?: string
    translatedLanguage: string
    pages: number
    publishAt: string
    externalUrl?: string | null
    isUnavailable?: boolean
  }
}

export interface MangaDexChapterPages {
  baseUrl: string
  chapter: {
    hash: string
    data: string[]
    dataSaver: string[]
  }
}

export interface MangaDexSearchResponse {
  result: string
  response: string
  data: MangaDexManga[]
  limit: number
  offset: number
  total: number
}

export interface MangaDexChapterResponse {
  result: string
  response: string
  data: MangaDexChapter[]
  limit: number
  offset: number
  total: number
}

export interface MangaDexAtHomeResponse {
  result: string
  baseUrl: string
  chapter: {
    hash: string
    data: string[]
    dataSaver: string[]
  }
}
