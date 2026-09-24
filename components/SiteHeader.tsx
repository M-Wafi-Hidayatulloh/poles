"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/generator", label: "Generator" },
  { href: "/checker", label: "Cek ATS" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper dark:border-ink-700 dark:bg-ink-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-2xl italic text-ink-900 dark:text-paper"
        >
          Poles<span className="text-teal">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-700 transition-colors hover:text-ink-900 dark:text-paper/80 dark:hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/generator"
            className="rounded-[4px] bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#16634f]"
          >
            Coba Gratis
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-line text-ink-900 md:hidden dark:border-ink-700 dark:text-paper"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-6 py-4 md:hidden dark:border-ink-700">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-700 dark:text-paper/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/generator"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit rounded-[4px] bg-teal px-4 py-2 text-sm font-medium text-white"
            >
              Coba Gratis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}