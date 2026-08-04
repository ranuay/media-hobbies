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
        eyebrow="roadmap"
        title="Roadmap Cybersecurity Fundamentals"
        description="Sepuluh topik berurutan. Selesaikan resource wajib untuk maju ke topik berikutnya."
      />

      {/* Summary bar */}
      <div className="mb-10 p-5 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface">
        <div className="flex justify-between items-center mb-2">
          <div className="eyebrow">topik selesai</div>
          <div className="stat-number text-sm font-semibold">
            {completedRequired} / {ordered.length}
          </div>
        </div>
        <div className="h-2 bg-border dark:bg-dark-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent dark:from-dark-primary dark:to-dark-accent rounded-full transition-all duration-500"
            style={{ width: `${(completedRequired / ordered.length) * 100}%` }}
          />
        </div>
        <div className="text-xs text-muted dark:text-dark-muted mt-2">
          {totalRequired} resource wajib total · progres dihitung dari resource wajib, bukan alternatif
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {ordered.map((topic, index) => {
          const status = getTopicStatus(topic, progress.completedResourceIds)
          const { done, total } = getTopicProgress(topic, progress.completedResourceIds)
          const hasPrereqs = (topic.prerequisites?.length ?? 0) > 0
          const isLast = index === ordered.length - 1

          return (
            <div key={topic.id} className="relative pl-14 sm:pl-16 pb-2">
              {/* Connecting line */}
              {!isLast && (
                <div
                  className={`absolute left-[21px] sm:left-[23px] top-8 bottom-0 w-px ${
                    status === 'completed'
                      ? 'bg-accent dark:bg-dark-accent'
                      : 'bg-border dark:bg-dark-border'
                  }`}
                />
              )}

              {/* Node */}
              <div className="absolute left-0 top-6 sm:left-1">
                <NodeStatus status={status} index={index} />
              </div>

              {/* Card */}
              <Link
                to={`/topics/${topic.id}`}
                className={`group block p-5 mb-4 border rounded-xl transition-all ${
                  status === 'completed'
                    ? 'border-accent/40 dark:border-dark-accent/40 bg-surface dark:bg-dark-surface'
                    : status === 'in-progress'
                      ? 'border-primary/40 dark:border-dark-primary/40 bg-surface dark:bg-dark-surface'
                      : 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface'
                } hover:border-primary/60 dark:hover:border-dark-primary/60 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="stat-number text-xs text-muted dark:text-dark-muted">
                        STEP {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display font-semibold">{topic.title}</h3>
                      {hasPrereqs && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-medium">
                          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M8 1.5 1.5 8 8 14.5 14.5 8 8 1.5Z" strokeLinejoin="round" />
                            <path d="M6.5 6.5h3M8 6.5V9.5" strokeLinecap="round" />
                          </svg>
                          {topic.prerequisites!.length} prasyarat
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted dark:text-dark-muted mt-2 leading-relaxed">
                      {topic.summary}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted dark:text-dark-muted">
                      <span className="stat-number">
                        {done}/{total} resource
                      </span>
                      <span className="stat-number">~{topic.estimatedHours} jam</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <StatusPill status={status} />
                    <span className="stat-number text-xs text-primary dark:text-dark-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Buka →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-10 p-6 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface text-center">
        <div className="eyebrow mb-2">selesai semua topik?</div>
        <h2 className="font-display text-xl font-semibold mb-2">Lanjut ke spesialisasi</h2>
        <p className="text-sm text-muted dark:text-dark-muted mb-4 max-w-xl mx-auto">
          Penetration Testing, SOC Analyst, Cloud Security, Forensics, atau AppSec — lengkap dengan
          skill, sertifikasi target, dan resource lanjutannya.
        </p>
        <Link
          to="/specializations"
          className="inline-block px-5 py-2.5 bg-primary dark:bg-dark-primary text-white rounded-lg font-medium hover:opacity-90 transition"
        >
          Lihat jalur karir →
        </Link>
      </div>
    </div>
  )
}

function NodeStatus({
  status,
  index,
}: {
  status: 'not-started' | 'in-progress' | 'completed'
  index: number
}) {
  const base = 'relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-colors'

  if (status === 'completed') {
    return (
      <div
        className={`${base} border-accent dark:border-dark-accent bg-accent dark:bg-dark-accent text-white shadow-[0_0_12px_rgba(16,185,129,0.35)] dark:shadow-[0_0_12px_rgba(52,211,153,0.35)]`}
      >
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  if (status === 'in-progress') {
    return (
      <div
        className={`${base} border-primary dark:border-dark-primary bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary shadow-[0_0_12px_rgba(14,116,144,0.25)] dark:shadow-[0_0_12px_rgba(34,211,238,0.25)]`}
      >
        <span className="stat-number font-semibold">{index + 1}</span>
        <span className="absolute -bottom-1 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-dark-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary dark:bg-dark-primary" />
        </span>
      </div>
    )
  }

  return (
    <div
      className={`${base} border-border dark:border-dark-border bg-surface dark:bg-dark-surface text-muted dark:text-dark-muted`}
    >
      <span className="stat-number font-semibold">{index + 1}</span>
    </div>
  )
}

function StatusPill({ status }: { status: 'not-started' | 'in-progress' | 'completed' }) {
  const map = {
    'not-started': {
      label: 'Belum mulai',
      className: 'bg-border/70 dark:bg-dark-border text-foreground dark:text-dark-foreground',
    },
    'in-progress': {
      label: 'Sedang dipelajari',
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    completed: {
      label: 'Selesai',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    },
  } as const
  const { label, className } = map[status]
  return (
    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}