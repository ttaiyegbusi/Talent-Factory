import type { Metadata } from "next";
import Hero from "@/components/sections/pricing/Hero";
import PricingCard from "@/components/sections/pricing/PricingCard";
import ComparisonTable from "@/components/sections/pricing/ComparisonTable";
import FAQ from "@/components/sections/pricing/FAQ";
import CTABanner from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One flat placement fee covers vetting, training, and a free re-match if it's not the right fit. No hidden markups, no long contracts.",
};

export default function PricingPage() {
  return (
    <>
      <Hero />
      <PricingCard />
      <ComparisonTable />
      <FAQ />
      <CTABanner
        heading="Ready to see exact numbers?"
        body="Tell us the role and we'll send a quote within a day, no obligation, no sales runaround."
        primaryLabel="Find your person"
        primaryHref="/hire"
        secondaryLabel="Browse talent"
        secondaryHref="/find-talent"
      />
    </>
  );
}
