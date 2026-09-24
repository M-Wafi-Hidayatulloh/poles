import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body JSON tidak valid." },
      { status: 400 }
    );
  }

  const {
    title,
    story,
    bullets,
    keywords,
    score,
    tone,
    language,
    jobDescription,
  } = (body ?? {}) as {
    title?: unknown;
    story?: unknown;
    bullets?: unknown;
    keywords?: unknown;
    score?: unknown;
    tone?: unknown;
    language?: unknown;
    jobDescription?: unknown;
  };

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims ?? null;

  if (!claims?.sub) {
    return NextResponse.json(
      { error: "Kamu harus login dulu." },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: claims.sub,
      title:
        typeof title === "string" && title.trim() ? title.trim() : "Resume",
      story: typeof story === "string" ? story : null,
      bullets: Array.isArray(bullets) ? bullets : [],
      keywords: Array.isArray(keywords) ? keywords : [],
      score: typeof score === "number" ? Math.round(score) : 0,
      tone: typeof tone === "string" ? tone : null,
      language: typeof language === "string" ? language : null,
      job_description:
        typeof jobDescription === "string" ? jobDescription : null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}