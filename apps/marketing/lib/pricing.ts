/**
 * Single source of truth for Forma's public pricing (Direction B brief).
 *
 * Four flat monthly tiers, tiered by member count. Prices are exact and must
 * not change. Member limits and the Pro feature list haven't been decided:
 * they render as bracketed placeholders, never invented numbers. Tier ids
 * map 1:1 to Stripe price metadata (plan_tier).
 */

export type TierId = "launch" | "studio" | "pro" | "partner";

export const TIER_IDS: TierId[] = ["launch", "studio", "pro", "partner"];

export interface PricingTier {
  id: TierId;
  name: string;
  /** Flat price in whole GBP per month. */
  priceMonthly: number;
  /** Short tag shown after the name, e.g. "most studios". */
  tag?: string;
  blurb: string;
  /** Capacity line. Placeholder until member limits are decided. */
  cap: string;
  /** The featured plan renders as the inverted volt card. */
  featured?: boolean;
  whiteLabel?: boolean;
  features: string[];
}

export const MEMBER_LIMIT_PLACEHOLDER = "[MEMBER LIMIT]";

/** Free trial is offered on annual sign-ups only. Values not decided yet. */
export const ANNUAL_TRIAL = {
  length: "[TRIAL LENGTH]",
  annualPrice: "[ANNUAL PRICE]",
} as const;

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "launch",
    name: "Launch",
    priceMonthly: 39,
    blurb: "Solo instructors and one-room studios",
    cap: `Up to ${MEMBER_LIMIT_PLACEHOLDER} members`,
    features: [
      "Studio website and booking",
      "Class and course scheduling",
      "Stripe payments, zero commission",
      "Client management",
      "Automated email reminders",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    priceMonthly: 59,
    blurb: "Growing independent studios",
    cap: `Up to ${MEMBER_LIMIT_PLACEHOLDER} members`,
    features: [
      "Everything in Launch",
      "Memberships and class packs",
      "Waitlists and automations",
      "Reporting and analytics",
      "Branded booking widget",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 89,
    tag: "most studios",
    blurb: "Established studios with a full timetable",
    cap: `Up to ${MEMBER_LIMIT_PLACEHOLDER} members`,
    featured: true,
    features: ["Everything in Studio", "[PRO FEATURES]", "Priority support"],
  },
  {
    id: "partner",
    name: "Partner",
    priceMonthly: 129,
    tag: "white-label",
    blurb: "Multi-location and white-label",
    cap: `Up to ${MEMBER_LIMIT_PLACEHOLDER} members`,
    whiteLabel: true,
    features: [
      "Everything in Pro",
      "Full white-label, your brand only",
      "Multi-location management",
      "API access and custom integrations",
      "Dedicated support",
    ],
  },
];

export function isTierId(id: unknown): id is TierId {
  return typeof id === "string" && (TIER_IDS as string[]).includes(id);
}

export function getTier(id: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.id === id);
}

/**
 * Competitor entry pricing, normalised to GBP from public 2026 pricing, used
 * only to illustrate the structural difference (they scale with members; Forma
 * is flat). Exact bills vary by negotiation and add-ons.
 */
export interface Competitor {
  name: string;
  /** Approx monthly entry price in GBP. */
  entry: number;
  note: string;
}

export const COMPETITORS: Competitor[] = [
  { name: "TeamUp", entry: 83, note: "scales with active members" },
  { name: "Momence", entry: 78, note: "entry, then add-ons & 2.5% fees" },
  { name: "bSport", entry: 95, note: "opaque, add-on heavy" },
];

/**
 * Rough model of a per-member competitor bill: ~£15 per extra 50 active
 * members above a 50-member base. Forma stays flat at every size.
 */
export function competitorAtMembers(base: number, members: number): number {
  const extra = Math.max(0, Math.floor((members - 50) / 50)) * 15;
  return base + extra;
}
