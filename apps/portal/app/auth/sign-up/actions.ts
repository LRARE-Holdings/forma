"use server";

import { redirect } from "next/navigation";
import { getSupabaseUserClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/auth";

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) redirect("/auth/sign-up?error=missing");
  if (password.length < 8) redirect("/auth/sign-up?error=weak");
  if (!isAdminEmail(email)) redirect("/auth/sign-up?error=not_authorised");

  const supabase = await getSupabaseUserClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // If the user already exists, fall through to sign-in.
    if (error.message.toLowerCase().includes("already")) {
      redirect("/auth/sign-in?message=Account exists — sign in instead");
    }
    redirect("/auth/sign-up?error=failed");
  }

  redirect("/");
}
