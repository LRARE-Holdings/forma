/** Shared form styling for the onboarding wizard, on the brand tokens. */
import { ChevronDown, X } from "lucide-react";
import type { ReactNode } from "react";

export const inputClass =
  "w-full min-h-11 rounded-sm border border-border-strong bg-ink px-4 py-3 text-[16px] text-text placeholder:text-text-muted " +
  "outline-offset-2 transition-colors duration-(--dur) ease-brand hover:border-text-muted focus-visible:outline-2 focus-visible:outline-volt";

export const labelClass = "mb-2 block type-label text-text";
export const subLabelClass = "mb-1.5 block type-label text-text-secondary";
export const hintClass = "mt-2 type-small text-text-muted";
export const errorClass = "mt-2 type-small text-coral";
export const cardClass = "relative rounded-lg border border-border bg-surface p-5";
export const addButtonClass =
  "flex w-full min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-strong type-small font-bold text-text-secondary " +
  "outline-offset-2 transition-colors duration-(--dur) ease-brand hover:border-volt hover:text-text focus-visible:outline-2 focus-visible:outline-volt";

export function Optional() {
  return <span className="font-medium text-text-muted"> (optional)</span>;
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className={errorClass} role="alert">
      {children}
    </p>
  );
}

export function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute top-3 right-3 grid size-8 place-items-center rounded-sm text-text-muted outline-offset-2 transition-colors duration-(--dur) ease-brand hover:bg-border hover:text-text focus-visible:outline-2 focus-visible:outline-volt"
    >
      <X aria-hidden className="size-4" strokeWidth={1.75} />
    </button>
  );
}

export function SelectChevron() {
  return (
    <ChevronDown
      aria-hidden
      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text-muted"
      strokeWidth={1.75}
    />
  );
}

/** Pound sign inside a price input. */
export function PoundPrefix() {
  return (
    <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-text-muted">
      £
    </span>
  );
}
