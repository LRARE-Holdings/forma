import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Burn Mat Studio — Case Study | Forma",
  description:
    "How Forma built a complete website, booking system, and membership platform for a boutique Pilates and yoga studio in Stockton-on-Tees.",
  openGraph: {
    title: "Burn Mat Studio — Case Study | Forma",
    description:
      "How Forma built a complete website, booking system, and membership platform for a boutique Pilates and yoga studio in Stockton-on-Tees.",
    type: "article",
  },
};

const stats = [
  { value: "6", label: "Class types" },
  { value: "3", label: "Instructors" },
  { value: "10", label: "Max class size" },
  { value: "3", label: "Payment paths" },
];

const features = [
  {
    icon: "◎",
    title: "Cinematic marketing site",
    description:
      "Single-page design with animated canvas gradients, staggered entrance animations, class showcase, instructor profiles, live timetable, and transparent pricing — all pulling from the database, never hardcoded.",
  },
  {
    icon: "▤",
    title: "Real-time booking engine",
    description:
      "Live spot counts for every class (capped at 10), 30-minute booking cutoff, and double-booking prevention enforced at the database level. When a class fills, the waitlist takes over automatically.",
  },
  {
    icon: "£",
    title: "Three unified payment paths",
    description:
      "Unlimited memberships, 5 or 10-class credit packs with expiry tracking, or single drop-in sessions via Stripe Checkout. One booking modal intelligently detects the best option for each member.",
  },
  {
    icon: "✦",
    title: "Automated waitlist system",
    description:
      "When a class fills up, members join the waitlist. When a spot opens, the next person gets an email notification with a 30-minute window to claim it. No manual chasing.",
  },
  {
    icon: "◈",
    title: "Member dashboard",
    description:
      "Upcoming and past bookings, pack credit management with animated progress bars and expiry warnings, profile settings, and engagement stats — classes attended, weekly streak, credits remaining.",
  },
  {
    icon: "⚙",
    title: "Studio admin panel",
    description:
      "Full CRUD for classes and schedules, member management, booking oversight, team management, and a filtered staff view showing attendee lists for each instructor's assigned classes.",
  },
];

