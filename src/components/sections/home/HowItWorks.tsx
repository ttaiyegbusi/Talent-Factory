"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Step = {
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    title: "Tell us what you need",
    body: "A quick note on the role and how it fits your team. The clearer you are, the sharper our shortlist.",
  },
  {
    title: "Meet a real shortlist",
    body: "We send a handful of vetted people matched to your needs and culture. Chat with the ones you like.",
  },
  {
    title: "Say yes, start working",
    body: "Pick your person. We sort contracts, onboarding, and kickoff so the work starts right away.",
  },
];

/* Seconds between each step's reveal — the cards tell the story 1, 2, 3. */
const STEP_STAGGER = 0.32;

function StepCard({
  step,
  index,
  isInView,
}: {
  step: Step;
  index: number;
  isInView: boolean;
}) {
  const base = index * STEP_STAGGER;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.55,
        delay: base,
        ease: [0.22, 1, 0.36, 1],
        y: { type: "spring", stiffness: 300, damping: 24 },
      }}
      className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-7"
    >
      <div className="relative size-9">
        {/* one-time ping ring behind the badge */}
        <motion.span
          aria-hidden
          initial={{ scale: 1, opacity: 0 }}
          animate={isInView ? { scale: [1, 2], opacity: [0.55, 0] } : undefined}
          transition={{ duration: 0.6, delay: base + 0.3, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[#f6b51e]"
        />
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          animate={isInView ? { scale: 1, rotate: 0 } : undefined}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            delay: base + 0.12,
          }}
          className="relative flex size-9 items-center justify-center rounded-full bg-[#f6b51e] text-sm font-bold text-[#171717]"
        >
          {index + 1}
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.45, delay: base + 0.22, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h3
          className="text-lg font-semibold leading-tight tracking-[-0.3px] text-black"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {step.title}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#4a4a4a]">{step.body}</p>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.4 });

  return (
    <section className="bg-[#fffaeb] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#171717]">
            How it works
          </p>
          <h2
            className="text-[32px] font-semibold leading-[1.15] tracking-[-1.2px] text-black md:text-[44px] md:tracking-[-1.6px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Three steps, no runaround
          </h2>
          <p className="text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            Tell us what you need, meet a shortlist, and start working.
            That&apos;s it.
          </p>
        </motion.div>

        <div ref={gridRef} className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : undefined
          }
          transition={{
            duration: 0.5,
            delay: steps.length * STEP_STAGGER + 0.35,
            ease: "easeOut",
          }}
          className="mt-12 flex justify-center"
        >
          <button className="group flex h-[52px] items-center gap-2 rounded-[10px] bg-[#171717] px-7 text-[15px] font-medium tracking-[-0.3px] text-white transition-opacity hover:opacity-90">
            Tell us what you need
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
