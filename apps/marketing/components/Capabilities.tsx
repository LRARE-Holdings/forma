import { Section, Label } from "./ui/Section";

const items = [
  {
    title: "A website that looks like you",
    desc: "Designed from scratch around your brand, your space, and the way you talk to your members. Not a theme — a site that could only be yours.",
  },
  {
    title: "Booking built in",
    desc: "Classes, courses, memberships, and waitlists, running on your own pages. Members book in a few taps and you stop fielding times over DM.",
  },
  {
    title: "Payments that are yours",
    desc: "Card payments, memberships, and class packs settle straight into your account. No marketplace cut, no per-booking fee skimmed off the top.",
  },
  {
    title: "One place to run it",
    desc: "Timetable, members, and takings in a single dashboard made for the floor — not a control panel built for an enterprise gym chain.",
  },
];

export default function Capabilities() {
  return (
    <Section id="make" tone="light" wide>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Label className="mb-6">What we make</Label>
          <h2
            className="font-serif font-normal leading-[0.98] tracking-[-0.03em] text-espresso lg:sticky lg:top-28"
            style={{ fontSize: "clamp(2.4rem, 4.6vw, 3.8rem)" }}
          >
            One studio,
            <br />
            <em className="italic text-terracotta">one build.</em>
          </h2>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-espresso/12">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="border-r border-b border-espresso/12 p-8 md:p-10 hover:bg-linen transition-colors"
            >
              <span className="font-mono text-[0.66rem] text-terracotta tracking-[0.14em] block mb-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[1.5rem] leading-[1.1] tracking-[-0.01em] text-espresso mb-3">
                {it.title}
              </h3>
              <p className="text-[0.92rem] leading-[1.6] text-driftwood">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
