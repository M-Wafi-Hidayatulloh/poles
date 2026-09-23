# Project Brief — Poles (ATS Resume & Portfolio Generator)

Halo, berikut penjelasan project yang mau saya kerjakan, saya bagi per tahap pengerjaan biar lebih gampang diikuti. Tolong dibaca semuanya dulu sebelum mulai, karena beberapa bagian saling berkaitan.

## Latar belakang

Saya mau bikin web tool yang membantu orang (terutama fresh graduate dan job seeker) menulis resume yang lebih profesional dan bisa lolos sistem ATS. Banyak yang sebenarnya punya pengalaman bagus tapi nggak tahu cara nulisnya — mereka nulis kayak lagi cerita ke teman, bukan kayak resume. Jadi ide besarnya: user tulis pengalamannya pakai bahasa sehari-hari, terus sistem yang bantu rapiin jadi poin resume.

Nama produknya "Poles" — diambil dari kata "memoles/merapikan", karena itu memang yang dilakukan tool ini.

Untuk versi awal, saya rasa nggak perlu semua fitur langsung jadi. Generator (bagian inti) harus jalan dulu dengan baik, sisanya bisa nyusul. Nggak ada deadline ketat, tapi kalau bisa versi yang bisa dipakai selesai dalam sebulan.

Tolong dikerjain bertahap sesuai tahap di bawah, jangan langsung semua sekaligus. Tiap satu tahap selesai, kasih tau saya biar saya cek dulu sebelum lanjut — saya nggak mau nunggu semuanya jadi baru ketauan ada yang salah dari awal.

---

## Tahap 1 — Setup Project

Mulai dari yang paling dasar dulu. Buat project baru pakai Next.js dan Tailwind CSS, pastikan bisa jalan di local dan bisa di-deploy walau isinya masih kosong (halaman kosong aja dulu ke Vercel, yang penting pipeline-nya kelihatan jalan). Struktur foldernya disusun rapi dari awal — nanti bakal ada beberapa halaman, jadi mending pakai App Router-nya Next.js supaya routing per halaman gampang.

Push ke GitHub dari awal juga, biar histori perubahannya kecatat dari project masih kosong.

## Tahap 2 — Desain & Tampilan

Saya udah siapin acuan visualnya, jadi tahap ini tinggal diimplementasikan, bukan mendesain dari nol. Saya lampirkan dua file:

- `design-reference.html` — contoh tampilan interaktif tiap halaman, bisa dibuka langsung di browser
- `DESIGN.md` — detail warna, font, dan struktur halamannya dalam bentuk teks

Isi `DESIGN.md` kurang lebih begini (saya tempel di sini juga biar nggak perlu bolak-balik buka file):

