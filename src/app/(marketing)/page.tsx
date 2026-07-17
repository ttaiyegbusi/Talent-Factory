import Hero from "@/components/sections/home/Hero";
import HiringModes from "@/components/sections/home/HiringModes";
import LogoMarquee from "@/components/sections/home/LogoMarquee";
import TrustFeatures from "@/components/sections/home/TrustFeatures";
import Stats from "@/components/sections/home/Stats";
import HowItWorks from "@/components/sections/home/HowItWorks";
import Testimonials from "@/components/sections/home/Testimonials";
import CTABanner from "@/components/sections/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HiringModes />
      <LogoMarquee />
      <TrustFeatures />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </>
  );
}
