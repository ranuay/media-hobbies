import type { Credential } from '../types'

export const credentials: Credential[] = [
  {
    id: 'cisco-intro-cybersecurity-badge',
    resourceId: 'cisco-intro-cybersecurity',
    provider: 'Cisco Networking Academy',
    name: 'Introduction to Cybersecurity — Digital Badge',
    officialUrl: 'https://www.netacad.com/courses/introduction-to-cybersecurity',
    type: 'digital-badge',
    status: 'active',
    courseFree: true,
    credentialFree: true,
    eligibility: 'Membuka akun Cisco; selesaikan kursus dan final exam.',
    extraCosts: 'Tidak ada biaya untuk badge standar.',
    evidenceNote:
      'Digital badge Cisco/Networking Academy. Bukan CCST dan bukan sertifikasi profesional.',
    lastVerifiedAt: '2026-08-04',
  },
  {
    id: 'openlearn-statement',
    resourceId: 'openlearn-intro-cyber-security',
    provider: 'The Open University',
    name: 'Introduction to Cyber Security — Statement of Participation & Badge',
    officialUrl:
      'https://www.open.edu/openlearn/digital-computing/introduction-cyber-security-stay-safe-online/content-section-overview',
    type: 'statement',
    status: 'active',
    courseFree: true,
    credentialFree: true,
    eligibility: 'Aktivitas course terpenuhi; akun Open diperlukan untuk mengunduh bukti.',
    evidenceNote:
      'Free Statement of Participation dan digital badge setelah memenuhi ketentuan course. Tidak terakreditasi sebagai kualifikasi universitas.',
    lastVerifiedAt: '2026-08-04',
  },
  {
    id: 'ibm-getting-started-credential',
    resourceId: 'ibm-getting-started-cyber',
    provider: 'IBM SkillsBuild',
    name: 'Getting Started with Cybersecurity — Digital Credential',
    officialUrl: 'https://skillsbuild.org/learning-catalog/university-catalog',
    type: 'digital-badge',
    status: 'active',
    courseFree: true,
    credentialFree: true,
    eligibility: 'IBMid; selesaikan seluruh persyaratan program.',
    evidenceNote: 'Digital credential dari IBM SkillsBuild, bukan sertifikasi profesional IBM.',
    lastVerifiedAt: '2026-08-04',
  },
  {
    id: 'ibm-cybersecurity-certificate',
    provider: 'IBM SkillsBuild',
    name: 'IBM Cybersecurity Certificate (College Certificate)',
    officialUrl: 'https://skillsbuild.org/college-students/college-certificates',
    type: 'course-certificate',
    status: 'limited',
    courseFree: true,
    credentialFree: true,
    eligibility:
      'Akses terbatas: ditujukan untuk institusi terdaftar (college/university). Tidak otomatis terbuka untuk semua individu.',
    evidenceNote:
      'Program certificate melalui institusi yang memenuhi syarat. Bukan sertifikasi profesional IBM.',
    lastVerifiedAt: '2026-08-04',
  },
  {
    id: 'fortinet-nse-foundations',
    resourceId: 'fortinet-nse-intro',
    provider: 'Fortinet Training Institute',
    name: 'NSE Foundations — Training Achievement',
    officialUrl: 'https://www.fortinet.com/training/cybersecurity-professionals',
    type: 'digital-badge',
    status: 'active',
    courseFree: true,
    credentialFree: true,
    eligibility: 'Buat akun Fortinet.',
    extraCosts: 'On-demand lab dan sebagian ujian dapat berbayar.',
    evidenceNote:
      'Badge/training achievement sesuai ketentuan level. Jangan otomatis disebut sertifikasi profesional.',
    lastVerifiedAt: '2026-08-04',
  },
  {
    id: 'portswigger-academy-training',
    resourceId: 'portswigger-web-security-academy',
    provider: 'PortSwigger',
    name: 'Web Security Academy — Free Training',
    officialUrl: 'https://portswigger.net/web-security',
    type: 'training-only',
    status: 'active',
    courseFree: true,
    credentialFree: false,
    eligibility: 'Buat akun PortSwigger.',
    evidenceNote:
      'Training lab gratis, tetapi PortSwigger tidak menerbitkan credential gratis yang terverifikasi. Jangan mengklaim ada sertifikat.',
    lastVerifiedAt: '2026-08-04',
  },
  {
    id: 'isc2-cc-1mcc',
    provider: 'ISC2',
    name: 'Certified in Cybersecurity (CC) — One Million Certified',
    officialUrl: 'https://www.isc2.org/landing/1mcc',
    type: 'professional-certification',
    status: 'closed',
    courseFree: false,
    credentialFree: false,
    extraCosts:
      'Program gratis 1MCC ditutup untuk pendaftar baru setelah 20 Mei 2026. Jalur standar memiliki biaya ujian dan annual maintenance fee sesuai ketentuan ISC2.',
    eligibility: 'Program One Million Certified sudah ditutup untuk pendaftar baru.',
    evidenceNote:
      'Kode yang telah diterbitkan dapat memiliki masa penggunaan tersendiri. Disimpan sebagai contoh status Ditutup agar tidak menyesatkan.',
    lastVerifiedAt: '2026-08-04',
  },
]

export function getCredentialById(id: string): Credential | undefined {
  return credentials.find((c) => c.id === id)
}

export function getActiveCredentials(): Credential[] {
  return credentials.filter((c) => c.status !== 'closed')
}