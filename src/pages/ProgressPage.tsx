import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { getTopicsInOrder, getTopicStatus } from '../utils/labels'
import PageHeader from '../components/common/PageHeader'

export default function ProgressPage() {
  const {
    progress,
    completedCount,
    resetProgress,
    exportProgress,
    importProgress,
  } = useProgress()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importMessage, setImportMessage] = useState<string | null>(null)

  const ordered = getTopicsInOrder()
  const totalRequiredResources = ordered.reduce(
    (sum, t) => sum + t.primaryResourceIds.length,
    0
  )
  const completedTopics = ordered.filter(
    (t) => getTopicStatus(t, progress.completedResourceIds) === 'completed'
  ).length

  const handleExport = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cyberpath-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const ok = importProgress(reader.result as string)
      setImportMessage(
        ok
          ? 'Progres berhasil diimpor.'
          : 'Gagal mengimpor: format file tidak valid.'
      )
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (window.confirm('Hapus seluruh progres? Tindakan ini tidak bisa dibatalkan.')) {
      resetProgress()
      setImportMessage('Seluruh progres telah dihapus.')
    }
  }

  return (
    <div>
      <PageHeader
        title="Progres Saya"
        description="Progres disimpan secara lokal di browser kamu (localStorage)."
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Resource selesai" value={`${completedCount}`} />
        <StatCard label="Topik selesai" value={`${completedTopics}`} />
        <StatCard
          label="Resource wajib tersisa"
          value={`${Math.max(totalRequiredResources - completedCount, 0)}`}
        />
      </div>

      <section className="mb-8 p-5 border border-border rounded-xl bg-surface">
        <h2 className="font-semibold mb-3">Backup & pemulihan</h2>
        <p className="text-sm text-muted mb-4">
          Data localStorage dapat hilang jika browser dibersihkan. Ekspor progres kamu secara
          berkala agar tidak terkunci di satu perangkat.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition"
          >
            Ekspor sebagai JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-border/30 transition"
          >
            Impor dari JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImport(file)
              e.target.value = ''
            }}
          />
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-red-200 text-red-700 rounded-lg text-sm hover:bg-red-50 transition"
          >
            Hapus seluruh progres
          </button>
        </div>
        {importMessage && (
          <p className="text-sm mt-3 text-muted" role="status">
            {importMessage}
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Rincian per topik</h2>
        {ordered.map((topic) => {
          const status = getTopicStatus(topic, progress.completedResourceIds)
          const done = topic.primaryResourceIds.filter((id) =>
            progress.completedResourceIds.includes(id)
          ).length
          return (
            <div
              key={topic.id}
              className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0"
            >
              <Link
                to={`/topics/${topic.id}`}
                className="text-sm font-medium hover:text-primary transition"
              >
                {topic.title}
              </Link>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(done / topic.primaryResourceIds.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted w-12 text-right">{done}/{topic.primaryResourceIds.length}</span>
                <TopicStatusLabel status={status} />
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 border border-border rounded-xl bg-surface">
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </div>
  )
}

function TopicStatusLabel({
  status,
}: {
  status: 'not-started' | 'in-progress' | 'completed'
}) {
  const map = {
    'not-started': { label: 'Belum mulai', className: 'bg-border/70 text-foreground' },
    'in-progress': { label: 'Berkembang', className: 'bg-amber-100 text-amber-800' },
    completed: { label: 'Selesai', className: 'bg-green-100 text-green-800' },
  } as const
  const { label, className } = map[status]
  return (
    <span className={`w-20 text-center inline-flex justify-center px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}