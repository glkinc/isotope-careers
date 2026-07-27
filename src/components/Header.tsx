"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NavLink = { href: string; label: string };

export default function Header({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="relative z-50 bg-brand">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="block" onClick={() => setOpen(false)}>
          <Image
            src="/logo-full-white.svg"
            alt="Sabertree"
            width={160}
            height={26}
            priority
          />
        </Link>

        <nav className="hidden gap-8 text-sm font-bold text-white md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <span
            aria-hidden
            className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-out ${
              open ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-out ${
              open ? "-translate-y-[8px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-brand transition-opacity duration-300 ease-out md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{
              transitionDelay: open ? `${i * 60 + 100}ms` : "0ms",
            }}
            className={`font-heading text-3xl font-bold text-white transition-all duration-300 ease-out hover:text-accent ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
