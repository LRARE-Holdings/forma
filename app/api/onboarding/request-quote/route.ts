import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getResend } from "@/lib/resend";
import { attributeReferral } from "@/lib/referrals";

/**
 * POST /api/onboarding/request-quote
 *
 * Finalises an onboarding submission as a quote request.
 * Sends admin notification + owner confirmation emails.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const {
    submissionId,
    ownerName,
    ownerEmail,
    ownerPhone,
    planTier,
    notes,
    referralCode,
  } = body;

  if (!submissionId || !ownerName || !ownerEmail) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  // Update the submission with final details
  const { error: updateError } = await supabase
    .from("onboarding_submissions")
    .update({
      owner_name: ownerName,
      owner_email: ownerEmail,
      owner_phone: ownerPhone || null,
      plan_tier: planTier || "studio",
      notes: notes || null,
      referral_code: referralCode ? referralCode.trim() : null,
      status: "quote_requested",
    })
    .eq("id", submissionId);

  if (updateError) {
    console.error("Failed to update submission:", updateError);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }

  // Attribute referral if a code was provided. Failures here must not block
  // quote submission — attributeReferral logs internally and returns null.
  if (referralCode) {
    await attributeReferral(submissionId, referralCode).catch((err) =>
      console.error("attributeReferral threw:", err)
    );
  }

  // Fetch the full submission for emails
  const { data: submission } = await supabase
    .from("onboarding_submissions")
    .select("*")
    .eq("id", submissionId)
    .single();

  const resend = getResend();
  const adminEmail = process.env.ADMIN_EMAIL;

  // Send admin notification
  if (adminEmail && submission) {
    const classes = submission.classes || [];
    const classLines = classes
      .map(
        (c: { name: string; price_pence: number; capacity: number }) =>
          `${c.name} — £${(c.price_pence / 100).toFixed(2)} (${c.capacity} spots)`
      )
      .join("<br/>");

    const team = submission.team || [];
    const teamLines = team
      .map((m: { name: string; role: string }) => `${m.name} — ${m.role}`)
      .join("<br/>");

    await resend.emails
      .send({
        from: "Forma <hello@useforma.co.uk>",
        to: adminEmail,
        subject: `New quote request: ${submission.studio_name}`,
        html: `
        <h2>New quote request</h2>
        <p><strong>Studio:</strong> ${submission.studio_name}</p>
        <p><strong>Location:</strong> ${submission.location || "—"}</p>
        <p><strong>Type:</strong> ${submission.studio_type || "—"}</p>
        <p><strong>Domain:</strong> ${submission.domain || "—"}</p>
        <p><strong>Preferred tier:</strong> ${planTier || "studio"}</p>
        <hr/>
        <p><strong>Classes:</strong><br/>${classLines || "None listed"}</p>
        <p><strong>Team:</strong><br/>${teamLines || "None listed"}</p>
        <p><strong>Theme mood:</strong> ${submission.theme_mood || "—"}</p>
        <p><strong>Brand colour:</strong> ${submission.brand_colour || "—"}</p>
        <p><strong>Brand notes:</strong> ${submission.brand_notes || "—"}</p>
        <hr/>
        <p><strong>Owner:</strong> ${ownerName}</p>
        <p><strong>Email:</strong> ${ownerEmail}</p>
        <p><strong>Phone:</strong> ${ownerPhone || "—"}</p>
        <p><strong>Notes:</strong> ${notes || "—"}</p>
        <hr/>
        <p><em>Submission ID: ${submissionId}</em></p>
      `,
      })
      .catch((err: unknown) =>
        console.error("Failed to send admin notification:", err)
      );
  }

  // Send owner confirmation email
  if (submission) {
    await resend.emails
      .send({
        from: "Forma <hello@useforma.co.uk>",
        to: ownerEmail,
        subject: "We've received your enquiry — Forma",
        html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; color: #2C1810;">
          <h1 style="font-size: 24px; font-weight: normal;">Thanks, ${ownerName}.</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #5C3D2E;">
            We've received your details for <strong>${submission.studio_name}</strong> and we're excited to learn more about your studio.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5C3D2E;">
            One of the Forma team will be in touch within <strong>48 hours</strong> to discuss your needs and put together a personalised quote.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #8B7265; margin-top: 32px;">
            In the meantime, if you have any questions, just reply to this email.
          </p>
          <p style="font-size: 14px; color: #8B7265; margin-top: 24px;">
            — The Forma team
          </p>
        </div>
      `,
      })
      .catch((err: unknown) =>
        console.error("Failed to send owner confirmation:", err)
      );
  }

  return NextResponse.json({ success: true, submissionId });
}
