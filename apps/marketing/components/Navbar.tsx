"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "What we make", href: "#make" },
  { label: "How we work", href: "#deal" },
  { label: "Partners", href: "/partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-parchment/95 backdrop-blur-md border-b border-espresso/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)} aria-label="Forma home">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-driftwood hover:text-espresso transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/onboarding"
            className="hidden md:inline-flex items-center px-5 py-2.5 border border-espresso/25 text-espresso text-[0.72rem] font-medium tracking-[0.1em] uppercase font-mono hover:bg-espresso hover:text-parchment hover:border-espresso transition-all"
          >
            Get a quote
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] w-6 h-6 justify-center"
          >
            <span
              className={`block h-[1.5px] bg-espresso transition-all duration-300 ${
                open ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-espresso transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-espresso transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-parchment flex flex-col px-8 pt-24 pb-12 transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((l, i) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-[2.8rem] leading-[1.15] text-espresso border-b border-espresso/8 py-4 transition-all hover:text-terracotta"
              style={{
                transitionDelay: open ? `${i * 60}ms` : "0ms",
                transform: open ? "none" : "translateY(10px)",
                opacity: open ? 1 : 0,
                transition: `transform 400ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, opacity 400ms ease ${i * 60}ms, color 200ms ease`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="/onboarding"
          onClick={() => setOpen(false)}
          className="block w-full py-4 bg-espresso text-parchment text-[0.82rem] font-mono uppercase tracking-[0.14em] text-center mt-8"
        >
          Get a quote
        </Link>
      </div>
    </>
  );
}
