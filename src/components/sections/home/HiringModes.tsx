"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/*
 * Scroll-linked deck: the three cards sit stacked near the row's center
 * (front card centered, each card behind peeking out ~40px to the right,
 * matching the design's stacked frame) and spread into a 3-column row as
 * the section scrolls up. Progress is spring-smoothed so the cards keep
 * settling briefly after the scroll stops, like the reference.
 *
 * Offsets are in % of card width so the motion scales with the container.
 * Card w = 332px, gap = 18px → centers at 166 / 516 / 866 in a 1032 row.
 * Stacked centers: 516 / 556 / 591  →  offset = (stacked − final) / 332.
 */
const STACK_OFFSET_PCT = [105.4, 12, -82.8];

type CardDef = {
  title: string;
  body: string;
  bg: string;
  titleAtTop?: boolean;
  z: number;
  decor: "sun" | "seal" | "ring";
};

const cards: CardDef[] = [
  {
    title: "Hire for keeps",
    body: "Bring someone onto your team permanently, an assistant, a marketer, an accountant, matched for the long haul and the way you work.",
    bg: "#f6b51e",
    z: 30,
    decor: "sun",
  },
  {
    title: "Hand us a function",
    body: "A whole area off your plate: support, bookkeeping, social, operations. We staff it, train it, and keep it running for you.",
    bg: "#fa7319",
    titleAtTop: true,
    z: 20,
    decor: "seal",
  },
  {
    title: "Just get it done",
    body: "One job, one deadline. A campaign launched, the books cleaned up, an inbox tamed, a tool set up. Post it and a specialist picks it up.",
    bg: "#1e1e4f",
    z: 10,
    decor: "ring",
  },
];

/* Decorative shapes — these get their own hover motion via variants. */

function SunDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
      <motion.div
        variants={{ hover: { scale: 1.12, rotate: 8 } }}
        transition={{ type: "spring", stiffness: 120, damping: 9 }}
        className="absolute -top-24 left-10 size-[220px] rounded-full bg-white/25"
      />
      <motion.div
        variants={{ hover: { rotate: 28, scale: 1.08 } }}
        transition={{ type: "spring", stiffness: 100, damping: 8 }}
        className="absolute -top-14 left-[150px] size-[130px] bg-[#d99a00]"
        style={{
          clipPath:
            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        }}
      />
    </div>
  );
}

function SealDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
      <motion.svg
        variants={{ hover: { rotate: 18, scale: 1.06 } }}
        transition={{ type: "spring", stiffness: 90, damping: 8 }}
        className="absolute -bottom-20 -right-14 size-[260px]"
        viewBox="0 0 100 100"
      >
        {/* 8-point seal star */}
        <polygon
          points="50,2 62,26 88,12 74,38 98,50 74,62 88,88 62,74 50,98 38,74 12,88 26,62 2,50 26,38 12,12 38,26"
          fill="#fffaeb"
          stroke="#fffaeb"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <polygon
          points="50,30 67,40 67,60 50,70 33,60 33,40"
          fill="#fa7319"
          stroke="#fa7319"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

function RingDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
      <motion.div
        variants={{ hover: { rotate: -45, scale: 1.08 } }}
        transition={{ type: "spring", stiffness: 90, damping: 8 }}
        className="absolute -right-12 -top-16 size-[190px] rotate-[-25deg] rounded-[52px] border-[40px] border-[#f9abe7]"
      />
    </div>
  );
}

const decors = { sun: SunDecor, seal: SealDecor, ring: RingDecor };

function ModeCard({
  card,
  progress,
  animated,
}: {
  card: CardDef;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  const idx = cards.indexOf(card);
  const x = useTransform(progress, (v) =>
    animated ? `${(1 - v) * STACK_OFFSET_PCT[idx]}%` : "0%"
  );
  const boxShadow = useTransform(
    progress,
    [0, 1],
    ["0 24px 48px rgba(0,0,0,0.25)", "0 0px 0px rgba(0,0,0,0)"]
  );
  const Decor = decors[card.decor];

  return (
    <motion.div
      style={{ x, boxShadow, backgroundColor: card.bg, zIndex: card.z }}
      whileHover="hover"
      variants={{
        hover: {
          rotate: [0, -1.6, 1.6, -0.9, 0.9, 0],
          transition: { duration: 0.55, ease: "easeInOut" },
        },
      }}
      className="relative h-[398px] w-full max-w-[332px] cursor-pointer rounded-[16px] md:min-w-0 md:flex-1"
    >
      <Decor />
      <div
        className={`relative flex h-full flex-col gap-3 p-[26px] ${
          card.titleAtTop ? "justify-start" : "justify-start pt-[190px]"
        }`}
      >
        <h3
          className="text-[27px] font-semibold leading-tight tracking-[-0.5px] text-white"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {card.title}
        </h3>
        <p className="text-[15.5px] leading-[25px] tracking-[-0.2px] text-white/90">
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function HiringModes() {
  const rowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  /* 0 = stacked (row entering viewport) → 1 = expanded (row near center) */
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.95", "start 0.45"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 18,
    mass: 1,
  });

  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center"
        >
          <h2
            className="text-[36px] font-semibold leading-[1.15] tracking-[-1.4px] text-black md:text-[56px] md:tracking-[-2.2px]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            However you want
            <br /> to bring them on
          </h2>
          <p className="max-w-[420px] text-base leading-[23px] tracking-[-0.32px] text-[#767676]">
            Whether you need someone for good, a whole function handled, or a
            quick job done, there&apos;s a way that fits.
          </p>
        </motion.div>

        <div
          ref={rowRef}
          className="mt-16 flex flex-col items-center gap-[18px] md:flex-row md:justify-center"
        >
          {cards.map((card) => (
            <ModeCard
              key={card.title}
              card={card}
              progress={progress}
              animated={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
