"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Feature = {
  title: string;
  body: string;
  bg: string;
  icon: string;
  /* Tailwind position/size classes for the watermark icon. */
  iconClass: string;
  /* Where the title/body sit; the icon takes the opposite corner. */
  contentPosition: "top" | "bottom";
};

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

/*
 * Entrance: cards are invisible until the row scrolls into view, then they
 * ride in from the right edge and settle leftward into their slots. Each
 * card starts bunched just past the right end of the row — offset is in %
 * of the card's own width (card + gap ≈ 108%) so the same numbers work for
 * the mobile carousel and the desktop grid. The leftmost card travels
 * farthest and leads, so the row visibly fills right-to-left.
 */
const enterOffset = (i: number) => `${(features.length - i) * 108}%`;

function FeatureCardContent({ feature }: { feature: Feature }) {
  return (
    <div
      style={{ backgroundColor: feature.bg }}
      className="relative flex h-[300px] w-full flex-col overflow-hidden rounded-2xl p-7 md:h-[320px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={feature.icon}
        alt=""
        aria-hidden
        className={`pointer-events-none absolute w-auto ${feature.iconClass}`}
      />

      <div
        className={`relative flex flex-col gap-2.5 ${
          feature.contentPosition === "bottom" ? "mt-auto" : ""
        }`}
      >
        <h3
          className="text-lg font-semibold leading-tight tracking-[-0.3px] text-black"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          {feature.title}
        </h3>
        <p className="text-[14px] leading-[21px] text-[#4a4a4a]">
          {feature.body}
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: Feature;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ x: enterOffset(index), opacity: 0 }}
      animate={isInView ? { x: "0%", opacity: 1 } : undefined}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.35, delay: index * 0.12 },
        y: { type: "spring", stiffness: 300, damping: 22 },
      }}
    >
      <FeatureCardContent feature={feature} />
    </motion.div>
  );
}

export default function TrustFeatures() {
  const rowRef = useRef<HTMLDivElement>(null);
  /* Cards stay hidden until the row is well into view, then slide in. */
  const isInView = useInView(rowRef, { once: true, amount: 0.35 });

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

        <div ref={rowRef}>
          <div className="mt-12 hidden md:grid md:grid-cols-4 md:gap-5">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-5 md:hidden">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
