import { Link, useParams } from 'react-router-dom'
import { getCredentialById } from '../utils/labels'
import {
  CREDENTIAL_STATUS_LABELS,
  CREDENTIAL_TYPE_LABELS,
} from '../utils/labels'
import ExternalLink from '../components/common/ExternalLink'
import Badge from '../components/common/Badge'

export default function CredentialDetailPage() {
  const { credentialId } = useParams<{ credentialId: string }>()
  const credential = credentialId ? getCredentialById(credentialId) : undefined

  if (!credential) {
    return (
      <div className="text-center py-16">
        <p className="text-muted">Credential tidak ditemukan.</p>
        <Link to="/credentials" className="text-primary hover:underline mt-4 inline-block">
          ← Kembali ke direktori
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/credentials" className="text-primary hover:underline text-sm">
        ← Kembali ke direktori
      </Link>

      <header className="mt-4 mb-8">
        <div className="text-sm text-muted font-medium">{credential.provider}</div>
        <h1 className="text-3xl font-bold mt-1 tracking-tight">{credential.name}</h1>
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Badge tone="primary">{CREDENTIAL_TYPE_LABELS[credential.type]}</Badge>
          <StatusBadge status={credential.status} />
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <FactCard label="Yang gratis">
          <div className="space-y-1 text-sm">
            <div>
              <strong>Akses kursus:</strong> {credential.courseFree ? '✓ Gratis' : '✗ Tidak gratis'}
            </div>
            <div>
              <strong>Credential:</strong>{' '}
              {credential.credentialFree ? '✓ Gratis' : '✗ Tidak gratis'}
            </div>
            {credential.examFree !== undefined && (
              <div>
                <strong>Exam:</strong>{' '}
                {credential.examFree ? '✓ Gratis' : '✗ Tidak gratis'}
              </div>
            )}
          </div>
        </FactCard>

        <FactCard label="Persyaratan">
          {credential.eligibility ? (
            <p className="text-sm leading-relaxed">{credential.eligibility}</p>
          ) : (
            <p className="text-sm text-muted">Tidak ada informasi tambahan.</p>
          )}
        </FactCard>

        {credential.extraCosts && (
          <FactCard label="Kemungkinan biaya tambahan">
            <p className="text-sm leading-relaxed">{credential.extraCosts}</p>
          </FactCard>
        )}

        <FactCard label="Link resmi">
          <ExternalLink href={credential.officialUrl}>{credential.officialUrl}</ExternalLink>
        </FactCard>
      </div>

      <section className="p-5 border border-primary/30 bg-primary-light rounded-xl">
        <h2 className="font-semibold mb-2">Catatan verifikasi</h2>
        <p className="text-sm leading-relaxed">{credential.evidenceNote}</p>
        <p className="text-xs text-muted mt-3">
          Terakhir diverifikasi: {formatDate(credential.lastVerifiedAt)}
        </p>
      </section>

      <div className="mt-8 p-5 border border-border rounded-xl bg-surface">
        <h2 className="font-semibold mb-2">Laporkan jika informasi berubah</h2>
        <p className="text-sm text-muted mb-3">
          CyberPath tidak menjalankan sistem moderasi khusus. Jika menemukan program ini
          sudah tidak gratis, link rusak, atau informasi salah, laporkan lewat issue repository.
        </p>
        <a
          href="https://github.com/ranuay/media-hobbies/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-foreground text-background rounded-lg text-sm hover:opacity-90"
        >
          Buka issue di GitHub ↗
        </a>
      </div>
    </div>
  )
}

function FactCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border border-border rounded-xl bg-surface">
      <div className="text-xs uppercase tracking-wider text-muted mb-2">{label}</div>
      {children}
    </div>
  )
}

function StatusBadge({ status }: { status: keyof typeof CREDENTIAL_STATUS_LABELS }) {
  const map = {
    active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
    limited: { label: 'Akses terbatas', className: 'bg-amber-100 text-amber-800' },
    unverified: { label: 'Belum terverifikasi', className: 'bg-border/70 text-foreground' },
    closed: { label: 'Ditutup', className: 'bg-red-100 text-red-800' },
  } as const
  const { label, className } = map[status]
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}