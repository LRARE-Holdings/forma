import Link from "next/link";
import Reveal from "./Reveal";
import { PRICING_TIERS } from "@/lib/pricing";

/**
 * The three flat tiers, rendered as cards. Shared by the homepage pricing
 * section and the dedicated /pricing page. Each CTA pre-selects the tier in
 * the onboarding wizard via ?tier=<id>.
 */
export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
      {PRICING_TIERS.map((tier, i) => (
        <Reveal key={tier.id} delay={i * 80} className="h-full">
          <div
            className={`relative h-full flex flex-col rounded-[18px] border p-7 md:p-8 ${
              tier.featured
                ? "border-terracotta bg-white shadow-[0_2px_44px_-14px_rgba(194,113,79,0.4)]"
                : "border-espresso/12 bg-white/60"
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-7 bg-terracotta text-parchment font-mono text-[0.56rem] uppercase tracking-[0.14em] px-3 py-1 rounded-full">
                Most popular
              </span>
            )}

            <h3 className="font-serif text-[1.9rem] text-espresso leading-none">
              {tier.name}
            </h3>
            <p className="text-[0.86rem] text-driftwood mt-2 min-h-[40px]">
              {tier.blurb}
            </p>

            <div className="flex items-baseline gap-1.5 mt-5">
              <span className="font-serif text-[3.2rem] text-espresso leading-none">
                £{tier.priceMonthly}
              </span>
              <span className="text-[0.9rem] text-driftwood">/mo</span>
            </div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-terracotta mt-2">
              {tier.cap}
            </p>

            <Link
              href={`/onboarding?tier=${tier.id}`}
              className={`mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.78rem] font-mono uppercase tracking-[0.12em] transition-colors group ${
                tier.featured
                  ? "bg-terracotta text-parchment hover:bg-burnt"
                  : "bg-espresso text-parchment hover:bg-bark"
              }`}
            >
              Start on {tier.name}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            <div className="h-px bg-espresso/10 my-7" />

            <ul className="flex flex-col gap-3">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-2.5 items-start text-[0.88rem] text-bark leading-[1.45]"
                >
                  <span className="text-terracotta mt-[1px]">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
