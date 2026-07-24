import type { Metadata } from "next";
import Hero from "@/components/sections/join/Hero";
import ApplyForm from "@/components/sections/join/ApplyForm";

export const metadata: Metadata = {
  title: "Join as Talent",
  description:
    "Apply to join the Talent Factory pool — we test real skills, train you, and match you to real clients.",
};

export default function JoinPage() {
  return (
    <>
      <Hero />
      <ApplyForm />
    </>
  );
}
