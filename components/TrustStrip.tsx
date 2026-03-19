export default function TrustStrip() {
  const logos = ["Next.js", "Stripe", "Supabase", "Vercel", "Resend"];
  return (
    <div className="border-y border-espresso/6 py-5">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 flex items-center gap-10 flex-wrap">
        <span className="font-mono text-[0.63rem] tracking-[0.1em] uppercase text-fog whitespace-nowrap">
          Powered by
        </span>
        <div className="flex items-center gap-9 flex-wrap">
          {logos.map((name) => (
            <span
              key={name}
              className="font-sans font-bold text-[0.95rem] text-espresso opacity-[0.12] hover:opacity-[0.3] transition-opacity tracking-[-0.02em]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
