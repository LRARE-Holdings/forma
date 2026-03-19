import Link from "next/link";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "mailto:hello@useforma.co.uk" },
];

export default function Footer() {
  return (
    <footer className="border-t border-espresso/6 py-10">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-4">
        <span
          className="font-black text-[1.05rem] tracking-[-0.04em] text-transparent"
          style={{ WebkitTextStroke: "1px #5C3D2E" }}
        >
          forma
        </span>
        <div className="flex gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[0.78rem] text-fog hover:text-driftwood transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <span className="text-[0.72rem] text-fog">
          © 2026 Forma. Built in Newcastle.
        </span>
      </div>
    </footer>
  );
}
