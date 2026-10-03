import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import ClearDraft from "./ClearDraft";

// What happens after a successful Stripe checkout. Setup is manual for now,
// so no timescales are promised.
const timeline = [
  { time: "Now", desc: "Your plan is active and we've emailed you a confirmation" },
  { time: "Next", desc: "We set up your studio site, booking and payments from the details you gave us" },
  { time: "When it's ready", desc: "We email you your login so you can check everything and go live" },
];

export default function SuccessScreen() {
  return (
    <div className="min-h-dvh bg-ink text-text">
      <ClearDraft />
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-[760px] items-center px-(--gutter) md:h-20">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-volt"
          >
            <Logo height={24} decorative />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-[760px] flex-col gap-10 px-(--gutter) py-16 md:py-24">
        <span className="grid size-16 place-items-center rounded-lg bg-volt text-ink">
          <Check aria-hidden className="size-8" strokeWidth={2.25} />
        </span>

        <div className="flex flex-col gap-4">
          <h1 className="type-display-l">
            You&apos;re in. <span className="text-volt">Welcome aboard.</span>
          </h1>
          <p className="type-body-l text-text-secondary">
            Payment received. We&apos;re setting up your studio now. No setup fees, no contract, and you can cancel anytime.
          </p>
        </div>

        <ol className="flex flex-col gap-3">
          {timeline.map((item, i) => (
            <li key={item.time} className="flex items-start gap-4 rounded-lg border border-border p-5">
              <span className="font-display text-[28px] font-extrabold leading-none text-volt tabular-nums">{i + 1}</span>
              <span>
                <span className="block type-label text-text-muted">{item.time}</span>
                <span className="mt-1 block">{item.desc}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-4">
          <ButtonLink href="/" size="lg" className="w-full sm:w-fit">
            Back to {brand.name}
          </ButtonLink>
          <p className="type-small text-text-muted">
            Have questions? Email{" "}
            <a
              href={`mailto:${brand.email}`}
              className="rounded-sm font-bold text-text underline underline-offset-4 outline-offset-2 hover:text-volt focus-visible:outline-2 focus-visible:outline-volt"
            >
              {brand.email}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
