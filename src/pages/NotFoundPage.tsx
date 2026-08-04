import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <div className="eyebrow mb-3">404</div>
      <h1 className="font-display text-4xl font-bold tracking-tight">Halaman tidak ditemukan</h1>
      <p className="text-muted dark:text-dark-muted mt-3 max-w-md mx-auto leading-relaxed">
        Tautan ini tidak mengarah ke topik, resource, atau credential apa pun. Cek ulang URL-nya,
        atau kembali ke beranda.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="px-5 py-2.5 bg-primary dark:bg-dark-primary text-white rounded-xl font-medium hover:bg-primary-dark dark:hover:bg-dark-primary-dark transition"
        >
          ← Kembali ke beranda
        </Link>
        <Link
          to="/roadmap"
          className="px-5 py-2.5 border border-border dark:border-dark-border rounded-xl font-medium hover:bg-surface dark:hover:bg-dark-surface transition"
        >
          Lihat roadmap
        </Link>
      </div>
    </div>
  )
}