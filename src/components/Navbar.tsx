"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/site";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
        <Image src={site.logo} alt="" fill sizes="44px" className="object-contain" priority />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block text-xl font-black uppercase tracking-normal">TPC</span>
        <span className={`block text-[0.58rem] font-extrabold uppercase tracking-[0.18em] ${light ? "text-white/60" : "text-tpc-slate"}`}>
          Teens Prayer Conference
        </span>
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const homeTop = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        homeTop
          ? "border-white/10 bg-black/20 text-white backdrop-blur-md"
          : "border-tpc-mist bg-tpc-cream/95 text-tpc-ink shadow-sm backdrop-blur-xl"
      }`}
    >
      <nav className="tpc-container flex h-[74px] items-center justify-between">
        <Link href="/" aria-label="TPC home">
          <Brand light={homeTop} />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-extrabold transition ${
                  active
                    ? homeTop
                      ? "bg-white text-tpc-ink"
                      : "bg-tpc-ink text-white"
                    : homeTop
                      ? "text-white/70 hover:bg-white/10 hover:text-white"
                      : "text-tpc-slate hover:bg-white hover:text-tpc-red"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="tpc-button tpc-button-primary hidden px-5 lg:inline-flex"
          >
            Register
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden ${
              homeTop ? "border-white/20 bg-white/10 text-white" : "border-tpc-mist bg-white text-tpc-ink"
            }`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-tpc-mist bg-tpc-cream px-5 pb-6 pt-3 shadow-2xl lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-base font-extrabold text-tpc-ink hover:bg-white hover:text-tpc-red"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
