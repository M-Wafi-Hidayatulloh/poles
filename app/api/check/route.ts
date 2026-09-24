import { NextResponse } from "next/server";
import { checkResume } from "@/lib/ats-checker";

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

  const { resume } = (body ?? {}) as { resume?: unknown };

  if (typeof resume !== "string" || resume.trim().length === 0) {
    return NextResponse.json(
      { error: "Resume masih kosong." },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json(checkResume(resume.trim()));
}