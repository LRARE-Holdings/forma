import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-parchment pt-44 pb-24 md:pt-52 md:pb-32 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        <p
          className="font-mono text-[0.66rem] tracking-[0.22em] uppercase text-driftwood mb-10 md:mb-14"
          style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
        >
          A studio for studios
        </p>

        <h1
          className="font-serif font-normal text-espresso leading-[0.92] tracking-[-0.03em]"
          style={{
            fontSize: "clamp(3.4rem, 11vw, 11rem)",
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s both",
          }}
        >
          Your studio,
          <br />
          <em className="italic text-terracotta">made</em> online.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14 md:mt-20 items-end">
          <p
            className="lg:col-span-6 lg:col-start-1 text-[1.15rem] md:text-[1.3rem] leading-[1.55] text-bark max-w-[560px]"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
          >
            We design and build the website, booking, and payments for
            independent Pilates, yoga, and fitness studios — as one custom
            piece, shaped around how you actually run your classes.
          </p>

          <div
            className="lg:col-span-5 lg:col-start-8 flex flex-col gap-5"
            style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.42s both" }}
          >
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-espresso text-parchment text-[0.78rem] font-mono uppercase tracking-[0.12em] hover:bg-bark transition-colors group"
              >
                Get a quote
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/case-studies/burn-mat-studio"
                className="px-7 py-4 text-[0.78rem] font-mono uppercase tracking-[0.12em] text-espresso border border-espresso/20 hover:border-espresso transition-colors"
              >
                See a live studio
              </Link>
            </div>
            <p className="font-mono text-[0.66rem] tracking-[0.12em] uppercase text-fog leading-[1.8]">
              Pay once. No contract.
              <br />
              No lock-in. Yours to keep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
