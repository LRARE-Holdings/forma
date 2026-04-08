import Link from "next/link";
import { signInAction } from "./actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string; message?: string }>;
}) {
  const params = await searchParams;
  const errorMap: Record<string, string> = {
    not_authorised: "That email isn't on the admin allowlist.",
    invalid: "Email or password is incorrect.",
    missing: "Please fill in both fields.",
  };
  const error = params.error ? errorMap[params.error] || params.error : null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-parchment px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <p
            className="text-[1.4rem] font-black tracking-[-0.04em] text-transparent inline-block"
            style={{ WebkitTextStroke: "1.4px #5C3D2E" }}
          >
            forma
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fog mt-2">
            Admin sign in
          </p>
        </div>

        <form
          action={signInAction}
          className="bg-white border border-sand rounded-[16px] p-7 space-y-4"
        >
          <input
            type="hidden"
            name="redirect"
            value={params.redirect || "/"}
          />
          <div>
            <label className="text-[0.78rem] font-semibold text-espresso mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoFocus
              className="w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] focus:border-terracotta focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[0.78rem] font-semibold text-espresso mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] focus:border-terracotta focus:outline-none"
            />
          </div>

          {error && <p className="text-[0.82rem] text-amber">{error}</p>}
          {params.message && (
            <p className="text-[0.82rem] text-sage">{params.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt transition-colors"
          >
            Sign in
          </button>

          <div className="flex justify-between text-[0.75rem] pt-1">
            <Link href="/auth/forgot" className="text-driftwood hover:text-espresso">
              Forgot password?
            </Link>
            <Link href="/auth/sign-up" className="text-driftwood hover:text-espresso">
              First time? Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
