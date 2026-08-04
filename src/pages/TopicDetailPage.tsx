import { Link, useParams } from 'react-router-dom'
import { getTopicById } from '../utils/labels'
import { getResourceById } from '../utils/labels'
import { useProgress } from '../context/ProgressContext'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/common/Badge'
import ExternalLink from '../components/common/ExternalLink'

export default function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const topic = topicId ? getTopicById(topicId) : undefined
  const { isResourceComplete, toggleResourceComplete, toggleChecklistItem, isChecklistItemChecked } =
    useProgress()

  if (!topic) {
    return (
      <div className="text-center py-16">
        <p className="text-muted dark:text-dark-muted">Topik tidak ditemukan.</p>
        <Link to="/roadmap" className="text-primary dark:text-dark-primary hover:underline mt-4 inline-block">
          ← Kembali ke roadmap
        </Link>
      </div>
    )
  }

  const primaryResources = topic.primaryResourceIds.map(getResourceById).filter(Boolean)
  const alternativeResources = topic.alternativeResourceIds.map(getResourceById).filter(Boolean)
  const prerequisiteTopics = (topic.prerequisites ?? []).map(getTopicById).filter(Boolean)

  return (
    <div>
      <Link to="/roadmap" className="text-primary dark:text-dark-primary hover:underline text-sm">
        ← Kembali ke roadmap
      </Link>
      <PageHeader title={topic.title} description={topic.summary} />

      {prerequisiteTopics.length > 0 && (
        <section className="mb-8 p-5 border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
          <h2 className="font-semibold mb-2">Prasyarat</h2>
          <p className="text-sm text-amber-900 dark:text-amber-200 mb-3">
            Disarankan untuk menyelesaikan topik berikut sebelum membuka topik ini:
          </p>
          <ul className="flex flex-wrap gap-2">
            {prerequisiteTopics.map((p) => (
              <li key={p!.id}>
                <Link
                  to={`/topics/${p!.id}`}
                  className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-dark-surface border border-amber-200 dark:border-amber-800/50 rounded-lg text-sm hover:border-amber-400 dark:hover:border-amber-500"
                >
                  {p!.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Tujuan Belajar</h2>
        <ul className="space-y-2">
          {topic.learningGoals.map((goal, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="text-primary dark:text-dark-primary mt-1">•</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Resource Wajib <span className="text-sm text-muted dark:text-dark-muted font-normal">({primaryResources.length})</span>
        </h2>
        <div className="space-y-3">
          {primaryResources.map((r) => {
            if (!r) return null
            const complete = isResourceComplete(r.id)
            return (
              <div
                key={r.id}
                className={`p-4 border rounded-xl transition ${
                  complete
                    ? 'border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/20'
                    : 'border-border dark:border-dark-border bg-surface dark:bg-dark-surface'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{r.title}</h3>
                    <div className="text-sm text-muted dark:text-dark-muted mt-1">{r.provider}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge tone="primary">{formatLabel(r.format)}</Badge>
                      <Badge tone={costTone(r.accessCost)}>{costLabel(r.accessCost)}</Badge>
                      <Badge tone="default">{levelLabel(r.level)}</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <ExternalLink href={r.officialUrl}>Buka resource ↗</ExternalLink>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleResourceComplete(r.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                      complete
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/70'
                        : 'border-border dark:border-dark-border text-foreground dark:text-dark-foreground hover:bg-border/30 dark:hover:bg-dark-border/30'
                    }`}
                    aria-pressed={complete}
                  >
                    {complete ? '✓ Selesai' : 'Tandai selesai'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {alternativeResources.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Resource Alternatif{' '}
            <span className="text-sm text-muted dark:text-dark-muted font-normal">
              (tidak dihitung untuk progres)
            </span>
          </h2>
          <div className="space-y-3">
            {alternativeResources.map((r) => {
              if (!r) return null
              return (
                <div key={r.id} className="p-4 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface">
                  <h3 className="font-medium">{r.title}</h3>
                  <div className="text-sm text-muted dark:text-dark-muted mt-1">{r.provider}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge tone="default">{formatLabel(r.format)}</Badge>
                    <Badge tone={costTone(r.accessCost)}>{costLabel(r.accessCost)}</Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <ExternalLink href={r.officialUrl}>Buka resource ↗</ExternalLink>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {topic.practiceGuide && (
        <section className="mb-10 p-5 border border-primary/30 dark:border-dark-primary/30 bg-primary-light dark:bg-dark-primary-light rounded-xl">
          <h2 className="font-semibold mb-2">Panduan Praktik (Sandbox)</h2>
          <p className="text-sm leading-relaxed">{topic.practiceGuide}</p>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Checklist</h2>
        <ul className="space-y-2">
          {topic.checklist.map((item, i) => {
            const checked = isChecklistItemChecked(topic.id, item)
            return (
              <li key={i}>
                <label className="flex items-start gap-3 p-3 border border-border dark:border-dark-border rounded-lg cursor-pointer hover:bg-surface dark:hover:bg-dark-surface">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleChecklistItem(topic.id, item)}
                    className="mt-1 accent-primary"
                    aria-label={item}
                  />
                  <span className={checked ? 'line-through text-muted dark:text-dark-muted' : ''}>{item}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </section>

      {topic.nextSteps && (
        <section className="p-5 border border-border dark:border-dark-border bg-surface dark:bg-dark-surface rounded-xl">
          <h2 className="font-semibold mb-2">Langkah berikutnya</h2>
          <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">{topic.nextSteps}</p>
        </section>
      )}
    </div>
  )
}

function formatLabel(format: string): string {
  return format.charAt(0).toUpperCase() + format.slice(1)
}

function costLabel(c: string): string {
  return { free: 'Gratis', freemium: 'Freemium', paid: 'Berbayar' }[c] || c
}

function costTone(c: string): 'green' | 'amber' | 'red' {
  return ({ free: 'green', freemium: 'amber', paid: 'red' } as const)[c as 'free' | 'freemium' | 'paid'] ?? 'default'
}

function levelLabel(l: string): string {
  return { beginner: 'Pemula', intermediate: 'Menengah', advanced: 'Lanjutan' }[l] || l
}