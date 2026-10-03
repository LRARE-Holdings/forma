import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { isTierId } from "@/lib/pricing";

/**
 * POST /api/onboarding/save-progress
 *
 * Incrementally saves wizard progress to onboarding_submissions.
 * Creates a new row on the first call, then upserts on subsequent calls.
 * This ensures partial completions are captured even if the user doesn't finish.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServerClient();

  const row = {
    studio_name: body.studioName || "Untitled",
    location: body.location || null,
    studio_type: body.studioType || null,
    owner_name: body.ownerName || null,
    owner_email: body.ownerEmail || null,
    owner_phone: body.ownerPhone || null,
    domain: body.domain || null,
    classes: body.classes || null,
    packs: body.packs || null,
    team: body.team || null,
    theme_mood: body.themeMood || null,
    brand_colour: body.brandColour || null,
    brand_notes: body.brandNotes || null,
    plan_tier: isTierId(body.planTier) ? body.planTier : "studio",
    notes: body.notes || null,
    referral_code: body.referralCode ? body.referralCode.trim() : null,
    current_step: Number.isInteger(body.currentStep) ? body.currentStep : null,
  };
  // Status is never taken from the browser: new rows start in_progress, and
  // only the checkout route and Stripe webhook move it on.

  // If we have an existing submission ID, update it
  if (body.submissionId) {
    // Edits are allowed until payment; a paid submission is never changed here.
    const { error } = await supabase
      .from("onboarding_submissions")
      .update(row)
      .eq("id", body.submissionId)
      .in("status", ["in_progress", "checkout_started"]);

    if (error) {
      console.error("Failed to update onboarding progress:", error);
      return NextResponse.json(
        { error: "Failed to save progress" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submissionId: body.submissionId,
    });
  }

  // Otherwise, create a new submission
  const { data: submission, error } = await supabase
    .from("onboarding_submissions")
    .insert({ ...row, status: "in_progress" })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to create onboarding submission:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    submissionId: submission.id,
  });
}
