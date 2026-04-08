import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.useforma.co.uk";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function randomSuffix(len = 4): string {
  return Math.random().toString(36).slice(2, 2 + len);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    fullName,
    email,
    phone,
    company,
    payoutMethod,
    payoutDetails,
    agreed,
  } = body;

  if (!fullName || !email || !payoutMethod || !payoutDetails || !agreed) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (payoutMethod !== "bank" && payoutMethod !== "paypal") {
    return NextResponse.json({ error: "Invalid payout method." }, { status: 400 });
  }

  const supabase = createServerClient();

  // Generate a unique code from the name. Try the slug first, then add suffixes
  // until we find one that's free. Cap attempts to avoid infinite loops.
  const baseSlug = slugify(fullName) || "forma-friend";
  let code = baseSlug;
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data: existing } = await supabase
      .from("referrers")
      .select("id")
      .eq("code", code)
      .maybeSingle();
    if (!existing) break;
    code = `${baseSlug}-${randomSuffix()}`;
  }

  const { data: referrer, error } = await supabase
    .from("referrers")
    .insert({
      code,
      full_name: fullName,
      email: email.toLowerCase(),
      phone: phone || null,
      company: company || null,
      payout_method: payoutMethod,
      payout_details: payoutDetails,
      status: "active",
    })
    .select("id, code")
    .single();

  if (error || !referrer) {
    console.error("Failed to create referrer:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  const referralLink = `${SITE_URL}/r/${referrer.code}`;

  // Welcome email — non-blocking
  getResend()
    .emails.send({
      from: "Forma <hello@useforma.co.uk>",
      to: email,
      subject: "You're a Forma referral partner",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#FFFCF9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <div style="max-width:560px;margin:0 auto;padding:48px 24px;color:#2C1810;">
            <p style="font-size:18px;font-weight:900;letter-spacing:-0.04em;color:transparent;-webkit-text-stroke:1.2px #5C3D2E;margin-bottom:32px;">forma</p>
            <h1 style="font-size:28px;font-weight:400;font-family:Georgia,serif;margin-bottom:16px;">Welcome aboard, ${fullName.split(" ")[0]}.</h1>
            <p style="font-size:15px;color:#5C3D2E;line-height:1.65;">
              Thanks for joining the Forma referral programme. Here's how it works:
            </p>
            <ul style="font-size:15px;color:#5C3D2E;line-height:1.7;padding-left:20px;">
              <li>Share your unique link with studio owners you think would love Forma.</li>
              <li>When they sign up and start their first paid month, we pay you <strong>£100</strong>.</li>
              <li>No cap on how many studios you can refer.</li>
            </ul>
            <div style="background:#F5EFE7;border:1px solid #E8DDD1;border-radius:12px;padding:20px;margin:32px 0;">
              <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8B7265;margin:0 0 8px;">Your referral link</p>
              <p style="font-family:monospace;font-size:15px;color:#C2714F;margin:0;word-break:break-all;">${referralLink}</p>
            </div>
            <p style="font-size:14px;color:#8B7265;line-height:1.65;">
              Reply to this email any time if you have questions. We'll send your payout once a referred studio has made their first successful payment.
            </p>
            <p style="font-size:14px;color:#8B7265;margin-top:32px;">— The Forma team</p>
          </div>
        </body>
        </html>
      `,
    })
    .catch((err: unknown) =>
      console.error("Failed to send referrer welcome email:", err)
    );

  // Notify admin
  if (ADMIN_EMAIL) {
    getResend()
      .emails.send({
        from: "Forma <hello@useforma.co.uk>",
        to: ADMIN_EMAIL,
        subject: `New referral partner: ${fullName}`,
        html: `
          <h2>New referral partner</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "—"}</p>
          <p><strong>Company:</strong> ${company || "—"}</p>
          <p><strong>Payout method:</strong> ${payoutMethod}</p>
          <p><strong>Code:</strong> ${referrer.code}</p>
          <p><strong>Link:</strong> ${referralLink}</p>
        `,
      })
      .catch((err: unknown) =>
        console.error("Failed to send admin referrer notification:", err)
      );
  }

  return NextResponse.json({
    success: true,
    code: referrer.code,
    link: referralLink,
  });
}
