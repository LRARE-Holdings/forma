/**
 * Small product-UI pieces used in screenshots, mockups and the brand book:
 * stat tile, form field, status chip, class schedule row.
 */
import type { ComponentProps, ReactNode } from "react";

export function StatTile({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5">
      <p className="type-label text-text-muted">{label}</p>
      <p className="font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">{value}</p>
      {note && <p className="type-small text-text-secondary">{note}</p>}
    </div>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  ...input
}: { id: string; label: string; hint?: string; error?: string } & ComponentProps<"input">) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-label text-text">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={
          "min-h-11 rounded-sm border bg-ink px-3 text-[16px] text-text placeholder:text-text-muted " +
          "outline-offset-2 focus-visible:outline-2 focus-visible:outline-volt disabled:opacity-40 " +
          (error ? "border-coral" : "border-border-strong")
        }
        {...input}
      />
      {error ? (
        <p id={`${id}-error`} className="type-small text-coral">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="type-small text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export type ChipTone = "neutral" | "success" | "alert";

const chipTones: Record<ChipTone, string> = {
  neutral: "border border-border-strong text-text-secondary",
  success: "bg-volt text-ink",
  alert: "bg-coral text-ink",
};

export function StatusChip({ tone = "neutral", children }: { tone?: ChipTone; children: ReactNode }) {
  return (
    <span className={`inline-flex min-h-6 items-center rounded-pill px-2.5 type-label ${chipTones[tone]}`}>
      {children}
    </span>
  );
}

export function ScheduleRow({
  time,
  duration,
  name,
  instructor,
  booked,
  capacity,
  action,
}: {
  time: string;
  duration: string;
  name: string;
  instructor: string;
  booked: number;
  capacity: number;
  action?: ReactNode;
}) {
  const full = booked >= capacity;
  const left = capacity - booked;
  return (
    <div className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-border py-4 last:border-b-0 sm:grid-cols-[80px_1fr_140px_auto]">
      <div>
        <p className="font-display text-[20px] font-bold tabular-nums leading-none">{time}</p>
        <p className="mt-1 type-small text-text-muted">{duration}</p>
      </div>
      <div className="min-w-0">
        <p className="truncate font-bold">{name}</p>
        <p className="truncate type-small text-text-secondary">{instructor}</p>
      </div>
      <div className="hidden flex-col gap-1.5 sm:flex">
        <div className="h-1.5 overflow-hidden rounded-pill bg-border" aria-hidden>
          <div className={`h-full ${full ? "bg-coral" : "bg-text-secondary"}`} style={{ width: `${(booked / capacity) * 100}%` }} />
        </div>
        <p className="type-small tabular-nums text-text-muted">
          {booked}/{capacity} booked
        </p>
      </div>
      <div className="flex justify-end">
        {action ?? (full ? <StatusChip tone="alert">Waitlist</StatusChip> : <StatusChip>{left} left</StatusChip>)}
      </div>
    </div>
  );
}
