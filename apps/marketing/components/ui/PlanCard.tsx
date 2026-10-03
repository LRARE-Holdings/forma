import { Check } from "lucide-react";
import type { PricingTier } from "@/lib/pricing";
import { ButtonLink } from "./Button";

/**
 * One pricing plan. Dark surface by default; the featured plan inverts to a
 * volt fill with ink text. `compact` drops the feature list and CTA (the
 * price-only row from the mockup).
 */
export function PlanCard({ tier, compact = false }: { tier: PricingTier; compact?: boolean }) {
  const featured = tier.featured;
  const muted = featured ? "text-ink" : "text-text-muted";

  return (
    <article
      className={`flex flex-col gap-4 rounded-lg p-6 ${featured ? "bg-volt text-ink" : "bg-surface text-text"}`}
      aria-label={`${tier.name} plan, £${tier.priceMonthly} per month`}
    >
      <h3 className={`type-small font-bold ${featured ? "text-ink" : "text-text-secondary"}`}>
        {tier.name}
        {tier.tag && <span> · {tier.tag}</span>}
      </h3>

      <div>
        <p className="font-display text-[52px] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
          £{tier.priceMonthly}
        </p>
        <p className={`mt-2 text-[14px] ${muted}`}>per month, flat</p>
      </div>

      {!compact && (
        <>
          <p className={`type-small ${featured ? "text-ink" : "text-text-secondary"}`}>{tier.cap}</p>
          <ul className="flex flex-col gap-2 border-t border-current/15 pt-4 type-small">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check aria-hidden className="mt-[3px] size-4 shrink-0" strokeWidth={1.75} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={`/onboarding?tier=${tier.id}`}
            variant={featured ? "inverse" : "secondary"}
            className="mt-auto w-full"
          >
            Choose {tier.name}
          </ButtonLink>
        </>
      )}
    </article>
  );
}
