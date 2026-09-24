import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import GeneratorClient from "@/components/generator/GeneratorClient";

export const metadata: Metadata = {
  title: "Generator",
};

export default async function GeneratorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string | string[] }>;
}) {
  const { id } = await searchParams;
  const resumeId = typeof id === "string" ? id : undefined;

  let initialStory: string | undefined;
  if (resumeId && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("resumes")
      .select("story")
      .eq("id", resumeId)
      .maybeSingle();
    if (data?.story && typeof data.story === "string") {
      initialStory = data.story;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-3xl text-ink-900 dark:text-paper">
        Generator Resume
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-paper/70">
        Ceritakan pengalamanmu dengan bahasa sehari-hari, lalu ubah jadi poin
        resume yang profesional dan siap lolos ATS.
      </p>
      <GeneratorClient initialStory={initialStory} />
    </div>
  );
}