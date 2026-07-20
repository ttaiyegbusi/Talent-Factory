"use client";

import { motion } from "framer-motion";
import FeatureGrid, { type Feature } from "@/components/ui/FeatureGrid";

const features: Feature[] = [
  {
    title: "Tested, not just trusted",
    body: "Real skills checked against real tasks before anyone reaches your inbox.",
    bg: "#c8f0d9",
    icon: "/icons/team-fill.svg",
    iconClass: "right-6 -bottom-2 h-[135px]",
    contentPosition: "top",
  },
  {
    title: "We taught them ourselves",
    body: "Not pulled off a job board, trained by Talent Factory to a standard we can promise.",
    bg: "#ffd9c0",
    icon: "/icons/pencil-fill.svg",
    iconClass: "right-6 top-6 h-[112px]",
    contentPosition: "bottom",
  },
  {
    title: "The admin is on us",
    body: "Contracts, onboarding, payment, handled, so you just get the work.",
    bg: "#c0d5ff",
    icon: "/icons/shield-star-fill.svg",
    iconClass: "right-6 -bottom-2 h-[140px]",
    contentPosition: "top",
  },
  {
    title: "If it doesn't click, we re-match",
    body: "An early mismatch isn't your problem to fix. We replace them, no fuss.",
    bg: "#ffffff",
    icon: "/icons/psychotherapy-fill.svg",
    iconClass: "right-4 top-5 h-[125px]",
    contentPosition: "bottom",
  },
];

export default function TrustFeatures() {
  return (
    <section className="overflow-hidden bg-[#fffaeb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[32px] font-semibold leading-[1.2] tracking-[-1.2px] md:text-[40px] md:tracking-[-1.5px]"
            style={{ fontFamily: "var(--font-bricolage)", color: "#f6b51e" }}
          >
            A CV tells you nothing.
            <br />
            We tell you everything.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex max-w-sm flex-col gap-5 md:items-end md:text-right"
          >
            <p className="text-base leading-[23px] text-[#767676]">
              Job boards hand you a stack of strangers and wish you luck. We
              hand you someone we taught, tested, and would stake our name
              on.
            </p>
          </motion.div>
        </div>

        <FeatureGrid features={features} className="mt-12" />
      </div>
    </section>
  );
}
