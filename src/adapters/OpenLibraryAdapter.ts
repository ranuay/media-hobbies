import type { BookAdapter, MediaListParams } from './types'
import type { BookItem } from '../types'
import type { OpenLibraryDoc, OpenLibrarySearchResponse } from './openlibrary.types'

const BASE_URL = 'https://openlibrary.org'
const COVER_BASE_URL = 'https://covers.openlibrary.org/b/id'

export class OpenLibraryAdapter implements BookAdapter {
  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'User-Agent': 'MediaFlix/1.0',
      },
    })
    
    if (!response.ok) {
      throw new Error(`Open Library API error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }

  private getCoverUrl(coverId?: number): string {
    if (!coverId) return ''
    return `${COVER_BASE_URL}/${coverId}-M.jpg`
  }

  private mapToBookItem(doc: OpenLibraryDoc): BookItem {
    return {
      id: doc.key.replace('/works/', ''),
      title: doc.title,
      coverImage: this.getCoverUrl(doc.cover_i),
      author: doc.author_name?.[0],
      description: doc.subject?.slice(0, 3).join(', '),
    }
  }

  async getPopularBooks(params?: MediaListParams): Promise<BookItem[]> {
    const page = params?.page || 1
    const limit = params?.perPage || 20
    const offset = (page - 1) * limit

    const endpoint = `/search.json?q=*&sort=rating&limit=${limit}&offset=${offset}`
    
    const data = await this.fetchAPI<OpenLibrarySearchResponse>(endpoint)
    return data.docs.map(doc => this.mapToBookItem(doc))
  }

  async searchBooks(query: string): Promise<BookItem[]> {
    const endpoint = `/search.json?q=${encodeURIComponent(query)}&limit=20`
    
    const data = await this.fetchAPI<OpenLibrarySearchResponse>(endpoint)
    return data.docs.map(doc => this.mapToBookItem(doc))
  }

  async getBookContent(bookId: string): Promise<string> {
    const workData = await this.fetchAPI<OpenLibrarySearchResponse>(
      `/search.json?q=key:/works/${bookId}&fields=ia`
    )

    const doc = workData.docs[0]
    if (!doc?.ia || doc.ia.length === 0) {
      throw new Error('No readable version available for this book')
    }

    const iaIdentifier = doc.ia[0]
    return `https://archive.org/stream/${iaIdentifier}`
  }
}
