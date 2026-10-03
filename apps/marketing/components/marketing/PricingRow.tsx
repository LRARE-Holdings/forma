import { PRICING_TIERS } from "@/lib/pricing";
import { PlanCard } from "@/components/ui/PlanCard";

/** Four plan cards, Pro inverted. `compact` is the price-only row from the mockup. */
export default function PricingRow({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="sr-only">Plans</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING_TIERS.map((tier) => (
          <PlanCard key={tier.id} tier={tier} compact={compact} />
        ))}
      </div>
      <p className="type-small text-text-muted">Every plan: no setup fees, no contracts, zero commission. Cancel anytime.</p>
    </div>
  );
}
