import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, CreditCard, LayoutDashboard, CalendarCheck, Globe } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ScheduleRow, StatusChip } from "@/components/ui/Product";
import { PRIMARY_CTA } from "@/config/site";

/** Section shell: one rhythm and gutter for every homepage block. */
export function Block({
  id,
  tone = "ink",
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "ink" | "surface";
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-8 ${tone === "surface" ? "bg-surface" : "border-t border-border bg-ink"} text-text`}
    >
      <div className="mx-auto w-full max-w-content px-(--gutter) py-24 md:py-32">{children}</div>
    </section>
  );
}

export function Manifesto() {
  return (
    <Block>
      <p className="max-w-[26ch] type-h1 text-balance">
        You started a studio to teach people to move, not to wrestle a booking platform and answer DMs at half past ten.{" "}
        <span className="text-volt">So we put the whole thing in one place, at one flat price.</span>
      </p>
    </Block>
  );
}

const FEATURES = [
  {
    icon: Globe,
    title: "A website that looks like you",
    desc: "Your colours, your logo, your timetable, on a site your members can book from.",
  },
  {
    icon: CalendarCheck,
    title: "Booking built in",
    desc: "Classes, courses, memberships and waitlists. Members book in a few taps and you stop fielding times over DM.",
  },
  {
    icon: CreditCard,
    title: "Payments that are yours",
    desc: "Cards, memberships and class packs settle straight into your own Stripe account. We take no commission.",
  },
  {
    icon: LayoutDashboard,
    title: "One place to run it",
    desc: "Timetable, members, takings and automated emails in one dashboard made for a studio, not a gym chain.",
  },
];

export function Features() {
  return (
    <Block id="features" labelledBy="features-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <h2 id="features-title" className="type-display-l lg:col-span-5">
          One studio. <span className="text-volt">One platform.</span>
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex flex-col gap-4 rounded-lg bg-surface p-6">
              <Icon aria-hidden className="size-7 text-volt" strokeWidth={1.75} />
              <h3 className="type-h3">{title}</h3>
              <p className="text-text-secondary">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  );
}

export function StudioShowcase() {
  return (
    <Block tone="surface" labelledBy="showcase-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <figure className="m-0 overflow-hidden rounded-lg border border-border-strong bg-ink" aria-label="Burn Mat Studio timetable, illustrated">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-display text-[20px] font-bold">Burn Mat Studio</span>
            <span className="type-small text-text-muted">This week</span>
          </div>
          <div className="px-5">
            <ScheduleRow time="07:00" duration="50 min" name="Reformer Flow" booked={10} capacity={12} />
            <ScheduleRow time="09:30" duration="45 min" name="Hot Pilates" booked={12} capacity={12} />
            <ScheduleRow
              time="18:00"
              duration="55 min"
              name="Slow & Strong"
             
              booked={5}
              capacity={12}
              action={<StatusChip tone="success">Booked</StatusChip>}
            />
          </div>
          <figcaption className="border-t border-border px-5 py-3 type-small text-text-muted">
            Illustration. Class names from Burn Mat&apos;s timetable; numbers are examples.
          </figcaption>
        </figure>

        <div className="flex flex-col gap-6">
          <p className="type-label text-text-muted">Reformer Pilates · Stockton-on-Tees</p>
          <h2 id="showcase-title" className="type-h1">
            Burn Mat Studio runs on it.
          </h2>
          <ul className="flex flex-col gap-3 border-t border-border pt-6">
            {[
              "Branded site, designed around the studio",
              "Class booking and waitlists built in",
              "Card payments straight to their account",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-text-secondary">
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-volt" strokeWidth={1.75} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/case-studies/burn-mat-studio"
            className="inline-flex w-fit items-center gap-2 rounded-sm font-bold underline-offset-4 outline-offset-2 hover:text-volt hover:underline focus-visible:outline-2 focus-visible:outline-volt"
          >
            Read the case study <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      {/* Real quote from the studio owner. Do not edit or add others. */}
      <blockquote className="mt-24 flex max-w-[1040px] flex-col gap-8 border-t border-border pt-16">
        <p className="type-h1 text-balance">
          &ldquo;I ran everything through one of the big platforms — bookings, payments, my website. It worked, but it
          never felt like <span className="text-volt">mine.</span>{" "}Forma gave me something that actually looks like my
          studio.&rdquo;
        </p>
        <footer className="flex items-center gap-4">
          <span aria-hidden className="grid size-11 place-items-center rounded-md bg-volt font-display text-[20px] font-extrabold text-ink">
            L
          </span>
          <span>
            <span className="block font-bold">Lucy</span>
            <span className="block type-small text-text-muted">Burn Mat Studio, Stockton-on-Tees</span>
          </span>
        </footer>
      </blockquote>
    </Block>
  );
}

const DEAL = [
  { title: "No setup fees", desc: "Pick a plan and start. There's nothing to pay before your first month." },
  {
    title: "Zero commission",
    desc: "Payments go through your own Stripe account. You pay Stripe's fee and nothing to us on top.",
  },
  {
    title: "No contracts",
    desc: "Monthly plans, cancel anytime. Leave whenever you like and take your members and data with you.",
  },
];

export function TheDeal() {
  return (
    <Block id="deal" labelledBy="deal-title">
      <div className="flex flex-col gap-12">
        <h2 id="deal-title" className="max-w-[16ch] type-display-l">
          A flat fee. <span className="text-volt">Never a percentage.</span>
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {DEAL.map((d) => (
            <li key={d.title} className="flex flex-col gap-3 rounded-lg border border-border p-6">
              <h3 className="type-h3">{d.title}</h3>
              <p className="text-text-secondary">{d.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  );
}

const STEPS = [
  {
    title: "Pick your plan",
    desc: "Choose Launch, Studio, Pro or Partner and check out online. No sales call, no quote.",
  },
  {
    title: "Set up your studio",
    desc: "Add your studio details, classes, team and look in a guided setup.",
  },
  {
    title: "Share your booking link",
    desc: "Your site, booking and payments go live. Members book and pay you directly.",
  },
];

export function HowItWorks() {
  return (
    <Block id="how" tone="surface" labelledBy="how-title">
      <div className="flex flex-col gap-12">
        <h2 id="how-title" className="type-display-l">
          How it works
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 rounded-lg bg-ink p-6">
              <span className="font-display text-[52px] font-extrabold leading-none tracking-[-0.04em] text-volt tabular-nums">
                {i + 1}
              </span>
              <h3 className="type-h3">{s.title}</h3>
              <p className="text-text-secondary">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  );
}

export function FinalCta({
  secondary = { label: "See a live studio", href: "/case-studies/burn-mat-studio" },
}: {
  secondary?: { label: string; href: string };
}) {
  return (
    <Block labelledBy="final-title">
      <div className="flex flex-col items-start gap-8">
        <h2 id="final-title" className="type-display-xl">
          Start <span className="text-volt">your studio.</span>
        </h2>
        <p className="max-w-[48ch] type-body-l text-text-secondary">
          Website, booking, payments and emails in one. No setup fees, no contracts, zero commission.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={PRIMARY_CTA.href} size="lg">
            {PRIMARY_CTA.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </Block>
  );
}
