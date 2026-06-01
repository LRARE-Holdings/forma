import Link from "next/link";
import { Section, Label } from "./ui/Section";

type Studio = {
  name: string;
  domain: string;
  location: string;
  discipline: string;
  bg: string;
  ink: string;
  accent: string;
  headline: string;
  nav: string;
};

const studios: Studio[] = [
  {
    name: "burn mat",
    domain: "burnmatstudio.co.uk",
    location: "Stockton-on-Tees",
    discipline: "Reformer Pilates",
    bg: "bg-gradient-to-br from-blush via-clay to-bisque",
    ink: "text-espresso",
    accent: "bg-terracotta text-parchment",
    headline: "Move with\nintention.",
    nav: "Classes · About · Book",
  },
  {
    name: "STILL",
    domain: "stillyoga.studio",
    location: "Bristol",
    discipline: "Slow Flow Yoga",
    bg: "bg-gradient-to-br from-espresso via-cocoa to-charcoal",
    ink: "text-parchment",
    accent: "bg-sage text-parchment",
    headline: "Breathe.\nReturn.",
    nav: "Schedule · Teachers · Join",
  },
  {
    name: "Method.",
    domain: "methodfitness.co",
    location: "Leeds",
    discipline: "Strength & HIIT",
    bg: "bg-gradient-to-br from-sand via-linen to-clay",
    ink: "text-espresso",
    accent: "bg-amber text-parchment",
    headline: "Train with\npurpose.",
    nav: "Timetable · Coaches · Start",
  },
];

function Specimen({ s, index }: { s: Studio; index: number }) {
  return (
    <figure className="group">
      <div className="border border-espresso/12 bg-white overflow-hidden shadow-[0_30px_70px_-40px_rgba(44,24,16,0.4)] transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-espresso/8 bg-linen">
          <span className="w-2 h-2 rounded-full bg-espresso/15" />
          <span className="w-2 h-2 rounded-full bg-espresso/15" />
          <span className="w-2 h-2 rounded-full bg-espresso/15" />
          <span className="ml-2 flex-1 text-center font-mono text-[0.54rem] text-fog tracking-[0.06em] bg-parchment border border-espresso/8 rounded-full py-0.5">
            {s.domain}
          </span>
        </div>
        <div className={`relative h-[230px] ${s.bg} flex items-end p-6`}>
          <div className="absolute top-5 left-6 right-6 flex justify-between items-center">
            <span className={`font-serif text-[1.1rem] tracking-[-0.01em] ${s.ink}`}>
              {s.name}
            </span>
            <span className={`font-mono text-[0.5rem] uppercase tracking-[0.16em] ${s.ink} opacity-55`}>
              {s.nav}
            </span>
          </div>
          <p className={`font-serif text-[2.3rem] leading-[0.98] tracking-[-0.01em] whitespace-pre-line ${s.ink}`}>
            {s.headline}
          </p>
          <span className={`absolute bottom-6 right-6 text-[0.56rem] font-mono uppercase tracking-[0.12em] px-3 py-1.5 ${s.accent}`}>
            Book a class
          </span>
        </div>
      </div>
      <figcaption className="flex items-baseline justify-between mt-4 pt-1">
        <div>
          <p className="text-[0.92rem] font-medium text-espresso">{s.name}</p>
          <p className="text-[0.78rem] text-fog">{s.location}</p>
        </div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-driftwood">
          {s.discipline}
        </p>
      </figcaption>
    </figure>
  );
}

export default function WorkGallery() {
  return (
    <Section id="work" tone="linen" wide>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
        <div className="max-w-[640px]">
          <Label className="mb-6">Selected work</Label>
          <h2
            className="font-serif font-normal leading-[0.98] tracking-[-0.03em] text-espresso"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            No two studios.
            <br />
            <em className="italic text-terracotta">No two sites.</em>
          </h2>
        </div>
        <p className="text-[0.95rem] leading-[1.6] text-bark max-w-[320px] md:text-right md:ml-auto">
          Every studio gets its own identity — its own type, colour, and rhythm.
          Never a template with a new logo dropped on top.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {studios.map((s, i) => (
          <Specimen key={s.domain} s={s} index={i} />
        ))}
      </div>

      <div className="mt-16 md:mt-20 pt-8 border-t border-espresso/10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.95rem] text-driftwood">
          Want to see one running, end to end?
        </p>
        <Link
          href="/case-studies/burn-mat-studio"
          className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-espresso border-b border-espresso/30 pb-1 hover:border-espresso transition-colors"
        >
          Read the Burn Mat case study →
        </Link>
      </div>
    </Section>
  );
}
