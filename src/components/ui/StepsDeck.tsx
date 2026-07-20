"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type Step = {
  title: string;
  body: string;
  bg: string;
};

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
  /* Progress is split into count-1 hand-off transitions (card0→card1,
   * card1→card2, …) rather than `count` equal segments — the last card
   * has nothing left to do once it settles, so it shouldn't get its own
   * segment of scroll with no visible motion. */
  const transitions = count - 1;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const enterAt = (index - 1) / transitions;
  const settledAt = index / transitions;
  const exitAt = (index + 1) / transitions;

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

/* Scroll distance per hand-off (there are count-1 of them) and the height
 * of the pinned viewport window the deck sits in — sized to the card plus
 * a little breathing room, not a full 100vh, so the card doesn't float in
 * a sea of empty space above/below it while pinned. */
const DECK_PER_STEP_VH = 60;
const DECK_STICKY_VH = 65;

export default function StepsDeck({
  steps,
  className,
}: {
  steps: Step[];
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        height: `${(steps.length - 1) * DECK_PER_STEP_VH + DECK_STICKY_VH}vh`,
      }}
    >
      <div
        className="sticky top-0 flex flex-col items-center justify-center"
        style={{ height: `${DECK_STICKY_VH}vh` }}
      >
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
