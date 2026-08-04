import { useEffect, useState } from 'react'

interface SkeletonProps {
  height?: string
  width?: string
  className?: string
}

export function SkeletonBar({ height = 'h-4', width = 'w-full', className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-border/70 dark:bg-dark-border ${height} ${width} ${className}`}
    />
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse p-5 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface space-y-3 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <SkeletonBar width="w-24" height="h-3" />
        <SkeletonBar width="w-16" height="h-5" />
      </div>
      <SkeletonBar height="h-5" width="w-full" />
      <SkeletonBar height="h-5" width="w-4/5" />
      <div className="flex gap-2 pt-1">
        <SkeletonBar width="w-20" height="h-6" />
        <SkeletonBar width="w-24" height="h-6" />
        <SkeletonBar width="w-16" height="h-6" />
      </div>
    </div>
  )
}

export function useSimulatedLoading(duration = 500): boolean {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), duration)
    return () => clearTimeout(t)
  }, [duration])
  return loading
}