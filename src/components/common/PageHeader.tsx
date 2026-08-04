interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
}

export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <div className="py-6 mb-8">
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted dark:text-dark-muted mt-2 max-w-2xl">{description}</p>
      )}
    </div>
  )
}