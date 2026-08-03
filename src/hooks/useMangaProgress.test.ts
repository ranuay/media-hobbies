import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useMangaProgress } from './useMangaProgress'

describe('useMangaProgress', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty progress map', () => {
    const { result } = renderHook(() => useMangaProgress())
    expect(result.current.progressMap).toEqual({})
  })

  it('should save progress for a manga', () => {
    const { result } = renderHook(() => useMangaProgress())

    act(() => {
      result.current.saveProgress('manga-1', {
        chapterId: 'ch-5',
        page: 10,
        totalPages: 20,
      })
    })

    expect(result.current.progressMap['manga-1']).toMatchObject({
      chapterId: 'ch-5',
      page: 10,
      totalPages: 20,
    })
    expect(result.current.progressMap['manga-1'].lastAccessed).toBeDefined()
  })

  it('should get progress for a specific manga', () => {
    const { result } = renderHook(() => useMangaProgress())

    act(() => {
      result.current.saveProgress('manga-2', {
        chapterId: 'ch-1',
        page: 5,
        totalPages: 15,
      })
    })

    const progress = result.current.getProgress('manga-2')
    expect(progress).toEqual(
      expect.objectContaining({
        chapterId: 'ch-1',
        page: 5,
        totalPages: 15,
      })
    )
  })

  it('should return undefined for manga with no progress', () => {
    const { result } = renderHook(() => useMangaProgress())
    expect(result.current.getProgress('nonexistent')).toBeUndefined()
  })

  it('should clear progress for a manga', () => {
    const { result } = renderHook(() => useMangaProgress())

    act(() => {
      result.current.saveProgress('manga-3', {
        chapterId: 'ch-1',
        page: 1,
        totalPages: 10,
      })
    })

    act(() => {
      result.current.clearProgress('manga-3')
    })

    expect(result.current.getProgress('manga-3')).toBeUndefined()
  })

  it('should update existing progress and preserve other manga', () => {
    const { result } = renderHook(() => useMangaProgress())

    act(() => {
      result.current.saveProgress('manga-1', {
        chapterId: 'ch-1',
        page: 1,
        totalPages: 10,
      })
      result.current.saveProgress('manga-2', {
        chapterId: 'ch-1',
        page: 1,
        totalPages: 10,
      })
    })

    act(() => {
      result.current.saveProgress('manga-1', {
        chapterId: 'ch-2',
        page: 3,
        totalPages: 12,
      })
    })

    expect(result.current.progressMap['manga-1'].chapterId).toBe('ch-2')
    expect(result.current.progressMap['manga-2'].chapterId).toBe('ch-1')
  })

  it('should persist progress across remounts', () => {
    const { result, unmount } = renderHook(() => useMangaProgress())

    act(() => {
      result.current.saveProgress('manga-1', {
        chapterId: 'ch-1',
        page: 7,
        totalPages: 20,
      })
    })

    unmount()

    const { result: result2 } = renderHook(() => useMangaProgress())
    expect(result2.current.progressMap['manga-1']).toMatchObject({
      chapterId: 'ch-1',
      page: 7,
      totalPages: 20,
    })
  })
})
