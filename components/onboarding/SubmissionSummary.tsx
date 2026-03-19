import type { OnboardingData } from "./OnboardingShell";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  onLaunch: () => void;
  onGoToStep: (step: number) => void;
  loading: boolean;
  error?: string;
}

const tiers = [
  { id: "launch", label: "Foundation", name: "Launch", price: "39" },
  { id: "studio", label: "Growth", name: "Studio", price: "59" },
  { id: "pro", label: "Scale", name: "Pro", price: "89" },
  { id: "partner", label: "White-label", name: "Partner", price: "129" },
];

const moodNames: Record<string, string> = {
  stillness: "Stillness",
  grit: "Grit",
  meadow: "Meadow",
  clay: "Clay",
  studio: "Studio",
  velvet: "Velvet",
};

export default function SubmissionSummary({
  data,
  onChange,
  onLaunch,
  onGoToStep,
  loading,
  error,
}: Props) {
  return (
    <div>
      {/* Summary cards */}
      <div className="space-y-3 mb-8">
        {/* Studio */}
        <div className="bg-linen border border-sand rounded-[14px] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.85rem] font-bold text-espresso">Studio</h3>
            <button
              onClick={() => onGoToStep(1)}
              className="text-[0.72rem] text-terracotta font-medium hover:text-burnt transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="space-y-0.5 text-[0.82rem] text-driftwood">
            <p>{data.studioName}</p>
            <p>{data.location}</p>
            <p>{data.studioType}</p>
            {data.domain && <p>{data.domain}</p>}
          </div>
        </div>

        {/* Classes */}
        <div className="bg-linen border border-sand rounded-[14px] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.85rem] font-bold text-espresso">Classes</h3>
            <button
              onClick={() => onGoToStep(2)}
              className="text-[0.72rem] text-terracotta font-medium hover:text-burnt transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1.5">
            {data.classes.filter((c) => c.name.trim()).map((cls, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-[0.82rem] text-driftwood"
              >
                <span>{cls.name}</span>
                <span className="font-mono text-[0.78rem]">
                  {cls.price ? `£${cls.price}` : "—"}{" "}
                  {cls.capacity ? `· ${cls.capacity} spots` : ""}
                </span>
              </div>
            ))}
            {data.packs.filter((p) => p.name.trim()).map((pack, i) => (
              <div
                key={`pack-${i}`}
                className="flex items-center justify-between text-[0.82rem] text-driftwood"
              >
                <span>{pack.name} <span className="text-fog">(pack)</span></span>
                <span className="font-mono text-[0.78rem]">
                  {pack.price ? `£${pack.price}` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="bg-linen border border-sand rounded-[14px] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.85rem] font-bold text-espresso">Theme</h3>
            <button
              onClick={() => onGoToStep(3)}
              className="text-[0.72rem] text-terracotta font-medium hover:text-burnt transition-colors"
            >
              Edit
            </button>
          </div>
          <p className="text-[0.82rem] text-driftwood">
            {moodNames[data.themeMood] || data.themeMood}
            {data.brandColour && (
              <span className="inline-flex items-center gap-1.5 ml-2">
                <span
                  className="w-3 h-3 rounded-full border border-sand inline-block"
                  style={{ backgroundColor: data.brandColour }}
                />
                <span className="font-mono text-[0.72rem] text-fog">{data.brandColour}</span>
              </span>
            )}
          </p>
        </div>

        {/* Payments */}
        <div className="bg-linen border border-sand rounded-[14px] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.85rem] font-bold text-espresso">Payments</h3>
            <button
              onClick={() => onGoToStep(4)}
              className="text-[0.72rem] text-terracotta font-medium hover:text-burnt transition-colors"
            >
              Edit
            </button>
          </div>
          {data.stripeConnected ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sage/10 text-sage text-[0.78rem] font-medium rounded-full">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 5 4 7 8 3" />
              </svg>
              Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber/10 text-amber text-[0.78rem] font-medium rounded-full">
              Skipped — connect later
            </span>
          )}
        </div>
      </div>

      {/* Plan selector */}
      <div className="mb-8">
        <h3 className="text-[0.9rem] font-semibold text-espresso mb-3">
          Choose your plan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => onChange({ planTier: tier.id })}
              className={`text-left p-3.5 rounded-[12px] border-[1.5px] transition-all ${
                data.planTier === tier.id
                  ? "border-terracotta bg-terracotta/[0.03]"
                  : "border-sand hover:border-clay bg-white"
              }`}
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-fog mb-0.5">
                {tier.label}
              </p>
              <p className="text-[0.85rem] font-bold text-espresso">{tier.name}</p>
              <p className="font-serif text-[1.3rem] text-espresso">
                £{tier.price}
                <span className="font-sans text-[0.7rem] font-normal text-driftwood">/mo</span>
              </p>
            </button>
          ))}
        </div>
        <p className="text-[0.75rem] text-fog mt-2">
          First charge in 14 days (free trial). Cancel anytime.
        </p>
      </div>

      {error && (
        <p className="text-[0.82rem] text-amber mb-4 text-center">{error}</p>
      )}

      {/* Launch button */}
      <button
        onClick={onLaunch}
        disabled={loading}
        className="w-full py-4 bg-terracotta text-parchment rounded-[10px] text-[0.95rem] font-semibold hover:bg-burnt hover:scale-[1.01] transition-all disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Setting up..." : "Launch my studio site →"}
      </button>
    </div>
  );
}
