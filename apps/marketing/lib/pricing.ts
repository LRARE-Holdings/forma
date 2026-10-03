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
