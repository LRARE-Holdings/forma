import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { brand } from "@/config/brand";

const COLUMNS = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Case study", href: "/case-studies/burn-mat-studio" },
      { label: "Start your studio", href: "/onboarding" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: brand.email, href: `mailto:${brand.email}` },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-text">
      <div className="mx-auto grid w-full max-w-content gap-12 px-(--gutter) py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo height={28} />
          <p className="max-w-[36ch] type-small text-text-secondary">
            Booking, payments, website and emails for independent studios. One flat monthly price. Zero commission.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.label} className="flex flex-col gap-4">
            <h2 className="type-label text-text-muted">{col.label}</h2>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded-sm type-small text-text-secondary outline-offset-2 transition-colors duration-(--dur) ease-brand hover:text-volt focus-visible:outline-2 focus-visible:outline-volt"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-content flex-wrap justify-between gap-4 border-t border-border px-(--gutter) py-6 type-small text-text-muted">
        <p>
          © {new Date().getFullYear()} {brand.name}. Made in the UK for independent studios.
        </p>
        <p>No setup fees. No contracts. No commission.</p>
      </div>
    </footer>
  );
}
