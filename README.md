# CyberPath

Jalur belajar **cybersecurity fundamentals** yang terkurasi. Roadmap 10 topik, resource resmi yang sudah diverifikasi, katalog kredensial gratis, dan pelacak progres yang tersimpan di browser.

## Fitur

- **Roadmap 10 topik** berurutan dengan status node (belum mulai / sedang / selesai)
- **31 resource resmi** terkurasi dengan filter kategori, kesulitan, dan biaya
- **7 kredensial gratis** dengan label status harga yang transparan
- **Pelacak progres** — centang resource, checklist per topik, ekspor/impor JSON, reset
- **Dark/light theme** dengan fallback ke preferensi sistem

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- React Router 7
- Vitest + Testing Library

## Development

```bash
npm install
npm run dev       # dev server di http://localhost:5173
npm run build     # tipe-check + build production
npm run test      # jalankan test suite
npm run lint      # oxlint
```

## Deploy

Deploy ke Cloudflare Pages lewat Git integration. File `public/_redirects` (SPA rewrite) dan `public/_headers` (security headers) sudah disiapkan sehingga route seperti `/roadmap` dan `/topics/:id` tidak 404 saat di-refresh.

Build config:
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20`

## Struktur

```
src/
  components/common/   # Navbar, Footer, PageHeader
  context/             # ProgressContext, ThemeContext
  data/                # Seed data: topics, resources, credentials
  hooks/               # useLocalStorage
  pages/               # 8 halaman MVP
  utils/               # labels & helper progres
```
