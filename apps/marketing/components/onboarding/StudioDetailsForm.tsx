import type { OnboardingData } from "./OnboardingShell";
import { FieldError, Optional, SelectChevron, hintClass, inputClass, labelClass } from "./fields";

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

export default function StudioDetailsForm({ data, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="ob-studio-name" className={labelClass}>
          Studio name
        </label>
        <input
          id="ob-studio-name"
          type="text"
          value={data.studioName}
          onChange={(e) => onChange({ studioName: e.target.value })}
          placeholder="e.g. Burn Mat Studio"
          aria-invalid={errors.studioName ? true : undefined}
          aria-describedby={errors.studioName ? "ob-studio-name-error" : undefined}
          className={inputClass}
        />
        {errors.studioName && <FieldError id="ob-studio-name-error">{errors.studioName}</FieldError>}
      </div>

      <div>
        <label htmlFor="ob-location" className={labelClass}>
          Location
        </label>
        <input
          id="ob-location"
          type="text"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="e.g. Newcastle"
          aria-invalid={errors.location ? true : undefined}
          aria-describedby={errors.location ? "ob-location-error" : undefined}
          className={inputClass}
        />
        {errors.location && <FieldError id="ob-location-error">{errors.location}</FieldError>}
      </div>

      <div>
        <label htmlFor="ob-studio-type" className={labelClass}>
          Studio type
        </label>
        <div className="relative">
          <select
            id="ob-studio-type"
            value={data.studioType}
            onChange={(e) => onChange({ studioType: e.target.value })}
            aria-invalid={errors.studioType ? true : undefined}
            aria-describedby={errors.studioType ? "ob-studio-type-error" : undefined}
            className={`${inputClass} appearance-none pr-10 ${!data.studioType ? "text-text-muted" : ""}`}
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
          <SelectChevron />
        </div>
        {errors.studioType && <FieldError id="ob-studio-type-error">{errors.studioType}</FieldError>}
      </div>

      <div>
        <label htmlFor="ob-domain" className={labelClass}>
          Custom domain
          <Optional />
        </label>
        <input
          id="ob-domain"
          type="text"
          value={data.domain}
          onChange={(e) => onChange({ domain: e.target.value })}
          placeholder="e.g. burnmatstudio.com"
          aria-describedby="ob-domain-hint"
          className={inputClass}
        />
        <p id="ob-domain-hint" className={hintClass}>
          Already have a domain? We&apos;ll connect it. If not, we&apos;ll set up a free subdomain.
        </p>
      </div>
    </div>
  );
}
