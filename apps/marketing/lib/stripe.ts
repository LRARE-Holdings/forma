import Stripe from "stripe";
import type { TierId } from "@/lib/pricing";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export type BillingInterval = "month" | "year";

/**
 * Prices are found by lookup key, so no price IDs live in env vars or code.
 * scripts/stripe-setup.mjs creates them with these keys.
 */
export function priceLookupKey(tier: TierId, interval: BillingInterval) {
  return `forma_${tier}_${interval === "year" ? "annual" : "monthly"}`;
}

/** Free trial applies to annual plans only. 0 or unset means no trial. */
export function annualTrialDays(): number {
  const days = Number(process.env.ANNUAL_TRIAL_DAYS ?? 0);
  return Number.isInteger(days) && days > 0 ? days : 0;
}
