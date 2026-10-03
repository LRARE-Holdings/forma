/**
 * The one place the company name lives.
 *
 * The name is likely to change. On rename: update this file, replace
 * public/brand/logo/wordmark.svg (and the lockups built from it), and
 * regenerate the OG image. The mark has no letterforms, so it survives.
 * Nothing else in the codebase should hard-code the name in logo contexts.
 */
export const brand = {
  name: "Forma",
  /** Lowercase form used by the wordmark. */
  wordmark: "forma",
  domain: "useforma.co.uk",
  url: "https://useforma.co.uk",
  email: "hello@useforma.co.uk",
  bigIdea: "Your studio. Your members. Your money.",
  description:
    "Booking, payments, website and emails for independent studios — at one flat price. Zero commission. Zero setup fees. Zero contracts.",
} as const;

export type Brand = typeof brand;

/**
 * Hand-tuned wordmark spacing, in em, applied on top of the font's kerning
 * and the −0.03em tracking. Keys are letter pairs. Re-tune after a rename,
 * then run `pnpm build:logo`.
 */
export const wordmarkKerning: Record<string, number> = {
  fo: 0.012,
  or: 0.008,
  rm: 0.02,
};

export * from "./brand-logo.generated.ts";
