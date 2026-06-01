import { Section, Label } from "./ui/Section";

export default function Manifesto() {
  return (
    <Section tone="charcoal" wide>
      <div className="max-w-[1000px]">
        <Label invert className="mb-10">
          Why we exist
        </Label>
        <p
          className="font-serif font-normal leading-[1.12] tracking-[-0.02em] text-parchment"
          style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.4rem)" }}
        >
          You started a studio to teach people to move — not to wrestle a
          booking platform, patch together a website builder, and answer
          bookings in your DMs at half past ten.{" "}
          <span className="text-fog">
            The tools made for studios feel built for spreadsheets. The ones that
            look nice can&apos;t take a payment.
          </span>{" "}
          <em className="italic text-terracotta">
            So we build the whole thing, properly, around your studio.
          </em>
        </p>
      </div>
    </Section>
  );
}
