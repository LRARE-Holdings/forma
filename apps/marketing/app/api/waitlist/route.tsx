import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { getResend } from "@/lib/resend";

export async function POST(request: Request) {
  const { email, source } = await request.json();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Valid email is required" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();
  const { error: dbError } = await supabase
    .from("email_signups")
    .upsert({ email, source }, { onConflict: "email" });

  if (dbError) {
    console.error("Waitlist DB error:", dbError);
    return NextResponse.json(
      { error: "Failed to save signup" },
      { status: 500 }
    );
  }

  try {
    await getResend().emails.send({
      from: "Forma <hello@useforma.co.uk>",
      to: email,
      subject: "You're on the list",
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
            <h1 style="font-size:28px;color:#2C1810;margin-bottom:12px;font-weight:400;font-family:Georgia,serif;">You're on the list</h1>
            <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:24px;">
              Thanks for signing up for early access to Forma. We're building something special for studios like yours — beautiful websites with booking, payments, and class management built in.
            </p>
            <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:24px;">
              We'll be in touch soon with your early access invite. In the meantime, keep doing what you do best.
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
    console.error("Failed to send waitlist email:", emailError);
  }

  return NextResponse.json({ success: true });
}
