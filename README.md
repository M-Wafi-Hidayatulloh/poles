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

## Akun & Dashboard (Supabase)

Fitur akun & dashboard memakai Supabase (auth + database). Setup sekali:

1. Buat project di [app.supabase.com](https://app.supabase.com).
2. Salin `.env.example` menjadi `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` (menu *Project Settings > API*).
3. Jalankan `supabase/schema.sql` di SQL Editor project (membuat tabel `profiles`, `resumes`, trigger profil otomatis, dan RLS).

Tanpa keys ini, aplikasi tetap berjalan — halaman Dashboard menampilkan pesan konfigurasi, dan tombol simpan di Generator mengarahkan ke halaman Masuk.