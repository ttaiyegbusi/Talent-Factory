import type { Metadata } from "next";
import Hero from "@/components/sections/find-talent/Hero";
import TalentCarousel from "@/components/sections/find-talent/TalentCarousel";
import TrustFeatures from "@/components/sections/home/TrustFeatures";
import HowItWorks from "@/components/sections/home/HowItWorks";
import Testimonials from "@/components/sections/home/Testimonials";
import CTABanner from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Find Talent",
  description:
    "Browse vetted, trained operators ready to start — assistants, accountants, marketers, and more.",
};

export default function FindTalentPage() {
  return (
    <>
      <Hero />
      <TalentCarousel />
      <TrustFeatures />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </>
  );
}
