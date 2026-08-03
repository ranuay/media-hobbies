import { useState } from 'react'

/**
 * A hook that syncs state with localStorage.
 * 
 * @param key - The localStorage key to use
 * @param initialValue - The initial value if localStorage is empty
 * @returns A tuple of [storedValue, setValue] similar to useState
 * 
 * @example
 * ```tsx
 * const [name, setName] = useLocalStorage('user-name', 'Guest')
 * 
 * // Set with a new value
 * setName('John')
 * 
 * // Set with a function (like useState)
 * setName(prev => prev.toUpperCase())
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
