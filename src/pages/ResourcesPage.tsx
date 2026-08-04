import { useMemo, useState, useEffect } from 'react'
import { resources } from '../data/resources'
import {
  COST_LABELS,
  FORMAT_LABELS,
  LEVEL_LABELS,
  PRACTICE_LABELS,
} from '../utils/labels'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/common/Badge'
import ExternalLink from '../components/common/ExternalLink'
import { SkeletonCard, useSimulatedLoading } from '../components/common/Skeleton'

const ALL_FORMATS = Object.keys(FORMAT_LABELS) as (keyof typeof FORMAT_LABELS)[]
const ALL_LEVELS = Object.keys(LEVEL_LABELS) as (keyof typeof LEVEL_LABELS)[]
const ALL_COSTS = Object.keys(COST_LABELS) as (keyof typeof COST_LABELS)[]
const ALL_PRACTICE = Object.keys(PRACTICE_LABELS) as (keyof typeof PRACTICE_LABELS)[]
const PER_PAGE = 6

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [formats, setFormats] = useState<string[]>([])
  const [levels, setLevels] = useState<string[]>([])
  const [costs, setCosts] = useState<string[]>([])
  const [practice, setPractice] = useState<string[]>([])
  const [needsAccount, setNeedsAccount] = useState(false)
  const [needsLab, setNeedsLab] = useState(false)
  const [page, setPage] = useState(1)
  const loading = useSimulatedLoading(350)

  const toggle = (list: string[], setter: (v: string[]) => void, value: string) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const reset = () => {
    setSearch('')
    setFormats([])
    setLevels([])
    setCosts([])
    setPractice([])
    setNeedsAccount(false)
    setNeedsLab(false)
  }

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (search) {
        const s = search.toLowerCase()
        if (!r.title.toLowerCase().includes(s) && !r.provider.toLowerCase().includes(s)) {
          return false
        }
      }
      if (formats.length && !formats.includes(r.format)) return false
      if (levels.length && !levels.includes(r.level)) return false
      if (costs.length && !costs.includes(r.accessCost)) return false
      if (practice.length && !practice.includes(r.theoryPractice)) return false
      if (needsAccount && !r.requiresAccount) return false
      if (needsLab && !r.requiresLabOrVm) return false
      return true
    })
  }, [search, formats, levels, costs, practice, needsAccount, needsLab])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))

  // reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [filtered.length])

  const start = (page - 1) * PER_PAGE
  const pageItems = filtered.slice(start, start + PER_PAGE)

  return (
    <div>
      <PageHeader
        eyebrow="catalog"
        title="Resource Catalog"
        description="Resource dikurasi dari sumber resmi atau tepercaya. Beberapa materi gratis memiliki lab atau exam berbayar."
      />

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div>
            <label htmlFor="search" className="text-sm font-medium">
              Cari
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Judul atau provider..."
              className="w-full mt-1 px-3 py-2 border border-border dark:border-dark-border rounded-lg bg-surface dark:bg-dark-surface text-sm focus:border-primary dark:focus:border-dark-primary focus:outline-none"
            />
          </div>

          <FilterGroup title="Format">
            {ALL_FORMATS.map((f) => (
              <Checkbox
                key={f}
                label={FORMAT_LABELS[f]}
                checked={formats.includes(f)}
                onChange={() => toggle(formats, setFormats, f)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Level">
            {ALL_LEVELS.map((l) => (
              <Checkbox
                key={l}
                label={LEVEL_LABELS[l]}
                checked={levels.includes(l)}
                onChange={() => toggle(levels, setLevels, l)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Akses">
            {ALL_COSTS.map((c) => (
              <Checkbox
                key={c}
                label={COST_LABELS[c]}
                checked={costs.includes(c)}
                onChange={() => toggle(costs, setCosts, c)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Teori / Praktik">
            {ALL_PRACTICE.map((p) => (
              <Checkbox
                key={p}
                label={PRACTICE_LABELS[p]}
                checked={practice.includes(p)}
                onChange={() => toggle(practice, setPractice, p)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Persyaratan">
            <Checkbox
              label="Memerlukan akun"
              checked={needsAccount}
              onChange={() => setNeedsAccount(!needsAccount)}
            />
            <Checkbox
              label="Memerlukan lab/VM"
              checked={needsLab}
              onChange={() => setNeedsLab(!needsLab)}
            />
          </FilterGroup>

          <button
            onClick={reset}
            className="w-full px-3 py-2 border border-border dark:border-dark-border rounded-lg text-sm hover:bg-surface dark:hover:bg-dark-surface transition"
          >
            Reset semua filter
          </button>
        </aside>

        <div>
          <div className="text-sm text-muted dark:text-dark-muted mb-4">
            {filtered.length} resource
          </div>

          {loading ? (
            <div className="space-y-3" aria-busy="true" aria-label="Memuat resource">
              {Array.from({ length: PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 border border-dashed border-border dark:border-dark-border rounded-xl text-center">
              <p className="text-muted dark:text-dark-muted mb-3">Tidak ada resource yang cocok dengan filter saat ini.</p>
              <button onClick={reset} className="text-primary dark:text-dark-primary hover:underline text-sm">
                Reset filter
              </button>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {pageItems.map((r) => (
                  <li
                    key={r.id}
                    className="p-4 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface hover:border-primary/50 dark:hover:border-dark-primary/50 transition"
                  >
                    <h3 className="font-medium">{r.title}</h3>
                    <div className="text-sm text-muted dark:text-dark-muted mt-1">{r.provider}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge tone="primary">{FORMAT_LABELS[r.format]}</Badge>
                      <Badge tone={costTone(r.accessCost)}>{COST_LABELS[r.accessCost]}</Badge>
                      <Badge tone="default">{LEVEL_LABELS[r.level]}</Badge>
                      <Badge tone="default">{PRACTICE_LABELS[r.theoryPractice]}</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <ExternalLink href={r.officialUrl}>Buka resource ↗</ExternalLink>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-border dark:border-dark-border rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface dark:hover:bg-dark-surface transition"
                  >
                    ← Sebelumnya
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                          n === page
                            ? 'bg-primary dark:bg-dark-primary text-white'
                            : 'border border-border dark:border-dark-border text-muted dark:text-dark-muted hover:bg-surface dark:hover:bg-dark-surface'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 border border-border dark:border-dark-border rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface dark:hover:bg-dark-surface transition"
                  >
                    Berikutnya →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border dark:border-dark-border rounded-xl p-3">
      <legend className="text-xs uppercase tracking-wider text-muted dark:text-dark-muted px-1">{title}</legend>
      <div className="space-y-1.5">{children}</div>
    </fieldset>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-primary" />
      {label}
    </label>
  )
}

// rarr shorthand di JSX di-resolve saat build
function costTone(c: 'free' | 'freemium' | 'paid'): 'green' | 'amber' | 'red' {
  return ({ free: 'green', freemium: 'amber', paid: 'red' } as const)[c]
}