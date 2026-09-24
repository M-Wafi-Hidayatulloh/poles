# Poles — ATS Resume & Portfolio Generator

Poles membantu fresh graduate dan job seeker menulis resume yang profesional dan lolos sistem ATS. User cukup bercerita dengan bahasa sehari-hari, lalu sistem merapikannya menjadi poin-poin resume yang siap dilamar.

Dibangun dengan **Next.js 16** (App Router) + **Tailwind CSS v4** + **TypeScript**.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Catatan: jika port 3000 terpakai, gunakan `npm run dev -- -p 3100`.

## Script

| Perintah        | Fungsi                                  |
| --------------- | --------------------------------------- |
| `npm run dev`   | Menjalankan server development          |
| `npm run build` | Build production (Turbopack)            |
| `npm run start` | Menjalankan hasil build di lokal        |
| `npm run lint`  | Menjalankan ESLint                      |

## Struktur folder

```
app/
  page.tsx            Beranda
  generator/page.tsx  Generator resume
  checker/page.tsx    Cek skor ATS
  dashboard/page.tsx  Dashboard (resume tersimpan)
components/
  SiteHeader.tsx      Nav (logo, menu, tombol Coba Gratis, hamburger)
  home/               Bagian-bagian halaman Beranda
```

Navigasi antar halaman memakai `<Link>` dari `next/link`.

## Desain

Design tokens (warna, font, prinsip visual) mengikuti `DESIGN.md` — lihat spesifikasi lengkap di `brief-project-poles.md`. Font: Fraunces (display), IBM Plex Sans (body/UI), IBM Plex Mono (elemen ATS).

## Deploy

Repo terhubung ke Vercel; setiap push ke `main` otomatis memicu production deploy.