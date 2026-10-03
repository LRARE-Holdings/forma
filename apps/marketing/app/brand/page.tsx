import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { brand } from "@/config/brand";
import { BOOK_SECTIONS } from "@/components/brand/book/Book";
import LogoSection from "@/components/brand/book/LogoSection";
import ColourSection from "@/components/brand/book/ColourSection";
import { TypeSection, SpaceSection } from "@/components/brand/book/TypeSection";
import ComponentsSection from "@/components/brand/book/ComponentsSection";
import ApplicationsSection from "@/components/brand/book/ApplicationsSection";
import { IntroSection, VoiceSection, RenameSection } from "@/components/brand/book/WordsSections";

export const metadata: Metadata = {
  title: `Brand book · ${brand.name}`,
  description: `How the ${brand.name} identity works: logo, colour, type, components and voice.`,
  robots: { index: false, follow: false },
};

export default function BrandBookPage() {
  return (
    <div className="min-h-dvh bg-ink text-text">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-4 px-(--gutter) py-6">
          <Link href="/" aria-label={`${brand.name} home`} className="rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-volt">
            <Logo height={28} decorative />
          </Link>
          <p className="type-label text-text-muted">Brand book · Direction B · Internal</p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-content gap-12 px-(--gutter) py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <nav aria-label="Brand book sections" className="lg:sticky lg:top-8 lg:self-start">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-3">
            {BOOK_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-sm type-small text-text-secondary outline-offset-2 transition-colors duration-(--dur) ease-brand hover:text-volt focus-visible:outline-2 focus-visible:outline-volt"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex min-w-0 flex-col gap-24">
          <h1 className="type-display-l">
            The {brand.name} <span className="text-volt">brand book.</span>
          </h1>
          <IntroSection />
          <LogoSection />
          <ColourSection />
          <TypeSection />
          <SpaceSection />
          <ComponentsSection />
          <VoiceSection />
          <ApplicationsSection />
          <RenameSection />
        </main>
      </div>
    </div>
  );
}
