import { Plus } from "lucide-react";
import type { OnboardingData, ClassItem, PackItem } from "./OnboardingShell";
import {
  FieldError,
  Optional,
  PoundPrefix,
  RemoveButton,
  addButtonClass,
  cardClass,
  inputClass,
  subLabelClass,
} from "./fields";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

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
    <div className="flex flex-col gap-10">
      {/* Classes */}
      <div className="flex flex-col gap-3">
        {data.classes.map((cls, i) => (
          <div key={i} className={cardClass}>
            {data.classes.length > 1 && (
              <RemoveButton label={`Remove class ${cls.name || i + 1}`} onClick={() => removeClass(i)} />
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_130px_110px] sm:pr-8">
              <div>
                <label htmlFor={`ob-class-${i}-name`} className={subLabelClass}>
                  Class name
                </label>
                <input
                  id={`ob-class-${i}-name`}
                  type="text"
                  value={cls.name}
                  onChange={(e) => updateClass(i, "name", e.target.value)}
                  placeholder="e.g. Hot Pilates"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`ob-class-${i}-price`} className={subLabelClass}>
                  Price
                </label>
                <div className="relative">
                  <PoundPrefix />
                  <input
                    id={`ob-class-${i}-price`}
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    value={cls.price}
                    onChange={(e) => updateClass(i, "price", e.target.value)}
                    placeholder="15.00"
                    className={`${inputClass} pl-8 tabular-nums`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`ob-class-${i}-capacity`} className={subLabelClass}>
                  Capacity
                </label>
                <input
                  id={`ob-class-${i}-capacity`}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={cls.capacity}
                  onChange={(e) => updateClass(i, "capacity", e.target.value)}
                  placeholder="14"
                  className={`${inputClass} tabular-nums`}
                />
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addClass} className={addButtonClass}>
          <Plus aria-hidden className="size-4" strokeWidth={1.75} />
          Add another class
        </button>

        {errors.classes && <FieldError id="ob-classes-error">{errors.classes}</FieldError>}
      </div>

      {/* Packs */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="type-h3">
            Class packs
            <Optional />
          </h2>
          <p className="mt-1 type-small text-text-secondary">
            Offer bundles, e.g. &quot;5 Class Pack&quot; or &quot;Monthly Unlimited&quot;.
          </p>
        </div>

        {data.packs.map((pack, i) => (
          <div key={i} className={cardClass}>
            <RemoveButton label={`Remove pack ${pack.name || i + 1}`} onClick={() => removePack(i)} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_150px] sm:pr-8">
              <div>
                <label htmlFor={`ob-pack-${i}-name`} className={subLabelClass}>
                  Pack name
                </label>
                <input
                  id={`ob-pack-${i}-name`}
                  type="text"
                  value={pack.name}
                  onChange={(e) => updatePack(i, "name", e.target.value)}
                  placeholder="e.g. 5 Class Pack"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`ob-pack-${i}-price`} className={subLabelClass}>
                  Price
                </label>
                <div className="relative">
                  <PoundPrefix />
                  <input
                    id={`ob-pack-${i}-price`}
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    value={pack.price}
                    onChange={(e) => updatePack(i, "price", e.target.value)}
                    placeholder="60.00"
                    className={`${inputClass} pl-8 tabular-nums`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addPack} className={addButtonClass}>
          <Plus aria-hidden className="size-4" strokeWidth={1.75} />
          Add a class pack
        </button>
      </div>
    </div>
  );
}
