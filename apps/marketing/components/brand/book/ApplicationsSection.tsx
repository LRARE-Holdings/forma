import { render } from "@react-email/render";
import { Logo } from "@/components/brand/Logo";
import HomeHero from "@/components/marketing/HomeHero";
import PricingRow from "@/components/marketing/PricingRow";
import { brand } from "@/config/brand";
import { PaymentReceivedEmail } from "@/emails/transactional";
import { BookSection, Sub } from "./Book";

function SocialPost() {
  const lines = brand.bigIdea.split(/(?<=\.)\s+/);
  return (
    <div
      className="@container aspect-square w-full max-w-[540px] overflow-hidden rounded-lg bg-ink text-text ring-1 ring-border-strong"
      role="img"
      aria-label={`Social post template: ${brand.bigIdea}`}
    >
      <div className="flex h-full flex-col justify-between p-[7.4cqw]">
        <Logo className="h-[6cqw] w-auto" decorative />
        <p className="font-display text-[12.5cqw] font-extrabold leading-[0.92] tracking-[-0.035em]">
          {lines.map((l, i) => (
            <span key={l} className={`block ${i === lines.length - 1 ? "text-volt" : ""}`}>
              {l}
            </span>
          ))}
        </p>
        <div className="flex items-end justify-between gap-[3cqw] text-[3.3cqw] font-semibold text-text-secondary">
          <span>No setup fees. No contracts. No commission.</span>
          <span className="shrink-0 text-text">{brand.domain}</span>
        </div>
      </div>
    </div>
  );
}

export default async function ApplicationsSection() {
  // Example data, so the page shows the real email without a real customer.
  const emailHtml = await render(<PaymentReceivedEmail ownerName="Sam Example" studioName="Example Studio" planName="Studio" />);

  return (
    <BookSection
      id="applications"
      title="Applications"
      intro={<p>The system in use. These are the same components that render the live site.</p>}
    >
      <Sub title="Homepage hero">
        <div className="overflow-hidden rounded-lg border border-border-strong">
          <HomeHero headingAs="p" />
        </div>
      </Sub>

      <Sub title="Pricing row" note="Pro inverts to volt. Prices only: the full cards with features are on /pricing.">
        <PricingRow compact />
      </Sub>

      <div className="grid gap-10 lg:grid-cols-2">
        <Sub title="Social post" note="1080×1080 template. Ink ground, lockup top left, one idea per post.">
          <SocialPost />
        </Sub>
        <Sub title="Social share image" note="1200×630, generated with the logo files. Used whenever a link to the site is shared.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo/og-default.png"
            alt={`${brand.name} share image: ${brand.bigIdea}`}
            width={1200}
            height={630}
            className="h-auto w-full rounded-lg ring-1 ring-border-strong"
          />
        </Sub>
      </div>

      <Sub
        title="Email"
        note={
          <>
            <code>emails/components/BrandLayout.tsx</code>. Ink header band with the white lockup, white body, volt button with
            ink text. Manrope falls back to Helvetica and Arial, since most email clients won&apos;t load webfonts.
          </>
        }
      >
        <iframe
          title="Payment received email, with example data"
          srcDoc={emailHtml}
          className="h-[620px] w-full max-w-[640px] rounded-lg bg-paper-2"
        />
      </Sub>
    </BookSection>
  );
}
