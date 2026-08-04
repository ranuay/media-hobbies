import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'primary' | 'green' | 'amber' | 'red' | 'blue'
}

const TONES: Record<NonNullable<BadgeProps['tone']>, string> = {
  default: 'bg-border/70 text-foreground',
  primary: 'bg-primary-light text-primary-dark',
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
}

export default function Badge({ children, tone = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  )
}
