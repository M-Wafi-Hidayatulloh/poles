import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-ink-900 text-paper dark:bg-[#0b1116]">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-bright">
            Tool untuk fresh grad &amp; job seeker
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-tight lg:text-5xl">
            Cerita santai.
            <br />
            Resume yang <em className="italic text-teal-bright">lolos ATS</em>.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70">
            Pengalamanmu bagus, cuma belum tahu cara nulisnya seperti resume.
            Tulis saja pakai bahasa sehari-hari, Poles yang merapikannya jadi
            poin profesional yang siap dilamar.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/generator"
              className="rounded-[4px] bg-teal-bright px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-[#53ccad]"
            >
              Coba Gratis
            </Link>
            <Link
              href="/checker"
              className="rounded-[4px] border border-paper/30 px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Cek Skor ATS
            </Link>
          </div>
        </div>

        <div className="rounded-[6px] border border-paper/15 bg-[#0d1b26] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-bright">
            Demo transformasi
          </p>

          <div className="mt-4 rounded-[4px] border border-paper/10 bg-ink-900 p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-paper/40">
              INPUT — cerita kamu
            </p>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-paper/80">
              {"Saya pernah magang 6 bulan di startup edtech.\nBantuin tim buat fitur baru. Sering ngobrol\nsama user biar tahu masalahnya."}
            </pre>
          </div>

          <div className="relative mt-4 h-px overflow-hidden bg-paper/15">
            <div className="absolute inset-y-0 w-1/2 animate-scan bg-gradient-to-r from-transparent via-teal-bright to-transparent" />
          </div>

          <div className="mt-4 rounded-[4px] border border-paper/10 bg-ink-900 p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-paper/40">
              OUTPUT — poin resume
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 font-mono text-xs leading-relaxed text-paper/90">
                <span className="text-teal-bright">•</span>
                <span>
                  Berkolaborasi dengan tim produk merancang fitur baru selama
                  program magang 6 bulan.
                </span>
              </li>
              <li className="flex gap-2 font-mono text-xs leading-relaxed text-paper/90">
                <span className="text-teal-bright">•</span>
                <span>
                  Menggali insight pengguna lewat wawancara untuk
                  mengidentifikasi kebutuhan utama.
                </span>
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-[3px] bg-teal/20 px-2 py-0.5 font-mono text-[10px] text-teal-bright">
                Komunikasi
              </span>
              <span className="rounded-[3px] bg-teal/20 px-2 py-0.5 font-mono text-[10px] text-teal-bright">
                Analisis
              </span>
              <span className="rounded-[3px] bg-teal/20 px-2 py-0.5 font-mono text-[10px] text-teal-bright">
                Riset Pengguna
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}