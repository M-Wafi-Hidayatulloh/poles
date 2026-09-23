import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator",
};

export default function GeneratorPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-[#141F29]">Generator</h1>
      <p className="mt-2 text-[#33424D]">
        Halaman ini akan diisi di tahap berikutnya.
      </p>
    </div>
  );
}