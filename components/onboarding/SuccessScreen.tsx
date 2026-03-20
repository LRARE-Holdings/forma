"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const timeline = [
  {
    time: "Now",
    desc: "We start designing your site",
  },
  {
    time: "Within 48 hours",
    desc: "Preview link to review",
  },
  {
    time: "Within 5 days",
    desc: "Site live, bookings active",
  },
  {
    time: "Ongoing",
    desc: "You manage, we handle tech",
  },
];

function DnsInstructions({ domain }: { domain: string }) {
  const adminDomain = `admin.${domain}`;

  const records = [
    {
      type: "CNAME",
      host: "@",
      value: "cname.vercel-dns.com",
      note: `Points ${domain} to your studio site`,
    },
    {
      type: "CNAME",
      host: "admin",
      value: "cname.vercel-dns.com",
      note: `Points ${adminDomain} to your dashboard`,
    },
  ];

  return (
    <div
      className="text-left mt-10 bg-white border border-sand rounded-[12px] p-5"
      style={{
        animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards",
        opacity: 0,
      }}
    >
      <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-terracotta mb-1.5">
        One more thing
      </p>
      <h2 className="font-serif text-[1.15rem] text-espresso mb-2">
        Connect your domain
      </h2>
      <p className="text-[0.82rem] text-driftwood leading-[1.6] mb-4">
        Add these DNS records with your domain provider to connect{" "}
        <strong className="text-espresso">{domain}</strong>. SSL is automatic
        once DNS propagates.
      </p>

      <div className="space-y-2.5">
        {records.map((r, i) => (
          <div
            key={i}
            className="bg-parchment border border-sand/60 rounded-[8px] p-3"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[0.68rem] tracking-[0.06em] bg-terracotta/10 text-terracotta px-1.5 py-0.5 rounded">
                {r.type}
              </span>
              <span className="text-[0.72rem] text-fog">{r.note}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[0.78rem]">
              <span className="text-fog font-mono">Host</span>
              <span className="text-espresso font-mono font-medium">
                {r.host}
              </span>
              <span className="text-fog font-mono">Value</span>
              <span className="text-espresso font-mono font-medium">
                {r.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[0.72rem] text-fog mt-3 leading-[1.55]">
        Not sure how to do this? Just reply to your welcome email and
        we&apos;ll walk you through it.
      </p>
    </div>
  );
}

export default function SuccessScreen() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-[480px] w-full text-center py-20">
        {/* Animated checkmark */}
        <div
          className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-8"
          style={{ animation: "checkIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            stroke="#2E7D5B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="10 18 16 24 26 14" />
          </svg>
        </div>

        <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-normal text-espresso mb-3">
          You&apos;re in.
        </h1>
        <p className="text-[1rem] text-driftwood leading-[1.6] mb-10">
          Your studio site is on its way. Here&apos;s what to expect.
        </p>

        {/* Timeline */}
        <div className="text-left space-y-0">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 items-start relative"
              style={{
                animation: `fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              {/* Connector */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <span className="font-serif text-[0.9rem] text-terracotta">
                    {i + 1}
                  </span>
                </div>
                {i < timeline.length - 1 && (
                  <div
                    className="w-px h-8 mt-1"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(180deg, #D4C4B0 0 4px, transparent 4px 10px)",
                    }}
                  />
                )}
              </div>

              <div className="pt-1 pb-4">
                <p className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-terracotta mb-0.5">
                  {item.time}
                </p>
                <p className="text-[0.88rem] text-espresso">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DNS instructions (only shown when studio has a custom domain) */}
        {domain && <DnsInstructions domain={domain} />}

        <div className="mt-10 space-y-3">
          <Link
            href="#"
            className="block w-full py-3.5 bg-terracotta text-parchment rounded-[10px] text-[0.9rem] font-semibold hover:bg-burnt hover:scale-[1.01] transition-all text-center"
          >
            Go to your dashboard
          </Link>
          <p className="text-[0.75rem] text-fog">
            Have questions? Email{" "}
            <a href="mailto:hello@useforma.co.uk" className="text-terracotta hover:text-burnt transition-colors">
              hello@useforma.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
