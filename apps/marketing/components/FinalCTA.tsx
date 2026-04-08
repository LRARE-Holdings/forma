import Reveal from "./Reveal";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-40 text-center relative overflow-hidden">
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(194,113,79,0.07)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 relative z-10">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.2rem)] font-normal leading-[1.05] max-w-[600px] mx-auto mb-5">
            Book. Pay.
            <br />
            <em className="italic text-terracotta">Breathe.</em>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-[1.05rem] leading-[1.65] text-driftwood max-w-[420px] mx-auto mb-10">
            Join the studios making the switch to a platform built for them.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt hover:scale-[1.03] transition-all group"
            >
              Get a quote{" "}
              <span className="inline-block transition-transform group-hover:translate-x-[3px]">
                →
              </span>
            </Link>
            <Link
              href="#features"
              className="px-6 py-3.5 bg-transparent text-espresso border-[1.5px] border-sand rounded-[10px] text-[0.92rem] font-medium hover:border-clay hover:scale-[1.02] transition-all"
            >
              See a demo studio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
