import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator",
};

const sampleBullets = [
  "Berkolaborasi dengan tim produk merancang fitur baru selama program magang 6 bulan.",
  "Menggali insight pengguna melalui wawancara untuk mengidentifikasi kebutuhan utama.",
  "Menyusun laporan temuan riset untuk membantu prioritas pengembangan produk.",
];

const keywords = ["Riset Pengguna", "Komunikasi", "Kolaborasi"];

export default function GeneratorPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-paper">
        Generator Resume
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-paper/70">
        Ceritakan pengalamanmu dengan bahasa sehari-hari, lalu ubah jadi poin
        resume yang profesional dan siap lolos ATS.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="cerita"
                className="block text-sm font-medium text-ink-900 dark:text-paper"
              >
                Ceritakan pengalamanmu
              </label>
              <textarea
                id="cerita"
                rows={6}
                className="mt-2 w-full resize-y rounded-[4px] border border-line bg-paper p-3 text-sm text-ink-900 outline-none transition-colors focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper"
                defaultValue="Saya pernah magang 6 bulan di startup edtech. Saya bantu tim bikin fitur baru dan sering diskusi sama user biar tahu masalahnya."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="gaya"
                  className="block text-sm font-medium text-ink-900 dark:text-paper"
                >
                  Gaya bahasa
                </label>
                <select
                  id="gaya"
                  defaultValue="profesional"
                  className="mt-2 w-full rounded-[4px] border border-line bg-paper px-3 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper"
                >
                  <option value="profesional">Profesional</option>
                  <option value="formal">Formal</option>
                  <option value="santai">Santai</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="bahasa"
                  className="block text-sm font-medium text-ink-900 dark:text-paper"
                >
                  Bahasa output
                </label>
                <select
                  id="bahasa"
                  defaultValue="id"
                  className="mt-2 w-full rounded-[4px] border border-line bg-paper px-3 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper"
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="jd"
                className="block text-sm font-medium text-ink-900 dark:text-paper"
              >
                Job description{" "}
                <span className="text-ink-500 dark:text-paper/60">
                  (opsional)
                </span>
              </label>
              <textarea
                id="jd"
                rows={3}
                placeholder="Tempel job description di sini biar kata kuncinya dicocokkan..."
                className="mt-2 w-full resize-y rounded-[4px] border border-line bg-paper p-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper dark:placeholder:text-paper/40"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f]"
            >
              Ubah jadi poin ATS
            </button>
          </div>
        </section>

        <section className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
              Hasil
            </p>
            <span className="rounded-[3px] bg-teal-wash px-2 py-0.5 font-mono text-[11px] font-medium text-teal dark:bg-teal/20 dark:text-teal-bright">
              Skor kata kunci 82
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {sampleBullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-sm leading-relaxed text-ink-700 dark:text-paper/80"
              >
                <span className="text-teal">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span
                key={k}
                className="rounded-[3px] bg-teal-wash px-2 py-0.5 font-mono text-[11px] text-teal dark:bg-teal/20 dark:text-teal-bright"
              >
                {k}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-3 border-t border-line pt-5 dark:border-ink-700">
            <button
              type="button"
              className="rounded-[4px] bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-paper-dim"
            >
              Unduh PDF
            </button>
            <button
              type="button"
              className="rounded-[4px] border border-line px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-paper-dim dark:border-ink-700 dark:text-paper dark:hover:bg-ink-700"
            >
              Unduh Word
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}