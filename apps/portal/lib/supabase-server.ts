import {
  createServerClient as createSSRClient,
  type CookieOptions,
} from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client bound to the current request's session cookie.
 * Use this for sign-in, sign-out, and identifying the logged-in admin.
 * For DB reads/writes after auth has passed, prefer @forma/db's service-role
 * client so RLS doesn't fight us.
 */
export async function getSupabaseUserClient() {
  const cookieStore = await cookies();
  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components can't set cookies — middleware handles refresh.
          }
        },
      },
    }
  );
}
