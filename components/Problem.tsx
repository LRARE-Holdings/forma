import Reveal from "./Reveal";

const pains = [
  {
    num: "01",
    title: "Enterprise pricing, micro-studio budget",
    desc: "Mindbody starts at £110+/month with hidden fees, long contracts, and 3.5% on every transaction. Built for chains, priced for chains.",
  },
  {
    num: "02",
    title: "Two tools duct-taped together",
    desc: "A Squarespace site with a booking widget embedded. Two logins, two subscriptions, zero integration. Your brand feels like an afterthought.",
  },
  {
    num: "03",
    title: "Booking tools with no web presence",
    desc: "Most studio software gives you a scheduling form, not a website. Your clients see a functional page, not a brand they connect with.",
  },
];

export default function Problem() {
  return (
    <section className="py-28 max-w-[1120px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              The problem
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] mb-4">
              Studios deserve
              <br />
              better than <em className="italic text-terracotta">this</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <p className="text-[1.05rem] leading-[1.7] text-driftwood">
            You started a studio to help people move, not to wrestle with
            software. But right now you&apos;re paying for a bloated booking
            platform <em>and</em> a separate website builder <em>and</em> an
            email tool. Or worse — managing it all through Instagram DMs and a
            spreadsheet.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand rounded-2xl overflow-hidden mt-16">
        {pains.map((p, i) => (
          <Reveal key={p.num} delay={i * 80}>
            <div className="bg-white p-8 hover:bg-linen transition-colors h-full">
              <p className="font-serif text-[2.5rem] text-sand leading-none mb-3">
                {p.num}
              </p>
              <h3 className="text-[0.95rem] font-bold mb-1.5 text-espresso">
                {p.title}
              </h3>
              <p className="text-[0.82rem] leading-[1.55] text-driftwood">
                {p.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
