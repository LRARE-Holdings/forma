import Link from "next/link";

const timeline = [
  {
    time: "Now",
    desc: "We review your studio details",
  },
  {
    time: "Within 48 hours",
    desc: "We'll reach out to discuss your needs and pricing",
  },
  {
    time: "After you approve",
    desc: "We start building your site",
  },
  {
    time: "Within 5 days",
    desc: "Your studio goes live",
  },
];

export default function SuccessScreen() {
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
          Thanks for your interest.
        </h1>
        <p className="text-[1rem] text-driftwood leading-[1.6] mb-10">
          We&apos;ve received your details and will be in touch within 48 hours.
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

        <div className="mt-10 space-y-3">
          <Link
            href="/"
            className="block w-full py-3.5 bg-terracotta text-parchment rounded-[10px] text-[0.9rem] font-semibold hover:bg-burnt hover:scale-[1.01] transition-all text-center"
          >
            Back to Forma
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
