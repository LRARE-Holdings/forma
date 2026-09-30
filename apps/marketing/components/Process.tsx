import { Section, Label } from "./ui/Section";

const steps = [
  {
    n: "01",
    title: "Pick your plan",
    desc: "Choose Solo, Studio or Partner and check out in a couple of minutes. No sales call, no quote, no waiting on someone to get back to you.",
  },
  {
    n: "02",
    title: "Set up your studio",
    desc: "Add your classes, timetable, and branding in a guided setup. Bring your members across or start fresh — it's built to be quick.",
  },
  {
    n: "03",
    title: "Go live the same day",
    desc: "Your branded site, booking, and payments are online today. Share the link and take your first booking before the kettle's boiled.",
  },
  {
    n: "04",
    title: "Grow without the penalty",
    desc: "Add members, classes, and locations as you scale — your price stays flat. Cancel and export your data anytime, no hard feelings.",
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
          Live today.
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
