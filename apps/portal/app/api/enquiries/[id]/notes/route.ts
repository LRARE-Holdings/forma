import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { requireAdmin } from "@/lib/auth";

const ALLOWED_KINDS = ["note", "call"] as const;
type AllowedKind = (typeof ALLOWED_KINDS)[number];

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();

  const kind = body.kind as string;
  const noteBody = String(body.body || "").trim();

  if (!ALLOWED_KINDS.includes(kind as AllowedKind) || !noteBody) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("crm_notes").insert({
    submission_id: id,
    kind,
    body: noteBody,
    author_id: user.id,
  });

  if (error) {
    console.error("Add note failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
