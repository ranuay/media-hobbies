import { Link } from 'react-router-dom'
import { topics } from '../data/topics'
import { credentials } from '../data/credentials'
import { resources } from '../data/resources'
import { useProgress } from '../context/ProgressContext'

export default function Home() {
  const { completedCount } = useProgress()

  const totalHours = topics.reduce((sum, t) => sum + t.estimatedHours, 0)
  const activeCredentials = credentials.filter((c) => c.status !== 'closed').length

  return (
    <div>
      <section className="flex flex-col items-center text-center pt-12 pb-16">
        <p className="text-xs uppercase tracking-widest text-muted mb-4">MVP v1.0</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
          Satu peta belajar cybersecurity <span className="text-primary">lintas platform</span>.
        </h1>
        <p className="text-lg text-muted mt-4 max-w-xl">
          Roadmap terstruktur, kurasi resource tepercaya, dan direktori credential gratis
          dengan status yang jujur.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to="/roadmap"
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Mulai Cybersecurity Fundamentals
          </Link>
          <Link
            to="/credentials"
            className="px-6 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-surface transition-colors"
          >
            Lihat Free Certificates & Badges
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        <Stat label="Topik roadmap" value={topics.length.toString()} />
        <Stat label="Resource dikurasi" value={resources.length.toString()} />
        <Stat label="Credential aktif" value={activeCredentials.toString()} />
        <Stat label="Estimasi total" value={`~${totalHours} jam`} />
      </section>

      {completedCount > 0 && (
        <section className="mb-12 p-5 bg-primary-light border border-primary/20 rounded-2xl">
          <div className="text-sm text-muted">Progres lokal kamu</div>
          <div className="text-2xl font-semibold mt-1">
            {completedCount} resource ditandai selesai
          </div>
          <Link to="/progress" className="text-primary hover:underline text-sm mt-2 inline-block">
            Kelola progres →
          </Link>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Apa yang akan kamu dapatkan</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <FeatureCard
            title="Roadmap terstruktur"
            description={`${topics.length} topik berurutan dari dasar hingga capstone, dengan prasyarat dan target belajar yang jelas.`}
          />
          <FeatureCard
            title="Resource tervalidasi"
            description={`${resources.length} link ke sumber resmi atau tepercaya. Tidak ada scraping, hanya kurasi manual.`}
          />
          <FeatureCard
            title="Label credential jujur"
            description="Setiap entri jelas membedakan digital badge, course certificate, dan professional certification."
          />
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 border border-border rounded-xl bg-surface">
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-5 border border-border rounded-xl bg-surface">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  )
}
