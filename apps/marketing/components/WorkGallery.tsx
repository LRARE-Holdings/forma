import Link from "next/link";
import { Section, Label } from "./ui/Section";

const classes = [
  { name: "Reformer Flow", time: "07:00", spots: "2 left" },
  { name: "Hot Pilates", time: "09:30", spots: "Book" },
  { name: "Slow & Strong", time: "18:00", spots: "Book" },
];

export default function WorkGallery() {
  return (
    <Section id="work" tone="linen" wide>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div className="max-w-[640px]">
          <Label className="mb-6">Our first studio</Label>
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
          Every build gets its own identity — its own type, colour, and rhythm.
          Never a template with a new logo dropped on top. Here&apos;s the first
          one we put live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
        {/* Live Burn Mat specimen */}
        <figure className="group">
          <div className="border border-espresso/12 bg-white overflow-hidden shadow-[0_40px_90px_-45px_rgba(44,24,16,0.45)] transition-transform duration-500 group-hover:-translate-y-1.5">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-espresso/8 bg-linen">
              <span className="w-2.5 h-2.5 rounded-full bg-espresso/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-espresso/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-espresso/15" />
              <span className="ml-2 flex-1 text-center font-mono text-[0.58rem] text-fog tracking-[0.06em] bg-parchment border border-espresso/8 rounded-full py-1">
                burnmatstudio.co.uk
              </span>
            </div>
            <div className="relative h-[260px] md:h-[300px] bg-gradient-to-br from-blush via-clay to-bisque flex items-end p-7">
              <div className="absolute top-6 left-7 right-7 flex justify-between items-center">
                <span className="font-serif text-[1.2rem] tracking-[-0.01em] text-espresso">
                  burn mat
                </span>
                <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-espresso/55">
                  Classes · About · Book
                </span>
              </div>
              <p className="font-serif text-[2.6rem] leading-[0.98] tracking-[-0.01em] text-espresso">
                Move with
                <br />
                intention.
              </p>
            </div>
            <div className="px-6 py-5">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-fog mb-3">
                This week
              </p>
              <div className="divide-y divide-espresso/8">
                {classes.map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-[0.85rem] font-semibold text-espresso leading-tight">
                        {c.name}
                      </p>
                      <p className="font-mono text-[0.62rem] text-fog mt-0.5">{c.time}</p>
                    </div>
                    <span
                      className={`text-[0.62rem] font-bold px-3 py-1.5 ${
                        c.spots === "Book"
                          ? "bg-terracotta text-parchment"
                          : "bg-terracotta/15 text-terracotta"
                      }`}
                    >
                      {c.spots}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </figure>

        {/* Caption + what's in it */}
        <div>
          <p className="font-serif text-[1.8rem] leading-[1.1] tracking-[-0.01em] text-espresso mb-2">
            Burn Mat Studio
          </p>
          <p className="text-[0.85rem] text-fog mb-8">
            Reformer Pilates · Stockton-on-Tees
          </p>
          <ul className="space-y-3 border-t border-espresso/12 pt-7 mb-9">
            {[
              "Custom site, designed around the studio",
              "Class booking and waitlists built in",
              "Card payments straight to their account",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.9rem] leading-[1.5] text-bark"
              >
                <span className="text-terracotta shrink-0 mt-px">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/case-studies/burn-mat-studio"
            className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-espresso border-b border-espresso/30 pb-1 hover:border-espresso transition-colors"
          >
            Read the case study →
          </Link>
        </div>
      </div>
    </Section>
  );
}
