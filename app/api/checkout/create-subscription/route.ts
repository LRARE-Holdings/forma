import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

/**
 * POST /api/checkout/create-subscription
 *
 * Creates a Stripe Customer + Subscription with a 14-day trial.
 * Returns the pending_setup_intent.client_secret for the custom
 * PaymentElement checkout on the frontend.
 *
 * The subscription metadata includes the onboarding_submission_id
 * so the webhook can look it up for auto-provisioning.
 */
export async function POST(request: Request) {
  const { email, planTier, ownerName, submissionId, studioName } =
    await request.json();

  if (!email || !planTier) {
    return NextResponse.json(
      { error: "Email and plan tier are required" },
      { status: 400 }
    );
  }

  const priceMap: Record<string, string | undefined> = {
    launch: process.env.STRIPE_PRICE_LAUNCH,
    studio: process.env.STRIPE_PRICE_STUDIO,
    pro: process.env.STRIPE_PRICE_PRO,
    partner: process.env.STRIPE_PRICE_PARTNER,
  };

  const priceId = priceMap[planTier];
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan tier" }, { status: 400 });
  }

  try {
    const stripe = getStripe();

    const customer = await stripe.customers.create({
      email,
      name: ownerName || undefined,
      metadata: {
        source: "forma_onboarding",
        onboarding_submission_id: submissionId || "",
        studio_name: studioName || "",
        plan_tier: planTier,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: 14,
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      metadata: {
        onboarding_submission_id: submissionId || "",
        plan_tier: planTier,
        owner_email: email,
        studio_name: studioName || "",
      },
      expand: ["pending_setup_intent"],
    });

    const setupIntent =
      subscription.pending_setup_intent as Stripe.SetupIntent;

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      subscriptionId: subscription.id,
      customerId: customer.id,
    });
  } catch (err) {
    console.error("Stripe subscription error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to create subscription",
      },
      { status: 500 }
    );
  }
}
