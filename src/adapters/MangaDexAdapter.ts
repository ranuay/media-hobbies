import type { MangaAdapter, MediaListParams } from './types'
import type { MangaItem } from '../types'
import type {
  MangaDexLanguage,
  MangaDexManga,
  MangaDexSearchResponse,
  MangaDexChapterResponse,
  MangaDexChapter,
  MangaDexAtHomeResponse,
} from './mangadex.types'

const BASE_URL = 'https://api.mangadex.org'
const COVER_BASE_URL = 'https://uploads.mangadex.org/covers'

export class MangaDexAdapter implements MangaAdapter {
  private language: MangaDexLanguage

  constructor(language: MangaDexLanguage = 'en') {
    this.language = language
  }

  setLanguage(language: MangaDexLanguage) {
    this.language = language
  }

  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`MangaDex API error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }

  private getCoverUrl(mangaId: string, fileName?: string): string {
    if (!fileName) return ''
    return `${COVER_BASE_URL}/${mangaId}/${fileName}`
  }

  private mapToMangaItem(manga: MangaDexManga): MangaItem {
    const coverRelation = manga.relationships.find(r => r.type === 'cover_art')
    const coverFileName = coverRelation?.attributes?.fileName

    return {
      id: manga.id,
      title: manga.attributes.title.en || manga.attributes.title.ja || Object.values(manga.attributes.title)[0] || 'Unknown',
      coverImage: this.getCoverUrl(manga.id, coverFileName),
      description: manga.attributes.description?.en || manga.attributes.description?.id || '',
    }
  }

  async getPopularManga(params?: MediaListParams): Promise<MangaItem[]> {
    const limit = params?.perPage || 20
    const offset = ((params?.page || 1) - 1) * limit

    const endpoint = `/manga?limit=${limit}&offset=${offset}&order[followedCount]=desc&includes[]=cover_art&availableTranslatedLanguage[]=${this.language}&contentRating[]=safe&contentRating[]=suggestive`
    
    const data = await this.fetchAPI<MangaDexSearchResponse>(endpoint)
    return data.data.map(manga => this.mapToMangaItem(manga))
  }

  async searchManga(query: string): Promise<MangaItem[]> {
    const endpoint = `/manga?title=${encodeURIComponent(query)}&limit=20&includes[]=cover_art&availableTranslatedLanguage[]=${this.language}`
    
    const data = await this.fetchAPI<MangaDexSearchResponse>(endpoint)
    return data.data.map(manga => this.mapToMangaItem(manga))
  }

  async getMangaChapters(mangaId: string): Promise<MangaDexChapter[]> {
    const endpoint = `/manga/${mangaId}/feed?limit=100&translatedLanguage[]=${this.language}&order[chapter]=asc&includeExternalUrl=0`
    
    const data = await this.fetchAPI<MangaDexChapterResponse>(endpoint)
    return data.data
  }

  async getChapterPages(mangaId: string, chapterId: string): Promise<string[]> {
    const data = await this.fetchAPI<MangaDexAtHomeResponse>(`/at-home/server/${chapterId}`)
    
    const { baseUrl, chapter } = data
    return chapter.data.map(filename => `${baseUrl}/data/${chapter.hash}/${filename}`)
  }
}
