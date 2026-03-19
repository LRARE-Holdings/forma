import type { OnboardingData, ClassItem, PackItem } from "./OnboardingShell";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

const inputClass =
  "w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors";

export default function ClassBuilder({ data, onChange, errors }: Props) {
  const updateClass = (index: number, field: keyof ClassItem, value: string) => {
    const updated = [...data.classes];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ classes: updated });
  };

  const addClass = () => {
    onChange({ classes: [...data.classes, { name: "", price: "", capacity: "" }] });
  };

  const removeClass = (index: number) => {
    if (data.classes.length <= 1) return;
    onChange({ classes: data.classes.filter((_, i) => i !== index) });
  };

  const updatePack = (index: number, field: keyof PackItem, value: string) => {
    const updated = [...data.packs];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ packs: updated });
  };

  const addPack = () => {
    onChange({ packs: [...data.packs, { name: "", price: "" }] });
  };

  const removePack = (index: number) => {
    onChange({ packs: data.packs.filter((_, i) => i !== index) });
  };

  return (
    <div>
      {/* Classes */}
      <div className="space-y-3 mb-6">
        {data.classes.map((cls, i) => (
          <div
            key={i}
            className="bg-white border border-sand rounded-[14px] p-5 relative"
          >
            {data.classes.length > 1 && (
              <button
                onClick={() => removeClass(i)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-fog hover:text-amber rounded-full hover:bg-sand/40 transition-colors"
                aria-label="Remove class"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_100px] gap-3">
              <div>
                <label className="text-[0.72rem] font-medium text-fog mb-1 block">
                  Class name
                </label>
                <input
                  type="text"
                  value={cls.name}
                  onChange={(e) => updateClass(i, "name", e.target.value)}
                  placeholder="e.g. Hot Pilates"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[0.72rem] font-medium text-fog mb-1 block">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[0.85rem] text-fog">
                    £
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={cls.price}
                    onChange={(e) => updateClass(i, "price", e.target.value)}
                    placeholder="15.00"
                    className={`${inputClass} font-mono pl-7`}
                  />
                </div>
              </div>
              <div>
                <label className="text-[0.72rem] font-medium text-fog mb-1 block">
                  Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={cls.capacity}
                  onChange={(e) => updateClass(i, "capacity", e.target.value)}
                  placeholder="14"
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addClass}
          className="w-full py-3 border-2 border-dashed border-sand rounded-[14px] text-driftwood font-medium text-[0.85rem] hover:border-terracotta hover:text-terracotta transition-colors"
        >
          + Add another class
        </button>

        {errors.classes && (
          <p className="text-[0.75rem] text-amber">{errors.classes}</p>
        )}
      </div>

      {/* Packs */}
      <div>
        <h3 className="text-[0.9rem] font-semibold text-espresso mb-1">
          Class packs{" "}
          <span className="font-normal text-fog text-[0.82rem]">(optional)</span>
        </h3>
        <p className="text-[0.78rem] text-driftwood mb-3">
          Offer discounted bundles, e.g. &quot;5 Class Pack&quot; or &quot;Monthly Unlimited&quot;.
        </p>

        <div className="space-y-3">
          {data.packs.map((pack, i) => (
            <div
              key={i}
              className="bg-white border border-sand rounded-[14px] p-5 relative"
            >
              <button
                onClick={() => removePack(i)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-fog hover:text-amber rounded-full hover:bg-sand/40 transition-colors"
                aria-label="Remove pack"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3">
                <div>
                  <label className="text-[0.72rem] font-medium text-fog mb-1 block">
                    Pack name
                  </label>
                  <input
                    type="text"
                    value={pack.name}
                    onChange={(e) => updatePack(i, "name", e.target.value)}
                    placeholder="e.g. 5 Class Pack"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[0.72rem] font-medium text-fog mb-1 block">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[0.85rem] text-fog">
                      £
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={pack.price}
                      onChange={(e) => updatePack(i, "price", e.target.value)}
                      placeholder="60.00"
                      className={`${inputClass} font-mono pl-7`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addPack}
            className="w-full py-3 border-2 border-dashed border-sand rounded-[14px] text-driftwood font-medium text-[0.85rem] hover:border-terracotta hover:text-terracotta transition-colors"
          >
            + Add a class pack
          </button>
        </div>
      </div>
    </div>
  );
}
