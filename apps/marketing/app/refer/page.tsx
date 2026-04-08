import type { Metadata } from "next";
import ReferSignupForm from "@/components/refer/ReferSignupForm";

export const metadata: Metadata = {
  title: "Refer a studio, earn £100 — Forma",
  description:
    "Join the Forma referral programme. Share your unique link and earn £100 for every studio that signs up to a paid plan.",
};

export default function ReferPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <div className="max-w-[640px] mx-auto px-6 py-16 sm:py-24">
        <div className="mb-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fog mb-3">
            Referral programme
          </p>
          <h1
            className="text-[2.4rem] sm:text-[2.8rem] leading-[1.05] text-espresso mb-4"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Refer a studio. Earn £100.
          </h1>
          <p className="text-[1.02rem] text-driftwood leading-relaxed">
            Know an independent studio that needs a beautiful website with
            booking and payments? Send them our way. We&apos;ll pay you{" "}
            <strong className="text-espresso">£100</strong> the moment they
            start their first paid month — no cap, no quotas.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { n: "1", t: "Sign up", d: "Get your unique link" },
            { n: "2", t: "Share", d: "Send it to studio owners" },
            { n: "3", t: "Get paid", d: "£100 per signup" },
          ].map((step) => (
            <div
              key={step.n}
              className="bg-linen border border-sand rounded-[14px] p-4"
            >
              <p className="font-mono text-[0.65rem] text-terracotta mb-1.5">
                STEP {step.n}
              </p>
              <p className="text-[0.92rem] font-semibold text-espresso mb-0.5">
                {step.t}
              </p>
              <p className="text-[0.78rem] text-fog leading-snug">{step.d}</p>
            </div>
          ))}
        </div>

        <ReferSignupForm />

        <p className="text-[0.72rem] text-fog text-center mt-8 leading-relaxed">
          Payouts are sent once the referred studio has made their first
          successful subscription payment. Bank transfer or PayPal — your
          choice. Questions? Email{" "}
          <a
            href="mailto:hello@useforma.co.uk"
            className="text-terracotta hover:text-burnt"
          >
            hello@useforma.co.uk
          </a>
          .
        </p>
      </div>
    </main>
  );
}
