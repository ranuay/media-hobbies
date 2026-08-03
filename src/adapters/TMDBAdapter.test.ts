import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TMDBAdapter } from './TMDBAdapter'
import type { TMDBTrendingResponse, TMDBSearchResponse, TMDBMovieDetail } from './tmdb.types'

global.fetch = vi.fn()

describe('TMDBAdapter', () => {
  let adapter: TMDBAdapter
  const mockApiKey = 'test-api-key'

  beforeEach(() => {
    adapter = new TMDBAdapter(mockApiKey)
    vi.clearAllMocks()
  })

  describe('getPopularFilms', () => {
    it('should fetch trending films', async () => {
      const mockResponse: TMDBTrendingResponse = {
        page: 1,
        results: [
          {
            id: 123,
            title: 'Test Movie',
            poster_path: '/poster.jpg',
            backdrop_path: '/backdrop.jpg',
            overview: 'Test overview',
            release_date: '2026-01-01',
            vote_average: 8.5,
            vote_count: 1000,
            popularity: 100,
            genre_ids: [28, 12],
          },
        ],
        total_pages: 1,
        total_results: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getPopularFilms()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/trending/movie/week')
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('api_key=test-api-key')
      )
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: '123',
        title: 'Test Movie',
        posterImage: 'https://image.tmdb.org/t/p/w500/poster.jpg',
        description: 'Test overview',
        duration: undefined,
      })
    })

    it('should support pagination', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          page: 2,
          results: [],
          total_pages: 5,
          total_results: 100,
        }),
      } as Response)

      await adapter.getPopularFilms({ page: 2 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
      )
    })

    it('should handle missing poster path', async () => {
      const mockResponse: TMDBTrendingResponse = {
        page: 1,
        results: [
          {
            id: 456,
            title: 'No Poster Movie',
            poster_path: null,
            backdrop_path: null,
            overview: 'Movie without poster',
            release_date: '2026-02-01',
            vote_average: 7.0,
            vote_count: 500,
            popularity: 50,
            genre_ids: [18],
          },
        ],
        total_pages: 1,
        total_results: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getPopularFilms()

      expect(result[0].posterImage).toBe('')
    })
  })

  describe('searchFilms', () => {
    it('should search films by query', async () => {
      const mockResponse: TMDBSearchResponse = {
        page: 1,
        results: [
          {
            id: 789,
            title: 'Searched Movie',
            poster_path: '/search.jpg',
            backdrop_path: null,
            overview: 'Search result',
            release_date: '2026-03-01',
            vote_average: 6.5,
            vote_count: 200,
            popularity: 30,
            genre_ids: [35],
          },
        ],
        total_pages: 1,
        total_results: 1,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.searchFilms('test query')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/search/movie')
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('query=test%20query')
      )
      expect(result[0].title).toBe('Searched Movie')
    })
  })

  describe('getFilmStreamUrl', () => {
    it('should return YouTube trailer URL when available', async () => {
      const mockResponse: TMDBMovieDetail = {
        id: 111,
        title: 'Movie with Trailer',
        poster_path: '/poster.jpg',
        backdrop_path: null,
        overview: 'Has trailer',
        release_date: '2026-04-01',
        vote_average: 8.0,
        vote_count: 1500,
        popularity: 80,
        genre_ids: [28],
        runtime: 120,
        genres: [{ id: 28, name: 'Action' }],
        videos: {
          results: [
            {
              key: 'abc123xyz',
              site: 'YouTube',
              type: 'Trailer',
              official: true,
            },
          ],
        },
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await adapter.getFilmStreamUrl('111')

      expect(result).toBe('https://www.youtube.com/watch?v=abc123xyz')
    })

    it('should throw error when no trailer available', async () => {
      const mockResponse: TMDBMovieDetail = {
        id: 222,
        title: 'Movie without Trailer',
        poster_path: '/poster.jpg',
        backdrop_path: null,
        overview: 'No trailer',
        release_date: '2026-05-01',
        vote_average: 7.5,
        vote_count: 800,
        popularity: 60,
        genre_ids: [18],
        runtime: 90,
        genres: [{ id: 18, name: 'Drama' }],
        videos: {
          results: [],
        },
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      await expect(adapter.getFilmStreamUrl('222')).rejects.toThrow(
        'No streaming URL available for this film'
      )
    })
  })

  describe('error handling', () => {
    it('should throw error on failed fetch', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      } as Response)

      await expect(adapter.getPopularFilms()).rejects.toThrow(
        'TMDB API error: 401 Unauthorized'
      )
    })
  })
})
