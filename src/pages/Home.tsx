import { Link } from 'react-router-dom'
import { topics } from '../data/topics'
import { credentials } from '../data/credentials'
import { resources } from '../data/resources'
import { useProgress } from '../context/ProgressContext'
import { PathNode } from '../components/common/PathNode'

export default function Home() {
  const { completedCount } = useProgress()

  const totalHours = topics.reduce((sum, t) => sum + t.estimatedHours, 0)
  const activeCredentials = credentials.filter((c) => c.status !== 'closed').length
  const firstThree = topics.slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="relative blueprint rounded-3xl border border-border dark:border-dark-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background dark:to-dark-background pointer-events-none" />
        <div className="relative px-6 sm:px-10 py-14 sm:py-20 max-w-2xl">
          <p className="eyebrow mb-4">
            <span className="text-accent dark:text-dark-accent">●</span> cybersecurity fundamentals
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            Satu peta belajar{' '}
            <span className="text-primary dark:text-dark-primary">cybersecurity</span> lintas
            platform.
          </h1>
          <p className="mt-5 text-lg text-muted dark:text-dark-muted leading-relaxed max-w-lg">
            Roadmap terstruktur, resource dari sumber resmi, dan direktori credential gratis
            dengan status yang jujur.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/roadmap"
              className="px-6 py-3 bg-primary dark:bg-dark-primary text-white rounded-xl font-semibold hover:bg-primary-dark dark:hover:bg-dark-primary-dark transition-colors shadow-sm"
            >
              Mulai Cybersecurity Fundamentals →
            </Link>
          </div>
        </div>

        {/* Path visual */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 pr-4">
          <div className="flex items-end gap-3">
            {firstThree.map((t, i) => (
              <div key={t.id} className="flex items-end">
                <PathNode
                  step={`0${i + 1}`}
                  label={shorten(t.title)}
                  active={i === 0}
                  done={i < completedCount * 0.5 && i !== 0}
                />
                {i < firstThree.length - 1 && <div className="node-line w-8 mb-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
        <Stat label="Topik roadmap" value={topics.length.toString()} suffix="" />
        <Stat label="Resource dikurasi" value={resources.length.toString()} suffix="" />
        <Stat label="Credential aktif" value={activeCredentials.toString()} suffix="" />
        <Stat label="Estimasi total" value={`~${totalHours}`} suffix=" jam" />
      </section>

      {completedCount > 0 && (
        <section className="mb-12 p-5 border border-primary/20 dark:border-dark-primary/20 bg-primary-light/60 dark:bg-dark-primary-light/60 rounded-2xl">
          <div className="eyebrow mb-1">progress lokal</div>
          <div className="font-display text-2xl font-semibold">
            {completedCount} resource ditandai selesai
          </div>
          <Link to="/progress" className="text-primary dark:text-dark-primary hover:underline text-sm mt-2 inline-block">
            Kelola progres →
          </Link>
        </section>
      )}

      {/* CARA PAKAI */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display text-2xl font-bold">Cara pakai CyberPath</h2>
          <div className="hidden sm:block node-line flex-1" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <HowToStep
            index="01"
            title="Ikuti roadmap berurutan"
            description="Mulai dari topik 1. Tiap topik punya prasyarat — jangan loncat sebelum fondasinya kuat."
          />
          <HowToStep
            index="02"
            title="Centang resource wajib"
            description="Progress dihitung dari resource wajib yang kamu tandai selesai. Resource alternatif hanya cadangan."
          />
          <HowToStep
            index="03"
            title="Ambil credential, lalu pilih jalur"
            description="Setelah roadmap selesai, cek direktori credential gratis dan pilih spesialisasi yang kamu tuju."
          />
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display text-2xl font-bold">Apa yang akan kamu dapatkan</h2>
          <div className="hidden sm:block node-line flex-1" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <FeatureCard
            index="01"
            title="Roadmap terstruktur"
            description={`${topics.length} topik berurutan dari dasar hingga capstone, dengan prasyarat dan target belajar yang jelas.`}
          />
          <FeatureCard
            index="02"
            title="Resource tervalidasi"
            description={`${resources.length} link ke sumber resmi atau tepercaya. Tidak ada scraping, hanya kurasi manual.`}
          />
          <FeatureCard
            index="03"
            title="Label credential jujur"
            description="Setiap entri jelas membedakan digital badge, course certificate, dan professional certification."
          />
        </div>
      </section>
    </div>
  )
}

function shorten(title: string) {
  const words = title.split(' ')
  return words.length > 2 ? `${words[0]} ${words[1]}` : title
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="p-4 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface">
      <div className="stat-number text-2xl font-semibold tracking-tight">
        {value}
        {suffix}
      </div>
      <div className="text-sm text-muted dark:text-dark-muted mt-1">{label}</div>
    </div>
  )
}

function FeatureCard({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string
}) {
  return (
    <div className="group p-5 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface hover:border-primary/40 dark:hover:border-dark-primary/40 hover:-translate-y-0.5 transition">
      <div className="eyebrow mb-3">{index}</div>
      <h3 className="font-display font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">{description}</p>
    </div>
  )
}

function HowToStep({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string
}) {
  return (
    <div className="p-5 border border-border dark:border-dark-border rounded-xl bg-surface dark:bg-dark-surface">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-light dark:bg-dark-primary-light text-primary-dark dark:text-dark-primary-dark stat-number text-sm font-bold">
          {index}
        </span>
        <h3 className="font-display font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">{description}</p>
    </div>
  )
}