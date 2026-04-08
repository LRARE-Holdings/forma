import { createServerClient } from "./client";

/**
 * Look up a referrer by code (case-insensitive). Returns null if not found
 * or not in active status.
 */
export async function findActiveReferrer(code: string) {
  if (!code) return null;
  const supabase = createServerClient();
  const { data } = await supabase
    .from("referrers")
    .select("id, code, status")
    .ilike("code", code.trim())
    .eq("status", "active")
    .maybeSingle();
  return data;
}

/**
 * Attribute a referral to a submission. Idempotent: if a reward already exists
 * for this submission, the existing row is returned. Failures are swallowed and
 * logged so this never blocks the quote-request flow.
 */
export async function attributeReferral(
  submissionId: string,
  referralCode: string | null | undefined
) {
  if (!submissionId || !referralCode) return null;

  const referrer = await findActiveReferrer(referralCode);
  if (!referrer) return null;

  const supabase = createServerClient();

  // Insert reward (UNIQUE constraint on submission_id makes this idempotent)
  const { data: reward, error } = await supabase
    .from("referral_rewards")
    .insert({
      referrer_id: referrer.id,
      submission_id: submissionId,
      amount_pence: 10000,
      status: "pending",
    })
    .select("id")
    .maybeSingle();

  if (error && !error.message.includes("duplicate key")) {
    console.error("Failed to create referral_rewards row:", error);
    return null;
  }

  // Mark submission as referral source + add a system note
  await supabase
    .from("onboarding_submissions")
    .update({ source: "referral" })
    .eq("id", submissionId);

  await supabase.from("crm_notes").insert({
    submission_id: submissionId,
    kind: "system",
    body: `Referral attributed to ${referrer.code}`,
    metadata: { referrer_id: referrer.id, referral_code: referrer.code },
  });

  return reward;
}

/**
 * Called by the Stripe webhook (lives in the portal monorepo) when the first
 * subscription payment succeeds for a referred submission. Marks the reward as
 * payable and links the studio.
 */
export async function markReferralPayable(
  submissionId: string,
  studioId: string
) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("referral_rewards")
    .update({
      status: "payable",
      payable_at: new Date().toISOString(),
      studio_id: studioId,
    })
    .eq("submission_id", submissionId)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("markReferralPayable failed:", error);
    return null;
  }
  return data;
}

/**
 * Marks a payable reward as paid. Called by the portal admin UI after the
 * payout is sent manually.
 */
export async function markReferralPaid(
  rewardId: string,
  payoutReference: string
) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("referral_rewards")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      payout_reference: payoutReference,
    })
    .eq("id", rewardId)
    .eq("status", "payable")
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("markReferralPaid failed:", error);
    return null;
  }
  return data;
}
