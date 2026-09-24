"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "mt-1 w-full rounded-[4px] border border-line bg-paper p-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper dark:placeholder:text-paper/40";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("Supabase belum dikonfigurasi.");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <div className="rounded-[6px] border border-line bg-paper-card p-6 dark:border-ink-700 dark:bg-ink-900">
        <h1 className="font-serif text-2xl text-ink-900 dark:text-paper">
          Masuk
        </h1>
        <p className="mt-1 text-sm text-ink-700 dark:text-paper/70">
          Lanjutkan untuk melihat resume tersimpan.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink-900 dark:text-paper"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ink-900 dark:text-paper"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-amber">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="mt-5 text-sm text-ink-500 dark:text-paper/60">
          Belum punya akun?{" "}
          <Link href="/signup" className="font-medium text-teal hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
}