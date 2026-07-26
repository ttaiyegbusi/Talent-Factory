"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StepsDeck, { type Step } from "@/components/ui/StepsDeck";

const steps: Step[] = [
  {
    title: "Tell us what you need",
    body: "A quick note on the role and how it fits your team. The clearer you are, the sharper our shortlist.",
    bg: "#c8f0d9",
  },
  {
    title: "Meet a real shortlist",
    body: "We send a handful of vetted people matched to your needs and culture. Chat with the ones you like.",
    bg: "#ffd9c0",
  },
  {
    title: "Say yes, start working",
    body: "Pick your person. We sort contracts, onboarding, and kickoff so the work starts right away.",
    bg: "#c0d5ff",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#fffaeb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-[#767676]">How it works</p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Three steps, no runaround
          </h2>
          <p className="max-w-md text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            Tell us what you need, meet a shortlist, and start working.
            That&apos;s it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-6 flex justify-center"
        >
          <Link
            href="/hire"
            className="group flex h-[52px] items-center gap-2 rounded-[10px] bg-[#171717] px-7 text-[15px] font-medium tracking-[-0.3px] text-white transition-opacity hover:opacity-90"
          >
            Tell us what you need
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>

        <StepsDeck steps={steps} className="mt-8" />
      </div>
    </section>
  );
}
