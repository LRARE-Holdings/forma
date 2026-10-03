import { NextResponse } from "next/server";
import { createServerClient } from "@forma/db";
import { getResend } from "@/lib/resend";
import { brand } from "@/config/brand";
import { WaitlistEmail, renderEmail } from "@/emails/transactional";

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

  const html = await renderEmail(<WaitlistEmail />);
  try {
    await getResend().emails.send({
      from: `${brand.name} <${brand.email}>`,
      to: email,
      subject: "You're on the list",
      html,
    });
  } catch (emailError) {
    console.error("Failed to send waitlist email:", emailError);
  }

  return NextResponse.json({ success: true });
}
