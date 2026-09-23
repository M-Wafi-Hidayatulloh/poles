import Link from "next/link";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/generator", label: "Generator" },
  { href: "/checker", label: "Cek ATS" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-[#D9D2BE] bg-[#F1EFE3]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-[#141F29]">
          Poles<span className="text-[#1C7A63]">.</span>
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#33424D] transition-colors hover:text-[#141F29]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/generator"
            className="rounded-[4px] bg-[#1C7A63] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#16634F]"
          >
            Coba Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}