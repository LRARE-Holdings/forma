import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { getTier, isTierId } from "@/lib/pricing";
import { annualTrialDays, getStripe, priceLookupKey, type BillingInterval } from "@/lib/stripe";
import { brand } from "@/config/brand";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/checkout/subscribe
 *
 * Finalises the onboarding submission and starts a Stripe Checkout Session
 * in subscription mode. Returns { url } to redirect the owner to.
 *
 * Provisioning is NOT done here or in the webhook yet: a paid submission is
 * set up by hand until the multi-tenant dashboard exists. See
 * app/api/webhooks/stripe/route.ts.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { submissionId, ownerName, ownerEmail, ownerPhone, planTier, notes, referralCode } = body;
  const interval: BillingInterval = body.interval === "year" ? "year" : "month";

  if (!submissionId || typeof submissionId !== "string") {
    return NextResponse.json({ error: "Your progress wasn't saved. Go back a step and try again." }, { status: 400 });
  }
  if (!ownerName?.trim() || !EMAIL.test(ownerEmail ?? "")) {
    return NextResponse.json({ error: "Enter your name and a valid email address." }, { status: 400 });
  }
  if (!isTierId(planTier)) {
    return NextResponse.json({ error: "Choose a plan." }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: submission, error: updateError } = await supabase
    .from("onboarding_submissions")
    .update({
      owner_name: ownerName.trim(),
      owner_email: ownerEmail.trim(),
      owner_phone: ownerPhone || null,
      plan_tier: planTier,
      billing_interval: interval,
      notes: notes || null,
      referral_code: referralCode ? String(referralCode).trim() : null,
      status: "checkout_started",
      current_step: 5,
    })
    .eq("id", submissionId)
    .neq("status", "paid")
    .select("id, studio_name")
    .single();

  if (updateError || !submission) {
    console.error("[checkout] could not update submission", submissionId, updateError);
    return NextResponse.json(
      { error: "We couldn't find your setup details. Refresh the page and try again." },
      { status: 404 },
    );
  }

  try {
    const stripe = getStripe();
    const lookupKey = priceLookupKey(planTier, interval);
    const prices = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
    const price = prices.data[0];
    if (!price) {
      console.error(`[checkout] no active Stripe price with lookup key ${lookupKey}`);
      return NextResponse.json(
        { error: "That plan isn't available to buy online yet. Email us and we'll sort it." },
        { status: 503 },
      );
    }

    const metadata = {
      onboarding_submission_id: submission.id,
      plan_tier: planTier,
      owner_email: ownerEmail.trim(),
      studio_name: submission.studio_name,
    };
    const trialDays = interval === "year" ? annualTrialDays() : 0;
    const origin = process.env.NEXT_PUBLIC_SITE_URL || brand.url;

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        line_items: [{ price: price.id, quantity: 1 }],
        customer_email: ownerEmail.trim(),
        client_reference_id: submission.id,
        metadata,
        subscription_data: {
          metadata,
          ...(trialDays ? { trial_period_days: trialDays } : {}),
        },
        billing_address_collection: "auto",
        success_url: `${origin}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/onboarding?tier=${planTier}&cancelled=1`,
      },
    );

    await supabase
      .from("onboarding_submissions")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", submission.id);

    return NextResponse.json({ url: session.url, tier: getTier(planTier)?.name });
  } catch (err) {
    console.error("[checkout] Stripe error", err);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again in a moment." }, { status: 502 });
  }
}
