import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { requireAdmin } from "@/lib/auth";
import { getResend } from "@/lib/resend";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();

  const subject = String(body.subject || "").trim();
  const messageBody = String(body.body || "").trim();

  if (!subject || !messageBody) {
    return NextResponse.json(
      { error: "Subject and body are required" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();
  const { data: submission } = await supabase
    .from("onboarding_submissions")
    .select("owner_email, studio_name")
    .eq("id", id)
    .maybeSingle();

  if (!submission?.owner_email) {
    return NextResponse.json(
      { error: "No owner email on this enquiry" },
      { status: 400 }
    );
  }

  const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; color: #2C1810; line-height: 1.65; font-size: 15px;">${escapeHtml(messageBody).replace(/\n/g, "<br/>")}</div>`;

  try {
    await getResend().emails.send({
      from: "Forma <hello@useforma.co.uk>",
      to: submission.owner_email,
      replyTo: user.email || undefined,
      subject,
      html,
    });
  } catch (err) {
    console.error("Send email failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  // Log on the enquiry timeline + bump last_contacted_at
  await Promise.all([
    supabase.from("crm_notes").insert({
      submission_id: id,
      kind: "email_sent",
      body: `${subject}\n\n${messageBody.slice(0, 500)}${messageBody.length > 500 ? "…" : ""}`,
      author_id: user.id,
      metadata: {
        subject,
        full_body: messageBody,
        sent_to: submission.owner_email,
      },
    }),
    supabase
      .from("onboarding_submissions")
      .update({ last_contacted_at: new Date().toISOString() })
      .eq("id", id),
  ]);

  return NextResponse.json({ success: true });
}
