import Link from "next/link";
import { forgotAction } from "./actions";

export default async function ForgotPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;
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
            Reset your password
          </p>
        </div>

        {params.sent ? (
          <div className="bg-white border border-sand rounded-[16px] p-7 text-center">
            <p className="text-[0.92rem] text-espresso mb-2">
              Check your inbox.
            </p>
            <p className="text-[0.82rem] text-driftwood">
              If your email is on the allowlist, we&apos;ve sent you a reset
              link.
            </p>
            <Link
              href="/auth/sign-in"
              className="inline-block mt-5 text-[0.78rem] text-terracotta hover:text-burnt"
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <form
            action={forgotAction}
            className="bg-white border border-sand rounded-[16px] p-7 space-y-4"
          >
            <p className="text-[0.78rem] text-driftwood leading-relaxed">
              Enter your admin email and we&apos;ll send a reset link.
            </p>
            <input
              type="email"
              name="email"
              required
              placeholder="you@useforma.co.uk"
              className="w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] focus:border-terracotta focus:outline-none"
            />
            {params.error && (
              <p className="text-[0.82rem] text-amber">
                Couldn&apos;t send reset email. Try again.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt transition-colors"
            >
              Send reset link
            </button>
            <Link
              href="/auth/sign-in"
              className="block text-center text-[0.75rem] text-driftwood hover:text-espresso pt-1"
            >
              ← Back to sign in
            </Link>
          </form>
        )}
      </div>
    </main>
  );
}
