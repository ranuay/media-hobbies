import { getTopicsInOrder } from '../utils/labels'
import { resources } from '../data/resources'
import { credentials } from '../data/credentials'
import PageHeader from '../components/common/PageHeader'
import ExternalLink from '../components/common/ExternalLink'

export default function AboutPage() {
  const totalHours = getTopicsInOrder().reduce((sum, t) => sum + t.estimatedHours, 0)

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="about"
        title="Tentang & Disclaimer"
        description="Bagaimana CyberPath mengkurasi konten, dan batasan penting yang perlu kamu ketahui."
      />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Apa itu CyberPath?</h2>
        <p className="text-sm leading-relaxed text-muted dark:text-dark-muted mb-3">
          CyberPath adalah kurator belajar cybersecurity untuk pemula. Kami tidak menyimpan ulang
          video, kursus, atau materi milik platform lain. CyberPath hanya menautkan ke sumber resmi
          dan menyusunnya dalam urutan belajar yang terstruktur.
        </p>
        <p className="text-sm leading-relaxed text-muted dark:text-dark-muted">
          Saat ini CyberPath berisi {getTopicsInOrder().length} topik, {resources.length} resource
          terkurasi, dan {credentials.length} entri credential dengan estimasi total sekitar{' '}
          {totalHours} jam belajar.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Metode kurasi</h2>
        <p className="text-sm text-muted dark:text-dark-muted mb-2">Prioritas sumber:</p>
        <ol className="list-decimal list-inside text-sm text-muted dark:text-dark-muted space-y-1.5">
          <li>Dokumentasi atau halaman resmi penyelenggara.</li>
          <li>Universitas dan lembaga pendidikan terakreditasi.</li>
          <li>Vendor teknologi/security mapan.</li>
          <li>Organisasi nonprofit atau standar terbuka seperti OWASP.</li>
          <li>Kreator independen hanya setelah review manual.</li>
        </ol>
        <p className="text-sm text-muted dark:text-dark-muted mt-3">
          Setiap klaim credential diverifikasi dari halaman resmi, bukan blog agregator. Entri
          diverifikasi ulang setiap 90 hari. Jika tidak dapat diverifikasi, status berubah menjadi{' '}
          <em>Belum terverifikasi</em> dan tidak muncul pada filter gratis aktif.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Etika & penggunaan yang bertanggung jawab</h2>
        <ul className="space-y-2 text-sm text-muted dark:text-dark-muted leading-relaxed">
          <li>
            Lab praktik pada CyberPath hanya menautkan ke sandbox, CTF, atau lingkungan yang secara
            eksplisit mengizinkan pengujian (mis. PortSwigger Web Security Academy, Hack The Box,
            TryHackMe).
          </li>
          <li>CyberPath tidak menyediakan panduan menyerang target nyata tanpa izin.</li>
          <li>
            Sebelum menguji keamanan sistem apa pun, selalu dapatkan otorisasi tertulis. Pelajari
            konsep <em>responsible disclosure</em>.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Credential & labeling</h2>
        <p className="text-sm leading-relaxed text-muted dark:text-dark-muted mb-3">
          CyberPath membedakan secara ketat:
        </p>
        <ul className="space-y-2 text-sm text-muted dark:text-dark-muted leading-relaxed">
          <li>
            <strong className="text-foreground dark:text-dark-foreground">
              Professional Certification
            </strong>{' '}
            — credential industri yang memerlukan asesmen formal dan memiliki aturan sertifikasi.
          </li>
          <li>
            <strong className="text-foreground dark:text-dark-foreground">
              Course Certificate / Statement of Participation
            </strong>{' '}
            — bukti menyelesaikan kursus, bukan sertifikasi profesional.
          </li>
          <li>
            <strong className="text-foreground dark:text-dark-foreground">Digital Badge</strong> —
            badge digital untuk pencapaian tertentu.
          </li>
          <li>
            <strong className="text-foreground dark:text-dark-foreground">Training only</strong> —
            materi gratis, tetapi tidak ada credential gratis yang terverifikasi.
          </li>
        </ul>
        <p className="text-sm text-muted dark:text-dark-muted mt-3">
          Banyak kursus gratis di internet, tetapi ujian, lab, atau sertifikatnya berbayar. CyberPath
          selalu menampilkan bagian <em>Yang gratis</em> dan <em>Kemungkinan biaya tambahan</em>{' '}
          secara terpisah.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Disclaimer hukum</h2>
        <p className="text-sm leading-relaxed text-muted dark:text-dark-muted">
          CyberPath adalah proyek belajar mandiri dan tidak berafiliasi dengan Cisco, The Open
          University, IBM, Fortinet, ISC2, atau platform lain yang disebutkan. Informasi dapat
          berubah sewaktu-waktu; selalu cek halaman resmi sebelum mendaftar. CyberPath tidak
          bertanggung jawab atas perubahan biaya, syarat, atau ketersediaan program pihak ketiga.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Sumber & kontribusi</h2>
        <div className="space-y-2 text-sm">
          <ExternalLink href="https://github.com/ranuay/media-hobbies">
            Repository CyberPath di GitHub ↗
          </ExternalLink>
          <div className="text-muted dark:text-dark-muted">
            Laporkan link rusak atau informasi berubah melalui{' '}
            <ExternalLink href="https://github.com/ranuay/media-hobbies/issues">
              halaman issues ↗
            </ExternalLink>
            .
          </div>
        </div>
      </section>
    </div>
  )
}