const steps = [
  {
    n: "01",
    title: "Tulis santai",
    desc: "Ceritakan pengalaman, skill, dan proyekmu dengan bahasa sendiri di kolom input.",
  },
  {
    n: "02",
    title: "Kami poles",
    desc: "AI merapikan jadi poin resume profesional dan menambahkan kata kunci yang relevan.",
  },
  {
    n: "03",
    title: "Ekspor & lamar",
    desc: "Cek skor ATS, unduh PDF atau Word, lalu kirim lamaranmu.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-paper-dim dark:bg-[#12202c]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-serif text-3xl text-ink-900 dark:text-paper">
          Cara kerjanya
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-ink-500/30 pt-6">
              <p className="font-mono text-sm text-teal">{s.n}</p>
              <h3 className="mt-3 text-base font-semibold text-ink-900 dark:text-paper">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-paper/70">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}