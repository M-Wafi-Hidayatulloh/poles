import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-[#141F29]">Poles</h1>
      <p className="mt-4 max-w-xl text-[#33424D]">
        Tulis pengalamanmu dengan bahasa sehari-hari, lalu ubah jadi poin resume
        yang profesional dan siap lolos ATS.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/generator"
          className="rounded-[4px] bg-[#1C7A63] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#16634F]"
        >
          Buat Resume
        </Link>
        <Link
          href="/checker"
          className="rounded-[4px] border border-[#D9D2BE] bg-white px-5 py-3 text-sm font-medium text-[#141F29] transition-colors hover:bg-[#E7E3D4]"
        >
          Cek Skor ATS
        </Link>
      </div>
    </div>
  );
}