import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MangaDexAdapter } from './MangaDexAdapter'
import type { MangaDexSearchResponse, MangaDexChapterResponse, MangaDexAtHomeResponse } from './mangadex.types'

globalThis.fetch = vi.fn()

describe('MangaDexAdapter', () => {
  let adapter: MangaDexAdapter

  beforeEach(() => {
    adapter = new MangaDexAdapter('en')
    vi.clearAllMocks()
  })

  describe('getPopularManga', () => {
    it('should fetch popular manga with both supported languages', async () => {
      const mockResponse: MangaDexSearchResponse = {
        result: 'ok',
        response: 'collection',
        data: [
          {
            id: 'manga-1',
            type: 'manga',
            attributes: {
              title: { en: 'One Piece' },
              description: { en: 'Pirate adventure' },
            },
            relationships: [
              {
                id: 'cover-1',
                type: 'cover_art',
                attributes: { fileName: 'cover.jpg' },
              },
            ],
          },
        ],
        limit: 40,
        offset: 0,
        total: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getPopularManga()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('availableTranslatedLanguage[]=en&availableTranslatedLanguage[]=id')
      )
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'manga-1',
        title: 'One Piece',
        coverImage: 'https://uploads.mangadex.org/covers/manga-1/cover.jpg',
        description: 'Pirate adventure',
      })
    })

    it('should use Indonesian title when preferred language is set to id', async () => {
      adapter.setLanguage('id')

      const mockResponse: MangaDexSearchResponse = {
        result: 'ok',
        response: 'collection',
        data: [
          {
            id: 'manga-1',
            type: 'manga',
            attributes: {
              title: { id: 'Satu Potong', en: 'One Piece' },
            },
            relationships: [],
          },
        ],
        limit: 40,
        offset: 0,
        total: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getPopularManga()
      expect(result[0].title).toBe('Satu Potong')
    })

    it('should support pagination', async () => {
      const mockResponse: MangaDexSearchResponse = {
        result: 'ok',
        response: 'collection',
        data: [],
        limit: 10,
        offset: 20,
        total: 0,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      await adapter.getPopularManga({ page: 3, perPage: 10 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=10&offset=20')
      )
    })

    it('should support Indonesian language', async () => {
      adapter.setLanguage('id')

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: 'ok',
          response: 'collection',
          data: [],
          limit: 20,
          offset: 0,
          total: 0,
        }),
      } as Response)

      await adapter.getPopularManga()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('availableTranslatedLanguage[]=id')
      )
    })
  })

  describe('searchManga', () => {
    it('should search manga by title', async () => {
      const mockResponse: MangaDexSearchResponse = {
        result: 'ok',
        response: 'collection',
        data: [
          {
            id: 'manga-2',
            type: 'manga',
            attributes: {
              title: { en: 'Naruto' },
            },
            relationships: [],
          },
        ],
        limit: 20,
        offset: 0,
        total: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.searchManga('naruto')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('title=naruto')
      )
      expect(result[0].title).toBe('Naruto')
    })

    it('should encode query parameters', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: 'ok',
          response: 'collection',
          data: [],
          limit: 20,
          offset: 0,
          total: 0,
        }),
      } as Response)

      await adapter.searchManga('one piece')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('title=one%20piece')
      )
    })
  })

  describe('getMangaChapters', () => {
    it('should fetch manga chapters', async () => {
      const mockResponse: MangaDexChapterResponse = {
        result: 'ok',
        response: 'collection',
        data: [
          {
            id: 'ch-1',
            type: 'chapter',
            attributes: {
              chapter: '1',
              title: 'Chapter 1',
              translatedLanguage: 'en',
              pages: 20,
              publishAt: '2020-01-01T00:00:00+00:00',
            },
          },
        ],
        limit: 100,
        offset: 0,
        total: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getMangaChapters('manga-1')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/manga/manga-1/feed')
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('translatedLanguage[]=en&translatedLanguage[]=id')
      )
      expect(result).toHaveLength(1)
      expect(result[0].attributes.chapter).toBe('1')
    })

    it('should filter out chapters with external URLs, zero chapters, and unavailable chapters', async () => {
      const mockResponse: MangaDexChapterResponse = {
        result: 'ok',
        response: 'collection',
        data: [
          {
            id: 'ch-ok',
            type: 'chapter',
            attributes: {
              chapter: '3',
              title: 'Real Chapter',
              translatedLanguage: 'en',
              pages: 20,
              publishAt: '2020-01-01T00:00:00+00:00',
            },
          },
          {
            id: 'ch-ext',
            type: 'chapter',
            attributes: {
              chapter: '1',
              title: 'External',
              translatedLanguage: 'en',
              pages: 5,
              publishAt: '2020-01-01T00:00:00+00:00',
              externalUrl: 'https://external.com/chapter',
            },
          },
          {
            id: 'ch-zero',
            type: 'chapter',
            attributes: {
              chapter: '0',
              title: 'Special Thanks',
              translatedLanguage: 'en',
              pages: 2,
              publishAt: '2020-01-01T00:00:00+00:00',
            },
          },
          {
            id: 'ch-unavail',
            type: 'chapter',
            attributes: {
              chapter: '2',
              title: 'Unavailable',
              translatedLanguage: 'en',
              pages: 10,
              publishAt: '2020-01-01T00:00:00+00:00',
              isUnavailable: true,
            },
          },
        ],
        limit: 100,
        offset: 0,
        total: 4,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getMangaChapters('manga-1')

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('ch-ok')
    })
  })

  describe('getChapterPages', () => {
    it('should fetch chapter images', async () => {
      const mockResponse: MangaDexAtHomeResponse = {
        result: 'ok',
        baseUrl: 'https://uploads.mangadex.org',
        chapter: {
          hash: 'abc123',
          data: ['page1.jpg', 'page2.jpg'],
          dataSaver: [],
        },
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getChapterPages('manga-1', 'ch-1')

      expect(fetch).toHaveBeenCalledWith(
        'https://api.mangadex.org/at-home/server/ch-1'
      )
      expect(result).toEqual([
        'https://uploads.mangadex.org/data/abc123/page1.jpg',
        'https://uploads.mangadex.org/data/abc123/page2.jpg',
      ])
    })
  })

  describe('error handling', () => {
    it('should throw error on failed fetch', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      await expect(adapter.getPopularManga()).rejects.toThrow(
        'MangaDex API error: 404 Not Found'
      )
    })
  })

  describe('language switching', () => {
    it('should allow changing language after initialization', async () => {
      const adapter = new MangaDexAdapter('en')
      adapter.setLanguage('id')

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: 'ok',
          response: 'collection',
          data: [],
          limit: 20,
          offset: 0,
          total: 0,
        }),
      } as Response)

      await adapter.getPopularManga()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('availableTranslatedLanguage[]=id')
      )
    })
  })
})
