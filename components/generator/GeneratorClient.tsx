"use client";

import { useState } from "react";
import { exportPdf, exportWord } from "@/lib/exporters";
import type { ResumeResult } from "@/lib/mock-generator";

type Status = "idle" | "loading" | "done";

const inputClass =
  "mt-2 w-full rounded-[4px] border border-line bg-paper p-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper dark:placeholder:text-paper/40";

const selectClass =
  "mt-2 w-full rounded-[4px] border border-line bg-paper px-3 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper";

export default function GeneratorClient() {
  const [story, setStory] = useState(
    "Saya pernah magang 6 bulan di startup edtech. Saya bantuin tim bikin fitur baru dan sering ngobrol sama user biar tahu masalahnya."
  );
  const [tone, setTone] = useState("profesional");
  const [language, setLanguage] = useState("id");
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim() || status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story, tone, language, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Terjadi kesalahan.");
      setResult(data);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setStatus("done");
    }
  };

  const handleExport = async (type: "pdf" | "word") => {
    if (!result) return;
    if (type === "pdf") {
      exportPdf("Resume", result);
    } else {
      await exportWord("Resume", result);
    }
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="cerita"
              className="block text-sm font-medium text-ink-900 dark:text-paper"
            >
              Ceritakan pengalamanmu
            </label>
            <textarea
              id="cerita"
              rows={6}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="gaya"
                className="block text-sm font-medium text-ink-900 dark:text-paper"
              >
                Gaya bahasa
              </label>
              <select
                id="gaya"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={selectClass}
              >
                <option value="profesional">Profesional</option>
                <option value="formal">Formal</option>
                <option value="santai">Santai</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="bahasa"
                className="block text-sm font-medium text-ink-900 dark:text-paper"
              >
                Bahasa output
              </label>
              <select
                id="bahasa"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={selectClass}
              >
                <option value="id">Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="jd"
              className="block text-sm font-medium text-ink-900 dark:text-paper"
            >
              Job description{" "}
              <span className="text-ink-500 dark:text-paper/60">
                (opsional)
              </span>
            </label>
            <textarea
              id="jd"
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Tempel job description di sini biar kata kuncinya dicocokkan..."
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={!story.trim() || status === "loading"}
            className="w-full rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Memoles..." : "Ubah jadi poin ATS"}
          </button>
        </div>
      </form>

      <section className="rounded-[6px] border border-line bg-paper-card p-5 dark:border-ink-700 dark:bg-ink-900">
        {status === "idle" && (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
              Hasil
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-paper/60">
              Tulis ceritamu lalu klik &quot;Ubah jadi poin ATS&quot;. Hasil
              akan muncul di sini.
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <div className="relative h-px w-48 overflow-hidden bg-line dark:bg-ink-700">
              <div className="absolute inset-y-0 w-1/2 animate-scan bg-gradient-to-r from-transparent via-teal to-transparent" />
            </div>
            <p className="mt-4 font-mono text-xs text-ink-500 dark:text-paper/60">
              Memoles resume...
            </p>
          </div>
        )}

        {status === "done" && result && !error && (
          <>
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-paper/60">
                Hasil
              </p>
              <span className="rounded-[3px] bg-teal-wash px-2 py-0.5 font-mono text-[11px] font-medium text-teal dark:bg-teal/20 dark:text-teal-bright">
                Skor kata kunci {result.score}
              </span>
            </div>

            <ul className="mt-5 space-y-3">
              {result.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-ink-700 dark:text-paper/80"
                >
                  <span className="text-teal">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {result.keywords.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {result.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-[3px] bg-teal-wash px-2 py-0.5 font-mono text-[11px] text-teal dark:bg-teal/20 dark:text-teal-bright"
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-3 border-t border-line pt-5 dark:border-ink-700">
              <button
                type="button"
                onClick={() => handleExport("pdf")}
                className="rounded-[4px] bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink-700 dark:bg-paper dark:text-ink-900 dark:hover:bg-paper-dim"
              >
                Unduh PDF
              </button>
              <button
                type="button"
                onClick={() => handleExport("word")}
                className="rounded-[4px] border border-line px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-paper-dim dark:border-ink-700 dark:text-paper dark:hover:bg-ink-700"
              >
                Unduh Word
              </button>
            </div>
          </>
        )}

        {status === "done" && error && (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber dark:text-amber">
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