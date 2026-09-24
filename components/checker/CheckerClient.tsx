"use client";

import { useState } from "react";
import type { AtsReport } from "@/lib/ats-checker";

type Status = "idle" | "loading" | "done";

export default function CheckerClient() {
  const [resume, setResume] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [report, setReport] = useState<AtsReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Terjadi kesalahan.");
      setReport(data);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setStatus("done");
    }
  };

  const score = report?.score ?? 0;
  const scoreColor =
    score >= 70 ? "text-teal" : score >= 50 ? "text-amber" : "text-ink-500";

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900"
      >
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-ink-900 dark:text-paper"
        >
          Tempel resume kamu
        </label>
        <textarea
          id="resume"
          rows={12}
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Tempel isi resume kamu di sini..."
          className="mt-2 w-full resize-y rounded-[4px] border border-line bg-paper p-3 font-mono text-xs leading-relaxed text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper dark:placeholder:text-paper/40"
        />
        <button
          type="submit"
          disabled={!resume.trim() || status === "loading"}
          className="mt-4 w-full rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Menganalisis..." : "Cek skor ATS"}
        </button>
      </form>

      <section className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900">
        {status === "idle" && (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
              Hasil
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-paper/60">
              Tempel resumemu lalu klik &quot;Cek skor ATS&quot;. Laporan akan
              muncul di sini.
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <div className="relative h-px w-48 overflow-hidden bg-line dark:bg-ink-700">
              <div className="absolute inset-y-0 w-1/2 animate-scan bg-gradient-to-r from-transparent via-teal to-transparent" />
            </div>
            <p className="mt-4 font-mono text-xs text-ink-500 dark:text-paper/60">
              Menganalisis resume...
            </p>
          </div>
        )}

        {status === "done" && report && !error && (
          <>
            <div className="flex items-end gap-4">
              <p className={`font-serif text-6xl leading-none ${scoreColor}`}>
                {score}
              </p>
              <div className="pb-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-paper/60">
                  Skor ATS
                </p>
                <p className="text-xs text-ink-500 dark:text-paper/60">
                  dari 100
                </p>
              </div>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-line dark:bg-ink-700">
              <div
                className={`h-full rounded-full ${
                  score >= 50 ? "bg-teal" : "bg-amber"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
              Hasil pemeriksaan
            </p>
            <ul className="mt-4 space-y-3">
              {report.checks.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-2 font-mono text-xs leading-relaxed text-ink-700 dark:text-paper/80"
                >
                  <span className={c.ok ? "text-teal" : "text-amber"}>
                    {c.ok ? "[✓]" : "[!]"}
                  </span>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {status === "done" && error && (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              Terjadi kendala
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-700 dark:text-paper/70">
              {error}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}