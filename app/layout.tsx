import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Poles — ATS Resume & Portfolio Generator",
    template: "%s — Poles",
  },
  description:
    "Tulis pengalamanmu dengan bahasa sehari-hari, biar Poles yang merapikannya jadi poin resume yang siap lolos ATS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}