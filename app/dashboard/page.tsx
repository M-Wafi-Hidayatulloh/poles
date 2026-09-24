import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import DashboardClient from "@/components/dashboard/DashboardClient";
import type { ResumeRecord } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-serif text-3xl text-ink-900 dark:text-paper">
          Dashboard
        </h1>
        <div className="mt-8 rounded-[6px] border border-line bg-paper-card p-6 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-paper/70">
          Supabase belum dikonfigurasi. Tambahkan{" "}
          <code className="font-mono text-xs text-teal">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          dan{" "}
          <code className="font-mono text-xs text-teal">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          di <code className="font-mono text-xs">.env.local</code> lalu jalankan
          skema di <code className="font-mono text-xs">supabase/schema.sql</code>.
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  if (!claims?.sub) {
    redirect("/login");
  }

  const { data: rows } = await supabase
    .from("resumes")
    .select("id, title, bullets, keywords, score, created_at")
    .order("created_at", { ascending: false });

  const resumes: ResumeRecord[] = (rows ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    keywords: Array.isArray(row.keywords) ? row.keywords : [],
    score: row.score ?? 0,
    created_at: row.created_at ?? new Date().toISOString(),
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-paper">
        Dashboard
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-paper/70">
        Resume yang pernah kamu buat. Buka untuk mengedit atau unduh lagi
        kapan saja.
      </p>
      <DashboardClient resumes={resumes} />
    </div>
  );
}