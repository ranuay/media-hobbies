import type { MangaItem, FilmItem, BookItem } from '../types'

export interface MediaListParams {
  page?: number
  perPage?: number
  query?: string
}

export interface MangaAdapter {
  getPopularManga(params?: MediaListParams): Promise<MangaItem[]>
  searchManga(query: string): Promise<MangaItem[]>
  getMangaChapters(mangaId: string): Promise<unknown[]>
  getChapterPages(mangaId: string, chapterId: string): Promise<string[]>
}

export interface FilmAdapter {
  getPopularFilms(params?: MediaListParams): Promise<FilmItem[]>
  searchFilms(query: string): Promise<FilmItem[]>
  getFilmStreamUrl(filmId: string): Promise<string>
}

export interface BookAdapter {
  getPopularBooks(params?: MediaListParams): Promise<BookItem[]>
  searchBooks(query: string): Promise<BookItem[]>
  getBookContent(bookId: string): Promise<string>
}
