import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek ATS",
};

const checks = [
  {
    ok: true,
    text: "Heading section lengkap (Pengalaman, Pendidikan, Skills)",
  },
  { ok: true, text: "Panjang kalimat rata-rata di bawah 25 kata" },
  { ok: false, text: 'Kata kunci "manajemen proyek" belum ditemukan' },
  { ok: false, text: "Bagian kontak tidak lengkap (email/telepon)" },
  { ok: true, text: "Penggunaan bullet point konsisten" },
  { ok: false, text: "Ringkasan profil belum ada" },
];

export default function CheckerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-paper">
        Cek ATS
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-paper/70">
        Tempel resume yang sudah jadi untuk melihat skor ATS dan bagian mana
        yang perlu diperbaiki.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900">
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-ink-900 dark:text-paper"
          >
            Tempel resume kamu
          </label>
          <textarea
            id="resume"
            rows={12}
            placeholder="Tempel isi resume kamu di sini..."
            className="mt-2 w-full resize-y rounded-[4px] border border-line bg-paper p-3 font-mono text-xs leading-relaxed text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper dark:placeholder:text-paper/40"
          />
          <button
            type="button"
            className="mt-4 w-full rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f]"
          >
            Cek skor ATS
          </button>
        </section>

        <section className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900">
          <div className="flex items-end gap-4">
            <p className="font-serif text-6xl leading-none text-teal">78</p>
            <div className="pb-1">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-paper/60">
                Skor ATS
              </p>
              <p className="text-xs text-ink-500 dark:text-paper/60">dari 100</p>
            </div>
          </div>

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-line dark:bg-ink-700">
            <div
              className="h-full rounded-full bg-teal"
              style={{ width: "78%" }}
            />
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
            Hasil pemeriksaan
          </p>
          <ul className="mt-4 space-y-3">
            {checks.map((c) => (
              <li
                key={c.text}
                className="flex gap-2 font-mono text-xs leading-relaxed text-ink-700 dark:text-paper/80"
              >
                <span className={c.ok ? "text-teal" : "text-amber"}>
                  {c.ok ? "[✓]" : "[!]"}
                </span>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}