import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";

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
    plan_tier: body.planTier || "studio",
    notes: body.notes || null,
    referral_code: body.referralCode ? body.referralCode.trim() : null,
    status: body.status || "in_progress",
  };

  // If we have an existing submission ID, update it
  if (body.submissionId) {
    const { error } = await supabase
      .from("onboarding_submissions")
      .update(row)
      .eq("id", body.submissionId);

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
    .insert(row)
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
