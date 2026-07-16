import Hero from "@/components/sections/home/Hero";
import HiringModes from "@/components/sections/home/HiringModes";
import LogoMarquee from "@/components/sections/home/LogoMarquee";
import Testimonials from "@/components/sections/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HiringModes />
      <LogoMarquee />
      <Testimonials />
    </>
  );
}
