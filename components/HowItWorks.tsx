import Reveal from "./Reveal";

const steps = [
  {
    num: "1",
    title: "Sign up",
    desc: "Pick your plan and tell us about your studio — classes, pricing, instructors, and vibe.",
  },
  {
    num: "2",
    title: "We build it",
    desc: "Your site goes live with your brand, schedule, and payments configured. No template tweaking.",
  },
  {
    num: "3",
    title: "You manage it",
    desc: "Add classes, update pricing, track bookings from a simple dashboard. We handle the tech.",
  },
  {
    num: "4",
    title: "Your studio grows",
    desc: "Clients find you, book seamlessly, keep coming back. You focus on what you do best.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28 bg-linen">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            How it works
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] mb-14">
            Live in under a week
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 relative">
          {/* Dashed connector line */}
          <div
            className="hidden md:block absolute top-[27px] left-[27px] right-[27px] h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #D4C4B0 0 8px, transparent 8px 20px)",
            }}
          />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 80} className="relative z-10">
              <div className="group">
                <div className="w-[54px] h-[54px] rounded-full bg-white border-[1.5px] border-sand flex items-center justify-center font-serif text-[1.25rem] text-terracotta mb-4 shadow-[0_1px_4px_rgba(44,24,16,0.03)] group-hover:border-terracotta group-hover:bg-blush transition-all">
                  {s.num}
                </div>
                <h3 className="text-[0.95rem] font-bold text-espresso mb-1">
                  {s.title}
                </h3>
                <p className="text-[0.82rem] text-driftwood leading-[1.55]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
