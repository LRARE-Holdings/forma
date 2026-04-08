"use server";

import { redirect } from "next/navigation";
import { getSupabaseUserClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/auth";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const redirectTo = String(formData.get("redirect") || "/");

  if (!email || !password) redirect("/auth/sign-in?error=missing");
  if (!isAdminEmail(email)) redirect("/auth/sign-in?error=not_authorised");

  const supabase = await getSupabaseUserClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect("/auth/sign-in?error=invalid");
  redirect(redirectTo || "/");
}
