export interface TMDBMovie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
}

export interface TMDBMovieDetail extends TMDBMovie {
  runtime: number | null
  genres: Array<{ id: number; name: string }>
  videos?: {
    results: Array<{
      key: string
      site: string
      type: string
      official: boolean
    }>
  }
}

export interface TMDBSearchResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

export interface TMDBTrendingResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}
