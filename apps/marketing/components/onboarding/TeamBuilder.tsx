import type { OnboardingData } from "./OnboardingShell";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
}

const inputClass =
  "w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors";

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
    const updated = team.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    onChange({ team: updated });
  };

  return (
    <div>
      <p className="text-[0.88rem] text-driftwood mb-6 leading-[1.6]">
        Tell us about your team so we can set up profiles for each instructor on
        your site. You can always add more later.
      </p>

      {/* Instructor count summary */}
      <div className="bg-linen border border-sand rounded-[14px] p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.85rem] font-semibold text-espresso">
              Team members
            </p>
            <p className="text-[0.75rem] text-driftwood mt-0.5">
              {team.length === 0
                ? "No team members added yet"
                : `${team.length} team member${team.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <span className="font-mono text-[1.3rem] text-terracotta font-bold">
            {team.length}
          </span>
        </div>
      </div>

      {/* Team member cards */}
      <div className="space-y-3 mb-5">
        {team.map((member, i) => (
          <div
            key={i}
            className="bg-white border border-sand rounded-[14px] p-5 relative"
          >
            <button
              type="button"
              onClick={() => removeMember(i)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-linen text-fog hover:text-espresso transition-colors"
              aria-label="Remove member"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" />
              </svg>
            </button>

            <p className="font-mono text-[0.63rem] uppercase tracking-[0.1em] text-fog mb-3">
              Team member {i + 1}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[0.78rem] font-semibold text-espresso mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(i, "name", e.target.value)}
                  placeholder="e.g. Sarah"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[0.78rem] font-semibold text-espresso mb-1 block">
                  Role
                </label>
                <div className="relative">
                  <select
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add member button */}
      <button
        type="button"
        onClick={addMember}
        className="w-full py-3.5 border-[1.5px] border-dashed border-sand rounded-[14px] text-[0.85rem] font-medium text-driftwood hover:border-clay hover:text-espresso transition-all flex items-center justify-center gap-2"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M7 3v8M3 7h8" />
        </svg>
        Add team member
      </button>

      {errors.team && (
        <p className="text-[0.75rem] text-amber mt-2">{errors.team}</p>
      )}

      <p className="text-[0.72rem] text-fog mt-4">
        Don&apos;t worry if your team changes — you can update this anytime from
        your dashboard.
      </p>
    </div>
  );
}
