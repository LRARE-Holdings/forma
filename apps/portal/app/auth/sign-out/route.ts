import { NextResponse } from "next/server";
import { getSupabaseUserClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await getSupabaseUserClient();
  await supabase.auth.signOut();
  const url = new URL("/auth/sign-in", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
