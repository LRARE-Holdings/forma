/**
 * Creates the Stripe products and monthly prices for every plan in
 * lib/pricing.ts. Safe to run more than once: anything that already exists
 * (matched by price lookup key) is left alone.
 *
 *   STRIPE_SECRET_KEY=sk_test_... pnpm --filter @forma/marketing stripe:setup
 *
 * Refuses a live key unless you pass --live.
 *
 * Annual prices are not created yet: they haven't been decided. When they
 * are, add them with lookup keys forma_<tier>_annual (see lib/stripe.ts) and
 * set ANNUAL_TRIAL_DAYS for the free trial.
 */
import Stripe from "stripe";
import { PRICING_TIERS } from "../lib/pricing.ts";
import { brand } from "../config/brand.ts";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY (a test key, sk_test_...).");
  process.exit(1);
}
if (key.startsWith("sk_live_") && !process.argv.includes("--live")) {
  console.error("That's a live key. Re-run with --live if you really mean to create live products.");
  process.exit(1);
}

const stripe = new Stripe(key);

for (const tier of PRICING_TIERS) {
  const lookupKey = `forma_${tier.id}_monthly`;
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  if (existing.data[0]) {
    const p = existing.data[0];
    const ok = p.unit_amount === tier.priceMonthly * 100 && p.currency === "gbp";
    console.log(`${ok ? "exists " : "MISMATCH"} ${lookupKey} → ${p.id} (£${(p.unit_amount ?? 0) / 100})`);
    continue;
  }

  const found = await stripe.products.search({ query: `metadata['plan_tier']:'${tier.id}'` });
  const product =
    found.data[0] ??
    (await stripe.products.create({
      name: `${brand.name} ${tier.name}`,
      description: tier.blurb,
      metadata: { plan_tier: tier.id },
    }));

  const price = await stripe.prices.create({
    product: product.id,
    currency: "gbp",
    unit_amount: tier.priceMonthly * 100,
    recurring: { interval: "month" },
    lookup_key: lookupKey,
    nickname: `${tier.name} monthly`,
    metadata: { plan_tier: tier.id },
  });
  console.log(`created ${lookupKey} → ${price.id} (£${tier.priceMonthly}/mo) on ${product.id}`);
}

console.log(`
Next:
  1. Add a webhook endpoint for ${brand.url}/api/webhooks/stripe with events:
     checkout.session.completed, customer.subscription.updated,
     customer.subscription.deleted, invoice.payment_failed
  2. Put its signing secret in STRIPE_WEBHOOK_SECRET.`);
