import { Section, Label } from "./ui/Section";

export default function Testimonial() {
  return (
    <Section tone="light" wide>
      <div className="max-w-[1040px] mx-auto text-center">
        <Label className="mb-12">From the studio floor</Label>
        <blockquote>
          <p
            className="font-serif font-normal leading-[1.14] tracking-[-0.02em] text-espresso"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)" }}
          >
            &ldquo;I ran everything through one of the big platforms — bookings,
            payments, my website. It worked, but it never felt like{" "}
            <em className="italic text-terracotta">mine.</em> Forma gave me
            something that actually looks like my studio.&rdquo;
          </p>
          <footer className="flex items-center justify-center gap-4 mt-12">
            <div className="w-11 h-11 bg-terracotta flex items-center justify-center font-serif text-[1.1rem] text-parchment shrink-0">
              L
            </div>
            <div className="text-left">
              <p className="text-[0.92rem] font-medium text-espresso">Lucy</p>
              <p className="text-[0.8rem] text-fog">
                Burn Mat Studio, Stockton-on-Tees
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </Section>
  );
}
