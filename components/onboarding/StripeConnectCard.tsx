import type { OnboardingData } from "./OnboardingShell";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
}

const badges = [
  "Payments go directly to you",
  "No Forma commission",
  "Standard 1.4% + 20p fees",
];

export default function StripeConnectCard({ data, onChange }: Props) {
  return (
    <div className="max-w-[520px] mx-auto">
      <div className="bg-white border border-sand rounded-[18px] p-8 text-center">
        {/* Stripe wordmark */}
        <div className="mb-5">
          <span className="text-[1.4rem] font-bold tracking-[-0.02em]" style={{ color: "#635BFF" }}>
            stripe
          </span>
        </div>

        <h3 className="font-serif text-[1.5rem] text-espresso mb-3">
          Connect with Stripe
        </h3>
        <p className="text-[0.88rem] text-driftwood leading-[1.6] mb-5">
          Connect your Stripe account so clients can pay you directly. Takes about 5 minutes — you&apos;ll need your bank details and a form of ID.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sage/8 text-sage text-[0.72rem] font-medium rounded-full"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 5 4 7 8 3" />
              </svg>
              {badge}
            </span>
          ))}
        </div>

        {data.stripeConnected ? (
          <div className="py-3 px-5 bg-sage/8 text-sage rounded-[10px] text-[0.88rem] font-medium">
            Stripe connected
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => {
                // In production, this would redirect to Stripe's Connect onboarding
                // For now, mark as connected to demonstrate the flow
                onChange({ stripeConnected: true });
              }}
              className="w-full py-3.5 rounded-[10px] text-white text-[0.9rem] font-semibold hover:opacity-90 transition-all"
              style={{ backgroundColor: "#635BFF" }}
            >
              Connect with Stripe →
            </button>
            <button
              onClick={() => onChange({ stripeConnected: false })}
              className="w-full py-3 bg-transparent text-driftwood border-[1.5px] border-sand rounded-[10px] text-[0.85rem] font-medium hover:border-clay transition-all"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-[0.72rem] text-fog mt-4">
        You can always connect Stripe later from your dashboard.
      </p>
    </div>
  );
}
