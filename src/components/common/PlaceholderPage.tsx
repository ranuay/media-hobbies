interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="pt-20 px-8">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <p className="text-gray-400">Coming soon...</p>
    </div>
  )
}
