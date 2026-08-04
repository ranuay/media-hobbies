import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { ProgressState } from '../types'

export const PROGRESS_STORAGE_KEY = 'cyberpath-progress'

const EMPTY_PROGRESS: ProgressState = {
  completedResourceIds: [],
  checkedChecklistIds: {},
}

interface ProgressContextValue {
  progress: ProgressState
  toggleResourceComplete: (resourceId: string) => void
  isResourceComplete: (resourceId: string) => boolean
  toggleChecklistItem: (topicId: string, item: string) => void
  isChecklistItemChecked: (topicId: string, item: string) => boolean
  resetProgress: () => void
  exportProgress: () => string
  importProgress: (json: string) => boolean
  completedCount: number
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useLocalStorage<ProgressState>(
    PROGRESS_STORAGE_KEY,
    EMPTY_PROGRESS
  )

  const toggleResourceComplete = (resourceId: string) => {
    setProgress((prev) => {
      const isComplete = prev.completedResourceIds.includes(resourceId)
      return {
        ...prev,
        completedResourceIds: isComplete
          ? prev.completedResourceIds.filter((id) => id !== resourceId)
          : [...prev.completedResourceIds, resourceId],
      }
    })
  }

  const isResourceComplete = (resourceId: string) =>
    progress.completedResourceIds.includes(resourceId)

  const toggleChecklistItem = (topicId: string, item: string) => {
    setProgress((prev) => {
      const topicItems = prev.checkedChecklistIds[topicId] || []
      const isChecked = topicItems.includes(item)
      return {
        ...prev,
        checkedChecklistIds: {
          ...prev.checkedChecklistIds,
          [topicId]: isChecked
            ? topicItems.filter((i) => i !== item)
            : [...topicItems, item],
        },
      }
    })
  }

  const isChecklistItemChecked = (topicId: string, item: string) =>
    (progress.checkedChecklistIds[topicId] || []).includes(item)

  const resetProgress = () => setProgress(EMPTY_PROGRESS)

  const exportProgress = () => JSON.stringify(progress, null, 2)

  const importProgress = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as ProgressState
      if (!Array.isArray(parsed.completedResourceIds)) return false
      if (typeof parsed.checkedChecklistIds !== 'object' || parsed.checkedChecklistIds === null) {
        return false
      }
      setProgress({
        completedResourceIds: parsed.completedResourceIds,
        checkedChecklistIds: parsed.checkedChecklistIds,
      })
      return true
    } catch {
      return false
    }
  }

  const value: ProgressContextValue = {
    progress,
    toggleResourceComplete,
    isResourceComplete,
    toggleChecklistItem,
    isChecklistItemChecked,
    resetProgress,
    exportProgress,
    importProgress,
    completedCount: progress.completedResourceIds.length,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return ctx
}
