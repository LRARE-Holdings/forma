import { NextRequest, NextResponse } from "next/server";
import { getSupabaseUserClient } from "@/lib/supabase-server";

/**
 * Portal-only auth callback. Handles the redirect from Supabase password
 * reset / magic link emails. Exchanges the `code` query param for a session
 * cookie and redirects to `next` (defaults to `/`).
 *
 * IMPORTANT: This is the portal's callback at https://portal.useforma.co.uk/auth/callback.
 * It is completely separate from the marketing site's /auth/callback at
 * https://useforma.co.uk/auth/callback, which is the multi-tenant studio
 * router. They share a path name only because of the Supabase auth convention.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  if (code) {
    const supabase = await getSupabaseUserClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/sign-in?error=invalid`);
}
