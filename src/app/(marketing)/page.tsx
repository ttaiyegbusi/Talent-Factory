import Hero from "@/components/sections/home/Hero";
import HiringModes from "@/components/sections/home/HiringModes";
import LogoMarquee from "@/components/sections/home/LogoMarquee";
import TrustFeatures from "@/components/sections/home/TrustFeatures";
import Stats from "@/components/sections/home/Stats";
import Testimonials from "@/components/sections/home/Testimonials";
import HowItWorks from "@/components/sections/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HiringModes />
      <LogoMarquee />
      <TrustFeatures />
      <Stats />
      <Testimonials />
      <HowItWorks />
    </>
  );
}
