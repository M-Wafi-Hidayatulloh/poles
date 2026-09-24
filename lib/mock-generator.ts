export type ResumeTone = "profesional" | "formal" | "santai";
export type ResumeLanguage = "id" | "en";

export interface GenerateInput {
  story: string;
  tone: ResumeTone;
  language: ResumeLanguage;
  jobDescription?: string;
}

export interface ResumeResult {
  bullets: string[];
  keywords: string[];
  score: number;
}

const SUBSTITUTIONS: Array<[RegExp, string]> = [
  [/bantuin/gi, "membantu"],
  [/ngobrol/gi, "berdiskusi"],
  [/bikin/gi, "membuat"],
  [/biarin/gi, "membiarkan"],
  [/temen/gi, "teman"],
  [/pastiin/gi, "memastikan"],
  [/capek/gi, "lelah"],
  [/sama user/gi, "dengan pengguna"],
];

const LEADING_FILLERS = /^(saya|aku|gue|gw|aku juga|saya juga)\s+/i;

const KEYWORDS: Array<[RegExp, string]> = [
  [
    /komunikasi|komunikatif|ngobrol|diskusi|presentasi|public speaking/i,
    "Komunikasi",
  ],
  [
    /kolaborasi|bekerja sama|tim|kerja sama|collab/i,
    "Kolaborasi",
  ],
  [
    /riset|research|wawancara|interview|survey|survei/i,
    "Riset Pengguna",
  ],
  [
    /analisis|analisa|data|dashboard|laporan|report/i,
    "Analisis Data",
  ],
  [
    /manajemen proyek|project management|deadline|scrum|agile|kanban/i,
    "Manajemen Proyek",
  ],
  [
    /frontend|front-end|react|web dev|javascript|typescript|website/i,
    "Frontend Development",
  ],
  [
    /design|desain|ui|ux|figma|prototype|mockup/i,
    "Desain UI/UX",
  ],
  [
    /marketing|sosmed|sosial media|content|konten|copywriting/i,
    "Marketing & Konten",
  ],
  [
    /pemimpin|leadership|memimpin|lead tim/i,
    "Kepemimpinan",
  ],
  [
    /menulis|tulisan|dokumentasi|writer/i,
    "Penulisan & Dokumentasi",
  ],
];

function applySubstitutions(text: string): string {
  let out = text;
  for (const [re, rep] of SUBSTITUTIONS) {
    out = out.replace(re, rep);
  }
  return out;
}

function splitAndClean(story: string): string[] {
  const normalized = applySubstitutions(story).replace(/\n+/g, ". ");
  const chunks = normalized.split(/(?<=[.!?])\s+/);
  const bullets: string[] = [];
  for (const chunk of chunks) {
    let sentence = chunk.trim().replace(LEADING_FILLERS, "");
    if (sentence.length < 12) continue;
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    if (!/[.!?]$/.test(sentence)) sentence += ".";
    bullets.push(sentence);
    if (bullets.length >= 6) break;
  }
  return bullets;
}

function extractKeywords(story: string, jobDescription: string): string[] {
  const haystack = `${story} ${jobDescription}`;
  const found = KEYWORDS.filter(([re]) => re.test(haystack)).map(
    ([, label]) => label
  );
  return Array.from(new Set(found)).slice(0, 6);
}

export function generateMockResume(input: GenerateInput): ResumeResult {
  const bullets = splitAndClean(input.story);
  const keywords = extractKeywords(input.story, input.jobDescription ?? "");
  if (bullets.length === 0) {
    return {
      bullets: [
        "Menjalankan tanggung jawab utama posisi dengan hasil yang terukur.",
      ],
      keywords,
      score: Math.min(95, 40 + keywords.length * 3),
    };
  }
  const score = Math.min(95, 58 + bullets.length * 4 + keywords.length * 3);
  return { bullets, keywords, score };
}