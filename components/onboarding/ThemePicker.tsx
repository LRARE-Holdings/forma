import type { OnboardingData } from "./OnboardingShell";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

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

const inputClass =
  "w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors";

export default function ThemePicker({ data, onChange, errors }: Props) {
  return (
    <div>
      <p className="text-[0.88rem] text-driftwood mb-5 leading-[1.6]">
        Choose a starting mood for your studio site. We&apos;ll customise the details during your build.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onChange({ themeMood: mood.id })}
            className={`text-left rounded-[14px] overflow-hidden border-2 transition-all hover:scale-[1.02] ${
              data.themeMood === mood.id
                ? "border-terracotta shadow-[0_4px_20px_rgba(194,113,79,0.15)]"
                : "border-transparent hover:border-sand"
            }`}
          >
            <div
              className="h-[100px] sm:h-[120px] flex items-center justify-center px-4 relative"
              style={{ background: mood.gradient }}
            >
              <span
                className="text-[1.3rem] sm:text-[1.5rem] font-medium tracking-[-0.02em]"
                style={{ color: mood.textColor, fontFamily: mood.font }}
              >
                Aa
              </span>
              {data.themeMood === mood.id && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-terracotta rounded-full flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 5 4 7 8 3" />
                  </svg>
                </span>
              )}
            </div>
            <div className="bg-white px-3 py-2.5">
              <p className="text-[0.82rem] font-semibold text-espresso">{mood.name}</p>
              <p className="text-[0.7rem] text-fog">{mood.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {errors.themeMood && (
        <p className="text-[0.75rem] text-amber mb-4">{errors.themeMood}</p>
      )}

      <div className="space-y-4">
        <div>
          <label className="text-[0.82rem] font-semibold text-espresso mb-1.5 block">
            Brand colour{" "}
            <span className="font-normal text-fog">(optional)</span>
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={data.brandColour}
              onChange={(e) => onChange({ brandColour: e.target.value })}
              placeholder="#C2714F"
              maxLength={7}
              className={`${inputClass} max-w-[160px] font-mono`}
            />
            {data.brandColour && /^#[0-9A-Fa-f]{6}$/.test(data.brandColour) && (
              <div
                className="w-9 h-9 rounded-full border border-sand shrink-0"
                style={{ backgroundColor: data.brandColour }}
              />
            )}
          </div>
        </div>

        <div>
          <label className="text-[0.82rem] font-semibold text-espresso mb-1.5 block">
            Describe your vibe{" "}
            <span className="font-normal text-fog">(optional)</span>
          </label>
          <textarea
            value={data.brandNotes}
            onChange={(e) => onChange({ brandNotes: e.target.value })}
            placeholder="Tell us about your studio's aesthetic, brand personality, or any specific design requests..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
