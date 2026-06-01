import { ReactNode } from "react";

type Tone = "light" | "linen" | "espresso" | "charcoal" | "terracotta";

const toneClasses: Record<Tone, string> = {
  light: "bg-parchment text-espresso",
  linen: "bg-linen text-espresso",
  espresso: "bg-espresso text-parchment",
  charcoal: "bg-charcoal text-parchment",
  terracotta: "bg-terracotta text-parchment",
};

/**
 * Single source of truth for vertical rhythm + horizontal gutters.
 * Editorial spacing: generous air, every section identical.
 */
export function Section({
  children,
  id,
  tone = "light",
  className = "",
  bordered = false,
  wide = false,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  bordered?: boolean;
  wide?: boolean;
}) {
  const border =
    bordered && (tone === "light" || tone === "linen")
      ? "border-b border-espresso/10"
      : "";
  return (
    <section
      id={id}
      className={`py-24 md:py-36 ${toneClasses[tone]} ${border} ${className}`}
    >
      <div
        className={`${wide ? "max-w-[1320px]" : "max-w-[1180px]"} mx-auto px-6 md:px-12`}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Quiet editorial label — a tiny mono kicker. No decorative dash.
 * Used sparingly; whitespace and scale carry the hierarchy.
 */
export function Label({
  children,
  invert = false,
  className = "",
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[0.62rem] tracking-[0.22em] uppercase ${
        invert ? "text-parchment/45" : "text-driftwood"
      } ${className}`}
    >
      {children}
    </p>
  );
}
