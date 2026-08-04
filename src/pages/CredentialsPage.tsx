import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { credentials } from '../data/credentials'
import { CREDENTIAL_TYPE_LABELS } from '../utils/labels'
import type { CredentialStatus, CredentialType } from '../types'
import PageHeader from '../components/common/PageHeader'
import Badge from '../components/common/Badge'

const ALL_TYPES = Object.keys(CREDENTIAL_TYPE_LABELS) as CredentialType[]

export default function CredentialsPage() {
  const [showClosed, setShowClosed] = useState(false)
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [providerFilter, setProviderFilter] = useState('')
  const [search, setSearch] = useState('')

  const providers = useMemo(
    () => Array.from(new Set(credentials.map((c) => c.provider))).sort(),
    []
  )

  const toggleType = (t: string) => {
    setTypeFilter((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  const visible = useMemo(() => {
    return credentials.filter((c) => {
      if (!showClosed && c.status === 'closed') return false
      if (typeFilter.length && !typeFilter.includes(c.type)) return false
      if (providerFilter && c.provider !== providerFilter) return false
      if (search) {
        const s = search.toLowerCase()
        if (!c.name.toLowerCase().includes(s) && !c.provider.toLowerCase().includes(s)) {
          return false
        }
      }
      return true
    })
  }, [showClosed, typeFilter, providerFilter, search])

  return (
    <div>
      <PageHeader
        eyebrow="credentials"
        title="Free Certificates & Badges"
        description="Direktori credential dengan status yang transparan. Lihat bagian 'Yang gratis' dan 'Kemungkinan biaya tambahan' sebelum mendaftar."
      />

      <div className="mb-6 p-5 border border-border dark:border-dark-border bg-surface dark:bg-dark-surface rounded-xl">
        <div className="text-sm text-muted dark:text-dark-muted mb-2">
          Semua status diverifikasi dari halaman resmi pada{' '}
          <strong className="text-foreground dark:text-dark-foreground">4 Agustus 2026</strong>. Info program dapat berubah.
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="default">
              Professional Certification — asesmen formal + aturan sertifikasi
            </Badge>
            <Badge tone="blue">Course Certificate / Statement of Participation</Badge>
            <Badge tone="green">Digital Badge</Badge>
            <Badge tone="amber">Training only — tanpa credential gratis terverifikasi</Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full sm:w-64">
          <label htmlFor="cred-search" className="text-xs text-muted dark:text-dark-muted block mb-1">
            Cari
          </label>
          <input
            id="cred-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nama atau provider..."
            className="w-full px-3 py-2 border border-border dark:border-dark-border rounded-lg bg-surface dark:bg-dark-surface text-sm focus:border-primary dark:focus:border-dark-primary focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showClosed}
            onChange={() => setShowClosed(!showClosed)}
            className="accent-primary"
          />
          Tampilkan program berstatus <strong>Ditutup</strong> (untuk pelaporan yang jujur)
        </label>

        <div className="flex flex-wrap gap-1.5">
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                typeFilter.includes(t)
                  ? 'bg-primary dark:bg-dark-primary text-white border-primary dark:border-dark-primary'
                  : 'border-border dark:border-dark-border text-muted dark:text-dark-muted hover:bg-surface dark:hover:bg-dark-surface'
              }`}
            >
              {CREDENTIAL_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="provider" className="text-xs text-muted dark:text-dark-muted block mb-1">
            Provider
          </label>
          <select
            id="provider"
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-1.5 border border-border dark:border-dark-border rounded-lg bg-surface dark:bg-dark-surface text-sm"
          >
            <option value="">Semua provider</option>
            {providers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="p-8 border border-dashed border-border dark:border-dark-border rounded-xl text-center text-muted dark:text-dark-muted">
          Tidak ada entri yang cocok dengan filter.
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {visible.map((c) => (
            <li key={c.id}>
              <Link
                to={`/credentials/${c.id}`}
                className="block p-5 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface hover:border-primary/50 dark:hover:border-dark-primary/50 hover:shadow-sm transition h-full"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-muted dark:text-dark-muted font-medium">{c.provider}</span>
                  <StatusBadge status={c.status} />
                </div>
                <h3 className="font-semibold leading-snug">{c.name}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <TypeBadge type={c.type} />
                  {c.status === 'limited' && <Badge tone="amber">Akses terbatas</Badge>}
                  {c.credentialFree ? (
                    <Badge tone="green">Credential gratis</Badge>
                  ) : (
                    <Badge tone="red">Credential berbayar / tidak gratis</Badge>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: CredentialStatus }) {
  const map: Record<CredentialStatus, { label: string; className: string }> = {
    active: {
      label: 'Aktif',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    },
    limited: {
      label: 'Akses terbatas',
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    unverified: {
      label: 'Belum terverifikasi',
      className: 'bg-border/70 dark:bg-dark-border text-foreground dark:text-dark-foreground',
    },
    closed: {
      label: 'Ditutup',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    },
  }
  const { label, className } = map[status]
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}

function TypeBadge({ type }: { type: CredentialType }) {
  const map: Record<CredentialType, 'default' | 'blue' | 'green' | 'amber'> = {
    'professional-certification': 'default',
    'course-certificate': 'blue',
    statement: 'blue',
    'digital-badge': 'green',
    'training-only': 'amber',
  }
  return <Badge tone={map[type]}>{CREDENTIAL_TYPE_LABELS[type]}</Badge>
}