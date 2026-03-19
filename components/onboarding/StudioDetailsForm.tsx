import type { OnboardingData } from "./OnboardingShell";

const studioTypes = [
  "Pilates",
  "Yoga",
  "Pilates & Yoga",
  "HIIT & Functional",
  "Boxing",
  "Barre",
  "Dance",
  "Spin / Cycling",
  "Multi-discipline",
];

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

const inputClass =
  "w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors";

const labelClass = "text-[0.82rem] font-semibold text-espresso mb-1.5 block";

export default function StudioDetailsForm({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>Studio name</label>
        <input
          type="text"
          value={data.studioName}
          onChange={(e) => onChange({ studioName: e.target.value })}
          placeholder="e.g. Burn Mat Studio"
          className={inputClass}
        />
        {errors.studioName && (
          <p className="text-[0.75rem] text-amber mt-1">{errors.studioName}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="e.g. Newcastle"
          className={inputClass}
        />
        {errors.location && (
          <p className="text-[0.75rem] text-amber mt-1">{errors.location}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Studio type</label>
        <div className="relative">
          <select
            value={data.studioType}
            onChange={(e) => onChange({ studioType: e.target.value })}
            className={`${inputClass} appearance-none pr-10 ${
              !data.studioType ? "text-fog" : ""
            }`}
          >
            <option value="" disabled>
              Select your studio type
            </option>
            {studioTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-fog"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </div>
        {errors.studioType && (
          <p className="text-[0.75rem] text-amber mt-1">{errors.studioType}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Custom domain{" "}
          <span className="font-normal text-fog">(optional)</span>
        </label>
        <input
          type="text"
          value={data.domain}
          onChange={(e) => onChange({ domain: e.target.value })}
          placeholder="e.g. burnmatstudio.com"
          className={inputClass}
        />
        <p className="text-[0.72rem] text-fog mt-1.5">
          Already have a domain? We&apos;ll connect it. If not, we&apos;ll set
          up a free subdomain.
        </p>
      </div>
    </div>
  );
}
