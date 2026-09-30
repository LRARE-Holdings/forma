"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { NAV_LINKS, PRIMARY_CTA } from "@/config/site";

/** Logo left, links, one volt CTA. Sits on ink. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-50 bg-ink text-text">
      <div className="mx-auto flex h-20 w-full max-w-content items-center justify-between px-(--gutter) md:h-24">
        <Link
          href="/"
          aria-label={`${brand.name} home`}
          className="rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-volt"
          onClick={() => setOpen(false)}
        >
          <Logo height={28} decorative />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-sm text-[15px] font-semibold text-text outline-offset-4 transition-colors duration-(--dur) ease-brand hover:text-volt focus-visible:outline-2 focus-visible:outline-volt"
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label} →</ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-volt md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-ink px-(--gutter) pb-10 md:hidden"
      >
        <ul className="flex flex-col border-t border-border">
          {NAV_LINKS.map((l) => (
            <li key={l.href} className="border-b border-border">
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-5 type-h2 hover:text-volt">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href={PRIMARY_CTA.href} size="lg" className="mt-8 w-full" onClick={() => setOpen(false)}>
          {PRIMARY_CTA.label} →
        </ButtonLink>
      </nav>
    </header>
  );
}
