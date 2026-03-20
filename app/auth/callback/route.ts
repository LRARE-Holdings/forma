import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.useforma.co.uk";

/**
 * Auth redirect handler for multi-tenant auth flows.
 *
 * Supabase auth emails (password reset, magic link, etc.) link here with
 * token_hash, type, and email params. We look up the user's studio by email
 * and forward the token_hash to the studio's /auth/confirm route, which
 * exchanges it for a session via verifyOtp().
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const email = searchParams.get("email");
  const redirectTo = searchParams.get("redirect_to");

  // Validate required params
  if (!tokenHash || !type) {
    return NextResponse.redirect(`${SITE_URL}/?error=missing_auth_params`);
  }

  if (!email) {
    return NextResponse.redirect(`${SITE_URL}/?error=missing_email`);
  }

  const supabase = createServerClient();

  // Look up the auth user by email to get their user ID
  const { data: usersRes } = await supabase.auth.admin.listUsers();
  const user = usersRes?.users?.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return NextResponse.redirect(`${SITE_URL}/?error=user_not_found`);
  }

  // Find the user's studio membership(s), most recent first
  const { data: memberships, error: membershipError } = await supabase
    .from("studio_memberships")
    .select("studio_id, created_at, studios(domain)")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (membershipError || !memberships || memberships.length === 0) {
    return NextResponse.redirect(`${SITE_URL}/?error=no_studio`);
  }

  // Extract domain from the joined studios relation
  type StudioJoin = { domain: string | null } | null;
  const getDomain = (m: (typeof memberships)[number]): string | null =>
    (m.studios as unknown as StudioJoin)?.domain ?? null;

  // Pick the studio domain — if redirect_to contains a recognisable domain, prefer that
  let domain: string | null = null;

  if (redirectTo && memberships.length > 1) {
    const match = memberships.find((m) => {
      const d = getDomain(m);
      return d && redirectTo.includes(d);
    });
    if (match) {
      domain = getDomain(match);
    }
  }

  // Fall back to most recently created membership's studio
  if (!domain) {
    domain = getDomain(memberships[0]);
  }

  if (!domain) {
    return NextResponse.redirect(`${SITE_URL}/?error=no_studio_domain`);
  }

  // Derive the next path from the auth type
  let nextPath = "/account";
  switch (type) {
    case "recovery":
      nextPath = "/reset-password";
      break;
    case "signup":
    case "email":
    case "magiclink":
    case "invite":
      nextPath = "/account";
      break;
  }

  // Build redirect to the studio's auth confirm endpoint
  const redirectUrl = new URL(`https://${domain}/auth/confirm`);
  redirectUrl.searchParams.set("token_hash", tokenHash);
  redirectUrl.searchParams.set("type", type);
  redirectUrl.searchParams.set("next", nextPath);

  return NextResponse.redirect(redirectUrl.toString());
}
