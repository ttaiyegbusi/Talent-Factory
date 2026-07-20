"use client";

import { motion } from "framer-motion";
import StepsDeck, { type Step } from "@/components/ui/StepsDeck";

const steps: Step[] = [
  {
    title: "Apply and get tested",
    body: "Show us what you can do. We test real skills, not just what's on your résumé.",
    bg: "#c8f0d9",
  },
  {
    title: "Get trained and certified",
    body: "We prepare you to the standard our clients expect, before you meet anyone.",
    bg: "#ffd9c0",
  },
  {
    title: "Get matched and start earning",
    body: "We place you with a client who needs exactly what you offer.",
    bg: "#c0d5ff",
  },
];

export default function HowYouJoin() {
  return (
    <section id="how-it-works" className="bg-[#fffaeb] py-24">
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
            Three steps to your next client
          </h2>
          <p className="max-w-md text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            Apply, get trained, get matched. No ghosting, no endless
            applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-6 flex justify-center"
        >
          <a
            href="/join"
            className="group flex h-[52px] items-center gap-2 rounded-[10px] bg-[#171717] px-7 text-[15px] font-medium tracking-[-0.3px] text-white transition-opacity hover:opacity-90"
          >
            Apply now
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>

        <StepsDeck steps={steps} className="mt-8" />
      </div>
    </section>
  );
}
