import type { ReactNode } from "react";

export const BOOK_SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "logo", label: "Logo" },
  { id: "colour", label: "Colour" },
  { id: "type", label: "Typography" },
  { id: "space", label: "Spacing, radius, grid" },
  { id: "components", label: "Components" },
  { id: "voice", label: "Voice and copy" },
  { id: "applications", label: "Applications" },
  { id: "rename", label: "Rename note" },
] as const;

export function BookSection({
  id,
  title,
  intro,
  children,
}: {
  id: (typeof BOOK_SECTIONS)[number]["id"];
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-8 flex-col gap-10 border-t border-border pt-12">
      <header className="flex flex-col gap-4">
        <h2 id={`${id}-title`} className="type-h1">
          {title}
        </h2>
        {intro && <div className="max-w-[65ch] type-body-l text-text-secondary">{intro}</div>}
      </header>
      {children}
    </section>
  );
}

export function Sub({ title, children, note }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="type-h3">{title}</h3>
        {note && <p className="max-w-[65ch] text-text-secondary">{note}</p>}
      </div>
      {children}
    </div>
  );
}

/** A labelled specimen tile. `surface` picks the background. */
export function Tile({
  label,
  surface = "surface",
  className = "",
  children,
}: {
  label?: ReactNode;
  surface?: "surface" | "ink" | "volt" | "paper" | "paper-2";
  className?: string;
  children: ReactNode;
}) {
  const bg = {
    surface: "bg-surface text-text",
    ink: "bg-ink text-text border border-border-strong",
    volt: "bg-volt text-ink",
    paper: "bg-paper text-ink",
    "paper-2": "bg-paper-2 text-ink",
  }[surface];
  const labelTone = surface === "surface" || surface === "ink" ? "text-text-muted" : "text-ink-soft";
  const labelToneVolt = surface === "volt" ? "text-ink" : labelTone;
  return (
    <figure className={`m-0 flex flex-col gap-4 rounded-lg p-5 ${bg} ${className}`}>
      <div className="flex min-h-24 flex-1 items-center justify-center">{children}</div>
      {label && <figcaption className={`type-label ${labelToneVolt}`}>{label}</figcaption>}
    </figure>
  );
}

export function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 type-small">
      <span
        className={`inline-flex min-h-6 shrink-0 items-center rounded-pill px-2.5 type-label ${ok ? "bg-volt text-ink" : "bg-coral text-ink"}`}
      >
        {ok ? "Do" : "Don't"}
      </span>
      <span className="text-text-secondary">{children}</span>
    </p>
  );
}
