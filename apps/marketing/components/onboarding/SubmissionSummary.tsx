import type { ReactNode } from "react";
import type { OnboardingData } from "./OnboardingShell";
import { PRICING_TIERS } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { FieldError, Optional, hintClass, inputClass, labelClass } from "./fields";

interface Props {
  data: OnboardingData;
  onChange: (partial: Partial<OnboardingData>) => void;
  onSubmitQuote: () => void;
  onGoToStep: (step: number) => void;
  loading: boolean;
  error?: string;
}

const moodNames: Record<string, string> = {
  stillness: "Stillness",
  grit: "Grit",
  meadow: "Meadow",
  clay: "Clay",
  studio: "Studio",
  velvet: "Velvet",
};

function SummaryCard({
  title,
  step,
  onGoToStep,
  children,
}: {
  title: string;
  step: number;
  onGoToStep: (step: number) => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h2 className="font-bold">{title}</h2>
        <button
          type="button"
          onClick={() => onGoToStep(step)}
          aria-label={`Edit ${title.toLowerCase()}`}
          className="rounded-sm type-small font-bold text-text underline underline-offset-4 outline-offset-2 hover:text-volt focus-visible:outline-2 focus-visible:outline-volt"
        >
          Edit
        </button>
      </div>
      <div className="type-small text-text-secondary">{children}</div>
    </section>
  );
}

export default function SubmissionSummary({ data, onChange, onSubmitQuote, onGoToStep, loading, error }: Props) {
  const nameError = error === "ownerName";
  const emailError = error === "ownerEmail";

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <SummaryCard title="Studio" step={1} onGoToStep={onGoToStep}>
          <p>{data.studioName}</p>
          <p>{data.location}</p>
          <p>{data.studioType}</p>
          {data.domain && <p>{data.domain}</p>}
        </SummaryCard>

        <SummaryCard title="Classes" step={2} onGoToStep={onGoToStep}>
          <ul className="flex flex-col gap-1.5">
            {data.classes
              .filter((c) => c.name.trim())
              .map((cls, i) => (
                <li key={i} className="flex items-center justify-between gap-4">
                  <span>{cls.name}</span>
                  <span className="tabular-nums">
                    {cls.price ? `£${cls.price}` : "—"} {cls.capacity ? `· ${cls.capacity} spots` : ""}
                  </span>
                </li>
              ))}
            {data.packs
              .filter((p) => p.name.trim())
              .map((pack, i) => (
                <li key={`pack-${i}`} className="flex items-center justify-between gap-4">
                  <span>
                    {pack.name} <span className="text-text-muted">(pack)</span>
                  </span>
                  <span className="tabular-nums">{pack.price ? `£${pack.price}` : "—"}</span>
                </li>
              ))}
          </ul>
        </SummaryCard>

        <SummaryCard title="Team" step={3} onGoToStep={onGoToStep}>
          {data.team && data.team.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {data.team.map((member, i) => (
                <li key={i}>
                  {member.name || "Unnamed"} <span className="text-text-muted">· {member.role}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted">No team members added</p>
          )}
        </SummaryCard>

        <SummaryCard title="Theme" step={4} onGoToStep={onGoToStep}>
          <p className="flex flex-wrap items-center gap-2">
            {moodNames[data.themeMood] || data.themeMood}
            {data.brandColour && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block size-3 rounded-pill ring-1 ring-border-strong"
                  style={{ backgroundColor: data.brandColour }}
                />
                <span className="tabular-nums text-text-muted">{data.brandColour}</span>
              </span>
            )}
          </p>
        </SummaryCard>
      </div>

      {/* Plan selection */}
      <fieldset className="flex flex-col gap-3">
        <legend className="type-h3">Your plan</legend>
        <p className="type-small text-text-muted">Pick the plan that fits. Switch or cancel anytime.</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PRICING_TIERS.map((tier) => {
            const selected = data.planTier === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ planTier: tier.id })}
                className={`flex flex-col gap-1 rounded-lg border-2 p-4 text-left outline-offset-2 transition-colors duration-(--dur) ease-brand focus-visible:outline-2 focus-visible:outline-volt ${
                  selected ? "border-volt bg-volt text-ink" : "border-border bg-surface text-text hover:border-text-muted"
                }`}
              >
                <span className={`type-label ${selected ? "text-ink" : "text-text-muted"}`}>
                  {tier.tag ?? "Pay monthly"}
                </span>
                <span className="font-bold">{tier.name}</span>
                <span className="font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
                  £{tier.priceMonthly}
                  <span className="font-sans text-[14px] font-medium tracking-normal">/mo</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Owner details */}
      <fieldset className="flex flex-col gap-6">
        <legend className="mb-2 type-h3">Your details</legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="ob-owner-name" className={labelClass}>
              Your name
            </label>
            <input
              id="ob-owner-name"
              type="text"
              autoComplete="name"
              value={data.ownerName}
              onChange={(e) => onChange({ ownerName: e.target.value })}
              placeholder="Your full name"
              aria-invalid={nameError || undefined}
              aria-describedby={nameError ? "ob-owner-name-error" : undefined}
              className={inputClass}
            />
            {nameError && <FieldError id="ob-owner-name-error">Enter your name.</FieldError>}
          </div>
          <div>
            <label htmlFor="ob-owner-email" className={labelClass}>
              Email
            </label>
            <input
              id="ob-owner-email"
              type="email"
              autoComplete="email"
              value={data.ownerEmail}
              onChange={(e) => onChange({ ownerEmail: e.target.value })}
              placeholder="you@yourstudio.com"
              aria-invalid={emailError || undefined}
              aria-describedby={emailError ? "ob-owner-email-error" : undefined}
              className={inputClass}
            />
            {emailError && <FieldError id="ob-owner-email-error">Enter a valid email address.</FieldError>}
          </div>
        </div>
        <div>
          <label htmlFor="ob-owner-phone" className={labelClass}>
            Phone number
            <Optional />
          </label>
          <input
            id="ob-owner-phone"
            type="tel"
            autoComplete="tel"
            value={data.ownerPhone}
            onChange={(e) => onChange({ ownerPhone: e.target.value })}
            placeholder="07700 900000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ob-notes" className={labelClass}>
            Anything else we should know?
            <Optional />
          </label>
          <textarea
            id="ob-notes"
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Tell us about your goals, timeline, or any questions"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label htmlFor="ob-referral" className={labelClass}>
            Referral code
            <Optional />
          </label>
          <input
            id="ob-referral"
            type="text"
            value={data.referralCode}
            onChange={(e) => onChange({ referralCode: e.target.value })}
            placeholder="Were you referred by someone? Enter their code"
            className={inputClass}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {data.referralCode && (
            <p className={hintClass}>
              Referral applied. We&apos;ll credit <span className="font-bold text-text">{data.referralCode}</span>.
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        {error && !nameError && !emailError && (
          <p className="text-center type-small text-coral" role="alert">
            {error}
          </p>
        )}
        <Button size="lg" onClick={onSubmitQuote} disabled={loading} className="w-full">
          {loading ? "Submitting…" : "Request a quote →"}
        </Button>
        <p className="text-center type-small text-text-muted">
          We&apos;ll review your details and get back to you within 48 hours.
        </p>
      </div>
    </div>
  );
}
