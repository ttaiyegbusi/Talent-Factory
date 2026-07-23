import type { Metadata } from "next";
import Hero from "@/components/sections/hire/Hero";
import HireForm from "@/components/sections/hire/HireForm";

export const metadata: Metadata = {
  title: "Hire Someone",
  description:
    "Tell us what you need and get a shortlist of vetted, trained operators within 48 hours.",
};

export default function HirePage() {
  return (
    <>
      <Hero />
      <HireForm />
    </>
  );
}
