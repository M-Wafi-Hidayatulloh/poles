import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import type { ResumeResult } from "@/lib/mock-generator";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportPdf(title: string, result: ResumeResult) {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, 20, 22);
  doc.setDrawColor(200);
  doc.line(20, 27, 190, 27);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  let y = 40;
  result.bullets.forEach((bullet) => {
    const lines = doc.splitTextToSize(bullet, 162);
    if (y + lines.length * 6 > 280) {
      doc.addPage();
      y = 24;
    }
    doc.text("•", 22, y);
    doc.text(lines, 28, y);
    y += lines.length * 6 + 5;
  });

  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(110);
  doc.text(`Kata kunci: ${result.keywords.join(", ")}`, 22, y);

  doc.save("resume.pdf");
}

export async function exportWord(title: string, result: ResumeResult) {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22 },
        },
      },
    },
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 36 })],
            spacing: { after: 240 },
          }),
          ...result.bullets.map(
            (bullet) =>
              new Paragraph({
                text: bullet,
                bullet: { level: 0 },
                spacing: { after: 120 },
              })
          ),
          new Paragraph({
            children: [
              new TextRun({
                text: `Kata kunci: ${result.keywords.join(", ")}`,
                italics: true,
                size: 18,
                color: "666666",
              }),
            ],
            spacing: { before: 240 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, "resume.docx");
}