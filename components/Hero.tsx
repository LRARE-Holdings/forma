"use client";

import Link from "next/link";
import Reveal from "./Reveal";

function HeroCard({
  label,
  value,
  highlight,
  meta,
  showBar,
  style,
}: {
  label: string;
  value: string;
  highlight: string;
  meta: string;
  showBar?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="bg-white border border-espresso/6 rounded-[14px] px-5 py-4 shadow-[0_1px_3px_rgba(44,24,16,0.03),0_8px_24px_rgba(44,24,16,0.03)] transition-all duration-300 hover:border-sand hover:-translate-x-1"
      style={style}
    >
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-fog mb-1">
        {label}
      </p>
      <p className="font-serif text-[1.4rem] text-espresso">
        {value}
        <span className="text-terracotta"> {highlight}</span>
      </p>
      <p className="text-[0.73rem] text-fog mt-0.5">{meta}</p>
      {showBar && (
        <div className="h-[3px] bg-linen rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-terracotta rounded-full animate-[barGrow_2.2s_cubic-bezier(0.16,1,0.3,1)_1s_forwards]"
            style={{ width: 0 }}
          />
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-[15%] -right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(194,113,79,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_370px] gap-16 items-center">
          <div>
            <Reveal>
              <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-fog mb-6 flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-terracotta" />
                Websites for studios that move
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-serif text-[clamp(3.4rem,6.5vw,5.8rem)] leading-[0.98] font-normal tracking-[-0.03em] mb-7">
                Your studio,
                <br />
                <em className="italic text-terracotta">online.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-[1.15rem] leading-[1.65] text-driftwood max-w-[480px] mb-10">
                Beautiful websites with booking, payments, and class management
                built in. Purpose-built for Pilates, yoga, and fitness studios.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex gap-3 items-center flex-wrap">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-terracotta text-parchment rounded-[10px] text-[0.92rem] font-semibold hover:bg-burnt hover:scale-[1.03] transition-all group"
                >
                  Get started{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-[3px]">
                    →
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="px-6 py-3.5 bg-transparent text-espresso border-[1.5px] border-sand rounded-[10px] text-[0.92rem] font-medium hover:border-clay hover:scale-[1.02] transition-all"
                >
                  See how it works
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Floating cards */}
          <div className="hidden lg:flex flex-col gap-3 animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards] opacity-0">
            <HeroCard
              label="Today's classes"
              value="Hot Pilates"
              highlight="· 9:00"
              meta="12 of 14 spots filled"
              showBar
              style={{ transform: "rotate(-1.5deg)" }}
            />
            <HeroCard
              label="Revenue this week"
              value="£"
              highlight="1,240"
              meta="↑ 18% vs last week"
              style={{ transform: "rotate(0.8deg) translateX(12px)" }}
            />
            <HeroCard
              label="New members"
              value=""
              highlight="7 this month"
              meta="3 via website · 4 referral"
              style={{ transform: "rotate(-0.5deg) translateX(-6px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
