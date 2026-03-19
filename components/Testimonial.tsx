import Reveal from "./Reveal";

export default function Testimonial() {
  return (
    <section className="py-22">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <div className="relative">
            <span className="font-serif text-[5rem] text-sand absolute -top-8 left-1/2 -translate-x-1/2 leading-none">
              &ldquo;
            </span>
            <p className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] leading-[1.4] italic text-espresso mb-7 pt-4">
              I was paying for Mindbody, Squarespace, and Mailchimp — three
              tools that didn&apos;t talk to each other. Forma replaced all of
              them and my site actually looks like mine now.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3.5">
            <div className="w-[42px] h-[42px] rounded-full bg-blush flex items-center justify-center font-bold text-[0.85rem] text-burnt">
              L
            </div>
            <div className="text-left">
              <p className="font-bold text-[0.88rem] text-espresso">Lucy</p>
              <p className="text-[0.78rem] text-driftwood">
                Burn Mat Studio, Sheffield
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
