import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

/**
 * POST /api/onboarding/submit
 *
 * Called after successful Stripe payment to finalize the submission
 * with Stripe customer/subscription IDs. The actual provisioning
 * happens via the Stripe webhook (checkout.session.completed).
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { submissionId, stripeCustomerId, stripeSubscriptionId } = body;

  if (!submissionId) {
    return NextResponse.json(
      { error: "Submission ID is required" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  const { error: dbError } = await supabase
    .from("onboarding_submissions")
    .update({
      stripe_customer_id: stripeCustomerId || null,
      stripe_subscription_id: stripeSubscriptionId || null,
      status: "payment_completed",
    })
    .eq("id", submissionId);

  if (dbError) {
    console.error("Failed to update submission:", dbError);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, submission_id: submissionId });
}
