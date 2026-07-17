"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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

function StepCardContent({ step, index }: { step: Step; index: number }) {
  return (
    <div
      style={{ backgroundColor: step.bg }}
      className="relative h-full w-full overflow-hidden rounded-2xl p-7 md:p-10"
    >
      {/* giant ghost numeral watermark, same corner-motif language as TrustFeatures */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-3 text-[140px] font-bold leading-none text-black/10 md:text-[200px]"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        0{index + 1}
      </span>

      <div className="relative flex h-full min-h-[190px] flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
          Step 0{index + 1}
        </span>
        <h3
          className="text-lg font-semibold leading-tight tracking-[-0.3px] text-black md:text-2xl"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {step.title}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#3a3a3a] md:text-base md:leading-[24px]">
          {step.body}
        </p>
      </div>
    </div>
  );
}

/*
 * A pinned, scroll-scrubbed "swipe deck" (reference:
 * maximatherapy.com/programs/0-to-3). Cards sit fanned in a stack; as the
 * user scrolls through the pinned section, the front card rotates + slides
 * off the top while the next card straightens from its resting tilt into
 * the flat "front" position — one card exits per 1/count of scroll
 * progress. The last card simply settles flat and stays, no exit.
 */
const DECK_EXIT_ROTATE = -16;
const DECK_EXIT_Y = -560;
/* Alternating resting tilt for cards still waiting their turn in the deck. */
const restTilt = (index: number) => (index % 2 === 1 ? 7 : -6);

function DeckCard({
  step,
  index,
  count,
  progress,
}: {
  step: Step;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const enterAt = (index - 1) / count;
  const settledAt = index / count;
  const exitAt = (index + 1) / count;

  const rotateInput = isFirst
    ? [0, exitAt]
    : isLast
      ? [enterAt, settledAt]
      : [enterAt, settledAt, exitAt];
  const rotateOutput = isFirst
    ? [0, DECK_EXIT_ROTATE]
    : isLast
      ? [restTilt(index), 0]
      : [restTilt(index), 0, DECK_EXIT_ROTATE];

  const yOutput = isFirst
    ? [0, DECK_EXIT_Y]
    : isLast
      ? [0, 0]
      : [0, 0, DECK_EXIT_Y];

  const rotate = useTransform(progress, rotateInput, rotateOutput);
  const y = useTransform(progress, rotateInput, yOutput);

  return (
    <motion.div
      style={{ rotate, y, zIndex: count - index }}
      className="absolute inset-0"
    >
      <StepCardContent step={step} index={index} />
    </motion.div>
  );
}

const DECK_PER_STEP_VH = 80;
const DECK_STICKY_VH = 100;

function SwipeDeck({ steps, className }: { steps: Step[]; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ height: `${steps.length * DECK_PER_STEP_VH + DECK_STICKY_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <div className="relative h-[340px] w-full max-w-[320px] md:h-[420px] md:max-w-[420px]">
          {steps.map((step, i) => (
            <DeckCard
              key={step.title}
              step={step}
              index={i}
              count={steps.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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

        <SwipeDeck steps={steps} className="mt-8" />
      </div>
    </section>
  );
}
