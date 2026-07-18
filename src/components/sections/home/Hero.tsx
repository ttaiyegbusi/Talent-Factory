"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

/*
 * Card fall-in physics measured from the Anchor reference video
 * (frame-by-frame color-blob tracking at 60fps):
 *  - y: soft underdamped spring — fast fall (~0.55s) overshooting the
 *    target by ~21%, slow rise back (~0.75s), ~2% second overshoot,
 *    settled by ~1.8s.  Fit: zeta 0.45, omega_n 4.7 rad/s.
 *  - rotate: stiffer spring, settles in ~0.5s. Cards enter tilted
 *    20-45 deg past their resting angle, sign varying per card.
 *  - x is fixed; no opacity fade — cards drop in from above the viewport,
 *    entering the frame already moving fast (~1800px/s), so the spring gets
 *    an initial velocity and each card stays hidden until its launch instant.
 *  - entries stagger one at a time: 0 / 0.15 / 0.2 / 0.35 / 0.5 s.
 */
const Y_SPRING = {
  type: "spring",
  stiffness: 22,
  damping: 4.2,
  mass: 1,
  velocity: 1400,
} as const;
const ROT_SPRING = { type: "spring", stiffness: 70, damping: 12, mass: 1 } as const;
const DROP_FROM = -880;

/* Layout in Figma design coordinates (1440-wide frame, stage starts at
 * design y=610). Center-based positions; z-order = array order. */
const STAGE_W = 1440;
const STAGE_H = 430;

type CardDef = {
  label: string;
  bg: string;
  fg: string;
  cx: number;
  cy: number;
  w: number;
  rotate: number;
  enterRotate: number;
  delay: number;
};

const cards: CardDef[] = [
  {
    label: "Product Designer",
    bg: "#ffd9c0",
    fg: "#fa7319",
    cx: 501.8,
    cy: 101,
    w: 420,
    rotate: -5.29,
    enterRotate: -32,
    delay: 0.2,
  },
  {
    label: "Accountant",
    bg: "#f6b51e",
    fg: "#fffaeb",
    cx: 722.8,
    cy: 207,
    w: 420,
    rotate: 3,
    enterRotate: 24,
    delay: 0,
  },
  {
    label: "Design Engineer",
    bg: "#ffc0c5",
    fg: "#fb3748",
    cx: 524,
    cy: 309,
    w: 400,
    rotate: 0,
    enterRotate: -42,
    delay: 0.35,
  },
  {
    label: "Data Analyst",
    bg: "#c0d5ff",
    fg: "#335cff",
    cx: 941,
    cy: 309,
    w: 400,
    rotate: 0,
    enterRotate: 30,
    delay: 0.5,
  },
  {
    label: "Software Engineer",
    bg: "#171717",
    fg: "#ffffff",
    cx: 973.7,
    cy: 102,
    w: 420,
    rotate: 5,
    enterRotate: 38,
    delay: 0.15,
  },
];

/* Static white bleed cards. Inner edges sit at fixed design coords; the
 * outer edge extends far past the stage so overflow-hidden crops each one
 * flush against the real viewport edge at any screen width. */
const ghosts = [
  { left: -2000, top: 93, w: 2122 },
  { left: -2000, top: 181, w: 2383 },
  { left: -2000, top: 269, w: 2217 },
  { left: 1309, top: 93, w: 2000 },
  { left: 1047, top: 181, w: 2000 },
  { left: 1204, top: 269, w: 2000 },
];

function FallingCard({ card }: { card: CardDef }) {
  return (
    <motion.div
      initial={{ y: DROP_FROM, rotate: card.enterRotate, visibility: "hidden" }}
      animate={{ y: 0, rotate: card.rotate, visibility: "visible" }}
      transition={{
        y: { ...Y_SPRING, delay: card.delay },
        rotate: { ...ROT_SPRING, delay: card.delay },
        visibility: { duration: 0, delay: card.delay },
      }}
      style={{
        left: card.cx - card.w / 2,
        top: card.cy - 40,
        width: card.w,
        backgroundColor: card.bg,
      }}
      className="absolute flex h-20 items-center rounded-[10px] px-5"
    >
      <span
        className="whitespace-nowrap text-xl font-medium tracking-[-0.4px]"
        style={{ color: card.fg }}
      >
        {card.label}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-40">
      {/* headline */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 pt-36 text-center md:pt-44">
        {/* headline "solidifies" like the reference: each line rises in as a
            lighter, slanted cut of the variable font and morphs upright/bold */}
        <h1
          className="text-[40px] leading-[1.1] text-black md:text-[64px] md:leading-[70px]"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {["Every great company runs", "on people you never see"].map(
            (line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{
                  opacity: 0,
                  y: 18,
                  skewX: -12,
                  fontWeight: 300,
                  letterSpacing: "0em",
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  skewX: 0,
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.0 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            )
          )}
        </h1>

        {/* Rendered plain (no entrance animation): this is the page's LCP
         * candidate, and hiding it behind an opacity/blur fade pushed LCP
         * out to 6s+ under throttled conditions for a moment nobody's
         * eyes are actually on (the headline solidify + falling cards are
         * the visual focus here). */}
        <p className="max-w-[600px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
          The assistant guarding the CEO&apos;s calendar. The social media
          manager who is the brand&apos;s voice. The accountant keeping the
          lights on. We train and place the operators behind the business, so
          you can get back to running it.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
        >
          <Button className="w-full sm:w-auto sm:min-w-[190px]">
            Find your person
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto sm:min-w-[190px]"
          >
            See who is available
          </Button>
        </motion.div>
      </div>

      {/* card stage — fixed 1440px design canvas, scaled down responsively */}
      <div className="relative mt-10 h-[240px] md:mt-14 md:h-[345px] xl:h-[430px]">
        <div
          className="absolute left-1/2 top-0 -ml-[720px] origin-top scale-[0.55] md:scale-[0.8] xl:scale-100"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          {ghosts.map((g, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute h-20 rounded-[10px] bg-white"
              style={{ left: g.left, top: g.top, width: g.w }}
            />
          ))}
          {cards.map((card) => (
            <FallingCard key={card.label} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
