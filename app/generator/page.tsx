import type { Metadata } from "next";
import GeneratorClient from "@/components/generator/GeneratorClient";

export const metadata: Metadata = {
  title: "Generator",
};

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
      <GeneratorClient />
    </div>
  );
}