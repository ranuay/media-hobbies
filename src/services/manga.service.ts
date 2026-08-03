import { MangaDexAdapter } from '../adapters/MangaDexAdapter'
import type { MangaDexLanguage } from '../adapters/mangadex.types'

let mangaAdapter: MangaDexAdapter | null = null

export function getMangaAdapter(language: MangaDexLanguage = 'en'): MangaDexAdapter {
  if (!mangaAdapter) {
    mangaAdapter = new MangaDexAdapter(language)
  } else {
    mangaAdapter.setLanguage(language)
  }
  return mangaAdapter
}
