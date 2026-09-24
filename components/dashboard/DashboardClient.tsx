"use client";

import Link from "next/link";
import { exportPdf, exportWord } from "@/lib/exporters";
import type { ResumeRecord } from "@/lib/types";

const toneStrip: Record<string, string> = {
  teal: "bg-teal",
  amber: "bg-amber",
  ink: "bg-ink-500",
};

const statusBadge: Record<string, string> = {
  "Siap dikirim": "bg-teal-wash text-teal dark:bg-teal/20 dark:text-teal-bright",
  "Perlu perbaikan": "bg-amber-wash text-amber dark:bg-amber/20 dark:text-amber",
  Draf: "bg-line text-ink-500 dark:bg-ink-700 dark:text-paper/60",
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function DashboardClient({
  resumes,
}: {
  resumes: ResumeRecord[];
}) {
  if (resumes.length === 0) {
    return (
      <div className="mt-8 rounded-[6px] border border-line bg-paper-card p-10 text-center dark:border-ink-700 dark:bg-ink-900">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
          Belum ada resume tersimpan
        </p>
        <p className="mt-3 text-sm text-ink-500 dark:text-paper/60">
          Buat resume dulu di Generator lalu simpan, daftarnya akan muncul di
          sini.
        </p>
        <Link
          href="/generator"
          className="mt-6 inline-flex rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f]"
        >
          Buka Generator
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-[6px] border border-line bg-paper-card dark:border-ink-700 dark:bg-ink-900">
      {resumes.map((r, i) => {
        const tone = r.score >= 70 ? "teal" : r.score >= 50 ? "amber" : "ink";
        const status =
          r.score >= 70
            ? "Siap dikirim"
            : r.score >= 50
              ? "Perlu perbaikan"
              : "Draf";

        return (
          <div
            key={r.id}
            className={`flex flex-wrap items-center gap-4 px-5 py-4 ${
              i > 0 ? "border-t border-line dark:border-ink-700" : ""
            }`}
          >
            <span
              className={`h-8 w-1 shrink-0 rounded-full ${toneStrip[tone]}`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-900 dark:text-paper">
                {r.title}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] text-ink-500 dark:text-paper/60">
                  {formatDate(r.created_at)}
                </p>
                <span
                  className={`rounded-[3px] px-2 py-0.5 font-mono text-[10px] font-medium ${statusBadge[status]}`}
                >
                  {status}
                </span>
                <span className="font-mono text-[11px] text-ink-500 dark:text-paper/60">
                  Skor {r.score}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/generator?id=${r.id}`}
                className="rounded-[4px] bg-ink-900 px-3 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-paper-dim"
              >
                Buka
              </Link>
              <button
                type="button"
                onClick={() =>
                  exportPdf(r.title, {
                    bullets: r.bullets,
                    keywords: r.keywords,
                    score: r.score,
                  })
                }
                className="rounded-[4px] border border-line px-3 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-paper-dim dark:border-ink-700 dark:text-paper dark:hover:bg-ink-700"
              >
                Unduh PDF
              </button>
              <button
                type="button"
                onClick={() =>
                  exportWord(r.title, {
                    bullets: r.bullets,
                    keywords: r.keywords,
                    score: r.score,
                  })
                }
                className="rounded-[4px] border border-line px-3 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-paper-dim dark:border-ink-700 dark:text-paper dark:hover:bg-ink-700"
              >
                Word
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}