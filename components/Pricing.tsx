import Reveal from "./Reveal";
import Link from "next/link";

const tiers = [
  {
    label: "Foundation",
    name: "Launch",
    price: "39",
    desc: "Everything you need to get your studio online and taking bookings.",
    features: [
      "Studio website + custom domain",
      "Class schedule & booking",
      "Stripe payments",
      "Up to 3 class types",
      "Email confirmations",
      "SSL + hosting included",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    label: "Growth",
    name: "Studio",
    price: "59",
    desc: "For established studios ready to grow with packs, memberships, and automation.",
    features: [
      "Everything in Launch",
      "Class packs & memberships",
      "Unlimited class types",
      "Automated email sequences",
      "Staff profiles & scheduling",
      "Waitlists & capacity limits",
      "Analytics dashboard",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    label: "Scale",
    name: "Pro",
    price: "89",
    desc: "Multi-location support, advanced reporting, and full brand customisation.",
    features: [
      "Everything in Studio",
      "Multi-location support",
      "Advanced analytics",
      "Custom branding & themes",
      "Client app (PWA)",
      "Marketing integrations",
      "API access",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    label: "White-label",
    name: "Partner",
    price: "129",
    desc: "For agencies and consultants building studio sites for their own clients.",
    features: [
      "Everything in Pro",
      "White-label branding",
      "Client billing management",
      "Unlimited studio sites",
      "Priority build queue",
      "Revenue share options",
      "Dedicated account manager",
    ],
    cta: "Get in touch",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center justify-center gap-2.5">
              Simple pricing
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] mb-4">
              Honest prices for
              <br />
              real studios
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[1.05rem] leading-[1.65] text-driftwood max-w-[480px] mx-auto">
              No setup fees. No contracts. No marketplace commissions. Cancel
              anytime.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div
                className={`bg-white border-[1.5px] rounded-[18px] p-7 relative transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(44,24,16,0.05)] h-full flex flex-col ${
                  t.popular
                    ? "border-terracotta shadow-[0_4px_24px_rgba(194,113,79,0.1)]"
                    : "border-espresso/6 hover:border-sand"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-[11px] left-1/2 -translate-x-1/2 bg-terracotta text-parchment text-[0.65rem] font-bold tracking-[0.06em] px-3.5 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                )}
                <p className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-fog mb-1">
                  {t.label}
                </p>
                <p className="text-[1.15rem] font-bold text-espresso mb-3.5">
                  {t.name}
                </p>
                <p className="font-serif text-[2.8rem] leading-none text-espresso mb-0.5">
                  £{t.price}{" "}
                  <span className="font-sans text-[0.85rem] font-normal text-driftwood">
                    /month
                  </span>
                </p>
                <p className="text-[0.82rem] text-driftwood leading-[1.5] mb-6">
                  {t.desc}
                </p>
                <ul className="mb-7 flex-1">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="text-[0.82rem] text-driftwood py-1.5 border-t border-espresso/4 flex items-center gap-2"
                    >
                      <span className="text-terracotta font-bold text-[0.75rem] shrink-0">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/onboarding?tier=${t.name.toLowerCase()}`}
                  className={`block w-full py-3 rounded-[10px] text-center text-[0.85rem] font-semibold transition-all hover:scale-[1.02] ${
                    t.popular
                      ? "bg-terracotta text-parchment hover:bg-burnt"
                      : "bg-transparent text-espresso border-[1.5px] border-sand hover:border-clay"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center mt-8 text-[0.82rem] text-fog">
          Only Stripe&apos;s standard processing fees apply. We never take a cut
          of your revenue.
        </p>
      </div>
    </section>
  );
}
