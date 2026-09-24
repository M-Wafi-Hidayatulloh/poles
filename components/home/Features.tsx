const features = [
  {
    title: "Ubah cerita jadi poin profesional",
    desc: "AI mengubah tulisan santaimu jadi bullet point resume yang padat, berorientasi hasil, dan enak dibaca perekrut.",
  },
  {
    title: "Keyword matching untuk ATS",
    desc: "Kata kunci dari job description dicocokkan otomatis supaya resumemu selaras dengan yang dicari sistem dan HR.",
  },
  {
    title: "Cek skor ATS",
    desc: "Tempel resume yang sudah jadi, dapatkan skor plus daftar bagian yang perlu diperbaiki sebelum dikirim.",
  },
  {
    title: "Ekspor PDF & Word",
    desc: "Unduh resumemu dalam format yang paling sering diminta HR, cukup satu klik.",
  },
];

export default function Features() {
  return (
    <section className="bg-paper dark:bg-ink-900">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-serif text-3xl text-ink-900 dark:text-paper">
          Kenapa <em className="italic">Poles</em>?
        </h2>
        <div className="mt-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="border-t border-line py-8 last:border-b dark:border-ink-700"
            >
              <div className="grid gap-2 md:grid-cols-[1fr_2fr] md:gap-8">
                <h3 className="text-base font-semibold text-ink-900 dark:text-paper">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-700 dark:text-paper/70">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}