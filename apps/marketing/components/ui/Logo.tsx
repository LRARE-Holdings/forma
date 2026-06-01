type LogoProps = {
  invert?: boolean;
  className?: string;
  showWord?: boolean;
};

/**
 * Forma identity: an arch / threshold mark paired with the wordmark.
 * The arch reads as a doorway — the studio space, made online.
 * Mark uses currentColor so it inherits ink/cream from context.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 26"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 24.5V11.8a9 9 0 0 1 18 0V24.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 24.5v-6.6a2.6 2.6 0 0 1 5.2 0v6.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ invert = false, className = "", showWord = true }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-[0.5rem] ${
        invert ? "text-parchment" : "text-espresso"
      } ${className}`}
    >
      <Mark className="w-[1.05em] h-[1.14em] text-terracotta shrink-0" />
      {showWord && (
        <span className="font-medium text-[1.18rem] tracking-[-0.015em] lowercase leading-none">
          forma
        </span>
      )}
    </span>
  );
}
