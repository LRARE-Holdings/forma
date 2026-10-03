import { Check } from "lucide-react";
import type { OnboardingData } from "./OnboardingShell";
import { FieldError, Optional, inputClass, labelClass } from "./fields";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

// Starting looks for the customer's own studio site. These are their
// options, not our brand, so the colours and fonts are literal on purpose.
const moods = [
  {
    id: "stillness",
    name: "Stillness",
    desc: "Serene, Japanese-minimal",
    gradient: "linear-gradient(135deg, #E8F0EA 0%, #F5F8F5 100%)",
    textColor: "#2D4A3E",
    font: "Cormorant Garamond",
  },
  {
    id: "grit",
    name: "Grit",
    desc: "Raw, industrial",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
    textColor: "#E8D44D",
    font: "Bebas Neue",
  },
  {
    id: "meadow",
    name: "Meadow",
    desc: "Organic, handmade",
    gradient: "linear-gradient(135deg, #FFF8F0 0%, #F5EDE4 100%)",
    textColor: "#6B4E3D",
    font: "Fraunces",
  },
  {
    id: "clay",
    name: "Clay",
    desc: "Editorial warmth",
    gradient: "linear-gradient(135deg, #F5E6DC 0%, #E8CEB8 100%)",
    textColor: "#2C1810",
    font: "Instrument Serif",
  },
  {
    id: "studio",
    name: "Studio",
    desc: "Clean, modern",
    gradient: "linear-gradient(135deg, #F0F0F0 0%, #E0E0E0 100%)",
    textColor: "#1A1A1A",
    font: "Satoshi",
  },
  {
    id: "velvet",
    name: "Velvet",
    desc: "Luxe, moody",
    gradient: "linear-gradient(135deg, #1A1028 0%, #2D1F3D 100%)",
    textColor: "#E8CEB8",
    font: "Satoshi",
  },
];

export default function ThemePicker({ data, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-text-secondary">
        Choose a starting mood for your studio site. We&apos;ll customise the details during your build.
      </p>

      <div>
        <div
          role="group"
          aria-label="Site mood"
          aria-describedby={errors.themeMood ? "ob-mood-error" : undefined}
          className="grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          {moods.map((mood) => {
            const selected = data.themeMood === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ themeMood: mood.id })}
                className={`overflow-hidden rounded-lg border-2 text-left outline-offset-2 transition-colors duration-(--dur) ease-brand focus-visible:outline-2 focus-visible:outline-volt ${
                  selected ? "border-volt" : "border-border hover:border-text-muted"
                }`}
              >
                <div
                  className="relative flex h-[100px] items-center justify-center px-4 sm:h-[120px]"
                  style={{ background: mood.gradient }}
                >
                  <span
                    className="text-[22px] font-medium tracking-[-0.02em] sm:text-[26px]"
                    style={{ color: mood.textColor, fontFamily: mood.font }}
                  >
                    Aa
                  </span>
                  {selected && (
                    <span className="absolute top-2 right-2 grid size-6 place-items-center rounded-pill bg-volt text-ink">
                      <Check aria-hidden className="size-4" strokeWidth={2.25} />
                    </span>
                  )}
                </div>
                <div className="bg-surface px-3 py-2.5">
                  <p className="font-bold">{mood.name}</p>
                  <p className="type-small text-text-muted">{mood.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.themeMood && <FieldError id="ob-mood-error">{errors.themeMood}</FieldError>}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="ob-brand-colour" className={labelClass}>
            Brand colour
            <Optional />
          </label>
          <div className="flex items-center gap-3">
            <input
              id="ob-brand-colour"
              type="text"
              value={data.brandColour}
              onChange={(e) => onChange({ brandColour: e.target.value })}
              placeholder="#C2714F"
              maxLength={7}
              autoCapitalize="off"
              spellCheck={false}
              className={`${inputClass} max-w-[160px] tabular-nums`}
            />
            {data.brandColour && /^#[0-9A-Fa-f]{6}$/.test(data.brandColour) && (
              <span
                aria-hidden
                className="size-10 shrink-0 rounded-sm ring-1 ring-border-strong"
                style={{ backgroundColor: data.brandColour }}
              />
            )}
          </div>
        </div>

        <div>
          <label htmlFor="ob-brand-notes" className={labelClass}>
            Describe your vibe
            <Optional />
          </label>
          <textarea
            id="ob-brand-notes"
            value={data.brandNotes}
            onChange={(e) => onChange({ brandNotes: e.target.value })}
            placeholder="Tell us about your studio's look, personality, or any specific design requests"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
