"use server";

import { redirect } from "next/navigation";
import { getSupabaseUserClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/auth";

export async function forgotAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  // Always show success to avoid leaking which emails are admins.
  if (!email || !isAdminEmail(email)) redirect("/auth/forgot?sent=1");

  const supabase = await getSupabaseUserClient();
  const portalUrl =
    process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3001";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${portalUrl}/auth/callback?next=/auth/reset`,
  });

  if (error) redirect("/auth/forgot?error=1");
  redirect("/auth/forgot?sent=1");
}
