import { resetAction } from "./actions";

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
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
            Set a new password
          </p>
        </div>

        <form
          action={resetAction}
          className="bg-white border border-sand rounded-[16px] p-7 space-y-4"
        >
          <input
            type="password"
            name="password"
            required
            minLength={8}
            placeholder="New password"
            className="w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] focus:border-terracotta focus:outline-none"
          />
          {params.error && (
            <p className="text-[0.82rem] text-amber">
              Couldn&apos;t reset password. The link may have expired.
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt transition-colors"
          >
            Update password
          </button>
        </form>
      </div>
    </main>
  );
}
