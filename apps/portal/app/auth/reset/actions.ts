"use server";

import { redirect } from "next/navigation";
import { getSupabaseUserClient } from "@/lib/supabase-server";

export async function resetAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (password.length < 8) redirect("/auth/reset?error=weak");

  const supabase = await getSupabaseUserClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) redirect("/auth/reset?error=1");
  redirect("/");
}
