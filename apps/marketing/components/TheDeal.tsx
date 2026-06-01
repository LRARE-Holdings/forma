import Link from "next/link";
import { Section, Label } from "./ui/Section";

const points = [
  {
    title: "Pay once for the build",
    desc: "A one-off cost for your custom site and booking suite, quoted to fit the studio you're actually building. No tiers, no per-booking cut.",
  },
  {
    title: "Then it's yours",
    desc: "No contract, no lock-in, no dark patterns. When the build is done and paid, you own it. Walk away whenever you like.",
  },
  {
    title: "Keep us on if you want",
    desc: "An optional management plan — a flat monthly fee, cancel any time — and we handle the updates and fixes. Or run it yourself.",
  },
];

export default function TheDeal() {
  return (
    <Section id="deal" tone="light" wide>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
        <div>
          <Label className="mb-6">The arrangement</Label>
          <h2
            className="font-serif font-normal leading-[0.98] tracking-[-0.03em] mb-7 text-espresso"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          >
            One build.
            <br />
            <em className="italic text-terracotta">Yours to keep.</em>
          </h2>
          <p className="text-[1rem] leading-[1.7] text-driftwood max-w-[380px] mb-9">
            Every studio is different, so every build is quoted on its own. Tell
            us what you need and we&apos;ll put a number to it — no packages to
            squeeze yourself into.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-espresso text-parchment text-[0.78rem] font-mono uppercase tracking-[0.12em] hover:bg-bark transition-colors group"
          >
            Get a quote
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="border-t border-l border-espresso/12 grid grid-cols-1 sm:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={p.title}
              className="border-r border-b border-espresso/12 p-8 md:p-9 hover:bg-linen transition-colors"
            >
              <span className="font-mono text-[0.66rem] text-terracotta tracking-[0.14em] block mb-6">
                0{i + 1}
              </span>
              <h3 className="font-serif text-[1.3rem] leading-[1.1] text-espresso mb-3 tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="text-[0.86rem] leading-[1.6] text-driftwood">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
