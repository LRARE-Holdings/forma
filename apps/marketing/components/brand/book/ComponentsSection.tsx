import { ArrowRight } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { PlanCard } from "@/components/ui/PlanCard";
import { Field, ScheduleRow, StatTile, StatusChip } from "@/components/ui/Product";
import SiteHeader from "@/components/site/SiteHeader";
import { getTier } from "@/lib/pricing";
import { BookSection, Sub } from "./Book";

const STATES = [
  { label: "Default", props: {} },
  { label: "Hover", props: { state: "hover" as const } },
  { label: "Focus", props: { state: "focus" as const } },
  { label: "Disabled", props: { disabled: true } },
];

const VARIANTS: { variant: ButtonVariant; label: string; note: string }[] = [
  { variant: "primary", label: "Primary", note: "Volt fill. One per screen." },
  { variant: "secondary", label: "Secondary", note: "2px outline." },
  { variant: "ghost", label: "Ghost", note: "Text only, for low-priority actions." },
];

export default function ComponentsSection() {
  const studio = getTier("studio")!;
  const pro = getTier("pro")!;

  return (
    <BookSection
      id="components"
      title="Components"
      intro={<p>These are the components the site uses, rendered live. Change one and this page changes with it.</p>}
    >
      <Sub title="Buttons" note="Medium is 44px tall, large is 56px. Focus shows a 2px volt ring with a 2px gap.">
        <div className="overflow-x-auto rounded-lg bg-surface">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 type-label text-text-muted">Variant</th>
                {STATES.map((s) => (
                  <th key={s.label} className="px-5 py-3 type-label text-text-muted">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map(({ variant, label, note }) => (
                <tr key={variant} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-5 py-5 align-middle">
                    <span className="block font-bold">{label}</span>
                    <span className="block type-small font-normal text-text-muted">{note}</span>
                  </th>
                  {STATES.map((s) => (
                    <td key={s.label} className="px-5 py-5">
                      <Button variant={variant} tabIndex={s.label === "Default" ? 0 : -1} {...s.props}>
                        Book now
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg">
            Start your studio <ArrowRight aria-hidden className="size-5" strokeWidth={1.75} />
          </Button>
          <Button size="lg" variant="secondary">
            Compare plans
          </Button>
          <span className="rounded-lg bg-volt p-4">
            <Button variant="inverse">Inverse, on volt</Button>
          </span>
        </div>
      </Sub>

      <Sub title="Plan cards" note="Dark by default. The featured plan (Pro) inverts to volt.">
        <div className="grid max-w-[720px] gap-4 sm:grid-cols-2">
          <PlanCard tier={studio} />
          <PlanCard tier={pro} />
        </div>
      </Sub>

      <Sub title="Navigation" note="Logo left, links, and an outline call to action, so the volt button on the page itself stays the only one on screen. Collapses to a menu button below 768px.">
        <div className="overflow-hidden rounded-lg border border-border-strong">
          <SiteHeader />
        </div>
      </Sub>

      <div className="grid gap-10 lg:grid-cols-2">
        <Sub title="Stat tiles" note="Example data, for product mockups only. Never present these as real results.">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatTile label="Booked this week" value="146" note="Example data" />
            <StatTile label="Waitlist" value="12" note="Example data" />
          </div>
        </Sub>

        <Sub title="Inputs">
          <div className="flex flex-col gap-5 rounded-lg bg-surface p-5">
            <Field id="book-studio-name" label="Studio name" placeholder="e.g. Harbour Pilates" />
            <Field id="book-email" label="Email" type="email" hint="We'll send your login here." defaultValue="owner@example.com" />
            <Field id="book-slug" label="Web address" defaultValue="harbour pilates" error="Use letters, numbers and hyphens only." />
            <Field id="book-disabled" label="Plan" defaultValue="Pro" disabled />
          </div>
        </Sub>
      </div>

      <Sub title="Status chips" note="Pill radius is for status chips only.">
        <div className="flex flex-wrap gap-3">
          <StatusChip>3 left</StatusChip>
          <StatusChip tone="success">Booked</StatusChip>
          <StatusChip tone="alert">Waitlist</StatusChip>
          <StatusChip>Cancelled</StatusChip>
        </div>
      </Sub>

      <Sub title="Class schedule row" note="Example timetable for product mockups.">
        <div className="rounded-lg bg-surface px-5">
          <ScheduleRow time="07:00" duration="50 min" name="Reformer Foundations" instructor="[INSTRUCTOR]" booked={9} capacity={12} />
          <ScheduleRow time="12:15" duration="45 min" name="Mat Pilates" instructor="[INSTRUCTOR]" booked={14} capacity={14} />
          <ScheduleRow
            time="18:30"
            duration="60 min"
            name="Barre Burn"
            instructor="[INSTRUCTOR]"
            booked={6}
            capacity={16}
            action={<StatusChip tone="success">Booked</StatusChip>}
          />
        </div>
      </Sub>
    </BookSection>
  );
}
