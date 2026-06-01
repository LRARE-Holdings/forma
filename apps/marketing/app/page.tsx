import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkGallery from "@/components/WorkGallery";
import Manifesto from "@/components/Manifesto";
import Capabilities from "@/components/Capabilities";
import Testimonial from "@/components/Testimonial";
import Process from "@/components/Process";
import TheDeal from "@/components/TheDeal";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WorkGallery />
      <Manifesto />
      <Capabilities />
      <Testimonial />
      <Process />
      <TheDeal />
      <FinalCTA />
      <Footer />
    </>
  );
}
