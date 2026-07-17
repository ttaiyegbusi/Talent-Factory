"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Step = {
  title: string;
  body: string;
  bg: string;
};

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

/* Seconds between each step's reveal — the cards tell the story 1, 2, 3. */
const STEP_STAGGER = 0.16;

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
      style={{ backgroundColor: step.bg }}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.6,
        delay: base,
        ease: [0.22, 1, 0.36, 1],
        y: { type: "spring", stiffness: 280, damping: 22 },
      }}
      className="relative flex-1 overflow-hidden rounded-2xl p-7"
    >
      {/* giant ghost numeral watermark, same corner-motif language as TrustFeatures */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-3 text-[140px] font-bold leading-none text-black/10"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        0{index + 1}
      </span>

      <div className="relative flex h-full min-h-[190px] flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
          Step 0{index + 1}
        </span>
        <h3
          className="text-lg font-semibold leading-tight tracking-[-0.3px] text-black"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {step.title}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#3a3a3a]">{step.body}</p>
      </div>
    </motion.div>
  );
}

function ConnectorArrow({ isInView, delay }: { isInView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="hidden shrink-0 items-center justify-center text-black/25 md:flex"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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

        <div
          ref={gridRef}
          className="mt-12 flex flex-col gap-5 md:flex-row md:items-stretch md:gap-4"
        >
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-4 md:contents">
              <StepCard step={step} index={i} isInView={isInView} />
              {i < steps.length - 1 && (
                <ConnectorArrow
                  isInView={isInView}
                  delay={(i + 1) * STEP_STAGGER}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
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
