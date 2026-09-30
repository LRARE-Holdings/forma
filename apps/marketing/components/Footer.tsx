import Link from "next/link";
import { Logo } from "./ui/Logo";

const cols = [
  {
    label: "Studio",
    links: [
      { label: "Work", href: "/#work" },
      { label: "What we make", href: "/#make" },
      { label: "Pricing", href: "/pricing" },
      { label: "Case study", href: "/case-studies/burn-mat-studio" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "mailto:hello@useforma.co.uk" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-parchment border-t border-espresso/8 pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">
          <div>
            <Logo className="mb-5 text-[1.25rem]" />
            <p className="text-[0.82rem] leading-[1.65] text-driftwood max-w-[280px]">
              Everything an independent Pilates, yoga, or fitness studio needs to
              run online — website, booking, and payments. Flat monthly, cancel
              anytime.
            </p>
            <p className="text-[0.72rem] text-fog mt-4">
              hello@useforma.co.uk
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.label}>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-fog mb-5">
                {col.label}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.82rem] text-driftwood hover:text-espresso transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-espresso/8 pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="text-[0.72rem] text-fog">
            © 2026 Forma. Built in Newcastle.
          </p>
          <p className="text-[0.72rem] text-fog">
            No contracts. No commission. No nonsense.
          </p>
        </div>
      </div>
    </footer>
  );
}
