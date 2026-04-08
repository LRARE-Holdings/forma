import Link from "next/link";
import { signUpAction } from "./actions";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const errorMap: Record<string, string> = {
    not_authorised: "That email isn't on the admin allowlist. Ask whoever set up the portal to add you to ADMIN_EMAILS.",
    weak: "Password must be at least 8 characters.",
    failed: "Couldn't create account — try signing in instead.",
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
            Create admin account
          </p>
        </div>

        <form
          action={signUpAction}
          className="bg-white border border-sand rounded-[16px] p-7 space-y-4"
        >
          <p className="text-[0.78rem] text-driftwood leading-relaxed">
            Sign-up is gated by an email allowlist. Only emails set in{" "}
            <code className="font-mono text-[0.74rem] text-terracotta">
              ADMIN_EMAILS
            </code>{" "}
            can create accounts here.
          </p>
          <div>
            <label className="text-[0.78rem] font-semibold text-espresso mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
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
              minLength={8}
              className="w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] focus:border-terracotta focus:outline-none"
            />
          </div>

          {error && <p className="text-[0.82rem] text-amber">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt transition-colors"
          >
            Create account
          </button>

          <Link
            href="/auth/sign-in"
            className="block text-center text-[0.75rem] text-driftwood hover:text-espresso pt-1"
          >
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </main>
  );
}
