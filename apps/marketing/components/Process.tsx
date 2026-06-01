import { Section, Label } from "./ui/Section";

const steps = [
  {
    n: "01",
    title: "Tell us about your studio",
    desc: "Your classes, your members, the feeling you want people to have when they land. A short conversation, not a 40-field form.",
  },
  {
    n: "02",
    title: "We design and build it",
    desc: "We draw your site, wire up booking and payments, and shape it around how you teach. You see it come together and steer as we go.",
  },
  {
    n: "03",
    title: "It goes live, and it's yours",
    desc: "We hand over a finished studio site. Pay once for the build and that's it — no contract, no lock-in, nothing else owed.",
  },
  {
    n: "04",
    title: "We look after it — if you want",
    desc: "Keep us on a flat monthly plan and we handle updates and fixes whenever something needs to change. Cancel any time, or run it yourself.",
  },
];

export default function Process() {
  return (
    <Section id="how" tone="espresso" wide>
      <div className="mb-16 md:mb-20">
        <Label invert className="mb-6">
          How we work
        </Label>
        <h2
          className="font-serif font-normal leading-[0.98] tracking-[-0.03em] text-parchment max-w-[720px]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          Live in a week.
          <br />
          <em className="italic text-terracotta">Not a project.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-parchment/10 border border-parchment/10">
        {steps.map((s) => (
          <div key={s.n} className="bg-espresso p-9 md:p-12">
            <span className="font-mono text-[0.78rem] text-terracotta tracking-[0.16em] block mb-8">
              {s.n}
            </span>
            <h3 className="font-serif text-[1.7rem] leading-[1.08] tracking-[-0.01em] text-parchment mb-4">
              {s.title}
            </h3>
            <p className="text-[0.94rem] leading-[1.65] text-fog max-w-[420px]">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
