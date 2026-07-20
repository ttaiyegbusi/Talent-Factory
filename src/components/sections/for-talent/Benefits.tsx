"use client";

import { motion } from "framer-motion";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";

const benefits: Feature[] = [
  {
    title: "Real training, not busywork",
    body: "We invest in your skills before you ever go on a call, so you show up ready.",
    bg: "#ffd9c0",
    icon: "/icons/pencil-fill.svg",
    iconClass: "right-6 top-6 h-[112px]",
    contentPosition: "bottom",
  },
  {
    title: "Paid on time, every time",
    body: "Contracts and payments handled for you. No chasing invoices.",
    bg: "#c0d5ff",
    icon: "/icons/shield-star-fill.svg",
    iconClass: "right-6 -bottom-2 h-[140px]",
    contentPosition: "top",
  },
  {
    title: "Matched to work that fits",
    body: "Placed with clients who need exactly what you do best, not just anyone hiring.",
    bg: "#c8f0d9",
    icon: "/icons/team-fill.svg",
    iconClass: "right-6 -bottom-2 h-[135px]",
    contentPosition: "top",
  },
  {
    title: "If it's not right, we fix it",
    body: "A bad fit isn't your problem to carry. We re-match you, no penalty.",
    bg: "#ffffff",
    icon: "/icons/psychotherapy-fill.svg",
    iconClass: "right-4 top-5 h-[125px]",
    contentPosition: "bottom",
  },
];

export default function Benefits() {
  return (
    <section className="overflow-hidden bg-[#fffaeb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <p className="text-sm text-[#767676]">What you get</p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            We back you, not just place you
          </h2>
          <p className="max-w-md text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            Getting placed is the easy part. Staying supported is what makes
            it worth it.
          </p>
        </motion.div>

        <FeatureGrid features={benefits} className="mt-12" />
      </div>
    </section>
  );
}
