import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * POST /api/billing/portal
 *
 * Generates a Stripe Customer Portal URL for plan management.
 * Studio owners can upgrade, downgrade, update payment method,
 * or cancel via the portal.
 *
 * Called from the forma-admin dashboard with the studio's
 * stripe_customer_id.
 */
export async function POST(request: Request) {
  const { customerId, returnUrl } = await request.json();

  if (!customerId) {
    return NextResponse.json(
      { error: "Customer ID is required" },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url:
        returnUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://useforma.co.uk",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Billing portal error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to create portal session",
      },
      { status: 500 }
    );
  }
}
