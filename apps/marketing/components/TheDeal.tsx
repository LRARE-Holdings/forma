import Link from "next/link";
import { Section, Label } from "./ui/Section";

const points = [
  {
    title: "Flat, not per-member",
    desc: "Your price never moves as you grow. No per-member metering, no surprise upgrades — the plan you pick is the price you pay, at 30 members or 3,000.",
  },
  {
    title: "No transaction cut",
    desc: "Take payments through your own Stripe account. You pay Stripe's fee and nothing to Forma on top — no commission on a single booking.",
  },
  {
    title: "Cancel & export anytime",
    desc: "No contract, no lock-in, no dark patterns. Leave whenever you like and take your members and your data with you.",
  },
];

export default function TheDeal() {
  return (
    <Section id="deal" tone="light" wide>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
        <div>
          <Label className="mb-6">The deal</Label>
          <h2
            className="font-serif font-normal leading-[0.98] tracking-[-0.03em] mb-7 text-espresso"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          >
            Flat pricing.
            <br />
            <em className="italic text-terracotta">No growth tax.</em>
          </h2>
          <p className="text-[1rem] leading-[1.7] text-driftwood max-w-[380px] mb-9">
            Three plans, all with unlimited members. Pick one and you&apos;re
            live the same day — no quotes, no sales calls, no packages built to
            nudge you upward.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-espresso text-parchment text-[0.78rem] font-mono uppercase tracking-[0.12em] hover:bg-bark transition-colors group"
          >
            View pricing
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
