import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json();

  const { studioName, ownerName, ownerEmail } = body;
  if (!studioName || !ownerName || !ownerEmail) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();
  const { data: submission, error: dbError } = await supabase
    .from("onboarding_submissions")
    .insert({
      studio_name: body.studioName,
      location: body.location || null,
      studio_type: body.studioType || null,
      owner_name: body.ownerName,
      owner_email: body.ownerEmail,
      domain: body.domain || null,
      classes: body.classes || null,
      packs: body.packs || null,
      theme_mood: body.themeMood || null,
      brand_colour: body.brandColour || null,
      brand_notes: body.brandNotes || null,
      stripe_connected: body.stripeConnected || false,
      stripe_customer_id: body.stripeCustomerId || null,
      stripe_subscription_id: body.stripeSubscriptionId || null,
      plan_tier: body.planTier || "studio",
      status: "pending",
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("Onboarding DB error:", dbError);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }

  // Send confirmation email to studio owner
  try {
    await getResend().emails.send({
      from: "Forma <hello@useforma.co.uk>",
      to: ownerEmail,
      subject: "We're building your studio site",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background-color:#FFFCF9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
            <p style="font-size:18px;font-weight:900;letter-spacing:-0.04em;color:transparent;-webkit-text-stroke:1.2px #5C3D2E;margin-bottom:32px;">forma</p>
            <h1 style="font-size:28px;color:#2C1810;margin-bottom:12px;font-weight:400;font-family:Georgia,serif;">We're building your site</h1>
            <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:20px;">
              Hi ${ownerName}, thanks for signing up with Forma! We've received everything we need to start building <strong style="color:#2C1810;">${studioName}</strong>'s new home online.
            </p>
            <div style="background-color:#F5EDE4;border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="font-size:14px;color:#5C3D2E;font-weight:600;margin-bottom:12px;">Here's what happens next:</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;width:100px;vertical-align:top;">Now</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">We start designing your site</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;vertical-align:top;">48 hours</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">Preview link sent for your review</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;vertical-align:top;">5 days</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">Your site goes live with bookings active</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;vertical-align:top;">Ongoing</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">You manage your studio, we handle the tech</td>
                </tr>
              </table>
            </div>
            <p style="font-size:15px;color:#8B7265;line-height:1.65;">
              If you have any questions, just reply to this email. We're here to help.
            </p>
            <div style="border-top:1px solid #E8DDD1;padding-top:24px;margin-top:32px;">
              <p style="font-size:12px;color:#B09E93;">Forma — Your studio, online.<br>Built in Newcastle.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send owner confirmation:", emailError);
  }

  // Send admin notification
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const classesText = (body.classes || [])
        .map((c: { name: string; price_pence: number; capacity: number }) =>
          `${c.name} (£${(c.price_pence / 100).toFixed(2)}, ${c.capacity} spots)`
        )
        .join(", ");

      await getResend().emails.send({
        from: "Forma <hello@useforma.co.uk>",
        to: adminEmail,
        subject: `New studio signup: ${studioName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="margin:0;padding:0;background-color:#FFFCF9;font-family:-apple-system,sans-serif;">
            <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
              <h1 style="font-size:22px;color:#2C1810;font-family:Georgia,serif;">New Studio Signup</h1>
              <table style="width:100%;border-collapse:collapse;margin-top:16px;">
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;width:120px;">Studio</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${studioName}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Owner</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${ownerName} (${ownerEmail})</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Location</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${body.location || "—"}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Type</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${body.studioType || "—"}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Domain</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${body.domain || "No custom domain"}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Classes</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${classesText || "None"}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Theme</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${body.themeMood || "—"}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Plan</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${body.planTier || "studio"}</td></tr>
                <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;">Stripe</td><td style="padding:8px 0;font-size:13px;color:#2C1810;">${body.stripeConnected ? "Connected" : "Skipped"}</td></tr>
              </table>
            </div>
          </body>
          </html>
        `,
      });
    }
  } catch (emailError) {
    console.error("Failed to send admin notification:", emailError);
  }

  return NextResponse.json({ success: true, submission_id: submission.id });
}
