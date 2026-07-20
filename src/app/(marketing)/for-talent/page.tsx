import type { Metadata } from "next";
import Hero from "@/components/sections/for-talent/Hero";
import Benefits from "@/components/sections/for-talent/Benefits";
import HowYouJoin from "@/components/sections/for-talent/HowYouJoin";
import TalentTestimonials from "@/components/sections/for-talent/TalentTestimonials";
import CTABanner from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "For Talent",
  description:
    "Get trained, vetted, and matched to real clients — steady work, fair pay, and the admin handled for you.",
};

export default function ForTalentPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <HowYouJoin />
      <TalentTestimonials />
      <CTABanner
        heading="Stop applying into the void."
        body="Show us what you can do, and we'll get you in front of clients who actually need it. No more ghosted applications."
        primaryLabel="Apply now"
        primaryHref="/join"
        secondaryLabel="See how it works"
        secondaryHref="#how-it-works"
      />
    </>
  );
}
