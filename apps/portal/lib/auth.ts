import { redirect } from "next/navigation";
import { getSupabaseUserClient } from "./supabase-server";

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

/**
 * Server-side guard for admin pages. Redirects to sign-in if no session, or
 * if the session belongs to an email not on the ADMIN_EMAILS allowlist.
 * Returns the authenticated user.
 */
export async function requireAdmin() {
  const supabase = await getSupabaseUserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in");
  if (!isAdminEmail(user.email)) {
    await supabase.auth.signOut();
    redirect("/auth/sign-in?error=not_authorised");
  }
  return user;
}
