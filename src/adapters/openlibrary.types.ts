export interface OpenLibraryDoc {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  number_of_pages_median?: number
  isbn?: string[]
  subject?: string[]
  ia?: string[]
}

export interface OpenLibrarySearchResponse {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: OpenLibraryDoc[]
}

export interface OpenLibraryWork {
  key: string
  title: string
  description?: string | { type: string; value: string }
  covers?: number[]
  authors?: Array<{
    author: {
      key: string
    }
    type: {
      key: string
    }
  }>
}

export interface OpenLibraryAuthor {
  key: string
  name: string
  birth_date?: string
  bio?: string | { type: string; value: string }
}
