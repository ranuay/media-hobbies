import type { RoadmapTopic } from '../types'

export const topics: RoadmapTopic[] = [
  {
    id: 'computer-security-fundamentals',
    order: 1,
    title: 'Computer & Security Fundamentals',
    summary:
      'Memahami dasar komputer, sistem operasi, dan konsep keamanan informasi yang menjadi fondasi seluruh materi berikutnya.',
    learningGoals: [
      'Menjelaskan komponen dasar komputer dan bagaimana data disimpan & diproses',
      'Memahami istilah penting: CIA triad, kerentanan, ancaman, risiko',
      'Mengenal peran security analyst dan cara kerja tim keamanan',
    ],
    prerequisites: [],
    primaryResourceIds: ['cisco-intro-cybersecurity', 'openlearn-intro-cyber-security'],
    alternativeResourceIds: ['ibm-getting-started-cyber'],
    estimatedHours: 25,
    checklist: [
      'Selesaikan kursus pengantar keamanan dari Cisco atau OpenLearn',
      'Buat catatan istilah CIA triad & jenis ancaman',
      'Pahami perbedaan kerentanan, ancaman, dan risiko',
    ],
    nextSteps:
      'Lanjut ke Linux Fundamentals — kamu akan sering bekerja di terminal Linux sebagai security analyst.',
  },
  {
    id: 'linux-fundamentals',
    order: 2,
    title: 'Linux Fundamentals',
    summary:
      'Menguasai perintah dasar Linux, file system, dan permission — lingkungan utama untuk tools keamanan.',
    learningGoals: [
      'Menjalankan perintah dasar: cd, ls, grep, chmod, find',
      'Memahami struktur file system dan permission Linux',
      'Menavigasi terminal dengan percaya diri',
    ],
    prerequisites: ['computer-security-fundamentals'],
    primaryResourceIds: ['tryhackme-linux-fundamentals'],
    alternativeResourceIds: ['htb-academy-linux', 'linux-foundation-intro-linux', '90days-cybersecurity'],
    practiceGuide:
      'Latih di TryHackMe Linux Fundamentals atau selesaikan level awal Bandit (OverTheWire) sebagai latihan sandbox.',
    estimatedHours: 15,
    checklist: [
      'Selesaikan modul Linux Fundamentals di TryHackMe atau setara',
      'Praktikkan permission dengan chmod/chown',
      'Selesaikan minimal 5 level pertama Bandit',
    ],
    nextSteps: 'Siap untuk Networking Fundamentals.',
  },
  {
    id: 'networking-fundamentals',
    order: 3,
    title: 'Networking Fundamentals',
    summary:
      'Memahami model OSI, TCP/IP, IP addressing, dan protokol dasar — bahasa umum yang dipakai semua tools jaringan.',
    learningGoals: [
      'Menjelaskan model OSI dan TCP/IP secara singkat',
      'Memahami IP address, subnet, dan port',
      'Mengenal protokol umum: HTTP, DNS, DHCP',
    ],
    prerequisites: ['computer-security-fundamentals'],
    primaryResourceIds: ['cisco-networking-basics'],
    alternativeResourceIds: ['tryhackme-network-fundamentals', 'professor-messer-networkplus', '90days-cybersecurity'],
    estimatedHours: 20,
    checklist: [
      'Selesaikan Networking Basics (Cisco) atau setara',
      'Praktikkan ping, traceroute, dan nslookup',
      'Identifikasi port 80, 443, 22, 3389 dengan fungsinya',
    ],
    nextSteps: 'Lanjut ke Web Fundamentals — sebagian besar target adalah aplikasi web.',
  },
  {
    id: 'web-fundamentals',
    order: 4,
    title: 'Web Fundamentals',
    summary:
      'Memahami cara kerja aplikasi web: HTTP request/response, HTML, CSS, JavaScript, dan API.',
    learningGoals: [
      'Menjelaskan cara browser berkomunikasi dengan server via HTTP',
      'Membaca dan memahami struktur HTML/CSS dasar',
      'Mengenal apa itu API dan request/response JSON',
    ],
    prerequisites: ['networking-fundamentals'],
    primaryResourceIds: ['mdn-learn-web-development'],
    alternativeResourceIds: ['freecodecamp-responsive-web', 'open-wp-learn-html-css'],
    estimatedHours: 25,
    checklist: [
      'Ikuti kurikulum MDN Learn Web Development (bagian inti)',
      'Bangun satu halaman HTML/CSS sederhana',
      'Pahami perbedaan GET vs POST',
    ],
    nextSteps: 'Lanjut ke Programming & Scripting Basics.',
  },
  {
    id: 'programming-scripting',
    order: 5,
    title: 'Programming & Scripting Basics',
    summary:
      'Belajar dasar pemrograman (Python direkomendasikan) untuk membaca kode, menulis script, dan memahami exploit.',
    learningGoals: [
      'Menulis script Python sederhana',
      'Membaca dan memahami logika pemrograman dasar',
      'Menggunakan Python untuk tugas otomasi kecil',
    ],
    prerequisites: ['computer-security-fundamentals'],
    primaryResourceIds: ['cs50p-python'],
    alternativeResourceIds: ['freecodecamp-python', 'tryhackme-python-basics', '90days-cybersecurity'],
    estimatedHours: 30,
    checklist: [
      'Selesaikan minimal 6 minggu CS50P atau setara',
      'Tulis script Python yang membaca file teks',
      'Coba satu proyek kecil: script list file di direktori',
    ],
    nextSteps: 'Lanjut ke Security Principles.',
  },
  {
    id: 'security-principles',
    order: 6,
    title: 'Security Principles',
    summary:
      'Konsep inti keamanan: CIA triad, defense in depth, least privilege, dan framework seperti NIST CSF.',
    learningGoals: [
      'Menjelaskan CIA triad dan contoh kasusnya',
      'Menerapkan prinsip least privilege dan defense in depth',
      'Mengenal NIST Cybersecurity Framework',
    ],
    prerequisites: ['computer-security-fundamentals', 'networking-fundamentals'],
    primaryResourceIds: ['cisco-cybersecurity-essentials'],
    alternativeResourceIds: ['nist-cybersecurity-framework', 'mit-security-principles'],
    estimatedHours: 18,
    checklist: [
      'Selesaikan Cybersecurity Essentials (Cisco) atau setara',
      'Tulis ringkasan 5 fungsi NIST CSF dalam bahasa sendiri',
      'Berikan 1 contoh defense in depth',
    ],
    nextSteps: 'Lanjut ke Web Security Basics.',
  },
  {
    id: 'web-security-basics',
    order: 7,
    title: 'Web Security Basics',
    summary:
      'Pengantar keamanan aplikasi web: OWASP Top 10, injection, XSS, dan cara menguji dengan legal sandbox.',
    learningGoals: [
      'Mengenal OWASP Top 10',
      'Memahami apa itu SQL injection dan XSS',
      'Menyelesaikan lab legal di lingkungan yang mengizinkan pengujian',
    ],
    prerequisites: ['web-fundamentals', 'security-principles'],
    primaryResourceIds: ['portswigger-web-security-academy'],
    alternativeResourceIds: ['owasp-web-security-testing-guide', 'tryhackme-web-hacking'],
    practiceGuide:
      'Gunakan PortSwigger Web Security Academy — lab tersedia gratis dan eksplisit mengizinkan pengujian.',
    estimatedHours: 30,
    checklist: [
      'Selesaikan minimal 5 lab pertama Web Security Academy',
      'Pahami beda SQL injection dan XSS',
      'Baca ringkasan OWASP Top 10',
    ],
    nextSteps: 'Lanjut ke Defensive Security Basics.',
  },
  {
    id: 'defensive-security-basics',
    order: 8,
    title: 'Defensive Security Basics',
    summary:
      'Perspektif defender: monitoring, log analysis, deteksi serangan, dan tools blue team.',
    learningGoals: [
      'Memahami peran SOC dan blue team',
      'Membaca dan menganalisis log dasar',
      'Mengenal tool SIEM dan alur incident response',
    ],
    prerequisites: ['security-principles'],
    primaryResourceIds: ['tryhackme-defensive-security'],
    alternativeResourceIds: ['fortinet-nse-intro', 'splunk-fundamentals-basics'],
    estimatedHours: 18,
    checklist: [
      'Selesaikan modul Defensive Security di TryHackMe atau setara',
      'Analisis 1 file log dan catat temuan',
      'Pahami langkah-langkah incident response',
    ],
    nextSteps: 'Lanjut ke Ethics, Law & Responsible Disclosure.',
  },
  {
    id: 'ethics-law-disclosure',
    order: 9,
    title: 'Ethics, Law & Responsible Disclosure',
    summary:
      'Memahami etika keamanan, hukum yang relevan, dan praktik responsible disclosure yang benar.',
    learningGoals: [
      'Menjelaskan mengapa otorisasi wajib sebelum menguji sistem',
      'Mengenal konsep responsible disclosure',
      'Menghindari aktivitas ilegal saat belajar',
    ],
    prerequisites: ['security-principles'],
    primaryResourceIds: ['eff-digital-rights'],
    alternativeResourceIds: ['owasp-security-ethics', 'tryhackme-ethical-considerations'],
    estimatedHours: 8,
    checklist: [
      'Baca panduan EFF tentang security & privacy',
      'Tulis ringkasan etika testing dalam 1 paragraf',
      'Pahami kapan wajib meminta izin tertulis',
    ],
    nextSteps: 'Lanjut ke Capstone pemula.',
  },
  {
    id: 'capstone',
    order: 10,
    title: 'Capstone pemula',
    summary:
      'Merangkai semua materi dalam latihan terpadu di lingkungan legal: learning path pemula dan sandbox CTF.',
    learningGoals: [
      'Mengaplikasikan seluruh topik sebelumnya secara terpadu',
      'Menyelesaikan satu learning path pemula end-to-end',
      'Mendokumentasikan proses belajar secara etis',
    ],
    prerequisites: [
      'computer-security-fundamentals',
      'linux-fundamentals',
      'networking-fundamentals',
      'web-security-basics',
      'defensive-security-basics',
    ],
    primaryResourceIds: ['tryhackme-pre-security-path'],
    alternativeResourceIds: ['htb-starting-point', 'tryhackme-complete-beginner-path'],
    practiceGuide:
      'Gunakan TryHackMe Pre Security path atau HTB Starting Point. Jangan pernah menyerang sistem tanpa izin.',
    estimatedHours: 40,
    checklist: [
      'Selesaikan learning path pemula pilihanmu',
      'Catat 5 pelajaran utama yang didapat',
      'Buat rencana topik berikutnya (pentesting, SOC, dll.)',
    ],
    nextSteps:
      'Pilih spesialisasi: Junior Pentester, SOC Analyst, Cloud Security, Digital Forensics, atau App Security.',
  },
]

export function getTopicById(id: string): RoadmapTopic | undefined {
  return topics.find((t) => t.id === id)
}

export function getTopicsInOrder(): RoadmapTopic[] {
  return [...topics].sort((a, b) => a.order - b.order)
}