```markdown
# DESIGN.md — Spesifikasi Desain "Poles"

## Design Tokens

### Warna
--ink-900:   #141F29   /* background hero, teks utama */
--ink-700:   #33424D   /* teks sekunder */
--ink-500:   #5B6A73   /* teks tersier / label */
--paper:     #F1EFE3   /* background halaman */
--paper-dim: #E7E3D4   /* background section alternatif */
--paper-card:#FFFFFF   /* background kartu/panel */
--line:      #D9D2BE   /* garis pembatas / border */
--teal:      #1C7A63   /* aksen utama — tombol, status positif */
--teal-bright:#3FBF9B  /* aksen di atas background gelap */
--teal-wash: #E4F1EC   /* background chip/tag teal */
--amber:     #AE6A2E   /* aksen sekunder — flag/peringatan, bukan error */
--amber-wash:#F7ECDD   /* background chip/tag amber */

Mode gelap: background & ink dibalik, aksen teal/amber tetap sama.

### Tipografi
- Display/judul: Fraunces (serif, italic untuk logo & kicker)
- Body/UI: IBM Plex Sans
- Elemen "sistem/scan": IBM Plex Mono — hanya untuk label/output ATS, jangan dipakai di tempat lain

### Prinsip visual
- Rata kiri, bukan center-aligned
- Border-radius kecil (3–6px), bukan rounded penuh
- Hairline border (1px, warna --line) untuk misahin konten, hindari shadow tebal
- Motif scan-line/terminal cuma di bagian yang relevan sama proses ATS

## Struktur tiap halaman

**Nav (semua halaman):** logo "Poles." di kiri, menu Beranda/Generator/Cek ATS/Dashboard, tombol "Coba Gratis" di kanan, hamburger menu di mobile.

**Beranda:** hero background gelap (--ink-900) — eyebrow text kecil, headline 2 baris pakai Fraunces, subheadline, 2 tombol CTA. Di sisi kanan hero ada panel demo transformasi: kotak "input mentah" (font mono) → garis scan → kotak "hasil" (bullet list + tag kata kunci). Di bawahnya section fitur (list 4 baris dipisah garis tipis, bukan kartu) dan section cara kerja (3 langkah bernomor).

**Generator:** 2 kolom. Kiri: textarea input, dropdown gaya bahasa, dropdown bahasa output, textarea job description (opsional), tombol "Ubah jadi poin ATS". Kanan: area hasil — kosong dulu, lalu muncul bullet list hasil + chip skor kata kunci + tombol ekspor.

**Cek ATS:** 2 kolom. Kiri: textarea tempel resume + tombol "Cek skor ATS". Kanan: skor besar (font Fraunces) + progress bar tipis + daftar baris mono bertanda [✓] atau [!].

**Dashboard:** daftar resume tersimpan sebagai baris (bukan kartu grid) — strip warna kecil di kiri sebagai indikator status, nama resume, info tanggal (font mono kecil), tombol Buka/Unduh.

## Soal navigasi (penting)

Routing antar halaman pakai Next.js App Router (app/page.tsx, app/generator/page.tsx, app/checker/page.tsx, app/dashboard/page.tsx), dan link antar halaman wajib pakai `<Link>` dari `next/link` — bukan `<a href>` biasa. Ini penting karena kemarin saya sempat coba di tool lain dan navigasinya bikin error "Cannot GET" gara-gara linknya reload ke halaman yang belum ke-setup. Tolong dipastikan dari awal ini udah bener.
```

Kerjain satu halaman dulu (Beranda), samain sama `design-reference.html`, baru saya cek sebelum lanjut ke halaman berikutnya. Datanya masih boleh statis/dummy di tahap ini, yang penting tampilannya udah sesuai.

## Tahap 3 — Bangun Halaman Generator (fungsinya)

Setelah semua halaman tampilannya jadi, baru masuk ke bagian yang paling penting: bikin Generator beneran jalan. Buat API route yang nerima input teks mentah, terus manggil model AI buat ubah jadi poin resume. Untuk awal boleh pakai data contoh dulu (mock), yang penting alurnya keliatan — form isi, submit, hasil muncul — baru nanti disambungin ke API AI yang sesungguhnya.

Tambahin juga fitur exportnya di tahap ini — minimal PDF sama Word, karena kebanyakan HR masih minta format itu.

## Tahap 4 — Bangun Cek ATS

Bagian ini agak beda dari Generator — user tempel resume yang udah jadi (bukan bikin baru), terus sistem kasih laporan: skornya berapa, bagian mana yang perlu diperbaiki, kata kunci apa yang belum masuk. Boleh mulai dari logic sederhana dulu (cek panjang kalimat, keyword matching, struktur heading) sebelum nanti dikembangin pakai AI juga kalau perlu.

## Tahap 5 — Akun & Dashboard (kalau masih diperlukan di versi ini)

Kalau user daftar akun, mereka bisa lihat resume yang pernah dibuat dan buka lagi buat edit/download ulang. Saya pikir pakai Supabase aja untuk auth sama database-nya, biar nggak perlu setup infrastruktur sendiri dari nol.

Bagian ini bisa dilewat dulu kalau ternyata di luar scope versi awal — yang penting Generator sama Cek ATS udah jalan duluan.

## Tahap 6 — Testing & Rilis

Terakhir, sebelum dibagikan ke orang lain: cek di beberapa device dan browser, coba kasih input yang aneh-aneh (kosong, kepanjangan, campur bahasa) buat lihat responnya gimana. Pastikan API key dan hal-hal sensitif lain nggak ke-hardcode di kode, taruh di environment variables. Baru setelah itu deploy versi finalnya.

---

Kalau ada yang kurang jelas dari brief ini, tanya aja sebelum mulai kerja — daripada nanti salah arah dan harus diulang.

## Lampiran
- `design-reference.html` — contoh tampilan interaktif
- `DESIGN.md` — detail warna, font, dan struktur tiap halaman (isinya sudah ditempel di Tahap 2 di atas)
