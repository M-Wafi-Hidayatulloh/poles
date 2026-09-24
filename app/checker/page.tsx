import type { Metadata } from "next";
import CheckerClient from "@/components/checker/CheckerClient";

export const metadata: Metadata = {
  title: "Cek ATS",
};

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
      <CheckerClient />
    </div>
  );
}