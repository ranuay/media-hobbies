interface PathNodeProps {
  step: string
  label: string
  active?: boolean
  done?: boolean
}

export function PathNode({ step, label, active, done }: PathNodeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
          done
            ? 'bg-accent dark:bg-dark-accent border-accent dark:border-dark-accent'
            : active
              ? 'bg-primary dark:bg-dark-primary border-primary dark:border-dark-primary shadow-[0_0_0_4px_rgba(14,116,144,0.18)] dark:shadow-[0_0_0_4px_rgba(34,211,238,0.18)]'
              : 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface'
        }`}
      />
      <div className="text-center">
        <div className="stat-number text-[10px] text-muted dark:text-dark-muted">{step}</div>
        <div className="text-[11px] font-medium leading-tight">{label}</div>
      </div>
    </div>
  )
}