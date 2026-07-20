"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type Feature = {
  title: string;
  body: string;
  bg: string;
  icon: string;
  /* Tailwind position/size classes for the watermark icon. */
  iconClass: string;
  /* Where the title/body sit; the icon takes the opposite corner. */
  contentPosition: "top" | "bottom";
};

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

/*
 * Entrance: cards are invisible until the row scrolls into view, then they
 * ride in from the right edge and settle leftward into their slots. Each
 * card starts bunched just past the right end of the row — offset is in %
 * of the card's own width (card + gap ≈ 108%) so the same numbers work for
 * the mobile carousel and the desktop grid. The leftmost card travels
 * farthest and leads, so the row visibly fills right-to-left.
 */
function FeatureCard({
  feature,
  index,
  count,
  isInView,
}: {
  feature: Feature;
  index: number;
  count: number;
  isInView: boolean;
}) {
  const enterOffset = `${(count - index) * 108}%`;

  return (
    <motion.div
      initial={{ x: enterOffset, opacity: 0 }}
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

export default function FeatureGrid({
  features,
  className,
}: {
  features: Feature[];
  className?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  /* Cards stay hidden until the row is well into view, then slide in. */
  const isInView = useInView(rowRef, { once: true, amount: 0.35 });

  return (
    <div ref={rowRef} className={className}>
      <div className="hidden md:grid md:grid-cols-4 md:gap-5">
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            count={features.length}
            isInView={isInView}
          />
        ))}
      </div>

      <div className="flex flex-col gap-5 md:hidden">
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            count={features.length}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}
