import {
  brand,
  MARK_PATH,
  WORDMARK,
  LOCKUP_HORIZONTAL,
  LOCKUP_STACKED,
} from "@/config/brand";

type Variant = "mark" | "wordmark" | "horizontal" | "stacked";
/**
 * lime  — volt mark, white wordmark. For ink/dark surfaces (the default).
 * ink   — everything ink. For paper/white and volt surfaces.
 * white — everything white. For ink when volt is already in use nearby.
 */
type Tone = "lime" | "ink" | "white";

const MARK_CLASS: Record<Tone, string> = { lime: "text-volt", ink: "text-ink", white: "text-text" };
const WORD_CLASS: Record<Tone, string> = { lime: "text-text", ink: "text-ink", white: "text-text" };

type LogoProps = {
  variant?: Variant;
  tone?: Tone;
  /** Rendered height in px. Width follows the artwork's aspect ratio. */
  height?: number;
  className?: string;
  /** Set when the logo is decorative (e.g. next to visible brand text). */
  decorative?: boolean;
};

function Mark({ x = 0, y = 0, size = 24, className }: { x?: number; y?: number; size?: number; className: string }) {
  return (
    <path
      className={className}
      fill="currentColor"
      fillRule="evenodd"
      transform={`translate(${x} ${y}) scale(${size / 24})`}
      d={MARK_PATH}
    />
  );
}

function Word({ x = 0, y = 0, className }: { x?: number; y?: number; className: string }) {
  return <path className={className} fill="currentColor" transform={`translate(${x} ${y})`} d={WORDMARK.d} />;
}

export function Logo({ variant = "horizontal", tone = "lime", height = 24, className = "", decorative = false }: LogoProps) {
  const markClass = MARK_CLASS[tone];
  const wordClass = WORD_CLASS[tone];

  const lockup = variant === "stacked" ? LOCKUP_STACKED : LOCKUP_HORIZONTAL;
  const { w, h } =
    variant === "mark"
      ? { w: 24, h: 24 }
      : variant === "wordmark"
        ? { w: WORDMARK.width, h: WORDMARK.height }
        : { w: lockup.width, h: lockup.height };

  const body =
    variant === "mark" ? (
      <Mark className={markClass} />
    ) : variant === "wordmark" ? (
      <Word className={wordClass} />
    ) : (
      <>
        <Mark x={lockup.markX} y={lockup.markY} size={lockup.markSize} className={markClass} />
        <Word x={lockup.wordmarkX} y={lockup.wordmarkY} className={wordClass} />
      </>
    );

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      height={height}
      width={(height * w) / h}
      className={`shrink-0 ${className}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : brand.name}
    >
      {body}
    </svg>
  );
}

export default Logo;
