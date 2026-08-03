import type { FilmAdapter, MediaListParams } from './types'
import type { FilmItem } from '../types'
import type { TMDBMovie, TMDBSearchResponse, TMDBTrendingResponse, TMDBMovieDetail } from './tmdb.types'

const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export class TMDBAdapter implements FilmAdapter {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${this.apiKey}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }

  private mapToFilmItem(movie: TMDBMovie): FilmItem {
    return {
      id: movie.id.toString(),
      title: movie.title,
      posterImage: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '',
      description: movie.overview,
      duration: undefined,
    }
  }

  async getPopularFilms(params?: MediaListParams): Promise<FilmItem[]> {
    const page = params?.page || 1
    const endpoint = `/trending/movie/week?page=${page}`
    
    const data = await this.fetchAPI<TMDBTrendingResponse>(endpoint)
    return data.results.map(movie => this.mapToFilmItem(movie))
  }

  async searchFilms(query: string): Promise<FilmItem[]> {
    const endpoint = `/search/movie?query=${encodeURIComponent(query)}`
    
    const data = await this.fetchAPI<TMDBSearchResponse>(endpoint)
    return data.results.map(movie => this.mapToFilmItem(movie))
  }

  async getFilmStreamUrl(filmId: string): Promise<string> {
    const data = await this.fetchAPI<TMDBMovieDetail>(`/movie/${filmId}?append_to_response=videos`)
    
    const trailer = data.videos?.results.find(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    )
    
    if (trailer) {
      return `https://www.youtube.com/watch?v=${trailer.key}`
    }
    
    throw new Error('No streaming URL available for this film')
  }

  async getFilmDetails(filmId: string): Promise<TMDBMovieDetail> {
    return this.fetchAPI<TMDBMovieDetail>(`/movie/${filmId}`)
  }
}
