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
  { id: "launch", label: "Foundation", name: "Launch", price: "69" },
  { id: "studio", label: "Growth", name: "Studio", price: "89" },
  { id: "pro", label: "Scale", name: "Pro", price: "119" },
  { id: "partner", label: "White-label", name: "Partner", price: "159" },
];

const moodNames: Record<string, string> = {
  stillness: "Stillness",
  grit: "Grit",
  meadow: "Meadow",
  clay: "Clay",
  studio: "Studio",
  velvet: "Velvet",
};

const inputClass =
  "w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors";

const labelClass = "text-[0.82rem] font-semibold text-espresso mb-1.5 block";

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
            {data.classes
              .filter((c) => c.name.trim())
              .map((cls, i) => (
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
            {data.packs
              .filter((p) => p.name.trim())
              .map((pack, i) => (
                <div
                  key={`pack-${i}`}
                  className="flex items-center justify-between text-[0.82rem] text-driftwood"
                >
                  <span>
                    {pack.name}{" "}
                    <span className="text-fog">(pack)</span>
                  </span>
                  <span className="font-mono text-[0.78rem]">
                    {pack.price ? `£${pack.price}` : "—"}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-linen border border-sand rounded-[14px] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.85rem] font-bold text-espresso">Team</h3>
            <button
              onClick={() => onGoToStep(3)}
              className="text-[0.72rem] text-terracotta font-medium hover:text-burnt transition-colors"
            >
              Edit
            </button>
          </div>
          {data.team && data.team.length > 0 ? (
            <div className="space-y-1">
              {data.team.map((member, i) => (
                <p key={i} className="text-[0.82rem] text-driftwood">
                  {member.name || "Unnamed"}{" "}
                  <span className="text-fog">· {member.role}</span>
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[0.82rem] text-fog">No team members added</p>
          )}
        </div>

        {/* Theme */}
        <div className="bg-linen border border-sand rounded-[14px] p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[0.85rem] font-bold text-espresso">Theme</h3>
            <button
              onClick={() => onGoToStep(4)}
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
                <span className="font-mono text-[0.72rem] text-fog">
                  {data.brandColour}
                </span>
              </span>
            )}
          </p>
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
              <p className="text-[0.85rem] font-bold text-espresso">
                {tier.name}
              </p>
              <p className="font-serif text-[1.3rem] text-espresso">
                £{tier.price}
                <span className="font-sans text-[0.7rem] font-normal text-driftwood">
                  /mo
                </span>
              </p>
            </button>
          ))}
        </div>
        <p className="text-[0.75rem] text-fog mt-2">
          First charge in 14 days (free trial). Cancel anytime.
        </p>
      </div>

      {/* Owner details */}
      <div className="mb-8 space-y-4">
        <h3 className="text-[0.9rem] font-semibold text-espresso">
          Your details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Your name</label>
            <input
              type="text"
              value={data.ownerName}
              onChange={(e) => onChange({ ownerName: e.target.value })}
              placeholder="Your full name"
              className={inputClass}
            />
            {error === "ownerName" && (
              <p className="text-[0.75rem] text-amber mt-1">
                Name is required
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={data.ownerEmail}
              onChange={(e) => onChange({ ownerEmail: e.target.value })}
              placeholder="you@yourstudio.com"
              className={inputClass}
            />
            {error === "ownerEmail" && (
              <p className="text-[0.75rem] text-amber mt-1">
                Valid email is required
              </p>
            )}
          </div>
        </div>
        <div>
          <label className={labelClass}>
            Phone number{" "}
            <span className="font-normal text-fog">(optional)</span>
          </label>
          <input
            type="tel"
            value={data.ownerPhone}
            onChange={(e) => onChange({ ownerPhone: e.target.value })}
            placeholder="07700 900000"
            className={inputClass}
          />
        </div>
      </div>

      {error && error !== "ownerName" && error !== "ownerEmail" && (
        <p className="text-[0.82rem] text-amber mb-4 text-center">{error}</p>
      )}

      {/* Launch button */}
      <button
        onClick={onLaunch}
        disabled={loading}
        className="w-full py-4 bg-terracotta text-parchment rounded-[10px] text-[0.95rem] font-semibold hover:bg-burnt hover:scale-[1.01] transition-all disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Setting up..." : "Start my studio →"}
      </button>

      <p className="text-[0.72rem] text-fog text-center mt-3">
        You&apos;ll enter payment details on the next screen. 14-day free trial.
      </p>
    </div>
  );
}