const polishItems = [
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

const techStack = [
  { name: "Next.js", role: "Full-stack framework" },
  { name: "Supabase", role: "Auth + database" },
  { name: "Stripe", role: "Payments" },
  { name: "Resend", role: "Transactional email" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Vercel", role: "Hosting" },
];

export default function BurnMatStudioCaseStudy() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* Header bar */}
      <nav className="h-16 px-6 md:px-12 flex items-center justify-between border-b border-espresso/6">
        <Link
          href="/"
          className="text-[1.35rem] font-black tracking-[-0.04em] text-transparent"
          style={{ WebkitTextStroke: "1.2px #5C3D2E" }}
        >
          forma
        </Link>
        <Link
          href="/"
          className="text-[0.82rem] font-medium text-driftwood hover:text-espresso transition-colors"
        >
          Back to Forma
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-28 max-w-[1120px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            Case study
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-normal leading-[1.08] text-espresso mb-6">
            Burn Mat Studio
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-[1.1rem] leading-[1.7] text-driftwood max-w-[640px] mb-4">
            A boutique Pilates and yoga studio in Stockton-on-Tees needed a
            professional digital presence that handled the full member journey
            — discovery through to repeat booking — without enterprise overhead
            or cost.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-[0.88rem] text-fog">
            Forma&apos;s first tenant &middot; burnmatstudio.co.uk
          </p>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={280}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-sand rounded-2xl overflow-hidden mt-14">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-6 text-center">
                <p className="font-serif text-[2.2rem] text-terracotta leading-none mb-1">
                  {s.value}
                </p>
                <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-fog">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <hr className="border-t border-espresso/6 max-w-280 mx-auto" />

      {/* The Problem */}
      <section className="py-28 max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-terracotta" />
                The challenge
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-espresso mb-4">
                Great classes,
                <br />
                generic <em className="italic text-terracotta">tools</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="space-y-5 text-[1rem] leading-[1.7] text-driftwood">
              <p>
                The studio was managing bookings, payments, and member
                communication through generic tools that weren&apos;t built for
                small boutique studios. The experience for members felt
                functional but impersonal — a booking widget on a template site.
              </p>
              <p>
                Enterprise platforms like Mindbody and Glofox were overpriced and
                overbuilt. Generic website builders couldn&apos;t handle
                real-time booking. Freelance builds couldn&apos;t scale or be
                maintained affordably. The studio needed something in between.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Forma Built — dark section */}
      <section className="py-28 bg-charcoal relative overflow-hidden">
        <div className="absolute -top-[120px] -right-[120px] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(194,113,79,0.06)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1120px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              What we built
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-bisque mb-4">
              A complete platform,
              <br />
              not just a website.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[1.05rem] leading-[1.65] text-sandstone max-w-[540px] mb-14">
              Forma delivered a full-stack application — public-facing marketing
              site, real-time booking engine, payment processing, member
              accounts, staff tools, and admin dashboard. All under one roof,
              all on-brand.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all h-full">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[1.1rem] mb-5 bg-terracotta/10 text-terracotta border border-terracotta/[0.08]">
                    {f.icon}
                  </div>
                  <h3 className="text-[1.05rem] font-bold text-bisque mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.6] text-sandstone">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Flow Detail */}
      <section className="py-28 max-w-[1120px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            How booking works
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-espresso mb-14">
            Three ways to pay,
            <br />
            one seamless flow.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "Membership",
              desc: "Unlimited monthly access. Members book any class instantly — no credits to count, no limits. Recurring billing handled by Stripe.",
            },
            {
              num: "02",
              title: "Class packs",
              desc: "Buy 5 or 10 credits upfront. Each booking deducts one credit. Animated progress bars track usage, with expiry warnings as the deadline approaches.",
            },
            {
              num: "03",
              title: "Drop-in",
              desc: "Single-class purchase via Stripe Checkout. No account required to browse, but booking creates a member profile for future visits.",
            },
          ].map((item, i) => (
            <Reveal key={item.num} delay={i * 80}>
              <div className="bg-white p-8 hover:bg-linen transition-colors h-full">
                <p className="font-serif text-[2.5rem] text-sand leading-none mb-3">
                  {item.num}
                </p>
                <h3 className="text-[0.95rem] font-bold mb-1.5 text-espresso">
                  {item.title}
                </h3>
                <p className="text-[0.82rem] leading-[1.55] text-driftwood">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <p className="text-[0.92rem] leading-[1.7] text-driftwood max-w-[600px] mt-10">
            The booking modal auto-detects which option to present based on the
            member&apos;s account state. Members with an active membership book
            instantly. Pack holders see their remaining credits. Everyone else
            sees the drop-in price. No confusion, no wasted clicks.
          </p>
        </Reveal>
      </section>

      <hr className="border-t border-espresso/6 max-w-280 mx-auto" />

      {/* Design & Polish */}
      <section className="py-28 bg-linen">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              Fit and finish
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-espresso mb-4">
              The details that make it
              <br />
              feel <em className="italic text-terracotta">real</em>.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[1.05rem] leading-[1.65] text-driftwood max-w-[540px] mb-14">
              A final sprint of UX polish turned a functional platform into
              something that feels crafted. Every interaction has weight and
              intention.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {polishItems.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="bg-white rounded-xl p-5 border border-sand/60 hover:border-clay transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0" />
                    <p className="text-[0.84rem] leading-[1.5] text-driftwood">
                      {item}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand System */}
      <section className="py-28 max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-terracotta" />
                Brand system
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-espresso mb-4">
                Boutique wellness,
                <br />
                not corporate gym.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-[1rem] leading-[1.7] text-driftwood">
                The entire visual identity was built from the studio&apos;s
                existing logo — a warm, earthy palette that feels premium but
                approachable. Every colour, typeface, and micro-interaction
                reinforces the same aesthetic.
              </p>
            </Reveal>
          </div>

          <div className="space-y-6">
            {/* Colour palette */}
            <Reveal delay={200}>
              <div className="bg-white rounded-2xl border border-sand/60 p-6">
                <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-fog mb-4">
                  Colour palette
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: "Wheat", hex: "#F5E6D3" },
                    { name: "Cocoa", hex: "#4A3728" },
                    { name: "Gold", hex: "#C8A97E" },
                    { name: "Cream", hex: "#FAF5EF" },
                    { name: "Sand", hex: "#D4C4B0" },
                    { name: "Charcoal", hex: "#2C2C2C" },
                    { name: "Ember", hex: "#D4845E" },
                    { name: "Blush", hex: "#E8C4B8" },
                  ].map((c) => (
                    <div key={c.name} className="text-center">
                      <div
                        className="w-full aspect-square rounded-lg mb-1.5 border border-espresso/6"
                        style={{ backgroundColor: c.hex }}
                      />
                      <p className="text-[0.68rem] font-medium text-espresso">
                        {c.name}
                      </p>
                      <p className="font-mono text-[0.6rem] text-fog">
                        {c.hex}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Typography */}
            <Reveal delay={280}>
              <div className="bg-white rounded-2xl border border-sand/60 p-6">
                <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-fog mb-4">
                  Typography
                </p>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-sand/40 pb-3">
                    <span
                      className="text-[1.4rem] text-espresso"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      Cormorant Garamond
                    </span>
                    <span className="font-mono text-[0.65rem] text-fog">
                      Display
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span
                      className="text-[1.1rem] text-espresso"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      DM Sans
                    </span>
                    <span className="font-mono text-[0.65rem] text-fog">
                      Body
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="border-t border-espresso/6 max-w-280 mx-auto" />

      {/* Tech Stack */}
      <section className="py-28 max-w-[1120px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            Under the hood
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-espresso mb-14">
            Modern infrastructure,
            <br />
            studio-grade reliability.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div className="bg-white rounded-xl border border-sand/60 p-6 hover:border-clay transition-colors">
                <p className="text-[1rem] font-bold text-espresso mb-0.5">
                  {t.name}
                </p>
                <p className="text-[0.78rem] text-driftwood">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-14 bg-charcoal rounded-2xl p-8 md:p-10">
            <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-terracotta mb-4">
              Key technical decisions
            </p>
            <div className="space-y-4 text-[0.88rem] leading-[1.65] text-sandstone">
              <p>
                <span className="text-bisque font-semibold">
                  Webhook-driven payments.
                </span>{" "}
                Bookings and credit purchases are only confirmed after Stripe
                fires a webhook — never optimistically. This prevents phantom
                bookings and ensures every confirmed spot is backed by a real
                payment.
              </p>
              <p>
                <span className="text-bisque font-semibold">
                  Database-level integrity.
                </span>{" "}
                Double-booking prevention isn&apos;t handled in application
                code — it&apos;s enforced by database constraints. Even if two
                members click &ldquo;Book&rdquo; at the exact same millisecond,
                only one gets the spot.
              </p>
              <p>
                <span className="text-bisque font-semibold">
                  Transactional email from the studio&apos;s domain.
                </span>{" "}
                Booking confirmations, pack receipts, cancellation notices, and
                welcome emails are all sent via Resend from the studio&apos;s
                own domain — not from a generic @forma address.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Result / CTA */}
      <section className="py-28 bg-linen">
        <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5">
              The result
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-espresso mb-6">
              A platform that feels like
              <br />
              <em className="italic text-terracotta">theirs</em>.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[1.05rem] leading-[1.7] text-driftwood mb-12 max-w-[560px] mx-auto">
              Burn Mat Studio now runs on a fully integrated platform — website,
              booking, payments, member accounts, and admin tools — all under
              one brand, with no enterprise price tag and no duct-taped
              integrations.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/onboarding"
                className="px-7 py-3.5 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt hover:scale-[1.03] transition-all"
              >
                Start your studio
              </Link>
              <Link
                href="/#pricing"
                className="px-6 py-3.5 bg-transparent text-espresso border-[1.5px] border-sand rounded-[10px] text-[0.92rem] font-medium hover:border-clay transition-all"
              >
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-espresso/6 py-10">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-4">
          <Link
            href="/"
            className="font-black text-[1.05rem] tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: "1px #5C3D2E" }}
          >
            forma
          </Link>
          <div className="flex gap-7">
            <Link
              href="/#features"
              className="text-[0.78rem] text-fog hover:text-driftwood transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-[0.78rem] text-fog hover:text-driftwood transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-[0.78rem] text-fog hover:text-driftwood transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[0.78rem] text-fog hover:text-driftwood transition-colors"
            >
              Terms
            </Link>
          </div>
          <span className="text-[0.72rem] text-fog">
            &copy; 2026 Forma. Built in Newcastle.
          </span>
        </div>
      </footer>
    </main>
  );
}
