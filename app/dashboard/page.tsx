import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const resumes = [
  {
    id: 1,
    name: "Resume — Frontend Developer",
    date: "24 Sep 2026",
    status: "Siap dikirim",
    tone: "teal",
  },
  {
    id: 2,
    name: "Resume — UI/UX Designer",
    date: "20 Sep 2026",
    status: "Perlu perbaikan",
    tone: "amber",
  },
  {
    id: 3,
    name: "Resume — Data Analyst",
    date: "15 Sep 2026",
    status: "Siap dikirim",
    tone: "teal",
  },
  {
    id: 4,
    name: "Draft — Marketing Specialist",
    date: "02 Sep 2026",
    status: "Draf",
    tone: "ink",
  },
];

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

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-paper">
        Dashboard
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-paper/70">
        Resume yang pernah kamu buat. Buka untuk mengedit atau unduh lagi
        kapan saja.
      </p>

      <div className="mt-8 overflow-hidden rounded-[6px] border border-line bg-paper-card dark:border-ink-700 dark:bg-ink-900">
        {resumes.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center gap-4 px-5 py-4 ${
              i > 0 ? "border-t border-line dark:border-ink-700" : ""
            }`}
          >
            <span
              className={`h-8 w-1 shrink-0 rounded-full ${toneStrip[r.tone]}`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-900 dark:text-paper">
                {r.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] text-ink-500 dark:text-paper/60">
                  {r.date}
                </p>
                <span
                  className={`rounded-[3px] px-2 py-0.5 font-mono text-[10px] font-medium ${statusBadge[r.status]}`}
                >
                  {r.status}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href="/generator"
                className="rounded-[4px] bg-ink-900 px-3 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-paper-dim"
              >
                Buka
              </Link>
              <button
                type="button"
                className="rounded-[4px] border border-line px-3 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-paper-dim dark:border-ink-700 dark:text-paper dark:hover:bg-ink-700"
              >
                Unduh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}