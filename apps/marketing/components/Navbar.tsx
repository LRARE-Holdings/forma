"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-parchment/92 backdrop-blur-xl border-b border-espresso/6 shadow-[0_1px_3px_rgba(44,24,16,0.03)]"
          : "border-b border-transparent"
      }`}
    >
      <Link
        href="/"
        className="text-[1.35rem] font-black tracking-[-0.04em] text-transparent"
        style={{ WebkitTextStroke: "1.2px #5C3D2E" }}
      >
        forma
      </Link>
      <div className="flex items-center gap-5 md:gap-8">
        <Link
          href="#features"
          className="hidden md:block text-[0.82rem] font-medium text-driftwood hover:text-espresso transition-colors"
        >
          Features
        </Link>
        <Link
          href="#pricing"
          className="hidden md:block text-[0.82rem] font-medium text-driftwood hover:text-espresso transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="#how"
          className="hidden md:block text-[0.82rem] font-medium text-driftwood hover:text-espresso transition-colors"
        >
          How it works
        </Link>
        <Link
          href="/case-studies/burn-mat-studio"
          className="hidden md:block text-[0.82rem] font-medium text-driftwood hover:text-espresso transition-colors"
        >
          Case study
        </Link>
        <Link
          href="/onboarding"
          className="px-4 py-2 bg-terracotta text-parchment text-[0.8rem] font-bold rounded-lg hover:bg-burnt transition-all hover:scale-[1.04]"
        >
          Get a quote
        </Link>
      </div>
    </nav>
  );
}
