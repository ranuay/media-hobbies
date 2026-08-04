import { Link } from 'react-router-dom'
import { getTopicsInOrder, getTopicStatus, getTopicProgress } from '../utils/labels'
import { useProgress } from '../context/ProgressContext'
import PageHeader from '../components/common/PageHeader'

export default function RoadmapPage() {
  const { progress } = useProgress()
  const ordered = getTopicsInOrder()

  const totalRequired = ordered.reduce((sum, t) => sum + t.primaryResourceIds.length, 0)
  const completedRequired = ordered.filter((t) =>
    t.primaryResourceIds.every((id) => progress.completedResourceIds.includes(id))
  ).length

  return (
    <div>
      <PageHeader
        title="Roadmap Cybersecurity Fundamentals"
        description="Sepuluh topik berurutan. Selesaikan resource wajib untuk maju ke topik berikutnya."
      />

      <div className="mb-8 p-5 border border-border rounded-xl bg-surface">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted">Topik selesai</div>
          <div className="text-sm font-semibold">
            {completedRequired} / {ordered.length}
          </div>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(completedRequired / ordered.length) * 100}%` }}
          />
        </div>
        <div className="text-xs text-muted mt-2">
          {totalRequired} resource wajib total · progres dihitung dari resource wajib, bukan alternatif
        </div>
      </div>

      <ol className="space-y-3">
        {ordered.map((topic, index) => {
          const status = getTopicStatus(topic, progress.completedResourceIds)
          const { done, total } = getTopicProgress(topic, progress.completedResourceIds)
          return (
            <li key={topic.id}>
              <Link
                to={`/topics/${topic.id}`}
                className="block p-5 border border-border rounded-xl bg-surface hover:border-primary/50 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-light text-primary-dark text-xs font-bold">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold">{topic.title}</h3>
                    </div>
                    <p className="text-sm text-muted mt-2 leading-relaxed">{topic.summary}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={status} />
                    <div className="text-xs text-muted mt-2">
                      {done}/{total} resource · ~{topic.estimatedHours} jam
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function StatusBadge({ status }: { status: 'not-started' | 'in-progress' | 'completed' }) {
  const map = {
    'not-started': { label: 'Belum mulai', className: 'bg-border/70 text-foreground' },
    'in-progress': { label: 'Sedang dipelajari', className: 'bg-amber-100 text-amber-800' },
    completed: { label: 'Selesai', className: 'bg-green-100 text-green-800' },
  } as const
  const { label, className } = map[status]
  return (
    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}