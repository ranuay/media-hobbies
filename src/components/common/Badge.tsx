import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'primary' | 'green' | 'amber' | 'red' | 'blue'
}

const TONES: Record<NonNullable<BadgeProps['tone']>, string> = {
  default:
    'bg-border/70 dark:bg-dark-border text-foreground dark:text-dark-foreground',
  primary:
    'bg-primary-light dark:bg-dark-primary-light text-primary-dark dark:text-dark-primary-dark',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
}

export default function Badge({ children, tone = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  )
}
