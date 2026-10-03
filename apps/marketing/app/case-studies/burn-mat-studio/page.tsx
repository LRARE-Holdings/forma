import type { Metadata } from "next";
import {
  CalendarClock,
  CreditCard,
  LayoutDashboard,
  ListChecks,
  MonitorPlay,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { Block, FinalCta } from "@/components/marketing/HomeSections";
import { StatTile } from "@/components/ui/Product";
import { brand } from "@/config/brand";

const description = `How ${brand.name} built a complete website, booking system and membership platform for a boutique Pilates and yoga studio in Stockton-on-Tees.`;

export const metadata: Metadata = {
  title: `Burn Mat Studio case study · ${brand.name}`,
  description,
  openGraph: { title: `Burn Mat Studio case study · ${brand.name}`, description, type: "article" },
};

const STATS = [
  { value: "6", label: "Class types" },
  { value: "3", label: "Instructors" },
  { value: "10", label: "Max class size" },
  { value: "3", label: "Payment paths" },
];

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MonitorPlay,
    title: "Cinematic marketing site",
    description:
      "Single-page design with animated canvas gradients, staggered entrance animations, class showcase, instructor profiles, live timetable, and transparent pricing — all pulling from the database, never hardcoded.",
  },
  {
    icon: CalendarClock,
    title: "Real-time booking engine",
    description:
      "Live spot counts for every class (capped at 10), 30-minute booking cutoff, and double-booking prevention enforced at the database level. When a class fills, the waitlist takes over automatically.",
  },
  {
    icon: CreditCard,
    title: "Three unified payment paths",
    description:
      "Unlimited memberships, 5 or 10-class credit packs with expiry tracking, or single drop-in sessions via Stripe Checkout. One booking modal detects the best option for each member.",
  },
  {
    icon: ListChecks,
    title: "Automated waitlist system",
    description:
      "When a class fills up, members join the waitlist. When a spot opens, the next person gets an email notification with a 30-minute window to claim it. No manual chasing.",
  },
  {
    icon: UserRound,
    title: "Member dashboard",
    description:
      "Upcoming and past bookings, pack credit management with animated progress bars and expiry warnings, profile settings, and engagement stats — classes attended, weekly streak, credits remaining.",
  },
  {
    icon: LayoutDashboard,
    title: "Studio admin panel",
    description:
      "Full CRUD for classes and schedules, member management, booking oversight, team management, and a filtered staff view showing attendee lists for each instructor's assigned classes.",
  },
];

const PAY_PATHS = [
  {
    title: "Membership",
    desc: "Unlimited monthly access. Members book any class instantly — no credits to count, no limits. Recurring billing handled by Stripe.",
  },
  {
    title: "Class packs",
    desc: "Buy 5 or 10 credits upfront. Each booking deducts one credit. Animated progress bars track usage, with expiry warnings as the deadline approaches.",
  },
  {
    title: "Drop-in",
    desc: "Single-class purchase via Stripe Checkout. No account required to browse, but booking creates a member profile for future visits.",
  },
];

const POLISH = [
  "Shimmer skeleton loaders for perceived performance",
  "Toast notification system replacing browser alerts",
  "Tactile button press states across all interactions",
  "Staggered entrance animations on cards, timetable slots, and lists",
  "Animated pack credit progress bars with ember glow on expiry",
  "Branded empty states with encouraging copy",
  "Today indicator on timetable with auto-highlight",
  "Slide-up cookie banner",
  "Route-level branded loading spinners",
  "Class-specific SVG icons in the booking modal",
  "Member stats dashboard with streak tracking",
];

// Burn Mat's own identity, shown as part of the case study. These are the
// studio's colours and fonts, not ours, so they are literal on purpose.
const STUDIO_PALETTE = [
  { name: "Wheat", hex: "#F5E6D3" },
  { name: "Cocoa", hex: "#4A3728" },
  { name: "Gold", hex: "#C8A97E" },
  { name: "Cream", hex: "#FAF5EF" },
  { name: "Sand", hex: "#D4C4B0" },
  { name: "Charcoal", hex: "#2C2C2C" },
  { name: "Ember", hex: "#D4845E" },
  { name: "Blush", hex: "#E8C4B8" },
];

