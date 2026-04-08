import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.useforma.co.uk";

const COOKIE_NAME = "forma_ref";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

/**
 * Public referral entry point.
 *
 *   GET /r/<code>          → 302 to /onboarding?ref=<code>, sets forma_ref cookie
 *   GET /r/<code>?dest=/   → 302 to /?ref=<code>
 *
 * Unknown codes redirect cleanly with no cookie.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const dest = request.nextUrl.searchParams.get("dest") || "/onboarding";

  const safeDest = dest.startsWith("/") ? dest : "/onboarding";
  const redirectUrl = new URL(safeDest, SITE_URL);

  if (!code || code.length > 64) {
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = createServerClient();
  const { data: referrer } = await supabase
    .from("referrers")
    .select("code, status")
    .ilike("code", code)
    .eq("status", "active")
    .maybeSingle();

  if (!referrer) {
    return NextResponse.redirect(redirectUrl);
  }

  redirectUrl.searchParams.set("ref", referrer.code);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(COOKIE_NAME, referrer.code, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: false, // wizard reads this client-side
  });
  return response;
}
