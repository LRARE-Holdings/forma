import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Testimonial from "@/components/Testimonial";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WaitlistProvider from "@/components/WaitlistProvider";

export default function Home() {
  return (
    <WaitlistProvider>
      <Navbar />
      <Hero />
      <TrustStrip />
      <Problem />
      <Features />
      <Testimonial />
      <hr className="border-t border-espresso/6 max-w-280 mx-auto" />
      <HowItWorks />
      <hr className="border-t border-espresso/6 max-w-280 mx-auto" />
      <Pricing />
      <FinalCTA />
      <Footer />
    </WaitlistProvider>
  );
}
