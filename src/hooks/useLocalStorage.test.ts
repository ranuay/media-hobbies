import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('should load existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    expect(result.current[0]).toBe('stored-value')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(result.current[0]).toBe('new-value')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'))
  })

  it('should handle complex objects', () => {
    const initialObject = { manga: 'One Piece', chapter: 1 }
    const { result } = renderHook(() => useLocalStorage('test-key', initialObject))
    
    expect(result.current[0]).toEqual(initialObject)
    
    act(() => {
      result.current[1]({ manga: 'Naruto', chapter: 5 })
    })
    
    expect(result.current[0]).toEqual({ manga: 'Naruto', chapter: 5 })
  })

  it('should handle function updater', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0))
    
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    
    expect(result.current[0]).toBe(1)
  })

  it('should use initial value when localStorage has invalid JSON', () => {
    localStorage.setItem('test-key', 'invalid-json{')
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })

  it('should persist value across hook unmount and remount', () => {
    const { result, unmount } = renderHook(() => useLocalStorage('persist-key', 'initial'))
    
    act(() => {
      result.current[1]('persisted-value')
    })
    
    expect(result.current[0]).toBe('persisted-value')
    
    unmount()
    
    const { result: result2 } = renderHook(() => useLocalStorage('persist-key', 'initial'))
    expect(result2.current[0]).toBe('persisted-value')
  })
})
