import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { requireAdmin } from "@/lib/auth";

const ALLOWED_FIELDS = [
  "crm_stage",
  "crm_priority",
  "crm_lost_reason",
  "next_follow_up_at",
  "last_contacted_at",
  "crm_owner_id",
] as const;

type AllowedField = (typeof ALLOWED_FIELDS)[number];

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();

  const update: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) update[key] = body[key as AllowedField];
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const supabase = createServerClient();

  // Fetch previous state for stage_change audit note
  const { data: before } = await supabase
    .from("onboarding_submissions")
    .select("crm_stage")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase
    .from("onboarding_submissions")
    .update(update)
    .eq("id", id);

  if (error) {
    console.error("Update enquiry failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  // Stage change audit note
  if (
    "crm_stage" in update &&
    before?.crm_stage &&
    before.crm_stage !== update.crm_stage
  ) {
    await supabase.from("crm_notes").insert({
      submission_id: id,
      kind: "stage_change",
      body: `Moved from ${before.crm_stage} → ${update.crm_stage}`,
      author_id: user.id,
      metadata: { from: before.crm_stage, to: update.crm_stage },
    });
  }

  return NextResponse.json({ success: true });
}
