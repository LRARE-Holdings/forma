import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import HomeHero from "@/components/marketing/HomeHero";
import PricingRow from "@/components/marketing/PricingRow";
import {
  Manifesto,
  Features,
  StudioShowcase,
  TheDeal,
  HowItWorks,
  FinalCta,
} from "@/components/marketing/HomeSections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ink text-text">
        <HomeHero />
        <section aria-label="Plans" className="mx-auto w-full max-w-content px-(--gutter) pt-4 pb-24">
          <PricingRow compact />
        </section>
        <Manifesto />
        <Features />
        <StudioShowcase />
        <TheDeal />
        <HowItWorks />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
