import { NextResponse } from "next/server";
import { generateMockResume } from "@/lib/mock-generator";
import type { ResumeLanguage, ResumeTone } from "@/lib/mock-generator";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body JSON tidak valid." },
      { status: 400 }
    );
  }

  const { story, tone, language, jobDescription } = (body ?? {}) as {
    story?: unknown;
    tone?: unknown;
    language?: unknown;
    jobDescription?: unknown;
  };

  if (typeof story !== "string" || story.trim().length === 0) {
    return NextResponse.json(
      { error: "Cerita pengalaman masih kosong." },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  const result = generateMockResume({
    story: story.trim(),
    tone: (tone as ResumeTone) ?? "profesional",
    language: (language as ResumeLanguage) ?? "id",
    jobDescription:
      typeof jobDescription === "string" ? jobDescription.trim() : "",
  });

  return NextResponse.json(result);
}