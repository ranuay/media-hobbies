import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OpenLibraryAdapter } from './OpenLibraryAdapter'
import type { OpenLibrarySearchResponse } from './openlibrary.types'

global.fetch = vi.fn()

describe('OpenLibraryAdapter', () => {
  let adapter: OpenLibraryAdapter

  beforeEach(() => {
    adapter = new OpenLibraryAdapter()
    vi.clearAllMocks()
  })

  describe('getPopularBooks', () => {
    it('should fetch popular books', async () => {
      const mockResponse: OpenLibrarySearchResponse = {
        numFound: 1,
        start: 0,
        numFoundExact: true,
        docs: [
          {
            key: '/works/OL123W',
            title: 'Test Book',
            author_name: ['Test Author'],
            cover_i: 12345,
            first_publish_year: 2020,
            subject: ['Fiction', 'Adventure'],
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getPopularBooks()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/search.json?q=*&sort=rating'),
        expect.objectContaining({
          headers: { 'User-Agent': 'MediaFlix/1.0' },
        })
      )
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'OL123W',
        title: 'Test Book',
        coverImage: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
        author: 'Test Author',
        description: 'Fiction, Adventure',
      })
    })

    it('should support pagination', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          numFound: 0,
          start: 20,
          numFoundExact: true,
          docs: [],
        }),
      } as Response)

      await adapter.getPopularBooks({ page: 2, perPage: 10 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=10&offset=10'),
        expect.any(Object)
      )
    })

    it('should handle missing cover image', async () => {
      const mockResponse: OpenLibrarySearchResponse = {
        numFound: 1,
        start: 0,
        numFoundExact: true,
        docs: [
          {
            key: '/works/OL456W',
            title: 'No Cover Book',
            author_name: ['Author Two'],
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getPopularBooks()

      expect(result[0].coverImage).toBe('')
    })
  })

  describe('searchBooks', () => {
    it('should search books by query', async () => {
      const mockResponse: OpenLibrarySearchResponse = {
        numFound: 1,
        start: 0,
        numFoundExact: true,
        docs: [
          {
            key: '/works/OL789W',
            title: 'Searched Book',
            author_name: ['Search Author'],
            cover_i: 67890,
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.searchBooks('test query')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=test%20query'),
        expect.any(Object)
      )
      expect(result[0].title).toBe('Searched Book')
    })
  })

  describe('getBookContent', () => {
    it('should return archive.org URL when available', async () => {
      const mockResponse: OpenLibrarySearchResponse = {
        numFound: 1,
        start: 0,
        numFoundExact: true,
        docs: [
          {
            key: '/works/OL999W',
            title: 'Readable Book',
            ia: ['book_identifier_123'],
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getBookContent('OL999W')

      expect(result).toBe('https://archive.org/stream/book_identifier_123')
    })

    it('should throw error when no readable version available', async () => {
      const mockResponse: OpenLibrarySearchResponse = {
        numFound: 1,
        start: 0,
        numFoundExact: true,
        docs: [
          {
            key: '/works/OL000W',
            title: 'No Reader Book',
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      await expect(adapter.getBookContent('OL000W')).rejects.toThrow(
        'No readable version available for this book'
      )
    })
  })

  describe('error handling', () => {
    it('should throw error on failed fetch', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response)

      await expect(adapter.getPopularBooks()).rejects.toThrow(
        'Open Library API error: 500 Internal Server Error'
      )
    })
  })
})
