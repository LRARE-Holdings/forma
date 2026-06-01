import Link from "next/link";
import { Section, Label } from "./ui/Section";

export default function FinalCTA() {
  return (
    <Section tone="charcoal" wide>
      <div className="text-center max-w-[900px] mx-auto">
        <Label invert className="mb-10">
          Book. Pay. Breathe.
        </Label>
        <h2
          className="font-serif font-normal leading-[0.94] tracking-[-0.03em] text-parchment"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Let&apos;s build
          <br />
          <em className="italic text-terracotta">your studio.</em>
        </h2>
        <p className="text-[1.05rem] leading-[1.6] text-fog max-w-[440px] mx-auto mt-10 mb-12">
          Tell us about your classes and we&apos;ll build you something that&apos;s
          yours to keep. No contract, no lock-in, no commission.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-terracotta text-parchment text-[0.78rem] font-mono uppercase tracking-[0.12em] hover:bg-burnt transition-colors group"
          >
            Get a quote
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/case-studies/burn-mat-studio"
            className="px-8 py-4 text-[0.78rem] font-mono uppercase tracking-[0.12em] text-parchment border border-parchment/30 hover:bg-parchment hover:text-charcoal transition-all"
          >
            See a live studio
          </Link>
        </div>
      </div>
    </Section>
  );
}
