"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "mt-1 w-full rounded-[4px] border border-line bg-paper p-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-teal dark:border-ink-700 dark:bg-ink-900 dark:text-paper dark:placeholder:text-paper/40";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("Supabase belum dikonfigurasi.");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }
    setMessage(
      "Akun dibuat. Cek emailmu untuk konfirmasi sebelum masuk."
    );
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <div className="rounded-[6px] border border-line bg-paper-card p-6 dark:border-ink-700 dark:bg-ink-900">
        <h1 className="font-serif text-2xl text-ink-900 dark:text-paper">
          Daftar
        </h1>
        <p className="mt-1 text-sm text-ink-700 dark:text-paper/70">
          Simpan resume yang pernah kamu buat.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-ink-900 dark:text-paper"
            >
              Nama
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              className={inputClass}
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="font-mono text-xs text-amber">{error}</p>}
          {message && <p className="font-mono text-xs text-teal">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[4px] bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16634f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="mt-5 text-sm text-ink-500 dark:text-paper/60">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-teal hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}