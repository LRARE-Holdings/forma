import Reveal from "./Reveal";

const features = [
  {
    icon: "◎",
    title: "Stunning studio website",
    desc: "Purpose-built templates for fitness and wellness. Schedule, pricing, instructors, and your studio's personality — on one fast, mobile-perfect site under your own domain.",
  },
  {
    icon: "✦",
    title: "Integrated class booking",
    desc: "Not an embed. Not an iframe. Native booking built into your site. Clients pick a class, pay, and get confirmed — in seconds, all on-brand.",
  },
  {
    icon: "£",
    title: "Stripe-powered payments",
    desc: "Single classes, multi-class packs, recurring memberships. GBP-native, PCI-compliant, and your money hits your account — not ours.",
  },
  {
    icon: "◈",
    title: "Automated emails",
    desc: "Booking confirmations, reminders, and pack expiry nudges. Branded, automatic, powered by Resend — so they actually reach the inbox.",
  },
];

const scheduleRows = [
  { name: "Hot Pilates", time: "09:00", spots: "3 spots", low: false },
  { name: "Yoga Flow", time: "10:30", spots: "1 spot", low: true },
  { name: "Pilates Sculpt", time: "12:00", spots: "3 spots", low: false },
  { name: "Cardio Pilates", time: "17:30", spots: "8 spots", low: false },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-28 bg-charcoal relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -top-[120px] -right-[120px] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(194,113,79,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1120px] mx-auto px-6 md:px-12 relative z-10">
        <Reveal>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-terracotta mb-5 flex items-center gap-2.5">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            What you get
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.12] text-bisque mb-4">
            One platform.
            <br />
            Everything your studio needs.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-[1.05rem] leading-[1.65] text-sandstone max-w-[500px] mb-12">
            Website, booking, payments, emails, and analytics — unified under
            your brand, running on modern infrastructure.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all h-full">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[1.1rem] mb-5 bg-terracotta/10 text-terracotta border border-terracotta/[0.08]">
                  {f.icon}
                </div>
                <h3 className="text-[1.05rem] font-bold text-bisque mb-1.5">
                  {f.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.6] text-sandstone">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}

          {/* Wide card with schedule preview */}
          <Reveal className="md:col-span-2">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[1.1rem] mb-5 bg-terracotta/10 text-terracotta border border-terracotta/[0.08]">
                  ▤
                </div>
                <h3 className="text-[1.05rem] font-bold text-bisque mb-1.5">
                  Your schedule, always live
                </h3>
                <p className="text-[0.85rem] leading-[1.6] text-sandstone">
                  Manage classes, capacity, waitlists, and instructor
                  assignments from one dashboard. Changes go live instantly.
                  Clients always see the latest timetable.
                </p>
              </div>
              <div className="bg-black/25 border border-white/[0.06] rounded-xl p-4">
                {scheduleRows.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-b-0"
                  >
                    <span className="text-[0.82rem] font-semibold text-bisque">
                      {r.name}
                    </span>
                    <span className="font-mono text-[0.7rem] text-bisque/30">
                      {r.time}
                    </span>
                    <span
                      className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-full ${
                        r.low
                          ? "bg-amber/10 text-amber"
                          : "bg-sage/10 text-sage"
                      }`}
                    >
                      {r.spots}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