const TECH = [
  { name: "Next.js", role: "Full-stack framework" },
  { name: "Supabase", role: "Auth + database" },
  { name: "Stripe", role: "Payments" },
  { name: "Resend", role: "Transactional email" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Vercel", role: "Hosting" },
];

const DECISIONS = [
  {
    h: "Webhook-driven payments.",
    b: "Bookings and credit purchases are only confirmed after Stripe fires a webhook — never optimistically. This prevents phantom bookings and ensures every confirmed spot is backed by a real payment.",
  },
  {
    h: "Database-level integrity.",
    b: "Double-booking prevention isn't handled in application code — it's enforced by database constraints. Even if two members click “Book” at the exact same millisecond, only one gets the spot.",
  },
  {
    h: "Transactional email from the studio's domain.",
    b: `Booking confirmations, pack receipts, cancellation notices, and welcome emails are all sent via Resend from the studio's own domain — not from a generic ${brand.name} address.`,
  },
];

function Heading({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 flex flex-col gap-4">
      <p className="type-label text-text-muted">{eyebrow}</p>
      <h2 id={id} className="max-w-[20ch] type-h1">
        {children}
      </h2>
    </div>
  );
}

export default function BurnMatStudioCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ink text-text">
        <section aria-labelledby="cs-title">
          <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-(--gutter) pt-10 pb-24 md:pt-16">
            <p className="type-label text-text-muted">Case study · Reformer Pilates · Stockton-on-Tees</p>
            <h1 id="cs-title" className="type-display-xl">
              Burn Mat <span className="text-volt">Studio.</span>
            </h1>
            <p className="max-w-[60ch] type-body-l text-text-secondary">
              A boutique Pilates and yoga studio in Stockton-on-Tees needed a professional digital presence that handled
              the full member journey — discovery through to repeat booking — without enterprise overhead or cost.
            </p>
            <p className="type-small text-text-muted">{brand.name}&apos;s first tenant · burnmatstudio.co.uk</p>
            <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {STATS.map((s) => (
                <li key={s.label}>
                  <StatTile label={s.label} value={s.value} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Block labelledBy="challenge-title">
          <div className="grid md:grid-cols-2 md:gap-12">
            <Heading id="challenge-title" eyebrow="The challenge">
              Great classes, <span className="text-volt">generic tools.</span>
            </Heading>
            <div className="flex flex-col gap-5 type-body-l text-text-secondary">
              <p>
                The studio was managing bookings, payments, and member communication through generic tools that
                weren&apos;t built for small boutique studios. The experience for members felt functional but impersonal
                — a booking widget on a template site.
              </p>
              <p>
                Enterprise platforms like Mindbody and Glofox were overpriced and overbuilt. Generic website builders
                couldn&apos;t handle real-time booking. Freelance builds couldn&apos;t scale or be maintained affordably.
                The studio needed something in between.
              </p>
            </div>
          </div>
        </Block>

        <Block tone="surface" labelledBy="built-title">
          <Heading id="built-title" eyebrow="What we built">
            A complete platform, <span className="text-volt">not just a website.</span>
          </Heading>
          <p className="-mt-4 mb-12 max-w-[56ch] type-body-l text-text-secondary">
            {brand.name} delivered a full-stack application — public-facing marketing site, real-time booking engine,
            payment processing, member accounts, staff tools, and admin dashboard. All under one roof, all on-brand.
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, description: d }) => (
              <li key={title} className="flex flex-col gap-4 rounded-lg bg-ink p-6">
                <Icon aria-hidden className="size-7 text-volt" strokeWidth={1.75} />
                <h3 className="type-h3">{title}</h3>
                <p className="text-text-secondary">{d}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block labelledBy="booking-title">
          <Heading id="booking-title" eyebrow="How booking works">
            Three ways to pay, <span className="text-volt">one booking flow.</span>
          </Heading>
          <ol className="grid gap-4 md:grid-cols-3">
            {PAY_PATHS.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-3 rounded-lg border border-border p-6">
                <span className="font-display text-[52px] font-extrabold leading-none tracking-[-0.04em] text-volt tabular-nums">
                  {i + 1}
                </span>
                <h3 className="type-h3">{p.title}</h3>
                <p className="text-text-secondary">{p.desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[60ch] text-text-secondary">
            The booking modal auto-detects which option to present based on the member&apos;s account state. Members with
            an active membership book instantly. Pack holders see their remaining credits. Everyone else sees the drop-in
            price. No confusion, no wasted clicks.
          </p>
        </Block>

        <Block tone="surface" labelledBy="polish-title">
          <Heading id="polish-title" eyebrow="Fit and finish">
            The details that make it <span className="text-volt">feel real.</span>
          </Heading>
          <p className="-mt-4 mb-12 max-w-[56ch] type-body-l text-text-secondary">
            A final sprint of UX polish turned a functional platform into something that feels crafted. Every interaction
            has weight and intention.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {POLISH.map((item) => (
              <li key={item} className="flex gap-3 rounded-md bg-ink p-5 type-small text-text-secondary">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-pill bg-volt" />
                {item}
              </li>
            ))}
          </ul>
        </Block>

        <Block labelledBy="brand-title">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Heading id="brand-title" eyebrow="The studio's brand">
                Boutique wellness, <span className="text-volt">not corporate gym.</span>
              </Heading>
              <p className="-mt-4 type-body-l text-text-secondary">
                The entire visual identity was built from the studio&apos;s existing logo — a warm, earthy palette that
                feels premium but approachable. Every colour, typeface, and micro-interaction reinforces the same
                aesthetic.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-surface p-6">
                <p className="mb-4 type-label text-text-muted">Burn Mat colour palette</p>
                <ul className="grid grid-cols-4 gap-3">
                  {STUDIO_PALETTE.map((c) => (
                    <li key={c.name} className="flex flex-col gap-1.5">
                      <span className="aspect-square w-full rounded-sm ring-1 ring-border-strong" style={{ backgroundColor: c.hex }} />
                      <span className="type-label">{c.name}</span>
                      <span className="text-[12px] tabular-nums text-text-muted">{c.hex}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-surface p-6">
                <p className="mb-4 type-label text-text-muted">Burn Mat typography</p>
                <dl className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <dt className="text-[22px]" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                      Cormorant Garamond
                    </dt>
                    <dd className="type-small text-text-muted">Display</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-3">
                    <dt className="text-[18px]" style={{ fontFamily: "DM Sans, Helvetica, Arial, sans-serif" }}>
                      DM Sans
                    </dt>
                    <dd className="type-small text-text-muted">Body</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Block>

        <Block tone="surface" labelledBy="tech-title">
          <Heading id="tech-title" eyebrow="Under the hood">
            Modern infrastructure, <span className="text-volt">studio-grade reliability.</span>
          </Heading>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {TECH.map((t) => (
              <li key={t.name} className="rounded-lg bg-ink p-6">
                <p className="font-bold">{t.name}</p>
                <p className="type-small text-text-muted">{t.role}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-4 rounded-lg border border-border-strong bg-ink p-6 md:p-10">
            <h3 className="type-label text-volt">Key technical decisions</h3>
            {DECISIONS.map((d) => (
              <p key={d.h} className="text-text-secondary">
                <span className="font-bold text-text">{d.h}</span> {d.b}
              </p>
            ))}
          </div>
        </Block>

        <Block labelledBy="result-title">
          <Heading id="result-title" eyebrow="The result">
            A platform that feels like <span className="text-volt">theirs.</span>
          </Heading>
          <p className="-mt-4 max-w-[56ch] type-body-l text-text-secondary">
            Burn Mat Studio now runs on a fully integrated platform — website, booking, payments, member accounts, and
            admin tools — all under one brand, with no enterprise price tag and no duct-taped integrations.
          </p>
        </Block>

        <FinalCta secondary={{ label: "Compare plans", href: "/pricing" }} />
      </main>
      <SiteFooter />
    </>
  );
}
