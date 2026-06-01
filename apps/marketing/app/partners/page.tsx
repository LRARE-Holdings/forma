import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Section, Label } from "@/components/ui/Section";
import ReferSignupForm from "@/components/refer/ReferSignupForm";

export const metadata: Metadata = {
  title: "Partner programme — Forma",
  description:
    "Know a studio that needs a proper website? Refer them to Forma and earn £100 when they sign up. No cap, no minimum.",
};

const stats = [
  { n: "£100", l: "per studio you refer", s: "Paid when their build is paid" },
  { n: "∞", l: "no cap on referrals", s: "Refer one studio or fifty" },
  { n: "Days", l: "to your first payout", s: "Bank transfer or PayPal" },
];

const steps = [
  {
    n: "01",
    title: "Sign up below",
    desc: "Fill in your details. We generate a unique link for you in seconds.",
  },
  {
    n: "02",
    title: "Share your link",
    desc: "Send it to studio owners you know. It tracks every visit and signup back to you.",
  },
  {
    n: "03",
    title: "We build their studio",
    desc: "Once they sign up and pay for their build, your £100 is on its way.",
  },
];

const refers = [
  {
    title: "Fitness instructors",
    desc: "You teach at a studio that could use Forma. Or you know a freelancer about to go solo.",
  },
  {
    title: "PTs and coaches",
    desc: "Your clients or peers run studios. They mention the booking headache constantly.",
  },
  {
    title: "Wellbeing consultants",
    desc: "You work with wellness businesses. You see the same software problems every week.",
  },
  {
    title: "Someone who knows someone",
    desc: "Your friend runs a Pilates studio and you've heard them vent about Mindbody. That counts.",
  },
];

const faqs = [
  {
    q: "When do I get paid?",
    a: "Once the studio you referred signs up and pays for their build. We send your £100 within a few days of that.",
  },
  {
    q: "Is there a limit on how many studios I can refer?",
    a: "No cap. Refer one studio or fifty — you earn £100 for every one that signs up.",
  },
  {
    q: "What if the studio already knows about Forma?",
    a: "Attribution is based on the first visit with your link. If they used your link, you get the credit.",
  },
  {
    q: "Can I refer studios outside the UK?",
    a: "We only take on UK studios right now, so international referrals won't qualify. If that changes, we'll let you know.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-parchment min-h-[82vh] flex flex-col justify-end pt-32">
          <div className="max-w-[1320px] mx-auto px-6 md:px-12 w-full">
            <div className="pb-14 border-b border-espresso/10">
              <p
                className="font-mono text-[0.66rem] tracking-[0.22em] uppercase text-driftwood mb-10"
                style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
              >
                Partner programme
              </p>
              <h1
                className="font-serif font-normal leading-[0.92] tracking-[-0.03em] text-espresso"
                style={{
                  fontSize: "clamp(3.4rem, 9vw, 9rem)",
                  animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.15s both",
                }}
              >
                Refer a studio.
                <br />
                <em className="italic text-terracotta">Earn £100.</em>
              </h1>
              <p
                className="text-[1.1rem] leading-[1.6] text-bark max-w-[540px] mt-9"
                style={{ animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
              >
                Know a studio owner still stuck on a clunky booking tool or
                running bookings through Instagram DMs? Send them your link. We
                pay £100 the moment they sign up for their build.
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-espresso/10 py-8"
              style={{ animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
            >
              {stats.map((stat) => (
                <div key={stat.l} className="px-0 sm:px-8 first:sm:pl-0 last:sm:pr-0 py-5 sm:py-0">
                  <p className="font-serif text-[2.4rem] leading-none text-espresso">
                    {stat.n}
                  </p>
                  <p className="text-[0.8rem] text-driftwood mt-1.5">{stat.l}</p>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-fog mt-1">
                    {stat.s}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <Section tone="light" wide>
          <Label className="mb-12">How it works</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-espresso/12">
            {steps.map((s) => (
              <div
                key={s.n}
                className="border-r border-b border-espresso/12 p-9 md:p-10 group hover:bg-linen transition-colors"
              >
                <span className="font-mono text-[0.66rem] text-terracotta tracking-[0.14em] block mb-6">
                  {s.n}
                </span>
                <h3 className="font-serif text-[1.5rem] leading-[1.1] tracking-[-0.01em] text-espresso mb-3">
                  {s.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-driftwood">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Who refers */}
        <Section tone="charcoal" wide>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 items-center">
            <div>
              <Label invert className="mb-8">
                Who refers
              </Label>
              <h2
                className="font-serif font-normal leading-[0.96] tracking-[-0.03em] text-parchment"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                You know
                <br />
                <em className="italic text-terracotta">somebody.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-parchment/10 border border-parchment/10">
              {refers.map((item) => (
                <div key={item.title} className="bg-charcoal p-7 md:p-8">
                  <h3 className="font-serif text-[1.3rem] leading-[1.1] text-parchment mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.6] text-fog">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Signup form */}
        <Section id="signup" tone="light" wide>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
            <div>
              <Label className="mb-8">Join the programme</Label>
              <h2
                className="font-serif font-normal leading-[0.96] tracking-[-0.03em] mb-6 text-espresso"
                style={{ fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)" }}
              >
                Get your
                <br />
                <em className="italic text-terracotta">referral link.</em>
              </h2>
              <p className="text-[0.95rem] leading-[1.7] text-driftwood mb-9 max-w-[400px]">
                Takes two minutes. Once you submit, you get a unique link
                immediately. Share it anywhere — email, Instagram, a WhatsApp
                message.
              </p>
              <div className="border-t border-espresso/12 pt-7 space-y-3">
                {[
                  "Paid within days of their first payment",
                  "Bank transfer or PayPal — your choice",
                  "We track every referral, you see the status",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 text-[0.86rem] text-driftwood"
                  >
                    <span className="text-terracotta shrink-0 mt-px">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <ReferSignupForm />
          </div>
        </Section>

        {/* FAQ */}
        <Section tone="linen" wide>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16">
            <div>
              <Label className="mb-6">Questions</Label>
              <h2
                className="font-serif font-normal leading-[1.0] tracking-[-0.03em] text-espresso lg:sticky lg:top-28"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
              >
                How does
                <br />
                <em className="italic text-terracotta">it work?</em>
              </h2>
            </div>
            <div className="divide-y divide-espresso/12 border-t border-espresso/12">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-7">
                  <h3 className="font-serif text-[1.35rem] leading-[1.15] text-espresso mb-2.5">
                    {faq.q}
                  </h3>
                  <p className="text-[0.9rem] leading-[1.65] text-driftwood max-w-[560px]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Bottom CTA */}
        <Section tone="espresso" wide>
          <div className="max-w-[680px] mx-auto text-center">
            <Label invert className="mb-8">
              Still thinking?
            </Label>
            <h2
              className="font-serif font-normal leading-[0.98] tracking-[-0.03em] mb-8 text-parchment"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              You probably know a studio
              <br />
              <em className="italic text-terracotta">that needs this.</em>
            </h2>
            <p className="text-[0.95rem] text-fog mb-10">
              Questions? Email{" "}
              <a
                href="mailto:hello@useforma.co.uk"
                className="text-parchment underline underline-offset-4 decoration-parchment/30 hover:decoration-parchment transition-colors"
              >
                hello@useforma.co.uk
              </a>
              . We reply same day.
            </p>
            <a
              href="#signup"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-terracotta text-parchment text-[0.78rem] font-mono uppercase tracking-[0.12em] hover:bg-burnt transition-colors group"
            >
              Get your link
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
