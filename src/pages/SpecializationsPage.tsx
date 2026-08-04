import { useState } from 'react'
import { specializations } from '../data/specializations'
import PageHeader from '../components/common/PageHeader'
import ExternalLink from '../components/common/ExternalLink'

export default function SpecializationsPage() {
  const [openId, setOpenId] = useState<string | null>(specializations[0]?.id ?? null)

  return (
    <div>
      <PageHeader
        eyebrow="specializations"
        title="Lanjutan Karir setelah Roadmap"
        description="Setelah capstone, pilih satu arah. Tiap spesialisasi punya skill, langkah, sertifikasi, dan resource lanjutannya."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {specializations.map((spec) => {
          const isOpen = openId === spec.id
          return (
            <div
              key={spec.id}
              className={`border rounded-xl bg-surface dark:bg-dark-surface transition-all ${
                isOpen
                  ? 'border-primary/50 dark:border-dark-primary/50 shadow-md sm:col-span-2'
                  : 'border-border dark:border-dark-border hover:border-primary/40 dark:hover:border-dark-primary/40'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : spec.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4"
                aria-expanded={isOpen}
              >
                <div>
                  <div className="eyebrow mb-1">{spec.role}</div>
                  <h3 className="font-display font-semibold text-lg">{spec.title}</h3>
                  <p className="text-sm text-muted dark:text-dark-muted mt-1 leading-relaxed">
                    {spec.summary}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="stat-number text-xs text-primary dark:text-dark-primary">
                    {spec.timeToEntry}
                  </div>
                  <div className="mt-2 text-xl text-muted dark:text-dark-muted">
                    {isOpen ? '−' : '+'}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 grid gap-5 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <div className="eyebrow mb-3">skill set</div>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded-md bg-primary-light dark:bg-dark-primary-light text-primary-dark dark:text-dark-primary-dark text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-5">
                    <div>
                      <div className="eyebrow mb-3">langkah lanjutan</div>
                      <ol className="space-y-2">
                        {spec.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted dark:text-dark-muted">
                            <span className="stat-number text-primary dark:text-dark-primary shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <div className="eyebrow mb-3">sertifikasi target</div>
                      <ul className="space-y-2">
                        {spec.certs.map((cert) => (
                          <li
                            key={cert.name}
                            className="flex items-center justify-between gap-3 p-3 border border-border dark:border-dark-border rounded-lg"
                          >
                            <div>
                              <div className="text-sm font-medium">{cert.name}</div>
                              <div className="text-xs text-muted dark:text-dark-muted">
                                {cert.provider}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                                  cert.costHint === 'Gratis'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                                }`}
                              >
                                {cert.costHint}
                              </span>
                              <ExternalLink href={cert.url}>↗</ExternalLink>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="eyebrow mb-3">resource lanjutan</div>
                      <ul className="space-y-2">
                        {spec.resources.map((r) => (
                          <li key={r.title} className="text-sm">
                            <ExternalLink href={r.url}>{r.title}</ExternalLink>
                            <span className="text-muted dark:text-dark-muted"> — {r.provider}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
