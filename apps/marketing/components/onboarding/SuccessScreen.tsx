import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { brand } from "@/config/brand";

// Describes the current quote-request flow. Replace when Stripe checkout lands.
const timeline = [
  { time: "Now", desc: "We review your studio details" },
  { time: "Within 48 hours", desc: "We'll reach out to discuss your needs and pricing" },
  { time: "After you approve", desc: "We start building your site" },
  { time: "Within 5 days", desc: "Your studio goes live" },
];

export default function SuccessScreen() {
  return (
    <div className="min-h-dvh bg-ink text-text">
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
            Thanks. <span className="text-volt">We&apos;ve got it.</span>
          </h1>
          <p className="type-body-l text-text-secondary">
            We&apos;ve received your details and will be in touch within 48 hours.
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
