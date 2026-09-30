import Link from "next/link";
import { Section, Label } from "./ui/Section";
import PricingCards from "./PricingCards";

/**
 * Homepage pricing section — the artefact's core idea is that all three tiers
 * live openly on the homepage, not behind a "book a demo" wall.
 */
export default function Pricing() {
  return (
    <Section id="pricing" tone="linen" wide>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <Label className="mb-5">Pricing</Label>
          <h2
            className="font-serif font-normal leading-[0.98] tracking-[-0.03em] text-espresso max-w-[640px]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Three plans.
            <br />
            <em className="italic text-terracotta">Unlimited members.</em>
          </h2>
        </div>
        <p className="text-[1rem] leading-[1.6] text-driftwood max-w-[340px]">
          No setup fees, no per-member charges, no cut of your takings. Pick one
          and you&apos;re live today.
        </p>
      </div>

      <PricingCards />

      <p className="text-center mt-10">
        <Link
          href="/pricing"
          className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-espresso border-b border-terracotta pb-1 hover:text-terracotta transition-colors"
        >
          Compare plans &amp; see what you&apos;d save →
        </Link>
      </p>
    </Section>
  );
}
