export interface AtsCheck {
  ok: boolean;
  text: string;
}

export interface AtsReport {
  score: number;
  checks: AtsCheck[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

const SECTION_PATTERNS = {
  ringkasan: /ringkasan|profil|summary|profile|tentang saya/i,
  pengalaman: /pengalaman|pengalaman kerja|riwayat kerja|work experience|experience/i,
  pendidikan: /pendidikan|education|riwayat pendidikan/i,
  skills: /skill|keahlian|kemampuan|skills|keahlian teknis/i,
};

const KEYWORDS: Array<[RegExp, string]> = [
  [
    /komunikasi|komunikatif|ngobrol|diskusi|presentasi|public speaking/i,
    "Komunikasi",
  ],
  [/kolaborasi|bekerja sama|tim|kerja sama|collab/i, "Kolaborasi"],
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

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_RE = /\+?\d[\d\s().-]{7,}\d/;
const BULLET_RE = /^(?:[•▪◦*→–—\-]|\d+[.)])\s*/;

function splitSentences(text: string): string[] {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function checkResume(raw: string): AtsReport {
  const text = raw.trim();
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const checks: AtsCheck[] = [];
  let score = 0;
  const addCheck = (ok: boolean, weight: number, label: string) => {
    checks.push({ ok, text: label });
    if (ok) score += weight;
  };

  addCheck(
    SECTION_PATTERNS.ringkasan.test(text),
    12,
    "Ringkasan profil ditemukan"
  );
  addCheck(
    SECTION_PATTERNS.pengalaman.test(text),
    15,
    "Section Pengalaman Kerja ditemukan"
  );
  addCheck(
    SECTION_PATTERNS.pendidikan.test(text),
    10,
    "Section Pendidikan ditemukan"
  );
  addCheck(SECTION_PATTERNS.skills.test(text), 10, "Section Skills ditemukan");

  const sentences = splitSentences(text);
  const wordCounts = sentences.map((s) => s.split(/\s+/).length);
  const avgWords =
    wordCounts.length > 0
      ? wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length
      : 0;
  addCheck(
    wordCounts.length === 0 || avgWords <= 25,
    10,
    "Panjang kalimat rata-rata di bawah 25 kata"
  );
  addCheck(
    wordCounts.length === 0 || Math.max(...wordCounts) <= 30,
    8,
    "Tidak ada kalimat yang terlalu panjang (>30 kata)"
  );

  addCheck(EMAIL_RE.test(text), 8, "Alamat email ditemukan");
  addCheck(PHONE_RE.test(text), 7, "Nomor telepon ditemukan");

  const bulletLines = lines.filter((l) => BULLET_RE.test(l)).length;
  addCheck(
    lines.length === 0 || bulletLines / lines.length >= 0.2,
    10,
    "Penggunaan bullet point cukup (untuk poin pengalaman)"
  );

  const matchedKeywords = KEYWORDS.filter(([re]) => re.test(text)).map(
    ([, label]) => label
  );
  const missingKeywords = KEYWORDS.filter(([re]) => !re.test(text)).map(
    ([, label]) => label
  );

  if (matchedKeywords.length >= 2) {
    addCheck(
      true,
      10,
      `Kata kunci terdeteksi: ${matchedKeywords.slice(0, 3).join(", ")}`
    );
  } else {
    addCheck(
      matchedKeywords.length > 0,
      10,
      matchedKeywords.length > 0
        ? `Kata kunci terdeteksi: ${matchedKeywords.join(", ")}`
        : "Belum ada kata kunci yang terdeteksi"
    );
  }

  const missingShown = missingKeywords.slice(0, 3);
  for (const keyword of missingShown) {
    checks.push({
      ok: false,
      text: `Kata kunci "${keyword}" belum ditemukan`,
    });
  }

  return {
    score: Math.min(100, Math.round(score)),
    checks,
    matchedKeywords,
    missingKeywords,
  };
}