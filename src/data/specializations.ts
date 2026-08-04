import type { Specialization } from '../types'

export const specializations: Specialization[] = [
  {
    id: 'penetration-tester',
    title: 'Penetration Tester',
    role: 'Junior Pentester / Red Team',
    summary:
      'Menguji sistem, jaringan, dan aplikasi secara etis untuk menemukan kerentanan sebelum penyerang memanfaatkannya.',
    skills: ['Kali Linux', 'Burp Suite', 'Nmap', 'Metasploit', 'OWASP Top 10', 'Reporting'],
    steps: [
      'Selesaikan seluruh roadmap CyberPath fundamentals',
      'Kuasi 15–20 lab Web Security Academy dan OWASP Juice Shop',
      'Mainkan CTF (TryHackMe, HTB Starting Point, PicoCTF) secara rutin',
      'Bangun portfolio: dokumentasikan 3–5 writeup CTF yang etis',
      'Kejar sertifikasi entry (NSE 1–3, lalu Security+/eJPT)',
    ],
    certs: [
      {
        name: 'NSE 1, 2, 3',
        provider: 'Fortinet',
        costHint: 'Gratis',
        url: 'https://www.fortinet.com/training/cybersecurity-professionals/nse-certification',
      },
      {
        name: 'Security+',
        provider: 'CompTIA',
        costHint: '≈ USD 404',
        url: 'https://www.comptia.org/certifications/security',
      },
      {
        name: 'eJPT',
        provider: 'INE Security',
        costHint: '≈ USD 249',
        url: 'https://www.ine.com/learning-paths/ejpt-entry-level-penetration-tester',
      },
    ],
    resources: [
      {
        title: 'Web Security Academy',
        provider: 'PortSwigger',
        url: 'https://portswigger.net/web-security',
      },
      {
        title: 'Penetration Testing Methodology',
        provider: 'PentesterLab',
        url: 'https://pentesterlab.com/',
      },
      {
        title: 'How To Become A Pentester — Roadmap',
        provider: 'Red Team Notes',
        url: 'https://www.ired.team/',
      },
    ],
    timeToEntry: '± 6–12 bulan dari nol',
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst',
    role: 'Security Operations Center / Blue Team',
    summary:
      'Memantau alert, menganalisis log, merespons insiden, dan menjaga pertahanan organisasi setiap hari.',
    skills: ['SIEM (Splunk/Sentinel)', 'Log analysis', 'Incident response', 'IDS/IPS', 'MITRE ATT&CK'],
    steps: [
      'Selesaikan roadmap hingga Defensive Security Basics',
      'Praktik Splunk Free di TryHackMe dan lab SIEM lokal',
      'Pelajari MITRE ATT&CK untuk memahami taktik & teknik penyerang',
      'Kerjakan simulasi insiden (TryHackMe SOC Level 1 path)',
      'Kejar sertifikasi (NSE 1–3 → Security+/BTL1)',
    ],
    certs: [
      {
        name: 'Security+',
        provider: 'CompTIA',
        costHint: '≈ USD 404',
        url: 'https://www.comptia.org/certifications/security',
      },
      {
        name: 'Blue Team Level 1',
        provider: 'Security Blue Team',
        costHint: '≈ USD 249',
        url: 'https://www.securityblue.team/',
      },
      {
        name: 'Microsoft SC-900',
        provider: 'Microsoft',
        costHint: '≈ USD 99',
        url: 'https://learn.microsoft.com/en-us/training/certifications/security-compliance-identity-fundamentals/',
      },
    ],
    resources: [
      {
        title: 'Splunk Free',
        provider: 'Splunk',
        url: 'https://www.splunk.com/en_us/download/splunk-enterprise.html',
      },
      {
        title: 'SOC Level 1 Path',
        provider: 'TryHackMe',
        url: 'https://tryhackme.com/path-outline/soclevel1',
      },
      {
        title: 'MITRE ATT&CK',
        provider: 'MITRE',
        url: 'https://attack.mitre.org/',
      },
    ],
    timeToEntry: '± 6–12 bulan dari nol',
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    role: 'Cloud Security Engineer (junior)',
    summary:
      'Mengamankan infrastruktur cloud: identitas, akses, jaringan, dan kepatuhan di AWS/Azure/GCP.',
    skills: ['AWS/Azure/GCP', 'IAM', 'Zero Trust', 'Kubernetes dasar', 'Compliance (CIS, SOC 2)'],
    steps: [
      'Selesaikan roadmap plus 1 topik cloud (identity & access)',
      'Belajar dasar AWS/Azure lewat free tier & labs gratis',
      'Praktikkan IAM: least privilege, roles, policy',
      'Kerjakan lab cloud security (TryHackMe Cloud path, CloudGoat AWS)',
      'Kejar sertifikasi (SC-900 → AWS CCP/AZ-900 → Security+/specialty)',
    ],
    certs: [
      {
        name: 'Microsoft SC-900',
        provider: 'Microsoft',
        costHint: '≈ USD 99',
        url: 'https://learn.microsoft.com/en-us/training/certifications/security-compliance-identity-fundamentals/',
      },
      {
        name: 'AWS Certified Cloud Practitioner',
        provider: 'AWS',
        costHint: '≈ USD 100',
        url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
      },
      {
        name: 'Security+',
        provider: 'CompTIA',
        costHint: '≈ USD 404',
        url: 'https://www.comptia.org/certifications/security',
      },
    ],
    resources: [
      {
        title: 'AWS Skill Builder (free courses)',
        provider: 'AWS',
        url: 'https://skillbuilder.aws/',
      },
      {
        title: 'CloudGoat (vulnerable-by-design AWS)',
        provider: 'Rhino Security Labs',
        url: 'https://github.com/RhinoSecurityLabs/cloudgoat',
      },
      {
        title: 'Microsoft Learn — Security',
        provider: 'Microsoft',
        url: 'https://learn.microsoft.com/en-us/training/browse/?products=azure&resource_type=learning%20path',
      },
    ],
    timeToEntry: '± 9–12 bulan dari nol',
  },
  {
    id: 'digital-forensics',
    title: 'Digital Forensics',
    role: 'Digital Forensics / DFIR Analyst',
    summary:
      'Mengumpulkan, menganalisis, dan melestarikan bukti digital setelah insiden untuk investigasi atau penegakan hukum.',
    skills: ['Autopsy', 'Volatility', 'Memory analysis', 'Disk imaging', 'Chain of custody'],
    steps: [
      'Selesaikan roadmap hingga Defensive Security Basics',
      'Praktik Autopsy & FTK Imager pada image disk latihan',
      'Pelajari memory forensics dengan Volatility',
      'Kerjakan lab DFIR (TryHackMe DFIR path, digital corpora)',
      'Kejar sertifikasi (NSE 1–3 → Security+/CHFI)',
    ],
    certs: [
      {
        name: 'Security+',
        provider: 'CompTIA',
        costHint: '≈ USD 404',
        url: 'https://www.comptia.org/certifications/security',
      },
      {
        name: 'CHFI',
        provider: 'EC-Council',
        costHint: '≈ USD 500+',
        url: 'https://www.eccouncil.org/programs/certified-hacking-forensics-investigator/',
      },
      {
        name: 'Blue Team Level 1',
        provider: 'Security Blue Team',
        costHint: '≈ USD 249',
        url: 'https://www.securityblue.team/',
      },
    ],
    resources: [
      {
        title: 'Digital Corpora (latihan image disk)',
        provider: 'Digital Corpora',
        url: 'https://digitalcorpora.org/',
      },
      {
        title: 'Autopsy — Getting Started',
        provider: 'Sleuth Kit',
        url: 'https://www.autopsy.com/',
      },
      {
        title: 'DFIR Path',
        provider: 'TryHackMe',
        url: 'https://tryhackme.com/path-outline/dfir',
      },
    ],
    timeToEntry: '± 9–12 bulan dari nol',
  },
  {
    id: 'app-security',
    title: 'Application Security',
    role: 'AppSec Engineer / DevSecOps (junior)',
    summary:
      'Mengamankan siklus pengembangan software: code review, SAST/DAST, dan otomasi keamanan dalam CI/CD.',
    skills: ['OWASP Top 10', 'SAST (Semgrep)', 'DAST', 'Code review', 'CI/CD pipelines'],
    steps: [
      'Selesaikan roadmap termasuk Web Security Basics',
      'Pelajari dasar web dev (HTML, JS, Python) lebih dalam',
      'Praktik SAST/DAST pada project latihan',
      'Integrasikan scanner keamanan sederhana ke CI (GitHub Actions)',
      'Kejar sertifikasi (NSE 1–3 → Security+/OSCP path nanti)',
    ],
    certs: [
      {
        name: 'Security+',
        provider: 'CompTIA',
        costHint: '≈ USD 404',
        url: 'https://www.comptia.org/certifications/security',
      },
      {
        name: 'eJPT',
        provider: 'INE Security',
        costHint: '≈ USD 249',
        url: 'https://www.ine.com/learning-paths/ejpt-entry-level-penetration-tester',
      },
      {
        name: 'CISSP Associate (opsional jangka panjang)',
        provider: 'ISC2',
        costHint: '≈ USD 749',
        url: 'https://www.isc2.org/certifications/cissp',
      },
    ],
    resources: [
      {
        title: 'OWASP Top 10',
        provider: 'OWASP',
        url: 'https://owasp.org/www-project-top-ten/',
      },
      {
        title: 'Semgrep — SAST gratis',
        provider: 'Semgrep',
        url: 'https://semgrep.dev/',
      },
      {
        title: 'Secure Coding Dojo',
        provider: 'OWASP',
        url: 'https://owasp.org/www-project-secure-coding-dojo/',
      },
    ],
    timeToEntry: '± 9–12 bulan dari nol',
  },
]

export function getSpecializationById(id: string): Specialization | undefined {
  return specializations.find((s) => s.id === id)
}
