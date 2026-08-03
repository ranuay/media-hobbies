import { useState } from 'react'

export function useManga() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWithErrorHandling = async <T,>(
    fetchFn: () => Promise<T>
  ): Promise<T | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchFn()
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, fetchWithErrorHandling }
}
