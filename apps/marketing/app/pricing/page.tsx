import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PricingRow from "@/components/marketing/PricingRow";
import { Block, FinalCta } from "@/components/marketing/HomeSections";
import { PRICING_TIERS } from "@/lib/pricing";
import { brand } from "@/config/brand";

const priceList = PRICING_TIERS.map((t) => `${t.name} £${t.priceMonthly}`).join(", ");

export const metadata: Metadata = {
  title: `Pricing · ${brand.name}`,
  description: `One flat monthly price for independent studios: ${priceList}. No setup fees, no contracts, zero commission.`,
};

const PILLARS = [
  {
    h: "Published prices",
    b: "Every plan and price is on this page. No demo call to find out what you'll pay.",
  },
  {
    h: "Zero commission",
    b: "Payments settle into your own Stripe account. You pay Stripe's fee and nothing to us on top.",
  },
  {
    h: "No setup fees",
    b: "There's nothing to pay before your first month.",
  },
  {
    h: "Cancel and export anytime",
    b: "No contract, no lock-in. Leave whenever you like and take your members and data with you.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ink text-text">
        <section aria-labelledby="pricing-title">
          <div className="mx-auto flex w-full max-w-content flex-col gap-10 px-(--gutter) pt-10 pb-24 md:pt-16">
            <div className="flex flex-col gap-6">
              <h1 id="pricing-title" className="max-w-[14ch] type-display-l">
                One price. <span className="text-volt">No percentage.</span>
              </h1>
              <p className="max-w-[56ch] type-body-l text-text-secondary">
                Pick the plan that fits your studio. The price is the same every month, and you keep every pound your
                members pay.
              </p>
            </div>
            <PricingRow />
          </div>
        </section>

        <Block tone="surface" labelledBy="pillars-title">
          <h2 id="pillars-title" className="mb-12 type-h1">
            What every plan includes
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.h} className="flex flex-col gap-3 rounded-lg bg-ink p-6">
                <h3 className="type-h3">{p.h}</h3>
                <p className="text-text-secondary">{p.b}</p>
              </li>
            ))}
          </ul>
        </Block>

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
