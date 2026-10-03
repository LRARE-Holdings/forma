import { Plus } from "lucide-react";
import type { OnboardingData } from "./OnboardingShell";
import {
  FieldError,
  RemoveButton,
  SelectChevron,
  addButtonClass,
  cardClass,
  hintClass,
  inputClass,
  subLabelClass,
} from "./fields";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

const roleOptions = [
  "Owner / Head instructor",
  "Instructor",
  "Front desk / Admin",
  "Manager",
  "Guest instructor",
];

export default function TeamBuilder({ data, onChange, errors }: Props) {
  const team = data.team || [];

  const addMember = () => {
    onChange({
      team: [...team, { name: "", role: "Instructor" }],
    });
  };

  const removeMember = (index: number) => {
    onChange({
      team: team.filter((_, i) => i !== index),
    });
  };

  const updateMember = (index: number, field: string, value: string) => {
    const updated = team.map((member, i) => (i === index ? { ...member, [field]: value } : member));
    onChange({ team: updated });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="mb-3 text-text-secondary">
        Tell us about your team so we can set up profiles for each instructor on your site. You can always add more
        later.
      </p>

      <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-5">
        <div>
          <p className="font-bold">Team members</p>
          <p className="type-small text-text-muted">
            {team.length === 0
              ? "No team members added yet"
              : `${team.length} team member${team.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <span aria-hidden className="font-display text-[36px] font-extrabold leading-none text-volt tabular-nums">
          {team.length}
        </span>
      </div>

      {team.map((member, i) => (
        <div key={i} className={cardClass}>
          <RemoveButton label={`Remove ${member.name || `team member ${i + 1}`}`} onClick={() => removeMember(i)} />
          <p className="mb-3 type-label text-text-muted">Team member {i + 1}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:pr-8">
            <div>
              <label htmlFor={`ob-team-${i}-name`} className={subLabelClass}>
                Name
              </label>
              <input
                id={`ob-team-${i}-name`}
                type="text"
                value={member.name}
                onChange={(e) => updateMember(i, "name", e.target.value)}
                placeholder="e.g. Sarah"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`ob-team-${i}-role`} className={subLabelClass}>
                Role
              </label>
              <div className="relative">
                <select
                  id={`ob-team-${i}-role`}
                  value={member.role}
                  onChange={(e) => updateMember(i, "role", e.target.value)}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button type="button" onClick={addMember} className={addButtonClass}>
        <Plus aria-hidden className="size-4" strokeWidth={1.75} />
        Add team member
      </button>

      {errors.team && <FieldError id="ob-team-error">{errors.team}</FieldError>}

      <p className={hintClass}>Don&apos;t worry if your team changes. You can update this anytime from your dashboard.</p>
    </div>
  );
}
